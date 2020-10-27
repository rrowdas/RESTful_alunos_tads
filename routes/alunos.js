const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/', (req, res, next) => { //OK

    //valores default da request
    let limite = req.query.limite ? req.query.limite : 25;
    let pagina = req.query.pagina ? req.query.pagina : 1;
    let nome = req.query.nome ? req.query.nome : "";

    let sql = `SELECT * FROM alunos WHERE nome LIKE '%${req.query.nome}%'`; //nao conseguimos implementar com ? e params
    let params = [];

    database.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ msg: 'Bad Request: ' + err.message });
            return;
        }
        res.status(200).json({
            msg: 'OK',
            limite: req.query.limite,
            pagina: req.query.pagina,
            nome: req.query.nome,
            request: {
                type: 'GET',
                description: 'Return all students or the ones with the casted nome',
                url: 'https://locahost:3000/alunos'
            },
            data: rows
        });
    });
    // database.close();
});

router.post('/', (req, res, next) => { //OK

    let nome = req.body.nome;
    let rga = req.body.rga;
    let curso = req.body.curso;


    database.run(`INSERT INTO alunos(nome, rga, curso) VALUES(?, ?, ?)`, [nome, rga, curso], function(err) { //colocar ou nao situacao?
        if (err) {
            res.status(400).json({
                msg: 'Bad Request: ' + err.message,
                request: {
                    body: {
                        rga: 'String (obrigatorio)',
                        nome: 'String (obrigatorio)',
                        curso: 'String (opcional)'
                    }
                }
            });
            return; //pq esse return?
        } else {
            database.get(`SELECT * FROM alunos WHERE id LIKE '${this.lastID}'`,
                function(err, row) {
                    if (err) {
                        throw err;
                    } else {
                        res.status(201).json({
                            msg: 'Created',
                            id: row.id,
                            registrado_em: row.registro_em,
                            situacao: row.situacao,
                            rga: row.rga,
                            nome: row.nome,
                            curso: row.curso,
                            request: {
                                type: 'POST',
                                description: 'Register student info in body to alunos.db',
                                url: 'https://locahost:3000/alunos',
                                body: {
                                    rga: 'String (obrigatorio)',
                                    nome: 'String (obrigatorio)',
                                    curso: 'String (opcional)'
                                }
                            }
                        })
                    }
                });
        }
    });
    // database.close();
});

router.put('/', (req, res, next) => { //OK
    if (req.params.id !== null || req.params.id !== undefined) {
        res.status(405).json({
            msg: 'Method Not Allowed'
        });
    }
});

router.delete('/', (req, res, next) => { //OK
    if (req.params.id !== null || req.params.id !== undefined) {
        res.status(405).json({
            msg: 'Method Not Allowed'
        });
    }
});

router.get('/:id', (req, res, next) => { //OK
    database.get(`SELECT * FROM alunos WHERE id = '${req.params.id}'`, function(err, row) {
        if (err) {
            throw err;
        } else if (row === undefined) {
            res.status(404).json({
                msg: 'Not Found (student)'
            });
        } else {
            res.status(200).json({
                msg: 'OK - found',
                id: row.id,
                registrado_em: row.registro_em,
                situacao: row.situacao,
                rga: row.rga,
                nome: row.nome,
                curso: row.curso,
                request: {
                    type: 'GET',
                    description: 'Return student information from respective id',
                    url: `https://locahost:3000/alunos/${req.params.id}`,
                }
            });
        }
    });
    // database.close();
});

router.put('/:id', (req, res, next) => { //TNC NAO SEI FAZER UPDATE
    database.get(`SELECT * FROM alunos WHERE id = '${req.params.id}'`, function(err, row) {
        if (err) {
            throw err;
        } else if (row === undefined) {
            res.status(404).json({
                msg: 'Not Found (student)'
            });
        } else {
            let id = req.params.id;
            let registrado_em = req.body.registrado_em ? req.body.registrado_em : row.registro_em; //nao faz sentido alterar
            let situacao = req.body.situacao ? req.body.situacao : row.situacao;
            let rga = req.body.rga ? req.body.rga : row.rga;
            let nome = req.body.nome ? req.body.nome : row.nome;
            let curso = req.body.curso ? req.body.curso : row.curso;

            // database.run(`UPDATE alunos SET registro_em='?', situacao='?', rga='?', nome='?', curso='?' WHERE id = '${id}'`, [registrado_em, situacao, rga, nome, curso], function(err) {
            database.run(`UPDATE alunos Set registro_em=${registrado_em}, situacao=${situacao}, rga=${rga}, nome=${nome}, curso=${curso} WHERE id = ${id}`, function(err) {
                if (err) {
                    throw err;
                } else {
                    database.get(`SELECT * FROM alunos WHERE id LIKE '${id}'`,
                        function(err, row) {
                            if (err) {
                                throw err;
                            } else {
                                res.status(200).json({
                                    msg: 'OK  - Updated',
                                    id: row.id,
                                    registrado_em: row.registro_em,
                                    situacao: row.situacao,
                                    rga: row.rga,
                                    nome: row.nome,
                                    curso: row.curso,
                                    request: {
                                        type: 'PUT',
                                        description: 'Update student info in body to alunos.db',
                                        url: `https://locahost:3000/alunos/${req.params.id}`,
                                        body: {
                                            registro_em: 'DateTime',
                                            situacao: 'String',
                                            rga: 'String',
                                            nome: 'String',
                                            curso: 'String (opcional)',
                                        }
                                    }
                                });
                            }
                        });
                }
            });

        }
    }); // database.close();
});

router.delete('/:id', (req, res, next) => { //OK
    database.get(`SELECT * FROM alunos WHERE id = '${req.params.id}'`, function(err, row) {
        if (err) {
            throw err;
        } else if (row === undefined) {
            res.status(404).json({
                msg: 'Not Found (student)'
            });
        } else {
            database.run(`DELETE FROM alunos WHERE id=${req.params.id}`, function(err) {
                if (err) {
                    throw err;
                } else {
                    res.status(200).json({
                        msg: 'OK - deleted',
                        id: row.id,
                        registrado_em: row.registro_em,
                        situacao: row.situacao,
                        rga: row.rga,
                        nome: row.nome,
                        curso: row.curso,
                        request: {
                            type: 'DELETE',
                            description: 'Delete student information from respective id',
                            url: `https://locahost:3000/alunos/${req.params.id}`,
                        }
                    });
                }
            });
        }
    });
    // database.close();
});

router.post('/:id', (req, res, next) => { //OK
    if (req.params.id !== null || req.params.id !== undefined) {
        res.status(405).json({
            msg: 'Method Not Allowed'
        });
    }
});

// database.close();
module.exports = router;
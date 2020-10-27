const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/', (req, res, next) => {

    //valores default da request
    let limite = req.query.limite ? req.query.limite : 25;
    let pagina = req.query.pagina ? req.query.pagina : 1;

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
                descriptionn: 'Return all students or the ones with the casted nome',
                url: 'https://locahost:3000/alunos'
            },
            data: rows
        });
    });
    database.close();
});



router.post('/', (req, res, next) => {

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
            console.log(this.lastID);
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
                                descriptionn: 'Register student info in body to alunos.db',
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
        database.close();
    });




});

router.put('/', (req, res, next) => {
    res.status(405).json({
        msg: 'Method Not Allowed'
    })
});

router.delete('/', (req, res, next) => {
    res.status(405).json({
        msg: 'Method Not Allowed'
    })
});



router.get('/:id', (req, res, next) => {



    if (req.params.id === undefined) {
        res.status(404).json({
            msg: 'Not Found (student)'
        })
    } else {
        res.status(200).json({
            msg: 'OK'
        })
    }

});
// }
//     res.status(200).json({
//         id: req.params.id

//     });
// });

// router.put('/:id', (req, res, next) => {
// 404 (não encontrado): Uma mensagem informando que o usuário não foi encontrado.
//     res.status(200).json({
//         id: 'unico',
//         registrado_em: 'dia X', //https://www.devmedia.com.br/date-javascript-trabalhando-com-data-e-hora-em-js/37222
//         situacao: 'ativo/inativo',
//         rga: 'obrigatorio/string',
//         nome: 'obrigatorio/string',
//         curso: 'string'
//     })
// });


// router.del('/:id', (req, res, next) => {
// 404 (não encontrado): Uma mensagem informando que o usuário não foi encontrado.
//     res.status(200).json({ 
//         id: 'unico',
//         registrado_em: 'dia X', //https://www.devmedia.com.br/date-javascript-trabalhando-com-data-e-hora-em-js/37222
//         situacao: 'ativo/inativo',
//         rga: 'obrigatorio/string',
//         nome: 'obrigatorio/string',
//         curso: 'string'
//     })
// });



// router.post('/:id', (req, res, next) => {
// - **405 (método não permitido):** Uma mensagem informando o erro.
//     res.status(201).json({
//         id: 'unico',
//         registrado_em: 'dia X', //https://www.devmedia.com.br/date-javascript-trabalhando-com-data-e-hora-em-js/37222
//         situacao: 'ativo/inativo',
//         rga: 'obrigatorio/string',
//         nome: 'obrigatorio/string',
//         curso: 'string'
//     })
// });

module.exports = router;
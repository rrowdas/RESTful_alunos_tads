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
            res.status(400).json({ "Bad Request": err.message });
            return;
        }
        res.status(200).json({
            limite: req.query.limite,
            pagina: req.query.pagina,
            nome: req.query.nome,
            request: {
                type: 'GET',
                descriptionn: 'return all students or the ones with the casted nome',
                url: 'https://locahost:3000/alunos'
            },
            message: 'Success',
            data: rows
        });
    });
    database.close();

    // 400 (parâmetros inválidos): Uma mensagem informando o erro.
});


router.post('/', (req, res, next) => {
    res.status(201).json({
            id: 'unico',
            registrado_em: 'dia X', //https://www.devmedia.com.br/date-javascript-trabalhando-com-data-e-hora-em-js/37222
            situacao: 'ativo/inativo',
            rga: 'obrigatorio/string',
            nome: 'obrigatorio/string',
            curso: 'string'
        })
        // 400 (parâmetros inválidos): Uma mensagem informando o erro.
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



// router.get('/:id', (req, res, next) => {
// if (res.length === 0) {
//     res.status(404).jsonn({
//     msg: 'Not Found (student)'
// });

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
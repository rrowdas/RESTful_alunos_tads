const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        limite: req.query.limite, //25
        pagina: req.query.pagina, //1
        nome: req.query.nome

    });
    // 400 (parâmetros inválidos): Uma mensagem informando o erro.
});


router.post('/', (req, res, next) => {
    res.status(201).send({
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
    res.status(405).send({
        msg: 'Method Not Allowed'
    })
});

router.del('/', (req, res, next) => {
    res.status(405).send({
        msg: 'Method Not Allowed'
    })
});



// router.get('/:id', (req, res, next) => {

// 404 (não encontrado): Uma mensagem informando que o usuário não foi encontrado.
//     res.status(200).send({
//         id: req.params.id

//     });
// });

// router.put('/:id', (req, res, next) => {
// 404 (não encontrado): Uma mensagem informando que o usuário não foi encontrado.
//     res.status(200).send({
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
//     res.status(200).send({ 
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
//     res.status(201).send({
//         id: 'unico',
//         registrado_em: 'dia X', //https://www.devmedia.com.br/date-javascript-trabalhando-com-data-e-hora-em-js/37222
//         situacao: 'ativo/inativo',
//         rga: 'obrigatorio/string',
//         nome: 'obrigatorio/string',
//         curso: 'string'
//     })
// });

module.exports = router;
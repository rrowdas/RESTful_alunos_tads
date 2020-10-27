const express = require('express');
const router = express.Router();

router.get('/:limite/:pagina/:nome', (req, res, next) => {
    res.status(200).send({
        limite: req.params.limite, //25
        pagina: req.params.pagina, //1
        nome: req.params.nome

    });
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
});


module.exports = router;
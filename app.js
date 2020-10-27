const express = require('express');

const app = express();

const rotaAlunos = require('./routes/alunos');


app.use('/alunos', rotaAlunos);



module.exports = app;
const express = require('express');
const app = express();
const morgan = require('morgan');

const rotaAlunos = require('./routes/alunos');

app.use(morgan('dev'));
app.use(express.json());
app.use('/alunos', rotaAlunos);



module.exports = app;
const express = require('express');
const connectDB = require('./config/db');
const app = require('./server');
const usuariosRouter = require('./routes/userRouter');
const noticiasRouter = require('./routes/noticiasRouter');


connectDB();


app.use(express.json());
app.use('/uploads', express.static('uploads')); // Servir arquivos estáticos da pasta uploads

app.use('/usuarios', usuariosRouter);
app.use('/noticias', noticiasRouter);

app.get('/', (req, res) => {
    res.send('API está funcionando');
});
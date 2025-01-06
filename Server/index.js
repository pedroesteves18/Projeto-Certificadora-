const express = require('express');
const connectDB = require('./config/db');
const app = require('./server');
const usuariosRouter = require('./routes/userRouter');
const noticiasRouter = require('./routes/noticiasRouter');
const mockRouter = require('./routes/mockRoutes'); // Importa as rotas mockadas
const path = require('path');

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Servir arquivos estáticos da pasta uploads
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos da pasta public

// Rotas
app.use('/usuarios', usuariosRouter);
app.use('/noticias', noticiasRouter);
app.use('/mock', mockRouter); // Usa as rotas mockadas

// Rota de exemplo
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
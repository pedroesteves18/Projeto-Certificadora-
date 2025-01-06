const express = require('express');
const router = express.Router();
const { usuarios, noticias } = require('../utils/mockData');

// Rota para retornar os dados mockados de usuários
router.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

// Rota para retornar os dados mockados de notícias
router.get('/noticias', (req, res) => {
    res.status(200).json(noticias);
});

module.exports = router;
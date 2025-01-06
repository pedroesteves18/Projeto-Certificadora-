const express = require('express');
const router = express.Router();
const { usuarios, noticias } = require('../utils/mockData');

router.get('/usuarios', async (req, res) => {
    try {
        for (const usuario of usuarios) {
            const novoUsuario = new Usuario(usuario);
            await novoUsuario.save();
        }
        res.status(200).json({ message: 'Usuários mockados salvos no banco de dados' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para salvar os dados mockados de notícias no banco de dados
router.get('/noticias', async (req, res) => {
    try {
        for (const noticia of noticias) {
            const novaNoticia = new Noticia(noticia);
            await novaNoticia.save();
        }
        res.status(200).json({ message: 'Notícias mockadas salvas no banco de dados' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
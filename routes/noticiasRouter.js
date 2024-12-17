const express = require('express');
const router = express.Router();
const upload = require('../uploads/uploads'); 
const Noticia = require('../models/Noticia');
const auth = require('../middleware/authMiddleware');


router.post('/upload', auth, upload.single('imagem'), async (req, res) => {
    try {
        const noticia = new Noticia({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            imagem: req.file.path,
            usuario: req.usuario._id 
        });

        await noticia.save();
        res.status(201).json(noticia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id', auth, upload.single('imagem'), async (req, res) => {
    try {
        const noticia = await Noticia.findOne({ _id: req.params.id, usuario: req.usuario._id });

        if (!noticia) {
            return res.status(404).json({ error: 'Notícia não encontrada ou você não tem permissão para editá-la' });
        }

        noticia.titulo = req.body.titulo || noticia.titulo;
        noticia.conteudo = req.body.conteudo || noticia.conteudo;
        if (req.file) {
            noticia.imagem = req.file.path;
        }

        await noticia.save();
        res.status(200).json(noticia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const noticias = await Noticia.find();
        res.status(200).json(noticias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const noticia = await Noticia.findOneAndDelete({ _id: req.params.id, usuario: req.usuario._id });

        if (!noticia) {
            return res.status(404).json({ error: 'Notícia não encontrada ou você não tem permissão para excluí-la' });
        }

        res.status(200).json({ message: 'Notícia excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/authmiddleware');
const Noticia = require('../models/Noticia');

// Configurar o armazenamento do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', auth, upload.single('imagem'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }
    console.log('Arquivo recebido:', req.file);
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

router.post('/:id/like', auth, async (req, res) => {
  try {
      const noticia = await Noticia.findById(req.params.id);
      if (!noticia) {
          return res.status(404).json({ error: 'Notícia não encontrada' });
      }

      noticia.likes += 1;
      await noticia.save();
      res.status(200).json(noticia);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Rota para avaliar uma notícia
router.post('/:id/avaliar', auth, async (req, res) => {
  try {
      const noticia = await Noticia.findById(req.params.id);
      if (!noticia) {
          return res.status(404).json({ error: 'Notícia não encontrada' });
      }

      const avaliacao = req.body.avaliacao;
      if (avaliacao >= 1 && avaliacao <= 5) {
          noticia.avaliacoes.push(avaliacao);
          await noticia.save();
          res.status(200).json(noticia);
      } else {
          res.status(400).json({ error: 'Avaliação inválida. Por favor, insira um valor entre 1 e 5.' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.post('/:id/dislike', auth, async (req, res) => {
  try {
      const noticia = await Noticia.findById(req.params.id);
      if (!noticia) {
          return res.status(404).json({ error: 'Notícia não encontrada' });
      }

      if (noticia.likes > 0) {
          noticia.likes -= 1;
      }
      await noticia.save();
      res.status(200).json(noticia);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.get('/mock', (req, res) => {
  res.status(200).json(noticias);
});


module.exports = router;
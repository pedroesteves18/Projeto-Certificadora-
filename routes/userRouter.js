const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/User');

router.post('/cadastro', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const usuario = new Usuario({ username, password, email });
        await usuario.save();
        const token = usuario.generateAuthToken();
        res.status(201).json({ usuario, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    console.log(req.body);
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const usuario = await Usuario.findOne({ username });
        if (!usuario) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }
        const token = usuario.generateAuthToken();
        res.status(200).json({ usuario, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
const jwt = require('jsonwebtoken');
const Usuario = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Token não fornecido');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findOne({ _id: decoded._id });

        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Autenticação falhou' });
    }
};

module.exports = auth;
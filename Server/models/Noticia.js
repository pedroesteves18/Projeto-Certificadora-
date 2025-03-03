const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticiaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    avaliacoes: {
        type: [Number],
        default: []
    }
});

const Noticia = mongoose.model('Noticia', NoticiaSchema);

module.exports = Noticia;
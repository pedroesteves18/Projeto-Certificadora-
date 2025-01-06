const usuarios = [
    {
        _id: '1',
        username: 'usuario1',
        email: 'usuario1@example.com',
        password: 'senha123',
        role: 'user'
    },
    {
        _id: '2',
        username: 'admin',
        email: 'admin@example.com',
        password: 'senha123',
        role: 'admin'
    }
];

const noticias = [
    {
        _id: '1',
        titulo: 'Notícia 1',
        conteudo: 'Conteúdo da notícia 1',
        imagem: 'imagem1.jpg',
        usuario: '1',
        likes: 10,
        avaliacoes: [5, 4, 3]
    },
    {
        _id: '2',
        titulo: 'Notícia 2',
        conteudo: 'Conteúdo da notícia 2',
        imagem: 'imagem2.jpg',
        usuario: '2',
        likes: 5,
        avaliacoes: [4, 4, 5]
    }
];

module.exports = { usuarios, noticias };
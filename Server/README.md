# Projeto Certificadora - Server

Este é o servidor do Projeto Certificadora, responsável por gerenciar as rotas e a lógica de negócios da aplicação.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/Igor/Projeto-Certificadora-.git
   cd Projeto-Certificadora-/Server
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```env
   PORT=3001
   MONGODB_URI=SUA URL
   ```

## Executando o servidor

1. Inicie o servidor:

   ```sh
   npm start
   ```

   O servidor estará rodando na porta definida no arquivo `.env` (por padrão, 3001).

## Rotas

### Usuários

- `GET /mock/usuarios`: Salva os usuários mockados no banco de dados.

### Notícias

- `GET /mock/noticias`: Salva as notícias mockadas no banco de dados.
- `POST /noticias/upload`: Faz o upload de uma nova notícia.
- `PUT /noticias/:id`: Atualiza uma notícia existente.
- `GET /noticias/minhas`: Lista as notícias criadas pelo usuário autenticado.
- `GET /noticias`: Lista todas as notícias (somente para administradores).
- `DELETE /noticias/:id`: Exclui uma notícia.
- `POST /noticias/:id/like`: Adiciona um like a uma notícia.
- `POST /noticias/:id/avaliar`: Avalia uma notícia.
- `POST /noticias/:id/dislike`: Remove um like de uma notícia.

## Middleware

- `auth`: Middleware de autenticação para proteger as rotas.

## Modelos

### Usuário

- `username`: Nome de usuário.
- `email`: Email do usuário.
- `password`: Senha do usuário.
- `role`: Papel do usuário (user ou admin).

### Notícia

- `titulo`: Título da notícia.
- `conteudo`: Conteúdo da notícia.
- `imagem`: Caminho da imagem da notícia.
- `usuario`: ID do usuário que criou a notícia.
- `likes`: Número de likes na notícia.
- `avaliacoes`: Avaliações da notícia.

#

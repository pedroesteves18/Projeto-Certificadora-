const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
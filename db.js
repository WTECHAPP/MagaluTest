const mongoose = require('mongoose');

mongoose
    .connect('mongodb://<USUARIO_DB>:<SENHA_DB>@<HOST_DB>:<PORTA_DB>/<NOME_DB>?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(error => console.error('Aqui:', error));

module.exports = mongoose;
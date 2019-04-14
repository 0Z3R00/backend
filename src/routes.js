const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

//criar uma varialvel routes
const routes = express.Router();
// exportando a BoxController dentro da variavel.
const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');
/*
// criando rota para /teste
//(req, res) req= requisição feita pra o servidor, res resposta q sera devolvida para  o cliente sempre com um return na frente.
routes.get('/teste', (req, res) => {
    return res.send('bom dia bora codaaaaa');
})
*/
routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);

routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);
//exportar minha variavel routes
module.exports = routes;
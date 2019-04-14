const express = require('express');
// exportar o mongoose
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
//server ira fazer a aplicação ouvir requisiçoes http e WS
const server = require('http').Server(app);
const io = require('socket.io')(server);

//quando o usuario se conectar o servico Socket ira criar uma "sala" onde ele ficara isolado dos demais usuarios. 
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});
// conectando ao mongodb atlas
mongoose.connect('mongodb+srv://z3r0:z3r0@cluster0-shnhf.gcp.mongodb.net/backend?retryWrites=true', {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
//utilizar quando for cadastra um modulo dentro do express
// .json para q o servidor compreenda as rquisiçoes em formato json
app.use(express.json());
//permitir o envio de arquivos nas requisiçoes
app.use(express.urlencoded({ extended: true }));
//toda vez q o usuario acessar a pasta file ira buscar os arquivos fisicos da pasta tmp. 
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
//importar a variavel routes
app.use(require('./routes'));

//o heroku fica responsavl por definir a porta ou usa a 3333
server.listen(process.env.PORT || 3333);
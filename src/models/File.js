//exportar o mongoose
const mongoose = require('mongoose');
//declarar variavel que ira representar a tabela
const File = new mongoose.Schema({
    //campos q ira ter na tabela.
    title: {
        // item obrigatorio, type: tipo, required true para informar q é obrigatorio
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
    }
},
    {
        // criar os campos data de criação e data de alteração.
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });
// criar um arquivo virtual para q o frontend possa acessar o arquivo
File.virtual('url').get(function () {
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;

})
//exportar a varialvel Box, e passar como parametro as configuraçoes do Schema.
module.exports = mongoose.model('File', File)
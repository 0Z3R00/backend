//exportar o mongoose
const mongoose = require('mongoose');
//declarar variavel que ira representar a tabela
const Box = new mongoose.Schema({
    //campos q ira ter na tabela.
    title: {
        // item obrigatorio, type: tipo, required true para informar q é obrigatorio
        type: String,
        required: true
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }]
}, {
        // criar os campos data de criação e data de alteração.
        timestamps: true
    });

//exportar a varialvel Box, e passar como parametro as configuraçoes do Schema.
module.exports = mongoose.model('Box', Box)
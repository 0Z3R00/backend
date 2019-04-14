const multer = require('multer');
const path = require('path');
const crypto = require('crypto');// gerar conjustos de caracteres unicos
//exportar algumas configuraçoes do multer
module.exports = {
    // destino dos arquivos
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'))
        },
        // abaixo gera um conjunto de caracteres aleatorio antes do nome original do arquivo
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            })

        }
    })
};
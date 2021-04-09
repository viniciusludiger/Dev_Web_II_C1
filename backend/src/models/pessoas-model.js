const mongoose = require('mongoose');

const pessoaSchema = mongoose.Schema({

    nome_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true

    },

    cpf_pessoa: {
        type: mongoose.Schema.Types.Number,
        required: true

    },

    data_nasciemento_pessoa: {
        type: mongoose.Schema.Types.Date,
        required: true

    },

    telefone_pessoa: {
        type: mongoose.Schema.Types.Number,
        required: false

    },

    grupo_prioritario: {
        type: mongoose.Schema.Types.Boolean,
        required: true

    },

    endereco_pessoa: {
        type: mongoose.Schema.Types.String,
        required: false
        
    },

    email_pessoa:{
        
        type: mongoose.Schema.Types.String,
        required: true

    }

});

let Pessoa = module.exports = mongoose.model('pessoa', pessoaSchema)

module.exports.get = function(callback, limit){
    Pessoa.find(callback).limit(limit);
}
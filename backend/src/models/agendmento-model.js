const mongoose = require('mongoose');

const agendamentoSchema = mongoose.Schema({

    data_agendamento: {
        type: mongoose.Schema.Types.Date,
        default: null
    },

    hora_agendamento: {
        type: mongoose.Schema.Types.Number,
        required: true

    },

    necessidade_especial: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    observacao_agendamento:{
        type: mongoose.Schema.Types.String,
        required: false
    }

});

let Agendamento = module.exports = mongoose.model('agendamento', agendamentoSchema);

module.exports.get = function(callback, limit){
    Agendamento.find(callback).limit(limit);
}
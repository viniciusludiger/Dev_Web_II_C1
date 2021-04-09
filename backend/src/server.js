const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express;

const port = 5000;
const hostname = 'localhost';

const pessoasRoutes = require ('./routes/pessoas-routes');
const unidadeRoutes = require ('./routes/unidades-routes');
const agendamentoRoutes = require ('./routes/agendamento-routes');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/pessoas', pessoasRoutes)
app.use('/unidades_de_saude', unidadeRoutes)
app.use('/agendamento', agendamentoRoutes)

mongoose.connect('mongodb://root:faesa123@localhost:27017/apiAgendamento?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true});
const database = mongoose.connection;

database.on('error', console.error.bind(console, 'Erro ao conectar no Mongo'));
database.once('open', function() {
    console.log("Banco de Dados Mongo conectado com sucesso");
});

app.get('/', function(req, res){
    res.json({
        status: "ok",
        message: "Servidor rodando perfeitamente"
    });
});

app.listen(port, hostname, () => {
    console.log(`Servidor rodando no endereço: https://${hostname}:${port}`);
});
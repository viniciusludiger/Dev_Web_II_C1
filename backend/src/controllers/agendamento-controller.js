const agendamentoModel = require ('../models/agendmento-model');

exports.adicionaragendamento = (req,res) => {
    agendamentoModel.find((err, agendamento) =>{

        if(err){
            console.log("Não foi possível recuperar os agendamentos!");
            res.json({
                status:"erro",
                message: "Não foi possível recuperar os agendamentos e portanto inserir um nova agendamento!"
            });
        }


        for (let i = 0; i < agendamento.length; i++){
            if(req.body.cpf_agendamento === agendamento[i].cpf_agendamento){
                res.jeson({
                    status: "erro",
                    message: `data ${req.body.cpf_agendamento} ja está cadastrado`
                });
                return;
            }
            
        }

        let agendamento = new agendamentosModel();
        agendamento.data_agendamento = req.data_agendamento;
            agendamento.hora_agendamento = req.hora_agendamento;
            agendamento.necessidade_especial = req.necessidade_especial;
            agendamento.observacao_agendamento = req.observacao_agendamento;
        agendamento.save((erro) =>{
            if(erro){
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir este agendamento"
                });
            }else{
                res.send({
                    status: "Ok",
                    message: `data ${req.body.data_agendamento} inserida com sucesso`

                });
            }
        });


    });

}

exports.listAragendamento = (req, res) => {
    gendamentoModel.find(function(err,agendamento){
        if(err){
            res.json({
                status:"Erro",
                message: "Não foi possível recuperar os agendamentos!"
            });
        }else{
            res.json({
                status:"Ok",
                message: agendamento
            });
        }
    });

}

exports.listarAgendamentoId = (req, res) => {
    let id_agendamento = req.params.id;

    gendamentoModel.findById(id_agendamento, (erro, agendamento) => {
        if(err || !agendamento){
            res.json({
                status: "Erro",
                message: `Não foi possivel recuperar o agendamento de id: ${id_agendamento}`
            
            });
        }else{
            res.json({
                status: "Erro",
                message: agendamento
            });
        }
    });
}

exports.removeAluno = (req, res) => {
    let id_agendamento = req.params.id;

    gendamentoModel.remove({
        _id:id_agendamento
    }, (err) => {
        if(err){
            res.json({
                status: "Erro",
                message: "Houve um erro ao deletar"
            });
        }else{
            res.json({
                status: "ok",
                message: "agendamento deletado com sucesso !"
            });
        }
    
    });
}

exports.atualizaragendamento = (req, res) => {

    let id_agendamento = req.params.id;

    agendamentoModel.findById(id_agendamento, (erro, agendamento) => {
        if(erro || !agendamento){
            res.json({
                status: "Erro",
                message: `Não foi possível recuperar o agendamento de id ${id_agendamento} para atualização`
            })
        }else{
            agendamento.data_agendamento = req.data_agendamento;
            agendamento.hora_agendamento = req.hora_agendamento;
            agendamento.necessidade_especial = req.necessidade_especial;
            agendamento.observacao_agendamento = req.observacao_agendamento;
            
            agendamento.save((err) =>{
                if(err){
                    res.send({
                        status: "erro",
                        message: "Não foi possível atualizar o agendamento"
                    });
                }else{
                    res.send({
                        status: "Ok",
                        message: `data ${req.body.data_agendamento} atualizar com sucesso`
    
                    });
                }
            });

        }
    });

}
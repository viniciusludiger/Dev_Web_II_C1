const unidadeModel = require('../models/unidades-model');

exports.adicionarUndade = (req,res) => {
    unidadeModel.find((err, unidade) =>{

        if(err){
            console.log("Não foi possível recuperar a unidade!");
            res.json({
                status:"erro",
                message: "Não foi possível recuperar as unidades e portanto inserir uma nova unidade"
            });
        }


        for (let i = 0; i < unidade.length; i++){
            if(req.body.nome_unidade === unidade[i].nome_unidade){
                res.jeson({
                    status: "erro",
                    message: "Ja possui unidade com este nome"
                });
                return;
            }
            
        }

        let unidade = new unidadeModel();
        unidade.nome_unidade = req.nome_unidade;
        unidade.descricao_unidade = req.descricao_unidade;
        unidade.endereco_unidade = req.endereco_unidade;
        unidade.telefone_unidade = req.telefone_unidade;
        unidade.email_unidade = req.email_unidade;
        unidade.latlong_unidade = req.latlong_unidade;
        unidade.save((erro) =>{
            if(erro){
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir esta unidade"
                });
            }else{
                res.send({
                    status: "Ok",
                    message: `unidade ${req.body.nome_unidade} inserida com sucesso`

                });
            }
        });
    });

}

exports.listarUnidade = (req, res) => {
    unidadeModel.find(function(err, unidade){
        if(err){
            res.json({
                status:"Erro",
                message: "Não foi possível recuperar as unidades!"
            });
        }else{
            res.json({
                status:"Ok",
                message: unidade
            });
        }
    });

}

exports.listarUnidadeId = (req, res) => {
    let id_unidade = req.params.id;

    unidadeModel.findById(id_unidade, (erro, unidade) => {
        if(err || !unidade){
            res.json({
                status: "Erro",
                message: `Não foi possivel recuperar a unidade de id: ${id_unidade}`
            
            });
        }else{
            res.json({
                status: "Erro",
                message: unidade
            });
        }
    });
}

exports.removeUnidade = (req, res) => {
    let id_unidade = req.params.id;

    unidadeModel.remove({
        _id:id_unidade
    }, (err) => {
        if(err){
            res.json({
                status: "Erro",
                message: "Houve um erro ao deletar"
            });
        }else{
            res.json({
                status: "ok",
                message: "unidade deletado com sucesso !"
            });
        }
    
    });
}

exports.atualizarUnidade = (req, res) => {

    let id_unidade = req.params.id;

    pessoasModel.findById(id_unidade, (erro, unidade) => {
        if(erro || !unidade){
            res.json({
                status: "Erro",
                message: `Não foi possível recuperar a unidade de id ${id_unidade} para atualização`
            })
        }else{
            unidade.nome_unidade = req.nome_unidade;
            unidade.descricao_unidade = req.descricao_unidade;
            unidade.endereco_unidade = req.endereco_unidade;
            unidade.telefone_unidade = req.telefone_unidade;
            unidade.email_unidade = req.email_unidade;
            unidade.latlong_unidade = req.latlong_unidade;

            unidade.save((err) =>{
                if(err){
                    res.send({
                        status: "erro",
                        message: "Não foi possível atualizar esta pessao"
                    });
                }else{
                    res.send({
                        status: "Ok",
                        message: `unidade ${req.body.nome_unidade} atualizar com sucesso`
    
                    });
                }
            });

        }
    });

}
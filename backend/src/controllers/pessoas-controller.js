const pessoasModel = require('../models/pessoas-model');

exports.adicionarPessoa = (req,res) => {
    pessoasModel.find((err, pessoa) =>{

        if(err){
            console.log("Não foi possível recuperar as pessoas!");
            res.json({
                status:"erro",
                message: "Não foi possível recuperar as pessoas e portanto inserir um nova pessoa!"
            });
        }


        for (let i = 0; i < pessoa.length; i++){
            if(req.body.cpf_pessoa === pessoa[i].cpf_pessoa){
                res.jeson({
                    status: "erro",
                    message: `CPF ${req.body.cpf_pessoa} ja está cadastrado`
                });
                return;
            }
            
        }

        let pessoa = new pessoasModel();
        pessoa.nome_pessoa = req.nome_pessoa;
        pessoa.cpf_pessoa = req.cpf_pessoa;
        pessoa.data_nasciemento_pessoa = req.data_nasciemento_pessoa;
        pessoa.telefone_pessoa = req.telefone_pessoa;
        pessoa.email_pessoa = req.email_pessoa;
        pessoa.grupo_prioritario = req.grupo_prioritario;
        pessoa.endereco_pessoa =req.endereco_pessoa;
        pessoa.save((erro) =>{
            if(erro){
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir esta pessao"
                });
            }else{
                res.send({
                    status: "Ok",
                    message: `pessoa ${req.body.nome_pessoa} inserida com sucesso`

                });
            }
        });


    });

}

exports.listarPessoa = (req, res) => {
    pessoasModel.find(function(err,pessoa){
        if(err){
            res.json({
                status:"Erro",
                message: "Não foi possível recuperar as pessoas!"
            });
        }else{
            res.json({
                status:"Ok",
                message: pessoa
            });
        }
    });

}

exports.listarPessoaId = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.findById(id_pessoa, (erro, pessoa) => {
        if(err || !pessoa){
            res.json({
                status: "Erro",
                message: `Não foi possivel recuperar a pessoa de id: ${id_pessoa}`
            
            });
        }else{
            res.json({
                status: "Erro",
                message: pessoa
            });
        }
    });
}

exports.removeAluno = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.remove({
        _id:id_pessoa
    }, (err) => {
        if(err){
            res.json({
                status: "Erro",
                message: "Houve um erro ao deletar"
            });
        }else{
            res.json({
                status: "ok",
                message: "pessoa deletado com sucesso !"
            });
        }
    
    });
}

exports.atualizarPessoa = (req, res) => {

    let id_pessoa = req.params.id;

    pessoasModel.findById(id_pessoa, (erro, pessoa) => {
        if(erro || !pessoa){
            res.json({
                status: "Erro",
                message: `Não foi possível recuperar a pessoa de id ${id_pessoa} para atualização`
            })
        }else{
            pessoa.nome_pessoa = req.nome_pessoa;
            pessoa.cpf_pessoa = req.cpf_pessoa;
            pessoa.data_nasciemento_pessoa = req.data_nasciemento_pessoa;
            pessoa.telefone_pessoa = req.telefone_pessoa;
            pessoa.email_pessoa = req.email_pessoa;
            pessoa.grupo_prioritario = req.grupo_prioritario;
            pessoa.endereco_pessoa =req.endereco_pessoa;

            pessoa.save((err) =>{
                if(err){
                    res.send({
                        status: "erro",
                        message: "Não foi possível atualizar esta pessao"
                    });
                }else{
                    res.send({
                        status: "Ok",
                        message: `pessoa ${req.body.nome_pessoa} atualizar com sucesso`
    
                    });
                }
            });

        }
    });

}
// Regras de negócios referentes a usuários
const Usuario = require("../models/usuarioModel");
const Response = require("../utils/responses");

class UserController {

    /**
     * @description - cadastra um novo usuario
     */
    async cadastrarUsuario (req, res) {
        try{
            const bData = {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
            };
            
            if (!bData.nome || !bData.email || !bData.senha) {
                return Response.sendInvalidData(res, 'Dados invalidos, todos os dados precisam ser preenchidos');
            };

            if(bData.status !== 'NOVO'){
                return Response.sendInvalidData(res, 'Dados invalidos, status inicial precisa ser NOVO')
            };

            await Usuario.create(bData);
            Response.sendSucess(res, 'Dados cadastrados!');
        } catch(error) {
            Response.sendServerError(res, 'Erro interno no servidor!');
        }
    }
}

module.exports = UserController;
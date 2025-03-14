const express = require('express');
const UserController = require('../controllers/userRoutes');

class UserRoutes {
    constructor() {
        this.router = express.Router();
        this.userRoutes = new UserController();
        this.setupRoutes();
    }

    setupRoutes(){
        this.router.post('/usuarios/cadastro', this.userRoutes.cadastrarUsuario);
        this.router.post('/usuarios/login', this.userRoutes.loginUsuario);
        this.router.post('/usuarios/recuperar-senha', this.userRoutes.recuperarUsuario);
    }

    getRouter(){
        return this.router;
    }
}

module.exports = UserRoutes;
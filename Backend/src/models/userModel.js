const { Model, DataTypes } = require('sequelize');
//const sqConfig = require('../config/sequelize-config');

/**
 * @description - Modelo para criação do objeto Usuario
*/

class Usuario extends Model {
}

Usuario.init( {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    enail: {
        type: DataTypes.STRING,
        allowNull : false
    },
    senha: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Usuario;
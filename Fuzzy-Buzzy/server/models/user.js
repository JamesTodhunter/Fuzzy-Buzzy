const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define("user", {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,

        allowNull: false,

    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
    // admin: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: false,
    //     defaultValue: false
    // }

});

module.exports = User;
const { DataTypes } = require('sequelize');
const db = require('../db');


const Dnd = db.define('dnd', {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },

    index: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(600),
        allowNull: false
    },

});

module.exports = Dnd;
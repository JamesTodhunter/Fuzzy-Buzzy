const { DataTypes } = require('sequelize');
const db = require('../db');

const Comment = db.define('comment', {

    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entry: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

module.exports = Comment;
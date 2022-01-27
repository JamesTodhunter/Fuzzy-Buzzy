const UserModel = require('./user');
const DndModel = require('./dnd')
const CommentModel = require('./comment');

UserModel.hasMany(DndModel);
UserModel.hasOne(CommentModel);

DndModel.belongsTo(UserModel);
DndModel.hasOne(CommentModel);

CommentModel.belongsTo(DndModel);

module.exports = {
    dbConnection: this.dbConnection,
    models: {
        UserModel,
        DndModel,
        CommentModel
    }
};
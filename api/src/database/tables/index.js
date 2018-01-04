const UserModel = require('./user');

let sequelize = {};

function define(schemaName, model) {
    return sequelize.define(schemaName, model)
}

function defineSchemas(sequelizeInstance) {
    sequelize = sequelizeInstance;
    return {
        User: define('user', UserModel)
    }
}


module.exports = defineSchemas;
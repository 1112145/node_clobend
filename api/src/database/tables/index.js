const UserModel = require('./user');

let sequelize = {};

function define(schemaName, model) {
    return sequelize.define(schemaName, model)
}

// Define all tables in database
function defineSchemas(sequelizeInstance) {
    sequelize = sequelizeInstance;
    return {
        User: define('user', UserModel)
    }
}


module.exports = defineSchemas;
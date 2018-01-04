const Sequelize = require('sequelize');

module.exports = {
    userid: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    avatar: Sequelize.STRING,
    email: Sequelize.STRING,
    facebook_id: Sequelize.STRING
}
const Sequelize = require('sequelize');
const tables = require('./tables');

const database = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_ADDRESS;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql'
});

module.exports = {
    conn: sequelize,
    tables: tables(sequelize)
}
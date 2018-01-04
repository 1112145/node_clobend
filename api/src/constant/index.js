module.exports = {
    SALT: Number.parseInt(process.env.SALT),
    USERNAME_FIELD: 'email',
    PASSWORD_FIELD: 'password',
    SECRET_KEY: 'secret_key'
}
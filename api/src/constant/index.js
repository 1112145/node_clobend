module.exports = {
    SALT: Number.parseInt(process.env.SALT),
    USERNAME_FIELD: 'email',
    PASSWORD_FIELD: 'password',
    SECRET_KEY: 'secret_key',
    FB_APP_ID: process.env.FACEBOOK_APP_ID,
    FB_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
    FB_CALLBACK_URL: 'http://localhost:4040/api/auth/facebook/callback'
}
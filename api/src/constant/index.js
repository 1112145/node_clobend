module.exports = {
    SALT: Number.parseInt(process.env.SALT),
    USERNAME_FIELD: 'email',
    PASSWORD_FIELD: 'password',
    SECRET_KEY: 'secret_key',
    FB_APP_ID: process.env.FACEBOOK_APP_ID,
    FB_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
    FB_CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,
    GG_APP_ID: process.env.GOOGLE_CLIENT_ID,
    GG_APP_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GG_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
}
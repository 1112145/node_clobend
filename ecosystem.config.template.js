module.exports = {

  apps: [{
    name: 'API',
    script: 'api/server.js',
    watch: true,
    env: {
      PORT: 'APP_PORT',
      DATABASE_ADDRESS: 'DATABASE_ADDRESS',
      DATABASE_NAME: 'DATABASE_NAME',
      DATABASE_USER: 'DATABASE_USER',
      DATABASE_PASSWORD: 'DATABASE_PASSWORD',
      SALT: 'SALT_NUMBER',
      FACEBOOK_APP_ID: 'FACEBOOK_APP_ID',
      FACEBOOK_APP_SECRET: 'FACEBOOK_APP_SECRET',
      FACEBOOK_CALLBACK_URL: 'FACEBOOK_CALLBACK_URL',
      GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
      GOOGLE_CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET',
      GOOGLE_CALLBACK_URL: 'GOOGLE_CALLBACK_URL'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
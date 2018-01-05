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
      SALT: 'SALT_NUMBER'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
module.exports = {
  apps : [
    {
      name      : 'NODECLOBEN_API',
      script    : 'api/server.js',
      watch: true,
      env: {
        DATABASE_ADDRESS: 'us-cdbr-iron-east-05.cleardb.net',
        DATABASE_NAME: 'heroku_9fa687cf85aeae2',
        DATABASE_USER: 'b05a91b9342c38',
        DATABASE_PASSWORD: 'd4526772fd814fc',
        FACEBOOK_APP_ID: '141852669858737',
        FACEBOOK_APP_SECRET: '4f1dec7f1346f2ca19749bc5a6820e1a',
        SALT: 10
      },
      env_production : {
        NODE_ENV: 'production',
        DATABASE_ADDRESS: 'us-cdbr-iron-east-05.cleardb.net',
        DATABASE_NAME: 'heroku_9fa687cf85aeae2',
        DATABASE_USER: 'b05a91b9342c38',
        DATABASE_PASSWORD: 'd4526772fd814fc',
        SALT: 10
      }
    }
  ]
};

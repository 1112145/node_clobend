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
        FACEBOOK_CALLBACK_URL: 'https://node-clobend.herokuapp.com/api/auth/facebook/callback',
        GOOGLE_CLIENT_ID: '283825082336-ei4kro2cjreh422cs90kih65s3adki73.apps.googleusercontent.com',
        GOOGLE_CLIENT_SECRET: 'ESjw0Gd82pGA4dL1MZZFL67Y',
        GOOGLE_CALLBACK_URL: 'https://node-clobend.herokuapp.com/api/auth/google/callback',
        SALT: 10
      },
      env_production : {
        NODE_ENV: 'production',
        DATABASE_ADDRESS: 'us-cdbr-iron-east-05.cleardb.net',
        DATABASE_NAME: 'heroku_9fa687cf85aeae2',
        DATABASE_USER: 'b05a91b9342c38',
        DATABASE_PASSWORD: 'd4526772fd814fc',
        GOOGLE_CLIENT_ID: '283825082336-ei4kro2cjreh422cs90kih65s3adki73.apps.googleusercontent.com',
        GOOGLE_CLIENT_SECRET: 'ESjw0Gd82pGA4dL1MZZFL67Y',
        GOOGLE_CALLBACK_URL: 'https://node-clobend.herokuapp.com/api/auth/google/callback',
        SALT: 10
      }
    }
  ]
};

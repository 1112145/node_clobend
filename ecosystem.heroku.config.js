module.exports = {
  apps : [
    {
      name      : 'NODECLOBEN_API',
      script    : 'api/server.js',
      watch: true,
      env: {
        PORT: 4040,
        DATABASE_ADDRESS: 'us-cdbr-iron-east-05.cleardb.net',
        DATABASE_NAME: 'heroku_9fa687cf85aeae2',
        DATABASE_USER: 'b05a91b9342c38',
        DATABASE_PASSWORD: 'd4526772fd814fc',
        SALT: 10
      },
      env_production : {
        NODE_ENV: 'production',
        PORT: 4040,
        DATABASE_ADDRESS: 'us-cdbr-iron-east-05.cleardb.net',
        DATABASE_NAME: 'heroku_9fa687cf85aeae2',
        DATABASE_USER: 'b05a91b9342c38',
        DATABASE_PASSWORD: 'd4526772fd814fc',
        SALT: 10
      }
    }
  ],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};

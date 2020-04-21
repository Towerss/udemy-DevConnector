module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps : [
      {
        name      : 'devConnector',
        script    : 'npm',
        args      : 'run start:production',
        env: {
          NODE_ENV: "development",
          },
        env_production : {
          NODE_ENV: 'production'
        }
      },
    ],
  
    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy : {
      production : {},
      staging: {
        user: 'Towerss',
        host: 'http://54.144.39.187',
        ref: 'origin/master',
        repo: 'git@github.com:Towerss/udemy-IndecisionApp.git',
        path: '/home/ubuntu/udemy-DevConnector',
        key: '/absolute/path/to/key',
        ssh_options: ['ForwardAgent=yes'],
        'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
      },
      dev : {}
    }
  };
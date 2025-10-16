/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --only prod
 *  development mode :: pm2 start ecosystem.config.js --only dev
 */
// eslint-disable-next-line no-undef

// eslint-disable-next-line no-undef
const dotenv = require('dotenv')
const path = require('path')
const process = require('process')
dotenv.config({ path: path.resolve(process.cwd(), '.env.prod') })

module.exports = {
  apps: [
    {
      name: 'prod', // pm2 start App name
      script: 'dist/app.js',
      exec_mode: 'cluster', // 'cluster' or 'fork'
      instance_var: 'INSTANCE_ID', // instance variable
      instances: 2, // pm2 instance count
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      max_memory_restart: '1G', // restart if process use more than 1G memory
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: `./logs/access/access-${ new Date().toISOString().split('T')[ 0 ] }.log`, 
      error: `./logs/error/error-${ new Date().toISOString().split('T')[ 0 ] }.log`, 
      env: {
        PORT: process.env.PORT,
        ENVIRONMENT: process.env.ENVIRONMENT,
        MONGO_URL: process.env.MONGO_URL,
        MONGO_DB_POSITION: process.env.MONGO_DB_POSITION,
        MONGO_DB_NAME: process.env.MONGO_DB_NAME,
        JWT_SECRET: process.env.JWT_SECRET,
        AUTH_TOKEN: process.env.AUTH_TOKEN,
        EMAIL_SERVICE_USER: process.env.EMAIL_SERVICE_USER,
        EMAIL_SERVICE_PASS: process.env.EMAIL_SERVICE_PASS,
      },
    },
  ],
  deploy: {
    production: {
      user: 'user',
      host: '0.0.0.0',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: 'dist/server.js',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --only prod',
    },
  },
}

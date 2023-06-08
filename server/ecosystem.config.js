// https://stackoverflow.com/questions/73181613/correct-command-for-running-node-js-project-with-pm2-in-applicationstart-hook
module.exports = {
  apps: [
    {
      name: 'server',
      script: 'node_modules/pm2/bin/pm2-runtime dist/index.js',
      append_env_to_name: true,
      watch: '.',
      env: {
        NODE_ENV: 'development',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  console.log('env', env);
  const envPath = env.ENVIRONMENT ? `.env.${env.ENVIRONMENT}` : '.env';

  const config = {
    entry: './public/content.js',
    output: {
      filename: 'content.bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
      plugins: [
        new Dotenv({
              safe: false,
              path: envPath
          })
      ]
  };

  return config;
}
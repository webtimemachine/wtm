const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');


module.exports = (env, argv) => {
  const envPath = env.ENVIRONMENT ? `.env.${env.ENVIRONMENT}` : '.env';
  
  console.log('[WEBPACK]', env.ENVIRONMENT, envPath);
  
  const config = {
    entry: './public/content.js',
    output: {
      filename: 'content.bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.ENVIRONMENT),
        },
      }),
        new Dotenv({
              safe: false,
              path: "./" + envPath
          })
      ]
  };

  return config;
}
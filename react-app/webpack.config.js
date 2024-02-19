const path = require('path');
const dotenv = require('dotenv')
const webpack = require('webpack');

module.exports = (env, argv) => {
  const envPath = env.ENVIRONMENT ? `.env.${env.ENVIRONMENT}` : '.env';
  
  console.log('[WEBPACK]', env.ENVIRONMENT, envPath);

  dotenv.config({ path: envPath }); 
  
  const config = {
    entry: './public/content.js',
    output: {
      filename: 'content.bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)})
      ]
  };

  return config;
}
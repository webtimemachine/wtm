const path = require('path');
const dotenv = require('dotenv')
const webpack = require('webpack');
const fs = require('fs');

module.exports = (env, argv) => {
  const envPath = env.ENVIRONMENT ? `.env.${env.ENVIRONMENT}` : '.env';
  
  // console.log('[WEBPACK]', env.ENVIRONMENT, envPath);

  // Load .env file if it exists, otherwise load from process.env
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  } else {
    dotenv.config();
  }
  
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
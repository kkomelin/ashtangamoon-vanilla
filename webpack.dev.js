const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const distDir = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: distDir,
    },
    compress: true,
    port: 9000
  }
});

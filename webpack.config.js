const path = require('path');

const distDir = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: distDir,
  },
  devServer: {
    contentBase: distDir,
    compress: true,
    port: 9000
  }
};

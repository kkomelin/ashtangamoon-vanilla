const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const distDir = path.resolve(__dirname, 'dist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true
    }),
    new HtmlWebpackPlugin({
      title: 'Moon Peaks',
      template: 'template.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: distDir,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              // reloadAll: true,
            },
          },
          'css-loader',
        ]
      },
    ],
  }
};

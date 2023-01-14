const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const distDir = path.resolve(__dirname, 'dist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevEnv = process.env.NODE_ENV === "development";

const plugins = [
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
    chunkFilename: "[id].[contenthash].css",
  }),
  new CleanWebpackPlugin({
    dry: isDevEnv,
  }),
  new HtmlWebpackPlugin({
    title: "Moon Peaks",
    template: "template.html",
  }),
  new CopyPlugin({
    patterns: [
      { from: "src/img/apple-touch-icon.png" },
      { from: "src/img/favicon.ico" },
      { from: "src/img/favicon-16x16.png" },
      { from: "src/img/favicon-32x32.png" },
    ],
    options: {
      concurrency: 100,
    },
  }),
];

if (isDevEnv) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  plugins,
  output: {
    filename: "[name].bundle.js",
    path: distDir,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};

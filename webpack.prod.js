const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { GenerateSW } = require('workbox-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin()],
  },
  plugins: [
    new GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    }),
    new WebpackPwaManifest({
      name: 'Ashtanga Moon - Track new and full moon days',
      short_name: 'Ashtanga Moon',
      description:
        'Displays next full and new moon dates and visualizes current moon phase',
      background_color: '#193d61',
      theme_color: '#193d61',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('src/img/large-icon.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        },
        {
          src: path.resolve('src/img/large-icon.png'),
          size: '1024x1024', // you can also use the specifications pattern
        },
        // {
        //   src: path.resolve('src/assets/maskable-icon.png'),
        //   size: '1024x1024',
        //   purpose: 'maskable'
        // }
      ],
    }),
  ],
})

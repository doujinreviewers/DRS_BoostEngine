const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/app/index.js',
  output: {
    path: path.resolve(__dirname, 'src/plugin/assets'),
    filename: 'DRS_BoostEngine.prebundleapp',
    publicPath: '',
  },
  resolve: {
    extensions: [
      '.js',
      '.vue',
      '.json',
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.prebundleapp/,
        type: 'asset',
        parser: {
          dataUrlCondition: (source, { filename, module }) => {
            return true;
          },
        },
        generator: {
          dataUrl: (content) => {
            return content.toString();
          },
        },
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$|\.prebundleapp/i,
        extractComments: false,
      }),
    ],
  },
}
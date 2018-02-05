const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'gh-pages'),
  entry: `${__dirname}/src/index.jsx`,
  output: {
    path: `${__dirname}/gh-pages`,
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
    ]
  },
  devtool: '#source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: 'gh-pages'
  },
  /*plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],*/
  resolve: {
    extensions: ['.jsx', '.js', ".json"]
  }
};

const path = require('path');
const webpack = require('webpack');

const PROD = JSON.stringify(process.env.NODE_ENV === "production");

module.exports = {
  context: path.resolve(__dirname, 'gh-pages'),
  entry: [
    'react-hot-loader/patch', // これを追加
    `${__dirname}/src/index.jsx`
  ],
  output: {
    path: `${__dirname}/gh-pages`,
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          "react-hot-loader/webpack",
          {
            loader: "babel-loader",
            query: {
              presets: ['env', 'react']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
    ]
  },
  devtool: '#source-map',
  devServer: {
    contentBase: 'gh-pages',
    inline: true,
    hot: true
  },
  plugins: PROD ? [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ] : [],
  resolve: {
    extensions: ['.jsx', '.js', ".json"]
  }
};

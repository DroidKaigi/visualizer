const path = require('path');
const webpack = require('webpack');

module.exports = (_, argv) => {
  console.log(`mode: ${argv.mode}`);
  const PROD = argv.mode === "production";
  return {
    context: path.resolve(__dirname, 'public'),
    entry: [
      // Required to support async/await
      '@babel/polyfill',
      'react-hot-loader/patch',
      `${__dirname}/src/index.jsx`
    ],
    output: {
      path: `${__dirname}/public`,
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
                presets: ['@babel/preset-env', '@babel/preset-react']
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
      contentBase: 'public',
      inline: true,
      hot: true
    },
    plugins: PROD ? [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
        DEBUG: false
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : [],
    resolve: {
      extensions: ['.jsx', '.js', ".json"]
    },
    performance: {
      // 初期ロード時間は重視しないのでバンドルサイズの警告は実質無効化しておく
      maxEntrypointSize: Number.MAX_SAFE_INTEGER,
      maxAssetSize: Number.MAX_SAFE_INTEGER,
    }
  };
}

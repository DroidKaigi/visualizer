const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = (_, argv) => {
  console.log(`mode: ${argv.mode}`);
  const PROD = argv.mode === "production";
  return {
    context: path.resolve(__dirname),
    entry: [
      // Required to support async/await
      '@babel/polyfill',
      'react-hot-loader/patch',
      `${__dirname}/src/index.tsx`
    ],
    output: {
      path: `${__dirname}/public`,
      filename: "app.js"
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: [
            "react-hot-loader/webpack",
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-typescript',
                  '@babel/preset-react'
                ],
                plugins: [
                  'react-hot-loader/babel',
                ]
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
    plugins:
      PROD ? [
        new ForkTsCheckerWebpackPlugin(),
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'production',
          DEBUG: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
      ]
      /*DEV*/ : [
          new ForkTsCheckerWebpackPlugin(),
        ],
    resolve: {
      extensions: ['.jsx', '.js', '.tsx', '.ts', ".json"]
    },
    performance: {
      // 初期ロード時間は重視しないのでバンドルサイズの警告は実質無効化しておく
      maxEntrypointSize: Number.MAX_SAFE_INTEGER,
      maxAssetSize: Number.MAX_SAFE_INTEGER,
    }
  };
}

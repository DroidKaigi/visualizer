const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const config = require("./webpack.config.js");
const compiler = webpack(config);

let server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  hot: true
});
server.listen(8000);

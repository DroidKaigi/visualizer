/**
 * `npm run build-relase` などでpublicフォルダに書き出した成果物をローカルで確認するためのスクリプト。
 * 事前に `npm run build-relase` を実行してから `npm run start` でこのスクリプトを実行すること。
 */

var liveServer = require("live-server");

liveServer.start({
  wait: 1000,
  root: "./gh-pages"
});

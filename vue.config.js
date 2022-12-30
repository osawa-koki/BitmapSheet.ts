const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  outputDir: "./dist", // ファイルの出力先ルート
  publicPath: "./", // index.html などの出力されるファイルに書き込まれる、ルートとなるディレクトリ
  transpileDependencies: true,
});

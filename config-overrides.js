const { join } = require('path');
const { webpackOveride, devServerConfig } = require('./webpack/config');

module.exports = {
  webpack: webpackOveride,
  devServer: devServerConfig,
  paths: function (paths, env) {
    // 配置打包后的文件位置
    const dir = process.env.BUILD_PATH || 'dist';
    paths.appBuild = join(__dirname, dir);
    return paths;
  },
};

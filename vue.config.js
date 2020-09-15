/**
 * Created on Tang 2018/2/14.
 */
// vue.config.js
const path = require("path");
const resolve = (dir) => path.join(__dirname, dir); // 路径
module.exports = {
  runtimeCompiler: true,
  // 部署应用包时的基本 URL  Default: '/'
  publicPath: "./",
  // (build)放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录  Default: ''
  assetsDir: "assets",
  // 默认在生成的静态资源文件名中包含hash以控制缓存，如果你无法使用 Vue CLI 生成的 index HTML时候可以设为false
  filenameHashing: true,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 的选项配置
  devServer: {
    host: "0.0.0.0",
    port: 9090,
    hot: true, // 开启热更新
    hotOnly: false,
    overlay: true, // 开启报错提示显示在浏览器遮罩层
    https: false, // 是否开启https模式
    /* 请求代理服务器
    proxy: {
      '/mapi': {
        target: 'http://10.101.80.187:8080',
        pathRewrite: { // 在发出请求后将/api替换为''空值，这样不影响接口请求
          '^/mapi': ''
        },
        changeOrigin: true
      }
    }
    */
  },
  // 简单配置,这个配置内容将会在最后的时候使用webpack-merge合并到最终配置中 (配置插件plugins)
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      const plugins = [];
      // 为生产环境修改配置...
      plugins.push();
      config.plugins = [...config.plugins, ...plugins];
    } else {
      // 为开发环境修改配置...
    }
  },
  // 配置相关loader，支持修改，添加和替换相关的loader
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias.set("src", resolve("src"));
  },
};

'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const produceName = 'vss_h5'
const produceNameSuffix = '_static'

// const target = 'http://fe2.rongyi.com:8088';
const targetShare = 'https://api.driversite.cn'
// const target = 'http://manage.preview.rongyi.com';

module.exports = {
  produceName,
  produceNameSuffix,
  moduleRootPath: './src/module', // 模块根目录(这个可以根据自己的需求命名)
  moduleRootName: 'module',
  currentModule: 'driversOil', // 指定默认编译模块（仅本地开发环境使用，其他环境发布时需要指定模块，否则会编译全部模块，影响效率）
  dev: {

    // Paths
    assetsSubDirectory: `${produceName}${produceNameSuffix}`,
    assetsPublicPath: '/',
    proxyTable: {
      '^/share': {
        targetShare,
        changeOrigin: 'true',
      },
    },

    // Various Dev Server settings
    host: '127.0.0.1', // can be overwritten by process.env.HOST
    // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    port: 8092,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../output/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../output'),
    assetsSubDirectory: `${produceName}${produceNameSuffix}`,
    assetsPublicPath: '/',
    assetsStorage: path.resolve(__dirname, '../dist'),

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
}

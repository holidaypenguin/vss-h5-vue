'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const multipageHelper = require('../build/multipage-helper')

const moduleName = Object.keys(multipageHelper.getEntries())[0]

const getPublicPath = () => {
  switch (moduleName) {
    case 'driversCoin':
    case 'driversOil':
      return '"http://test-static.driversite.cn/"'
    default:
      return '"/"'
  }
}

// process.env.RUN_ENV
module.exports = merge(prodEnv, {
  publicPath: getPublicPath(),
  oilPay: '"https://test-open.czb365.com"',
})

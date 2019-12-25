'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const getPublicPath = () => {
  switch (process.env.RUN_ENV) {
    case 'driversCoin':
    case 'driversOil':
      return '"http://test-static.driversite.cn"'
    default:
      return '"/"'
  }
}

// process.env.RUN_ENV
module.exports = merge(prodEnv, {
  publicPath: getPublicPath(),
  oilPay: '"https://test-open.czb365.com"',
})

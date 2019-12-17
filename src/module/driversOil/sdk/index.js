/* eslint-disable no-console */
import * as Default from './default'
import * as IOS from './ios'
import * as Android from './android'

import Cookie from '../../../public/utils/cookie'

const OS = Cookie.getItem('OS')

console.log('-----------')
console.log('当前系统：', OS)
console.log('-----------')

const current = (() => {
  switch (OS) {
    case 'iOS':
      return IOS
    case 'Android':
      return Android
    default:
      return Default
  }
})()

export default current

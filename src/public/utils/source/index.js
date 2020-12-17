/**
 * 来源
 *
 * @Author: songshipeng
 * @Date: 2019-10-12 14:24:59
 * @Email: songshipeng@rongyi.com
 * @Last Modified by: songshipeng
 * @Last Modified time: 2020-12-17 16:24:17
 */

export const SOURCE_WECHAT = 0
export const SOURCE_ALIPAY = 1

let source = -1

export const getSource = function getSource () {
  const agent = navigator.userAgent.toLocaleLowerCase()
  if (agent.indexOf('micromessenger') > 0) {
    source = SOURCE_WECHAT
  } else if (agent.indexOf('alipayclient') > 0) {
    source = SOURCE_ALIPAY
  } else {
    source = SOURCE_ALIPAY
  }

  return source
}

getSource()

export const getSourceName = function getSourceName () {
  switch (source) {
    case SOURCE_WECHAT:
      return '微信'
    case SOURCE_ALIPAY:
      return '支付宝'
    default:
      return ''
  }
}

export const isWechatSource = function () {
  return source === SOURCE_WECHAT
}

export const isAliSource = function () {
  return source === SOURCE_ALIPAY
}

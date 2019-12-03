/* eslint-disable no-console */
/* eslint-disable quotes */
import Q from './q'

let messageHandlers

const getMessageHandlers = function getMessageHandlers () {
  if (messageHandlers) {
    return messageHandlers
  }

  messageHandlers = window && window.webkit && window.webkit.messageHandlers

  if (!messageHandlers) {
    throw new Error('获取 window.webkit.messageHandlers 失败')
  }

  return messageHandlers
}

// getMessageHandlers()

let getLoginMsgDefer
let toLoginDefer
let positionDefer

// 获取登录状态
export const getLoginMsg = () => {
  console.log('获取登录状态~~start')

  const defer = Q.defer()

  getLoginMsgDefer = defer

  try {
    getMessageHandlers().getLoginMsg.postMessage({})
  } catch (error) {
    defer.reject(error)
  }

  return defer.promise
}
export const getLoginMsgResponse = (data) => {
  console.log('获取登录状态~~return', data)

  if (!getLoginMsgDefer) return

  getLoginMsgDefer.resolve(data)

  getLoginMsgDefer = undefined
}

// 中途登录、中途登录后返回状态
export const toLogin = () => {
  console.log('中途登录~~start')

  const defer = Q.defer()

  toLoginDefer = defer
  try {
    getMessageHandlers().toLogin.postMessage({})
  } catch (error) {
    defer.reject(error)
  }

  return defer.promise
}
export const toLoginResponse = (data) => {
  console.log('中途登录~~return', data)

  if (!toLoginDefer) return

  toLoginDefer.resolve(data)

  toLoginDefer = undefined
}
// 导航
export const navigation = (data = {}) => {
  console.log('导航~~start')

  return new Promise((resolve, reject) => {
    try {
      getMessageHandlers()
        .navigation.postMessage(data)
    } catch (error) {
      reject(error)
    }
  })
}
// 定位信息
export const position = () => {
  console.log('定位信息~~~start')
  const defer = Q.defer()

  positionDefer = defer

  try {
    getMessageHandlers().position.postMessage({})
  } catch (e) {
    defer.reject(e)
  }

  return defer.promise
}
export const positionResponse = (lat, lng) => {
  console.log('定位信息~~~return', lat, lng)
  if (!positionDefer) return

  positionDefer.resolve({lat, lng})

  positionDefer = undefined
}
// 打开新页面
export const openWindows = () => {
  console.log('打开新页面~~start')

  return new Promise((resolve, reject) => {
    try {
      getMessageHandlers()
        .openWindows.postMessage({
          result (data) {
            if (data.code === 0) {
              resolve(data)
            } else {
              reject(data)
            }
          },
        })
    } catch (error) {
      reject(error)
    }
  })
}
// 显示当前页面
// 隐藏当前页面

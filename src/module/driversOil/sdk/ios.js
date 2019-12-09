/* eslint-disable no-console */
/* eslint-disable quotes */
import Q from './q'

import Cookie from '../../../public/utils/cookie'

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

let toLoginDefer
let toBindDefer
let positionDefer

// 获取登录token
export const getLoginToken = () => {
  console.log('获取登录token~~start')

  return new Promise((resolve, reject) => {
    try {
      const token = Cookie.getItem('token')

      if (token) {
        resolve(token)
      } else {
        resolve('')
      }
    } catch (error) {
      resolve('')
    }
  })
}

// 中途登录、中途登录后返回状态
export const toLogin = () => {
  console.log('中途登录~~start')

  const defer = Q.defer()

  toLoginDefer = defer
  try {
    getMessageHandlers().toLogin.postMessage({})
  } catch (error) {
    // alert(`调用中途登录失败~~${JSON.stringify(error)}`)
    defer.reject(error)
  }

  return defer.promise
}
export const toLoginResponse = (data) => {
  // alert(`中途登录~~return~~${JSON.stringify(data)}`)
  console.log('中途登录~~return', data)

  if (!toLoginDefer) return

  toLoginDefer.resolve(data)

  toLoginDefer = undefined
}
// 绑定手机号、绑定手机号后返回状态
export const toBind = () => {
  console.log('绑定手机号~~start')

  const defer = Q.defer()

  toBindDefer = defer
  try {
    getMessageHandlers().toBind.postMessage({})
  } catch (error) {
    // alert(`调用绑定手机号失败~~${JSON.stringify(error)}`)
    defer.reject(error)
  }

  return defer.promise
}
export const toBindResponse = (data) => {
  // alert(`绑定手机号~~return~~${JSON.stringify(data)}`)
  console.log('绑定手机号~~return', data)

  if (!toBindDefer) return

  toBindDefer.resolve(data)

  toBindDefer = undefined
}
// 导航
export const navigation = (latitude, longitude) => {
  console.log('导航~~start')
  // alert(`导航信息：${latitude}-----${longitude}`)

  return new Promise((resolve, reject) => {
    try {
      getMessageHandlers()
        .navigation.postMessage({
          latitude,
          longitude,
        })
      resolve()
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
export const openWindows = (path) => {
  console.log('打开新页面~~start')

  return new Promise((resolve, reject) => {
    try {
      getMessageHandlers()
        .openWindows.postMessage(`${location.origin}/vss_h5/module/driversOil/${path}`)
    } catch (error) {
      reject(error)
    }
  })
}
// 返回上一页面
export const nativeBack = () => {
  return new Promise((resolve, reject) => {
    try {
      getMessageHandlers().nativeBack.postMessage()
      resolve()
    } catch (error) {
      alert(`&&${window.webkit.messageHandlers}++${
        Object.keys(window.webkit.messageHandlers)}--调用返回上一页面失败~~${
        JSON.stringify(error.message)}`)
      reject(error)
    }
  })
}
// 显示当前页面
// 隐藏当前页面

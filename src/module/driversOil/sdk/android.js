/* eslint-disable no-undef */
import Q from './q'

const injectedObject = window.injectedObject

const map = new AMap.Map('container', {
  resizeEnable: true,
  zoom: 10,
  center: [116.43, 39.9],
})
let geo
AMap.plugin(
  ['AMap.Geolocation'],
  function () {
    geo = new AMap.Geolocation({
      useNative: true,
    })
    geo.on('complete', function (e) {
      alert(`定位成功：${JSON.stringify(e)}`)
      positionDefer.resolve(e)
    })
    geo.on('fail', function (e) {
      alert(`定位失败：${JSON.stringify(e)}`)
      positionDefer.reject(e)
    })
    map.addControl(geo)
  },
)
let toLoginDefer
let positionDefer

// 获取登录状态
export const getLoginMsg = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(injectedObject.getLoginMsg())
    } catch (error) {
      reject(error)
    }
  })
}
// 中途登录、中途登录后返回状态
export const toLogin = () => {
  const defer = Q.defer()

  toLoginDefer = defer
  try {
    injectedObject.toLogin({})
  } catch (error) {
    defer.reject(error)
  }

  return defer.promise
}

export const toLoginResponse = (data) => {
  if (!toLoginDefer) return

  toLoginDefer.resolve(data)

  toLoginDefer = undefined
}

// 导航
export const navigation = (x, y) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(injectedObject.navigation(x, y))
    } catch (error) {
      reject(error)
    }
  })
}
// 定位信息
export const position = () => {
  const defer = Q.defer()
  positionDefer = defer

  geo.getCurrentPosition()

  return defer.promise
}
export const positionResponse = (data) => {
  // console.log('定位信息~~~return', data)
}

// 打开新页面
export const openWindows = (url) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(injectedObject.openWindows(url))
    } catch (error) {
      reject(error)
    }
  })
}
// 显示当前页面
// 隐藏当前页面

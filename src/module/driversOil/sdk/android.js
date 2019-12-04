/* eslint-disable no-undef */
import Q from './q'

const injectedObject = window.injectedObject

let geo
const getGeo = function getGeo () {
  if (geo) return geo

  const map = new AMap.Map('container', {
    resizeEnable: true,
    zoom: 10,
    center: [116.43, 39.9],
  })

  AMap.plugin(
    ['AMap.Geolocation'],
    function () {
      geo = new AMap.Geolocation({
        useNative: true,
      })
      geo.on('complete', function (e) {
        alert(`定位成功：${JSON.stringify(e)}`)
        positionDefer && positionDefer.resolve(e)
      })
      geo.on('fail', function (e) {
        alert(`定位失败：${JSON.stringify(e)}`)
        positionDefer && positionDefer.reject(e)
      })
      map.addControl(geo)
    },
  )

  return geo
}

let toLoginDefer
let positionDefer

// 获取登录token
export const getLoginToken = () => {
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

  getGeo().getCurrentPosition()

  return defer.promise
}
export const positionResponse = (data) => {
  // console.log('定位信息~~~return', data)
}

// 打开新页面
export const openWindows = (path) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(injectedObject.openWindows(
        `${location.origin}/vss_h5/module/driversOil/${path}`
      ))
    } catch (error) {
      reject(error)
    }
  })
}
// 显示当前页面
// 隐藏当前页面

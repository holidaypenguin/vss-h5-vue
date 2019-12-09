/* eslint-disable no-console */
/* eslint-disable no-undef */
import Q from './q'
import Cookie from '../../../public/utils/cookie'

let android

const getAndroid = function getAndroid () {
  if (android) {
    return android
  }

  android = window.android

  if (!android) {
    throw new Error('获取 window.android 失败')
  }

  return android
}

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
        console.log('定位信息~~success', JSON.stringify(e.position))
        // alert(`定位成功：${JSON.stringify(e.position)}`)
        positionDefer && positionDefer.resolve(e.position)
      })
      geo.on('fail', function (e) {
        console.log('定位信息~~error', JSON.stringify(e))
        // alert(`定位失败：${JSON.stringify(e)}`)
        positionDefer && positionDefer.reject(e)
      })
      map.addControl(geo)
    },
  )

  return geo
}

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
        console.log('获取登录token~~success', token)
        resolve(token)
      } else {
        console.log('获取登录token~~error')
        resolve('')
      }
    } catch (error) {
      console.log('获取登录token~~error', error)
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
    // alert(Object.keys(getAndroid()))
    getAndroid().toLogin()
  } catch (error) {
    // alert(`调用中途登录失败~~${JSON.stringify(error.message)}`)
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
    // alert(Object.keys(getAndroid()))
    getAndroid().toBind()
  } catch (error) {
    // alert(`${Object.keys(getAndroid())}--调用绑定手机号失败~~${JSON.stringify(error.message)}`)
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
export const navigation = (x, y) => {
  console.log('导航~~start', x, y)

  return new Promise((resolve, reject) => {
    try {
      resolve(getAndroid().navigation(x, y))
    } catch (error) {
      reject(error)
    }
  })
}
// 定位信息
export const position = () => {
  console.log('定位信息~~start')

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
  console.log('打开新页面~~start', path)

  return new Promise((resolve, reject) => {
    try {
      resolve(getAndroid().openWindows(
        `${location.origin}/vss_h5/module/driversOil/${path}`
      ))
    } catch (error) {
      reject(error)
    }
  })
}
// 返回上一页面
export const nativeBack = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(getAndroid().nativeBack())
    } catch (error) {
      // alert(`${Object.keys(getAndroid())}--调用返回上一页面失败~~${JSON.stringify(error.message)}`)
      reject(error)
    }
  })
}
// 显示当前页面
// 隐藏当前页面

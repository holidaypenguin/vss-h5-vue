/* eslint-disable no-console */

import Cookie from '../../../public/utils/cookie'

// 获取登录token
export const getLoginParam = () => {
  console.log('获取登录token~~start')

  return new Promise((resolve, reject) => {
    resolve('045b558d06ac4621c663a63c01d335a4')
    // resolve()
  })
}
// 中途登录、中途登录后返回状态
export const toLogin = () => {
  console.log('中途登录~~start')

  return new Promise((resolve, reject) => {
    resolve('045b558d06ac4621c663a63c01d335a4')
    // resolve()
  })
}
// 绑定手机号
export const toBind = () => {
  console.log('绑定手机号~~start')

  return new Promise((resolve, reject) => {
    resolve()
  })
}
// 导航
export const navigation = (data = {}) => {
  return new Promise((resolve, reject) => {
    resolve({})
  })
}
// 定位信息
export const position = () => {
  return new Promise((resolve, reject) => {
    resolve({
      lng: 126.55,
      lat: 43.85,
    })
    // resolve({
    //   lng: '0',
    //   lat: '0',
    // })
  })
}
// 打开新页面
export const openWindows = (path) => {
  return new Promise((resolve, reject) => {
    window.location.href = `${location.origin}/vss_h5/module/driversOil/${path}`
    resolve({})
  })
}
// 打开新页面
export const openOtherWindows = (path) => {
  return new Promise((resolve, reject) => {
    window.location.href = path
    resolve({})
  })
}
// 返回上一页面
export const nativeBack = ($router) => {
  return new Promise((resolve, reject) => {
    try {
      $router.go(-1)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
// 显示当前页面
// 隐藏当前页面

// 观看广告
export const lookAd = () => {
  console.log('观看广告~~start')

  return new Promise((resolve, reject) => {
    resolve()
  })
}

// 获取顶部高度
export const getBarHeight = (path) => {
  console.log('获取顶部高度~~start')

  return new Promise((resolve, reject) => {
    try {
      resolve(Cookie.getItem('statusBarHeight') || 0)
    } catch (error) {
      reject(error)
    }
  })
}

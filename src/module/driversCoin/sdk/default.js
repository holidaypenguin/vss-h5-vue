/* eslint-disable no-console */
// 获取登录token
export const getLoginToken = () => {
  console.log('获取登录token~~start')

  return new Promise((resolve, reject) => {
    resolve('c9fbe6fa6de5d3f79817dbd982c1812c')
    // resolve('6936ce970967691bbcde0ad484ad1160')
    // resolve()
  })
}
// 中途登录、中途登录后返回状态
export const toLogin = () => {
  console.log('中途登录~~start')

  return new Promise((resolve, reject) => {
    resolve('f94414e338c8a4d13ee05bfa377f2eb0')
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

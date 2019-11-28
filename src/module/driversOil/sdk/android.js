import Q from './q'

const injectedObject = window.injectedObject

// const deferList = []

// 获取登录状态
export const getLoginMsg = () => {
  const defer = Q.defer()

  injectedObject.getLoginMsg()

  return defer.promise
  // return new Promise((resolve, reject) => {
  //   try {
  //     injectedObject.getLoginMsg()
  //   } catch (error) {
  //     reject(error)
  //   }
  // })
}
// 中途登录、中途登录后返回状态
export const toLogin = () => {
  return new Promise((resolve, reject) => {
    try {
      injectedObject.toLogin({})
    } catch (error) {
      reject(error)
    }
  })
}
// 导航
export const navigation = (data = {}) => {
  return new Promise((resolve, reject) => {
    try {
      injectedObject.navigation(data)
    } catch (error) {
      reject(error)
    }
  })
}
// 定位信息
export const position = () => {
  return new Promise((resolve, reject) => {
    try {
      injectedObject.position({})
    } catch (error) {
      reject(error)
    }
  })
}
// 打开新页面
export const openWindows = () => {
  return new Promise((resolve, reject) => {
    try {
      injectedObject.openWindows.postMessage({})
    } catch (error) {
      reject(error)
    }
  })
}
// 显示当前页面
// 隐藏当前页面

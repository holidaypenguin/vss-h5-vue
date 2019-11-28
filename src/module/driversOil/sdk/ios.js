const messageHandlers = window.webkit.messageHandlers

// 获取登录状态
export const getLoginMsg = () => {
  return new Promise((resolve, reject) => {
    try {
      messageHandlers
        .getLoginMsg.postMessage({
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
// 中途登录、中途登录后返回状态
export const toLogin = () => {
  return new Promise((resolve, reject) => {
    try {
      messageHandlers
        .toLogin.postMessage({
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
// 导航
export const navigation = (data = {}) => {
  return new Promise((resolve, reject) => {
    try {
      messageHandlers
        .navigation.postMessage(data)
    } catch (error) {
      reject(error)
    }
  })
}
// 定位信息
export const position = () => {
  return new Promise((resolve, reject) => {
    try {
      messageHandlers
        .position.postMessage({
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
// 打开新页面
export const openWindows = () => {
  return new Promise((resolve, reject) => {
    try {
      messageHandlers
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

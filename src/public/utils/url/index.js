export const mergeUrl = (url, params = {}, hash = '') => {
  if (!url) return ''

  try {
    const temp = new URL(url)

    return `${temp.origin}${temp.pathname}${mergeParams(temp, params)}${mergeHash(temp, hash)}`
  } catch (error) {
    return ''
  }
}

const mergeParams = (temp, params = {}) => {
  const str = getParamsString(params)

  return `${temp.search ? `${temp.search}${str && '&'}` : str && '?'}${str}`
}

const mergeHash = (temp, hash = '') => {
  return `${temp.hash ? temp.hash : hash && '#'}${hash}`
}

export const getParamsString = (params = {}) => {
  if (!params) return ''

  try {
    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&')
  } catch (error) {
    return ''
  }
}

export const getUrlParams = (key) => {
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`)
  const result = window.location.search.substr(1).match(reg)

  return result ? decodeURIComponent(result[2]) : null
}

/* eslint-disable camelcase */
// 扇形左侧靠近屏幕最小值
let x_limit_left
// 扇形左侧靠近屏幕右侧最大值
let x_limit_right

let machin_height
// let machin_width
// let machin_left

// 机器底部x轴
let x_center
// 机器底部y轴
let y_center

// 扇形最小半径
let r_min
// 扇形最大半径
let r_max

let oil_width = 60
let oil_height = 80

const init = function () {
  const base_width = 750
  const base_height = 1334

  const client_width = window.document.body.clientWidth
  const client_height = window.document.body.clientHeight
  // console.log('client_width', client_width, 'client_height', client_height)

  // 宽度比例
  const ratio_width = client_width / base_width
  // 高度比例
  const ratio_height = client_height / base_height

  oil_width = oil_width * ratio_width
  oil_height = oil_height * ratio_width

  x_limit_left = 100 * ratio_width
  x_limit_right = 650 * ratio_width
  // console.log('x_limit_left', x_limit_left, 'x_limit_right', x_limit_right)

  // machin_width = 368 * ratio_width
  // 因为使用的padding-bottom设置的机器高度，所以机器高度比例使用宽度比例
  machin_height = 320 * ratio_width
  const machin_top = 556 * ratio_height

  const y_limit_top = 240 * ratio_width

  // 机器底部中心坐标
  x_center = base_width / 2 * ratio_width
  y_center = machin_top + machin_height
  // console.log('x_center', x_center, 'y_center', y_center)

  // machin_left = x_center - machin_width / 2

  r_min = machin_height + 100 * ratio_width
  r_max = Math.min(
    machin_height + 400 * ratio_width,
    y_center - y_limit_top,
  )
  // console.log('y_limit_top', y_limit_top, 'r_min', r_min, 'r_max', r_max)
}

const getRandom = function getRandom (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getX = function () {
  if (!x_limit_left) init()

  // 暂时设定比例系数为1，当大于1以后容易出现重复坐标
  return getRandom(x_limit_left / 1.0, x_limit_right / 1.0) * 1.0
}

export const getY = function (x) {
  if (!x_limit_left) init()

  // console.log(x, x_center)
  const z = Math.abs(x - x_center)

  // console.log('z', z, 'r_min', r_min, 'r_max', r_max)

  const y_min = Math.ceil(Math.sqrt(Math.pow(r_min, 2) - Math.pow(z, 2)))
  const y_max = Math.ceil(Math.sqrt(Math.pow(r_max, 2) - Math.pow(z, 2)))

  // 暂时设定比例系数为1，当大于1以后容易出现重复坐标
  const y = getRandom(y_min / 1.0, y_max / 1.0) * 1.0

  // console.log('y_min', y_min, 'y_max', y_max, 'y', y)

  return Math.ceil(y_center) - y
  // return machin_height - y
}

const cache = {}

export const getPosition = function (id) {
  if (!x_limit_left) init()

  if (cache[id]) {
    return cache[id]
  }

  const x = getX()
  const y = getY(x)

  cache[id] = {
    x,
    y,
  }

  return cache[id]
}

export const getCenter = function () {
  if (!x_limit_left) init()

  return {
    x: x_center - oil_width * 1.3,
    y: y_center - oil_height * 2,
    // x: machin_width - oil_width * 1.3,
    // y: machin_height - oil_height * 2,
  }
}

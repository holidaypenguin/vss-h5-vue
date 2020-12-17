/** 对Date的扩展，将 Date 转化为指定格式的String
 *
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *
 * 例子：
 *
 * format(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *
 * format(new Date(), "yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 *
 */
export const DateFormat = (date, fmt) => {
  date = new Date(date)
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt
      .replace(RegExp.$1, (`${date.getFullYear()}`)
        .substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt
        .replace(RegExp.$1, (RegExp.$1.length === 1)
          ? (o[k])
          : ((`00${o[k]}`)
            .substr((`${o[k]}`).length)))
    }
  }

  return fmt
}

/** 时间显示。几秒前、几分钟前、几小时前、昨天时间、前天时间、日期时间
 *
 * DateShow(Date.now() + 179990000) ==> 明天15:01
 *
 * DateShow(Date.now() + 10000)     ==> 15:01
 *
 * DateShow(Date.now() - 10000)     ==> 10秒前
 *
 * DateShow(Date.now() - 120000)    ==> 2分钟前
 *
 * DateShow(Date.now() - 1200000)   ==> 20分钟前
 *
 * DateShow(Date.now() - 12000000)  ==> 3小时前
 *
 * DateShow(Date.now() - 120000000) ==> 昨天05:28
 *
 * DateShow(Date.now() - 190000000) ==> 前天10:01
 *
 * DateShow(Date.now() - 1900000000)==> 07-09 15:01
 */
export const DateShow = (date) => {
  if (!date) return

  const tomorrowBegin = new Date().setHours(0, 0, 0, 0) + 24 * 3600000

  const dateNow = Date.now()

  const todayBegin = new Date().setHours(0, 0, 0, 0)

  const yesterdayBegin = new Date().setHours(0, 0, 0, 0) - 24 * 3600000

  const beforeYesterdayBegin = new Date().setHours(0, 0, 0, 0) - 24 * 3600000 * 2

  const showDate = new Date(date).getTime()

  if (showDate > tomorrowBegin) {
    return `明天${DateFormat(showDate, 'hh:mm')}`
  } else if (showDate > dateNow) {
    return DateFormat(showDate, 'hh:mm')
  } else if (showDate > todayBegin) {
    if (dateNow - showDate < 60000) {
      return `${parseInt((dateNow - showDate) / 1000, 10)}秒前`
    } else if (dateNow - showDate < 3600000) {
      return `${parseInt((dateNow - showDate) / 60000, 10)}分钟前`
    }

    return `${parseInt((dateNow - showDate) / 3600000, 10)}小时前`
  } else if (showDate > yesterdayBegin) {
    return `昨天${DateFormat(showDate, 'hh:mm')}`
  } else if (showDate > beforeYesterdayBegin) {
    return `前天${DateFormat(showDate, 'hh:mm')}`
  }

  return DateFormat(showDate, 'MM-dd hh:mm')
}

// 修改时间的小时、分，修改秒、毫秒为0，并返回修改后的毫秒数
export const DateSetTime = (date, timeString = '') => {
  const _date = new Date(date)
  const times = timeString.split(':')
  _date.setHours(parseInt(times[0], 10) || 0, parseInt(times[1], 10) || 0, 0, 0)

  return _date.getTime()
}

/**
 * @description 获取这天日期
 *
 * @returns [格式化时间]
 */
export const DateCurrent = (date, fmt = 'M月d日') => {
  const _date = new Date(date || Date.now())

  return [DateFormat(_date, fmt)]
}

/**
 * @description 获取这周
 *
 * @returns [格式化时间]
 */
export const DateWeekCurrent = (date) => {
  const _date = new Date(date || Date.now())
  // 获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
  const weekday = _date.getDay() || 7
  // 往前算（weekday-1）天，年份、月份会自动变化
  _date.setDate(_date.getDate() - weekday + 1)

  return [weekday]
}

/**
 * @description 获取这周的周一
 *
 * @returns [格式化时间, 当天的零点时间毫秒数]
 */
export const DateWeekFirst = (date, fmt = 'M月d日') => {
  const _date = new Date(date || Date.now())
  // 获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
  const weekday = _date.getDay() || 7
  // 往前算（weekday-1）天，年份、月份会自动变化
  _date.setDate(_date.getDate() - weekday + 1)

  return [DateFormat(_date, fmt), DateSetTime(_date)]
}

/**
 * @description 获取这周的周日
 *
 * @returns [格式化时间, 当天的零点时间毫秒数]
 */
export const DateWeekLast = (date, fmt = 'M月d日') => {
  const _date = new Date(date || Date.now())
  // 获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
  const weekday = _date.getDay() || 7
  // 往前算（7 - weekday）天，年份、月份会自动变化
  _date.setDate(_date.getDate() + 7 - weekday)

  return [DateFormat(_date, fmt), DateSetTime(_date)]
}

/**
 * @description 获取这月
 *
 * @returns [格式化时间]
 */
export const DateMonthCurrent = (date, fmt = 'yy年M月') => {
  const _date = new Date(date || Date.now())

  return [DateFormat(_date, fmt)]
}

/**
 * @description 获取这月的第一天
 *
 * @returns [格式化时间, 当天的零点时间毫秒数]
 */
export const DateMonthFirst = (date, fmt = 'M月d日') => {
  const _date = new Date(date || Date.now())
  _date.setDate(1)

  return [DateFormat(_date, fmt), DateSetTime(_date)]
}

/**
 * @description 获取这月的最后一天
 *
 * @returns [格式化时间, 当天的零点时间毫秒数]
 */
export const DateMonthLast = (date, fmt = 'M月d日') => {
  const _date = new Date(date || Date.now())
  _date.setMonth(_date.getMonth() + 1)
  _date.setDate(0)

  return [DateFormat(_date, fmt), DateSetTime(_date)]
}

/**
 * @description 获取这季
 *
 * @returns [格式化时间]
 */
export const DateSeasonCurrent = (date, fmt = 'q') => {
  const _date = new Date(date || Date.now())

  return [DateFormat(_date, fmt)]
}

/**
 * @description 获取这季的第一天
 *
 * @returns [格式化时间, 当天的零点时间毫秒数]
 */
export const DateSeasonFirst = (date, fmt = 'M月d日') => {
  const _date = new Date(date || Date.now())
  const month = _date.getMonth()
  if (month < 3) {
    _date.setMonth(0)
  } else if (month > 2 && month < 6) {
    _date.setMonth(3)
  } else if (month > 5 && month < 9) {
    _date.setMonth(6)
  } else if (month > 8 && month < 11) {
    _date.setMonth(9)
  }
  _date.setDate(1)

  return [DateFormat(_date, fmt), DateSetTime(_date)]
}

/**
 * @description 获取这季的最后一天
 *
 * @returns [格式化时间, 当天的零点时间毫秒数]
 */
export const DateSeasonLast = (date, fmt = 'M月d日') => {
  let _date = new Date(date || Date.now())
  const month = _date.getMonth()
  if (month < 3) {
    _date.setMonth(2)
  } else if (month > 2 && month < 6) {
    _date.setMonth(5)
  } else if (month > 5 && month < 9) {
    _date.setMonth(8)
  } else if (month > 8 && month < 11) {
    _date.setMonth(11)
  }
  _date = new Date(DateMonthLast(_date)[1])

  return [DateFormat(_date, fmt), DateSetTime(_date)]
}

/**
 * @description 获取这年
 *
 * @returns [格式化时间]
 */
export const DateYearCurrent = (date, fmt = 'yy年') => {
  const _date = new Date(date || Date.now())

  return [DateFormat(_date, fmt)]
}

/**
 * @description 获取这年的第一天
 *
 * @returns [格式化时间, 当天的零点时间毫秒数]
 */
export const DateYearFirst = (date, fmt = 'yy年M月d日') => {
  const _date = new Date(date || Date.now())
  // 一月
  _date.setMonth(0)
  // 一日
  _date.setDate(1)

  return [DateFormat(_date, fmt), DateSetTime(_date)]
}

/**
 * @description 获取这年的最后一天
 *
 * @returns [格式化时间, 当天的零点时间毫秒数]
 */
export const DateYearLast = (date, fmt = 'yy年M月d日') => {
  const _date = new Date(date || Date.now())
  // 下一年
  _date.setFullYear(_date.getFullYear() + 1)
  // 一月
  _date.setMonth(0)
  // 前一天
  _date.setDate(-1)

  return [DateFormat(_date, fmt), DateSetTime(_date)]
}

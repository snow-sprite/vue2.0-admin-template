import Cookies from 'js-cookie'
/**
 * function:        		设置cookie
 * @param name			name为cookie名称
 * @param value			value为cookie值
 * @param time			time为cookie过期时间
 * @returns{string}   	cookie
 */
export const setToken = (name, value) => {
  let num = 10 // 失效时间是几小时
  let defaultTime = new Date(new Date().getTime() + num * 1000 * 60 * 60)
  let obj = {
    path: '/',
    expires: defaultTime
  }
  let host = window.location.host
  if (host == 'ecg.bigbigsun.com') {
    obj.domain = '.bigbigsun.com'
  } else if (host == 'devadms.vaiwan.com') {
    // 测试 devadms.vaiwan.com
    obj.domain = '.vaiwan.com'
  } else if (host == 'ecg.bigbigsun.net') {
    // 演示
    obj.domain = '.bigbigsun.net'
  }

  return Cookies.set(name, value, obj)
}

/**
 * function:        		获取cookie
 * @param name			name为cookie名称
 * @returns{string}   	cookie
 */
export const getToken = name => {
  return Cookies.get(name)
}

/**
 * function:        		清除cookie
 * @param name			name为cookie名称
 * @returns{string}   	cookie
 */
export const removeToken = name => {
  let obj = {
    path: '/'
  }
  let host = window.location.host
  if (host == 'ecg.bigbigsun.com') {
    obj.domain = '.bigbigsun.com'
  } else if (host == 'devadms.vaiwan.com') {
    // 测试 devadms.vaiwan.com
    obj.domain = '.vaiwan.com'
  } else if (host == 'ecg.bigbigsun.net') {
    // 演示
    obj.domain = '.bigbigsun.net'
  }

  return Cookies.remove(name, obj)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
 export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

/**
 * @param {string} email
 * @returns {Boolean}
 */
export const validEmail = (email) => {
  const regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEmail.test(email);
};

/**
 * @param {string} str
 * @returns {Boolean}
 */
export const isString = (str) => {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
};

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export const isArray = (arg) => {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
};

/**
 * 登录用户名验证
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  return str.trim();
}

/**
 * 密码验证
 * @param {string} str
 * @returns {Boolean}
 */
export function validPassword(str) {
  if (str.length < 6) {
    return false;
  } else {
    return true;
  }
}
/**
 * 手机号验证
 * @param {string} value
 * @param {Boolean} isCanEmpty 是否可为空 若为空则不验证
 * @returns {Boolean}
 */
export function validMobile(value, isCanEmpty) {
  let reg = /^1(3|4|5|6|7|8|9)\d{9}$/g;
  if (isCanEmpty) {
    if (value) {
      if (reg.test(value)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true
    }
  } else {
    if (value) {
      if (reg.test(value)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false
    }
  }
}

/**
 * 短信验证码验证
 * @param {string} str
 * @returns {Boolean}
 */
export function validCode(str) {
  let reg = /^[0-9]\d*$/;
  let str1 = str.trim();
  if (reg.test(str1)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 身份证号码验证
 * @param {string} str
 * @returns {Boolean}
 */
export function validIdCardNum(str) {
  if (str) {
    let reg =
      /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    let str1 = str.trim();
    if (reg.test(str1)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

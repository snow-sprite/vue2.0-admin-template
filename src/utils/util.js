import store from '@/store';

const processFileUrl = process.env.VUE_APP_FILE_URL
/**
 * file url
*/
export const fileUrl = processFileUrl;
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
function isEmptyObject( obj ) {
  var name;
  for ( name in obj ) {
    return false;
  }
  return true;
}
/**
 * @param {json}
 * @returns{json}
 */
export const delEmptyData = (json) => {
    for (var i in json) {
        if (json[i] === '' || json[i] === undefined || json[i] === null || json[i].length === 0) {
            delete json[i];
        }
        if(typeof json[i] === "object" && Object.prototype.toString.call(json[i]).toLowerCase() == "[object object]" && !json[i].length){
            for (var k in json[i]) {
                if (json[i][k] === '' || json[i][k] === undefined || json[i][k] === null) {
                    delete json[i][k];
                }
            }
            if(isEmptyObject(json[i])){
                delete json[i];
            }
        }
    }
    return json;
}
  
/**
 * 格式化时间
 */
export const formatTimeStr = (time, type) => {
    var now;
    if(time){
      now = time;
    } else {
      now = new Date();
    }
    var year = now.getFullYear(),
    month = now.getMonth() + 1,
    day = now.getDate(),
    hour = now.getHours(),
    min = now.getMinutes(),
    sec = now.getSeconds(),
    mSec = now.getMilliseconds(),
    formatTime = '';
  
    month < 10 ? month = '0' + month : month + '';
    day < 10 ? day = '0' + day : day + '';
    hour < 10 ? hour = '0' + hour : hour + '';
    min < 10 ? min = '0' + min : min + '';
    sec < 10 ? sec = '0' + sec : sec + '';

    if(type == 'no-time'){//type=1 提交给后台时间
      formatTime = year + '-' + month + '-' + day;
    } else if(type){//type=1 提交给后台时间
      formatTime = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    } else {
      formatTime = year.toString() + month + day + hour + min + sec + mSec;
    }
    return formatTime
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export const debounce = (func, wait, immediate) => {
    let timeout, args, context, timestamp, result
  
    const later = function() {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp
  
      // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }
  
    return function(...args) {
      context = this
      timestamp = + new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }
  
      return result
    }
}

/** 数字千分位格式化
 * @param {Function} func
 * @param {val} number
 * @return {Number}
 */
export const thousandCharacter = (val) => {
  const reg=/(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
  return val ? val.toString().replace(reg, '$1,') : 0;
}

/** 判断是否有权限。根据传入的权限标识，查看是否存在于用户的权限标识集合内。
 * @param {Function} func
 * @param {perms} string
 * @return {Boolean}
 */
export const hasBtnPermission = (perms,permissions) => {
  let hasPermission = false;
  // store.getters.initData;
	// let permission = ['search','view','edit'];
	let permission = store.getters.btnPermissions || [];
	for (var i = 0; i < permission.length; i++) {
		if(permission[i] === perms){
			hasPermission = true;
			break;
		}
	}
	return hasPermission;
}

/** JSON数组去重
 * @param {Function} func
 * @param {perms} string
 * @return {Boolean}
 */
export const uniqueJsonArray = (array, key) => {
  let result = [array[0]];
  for(let i = 1; i < array.length; i++){
      let item = array[i];
      let repeat = false;
      for (let j = 0; j < result.length; j++) {
          if (item[key] == result[j][key]) {
              repeat = true;
              break;
          }
      }
      if (!repeat) {
          result.push(item);
      }
  }
  return result;
}


/** 计算搜索区域高度，设置table高度
 * @param {Function} func
 * @param {dom} string
 * @param {defaultVal} number
 * @return {Number}
 */
 export const calcSearchSetTableHeight = (dom, defaultVal) => {
  let searchDom = document.getElementById(dom) || ''
  let searchHeight = 0
  let tableHeight = 0
  let val = defaultVal || 0
  let winHeight = window.innerHeight;
  if (val) {
    val = Number(val)
  }
  if (searchDom) {
      searchHeight = searchDom.offsetHeight;
  }
  tableHeight = winHeight - val - searchHeight;
  return tableHeight
}

// 通过身份证号码获取出生年月日
export const getBirthdayFromIdCard = (idCard) => {  
  var birthday = "";  
  if(idCard != null && idCard != ""){  
      if(idCard.length == 15){  
          birthday = "19"+idCard.substr(6,6);  
      } else if(idCard.length == 18){  
          birthday = idCard.substr(6,8);  
      }  
    
      birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");  
  }  
    
  return birthday;  
}

export const getTypeIdByName = (data, name) => {
  let id = ''
  data.some(d => {
    if (d.name == name) {
      id = d.id
      return true
    }
  })
  return id
}

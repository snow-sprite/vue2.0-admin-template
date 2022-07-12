import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
import { getCurrentCancelToken } from '@/router'

// 清除cookie
function removeTokens() {
  removeToken("BBS_CLOUD_USERINFO");
  removeToken("HEADIMG");
  removeToken("token");
  removeToken("BBS_CLOUD_USER_ID");
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 600000, // request timeout
  withCredentials: true, // send cookies when cross-domain requests
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    "Content-Type": "application/json;charset=UTF-8",
  },
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.cancelToken = getCurrentCancelToken()
    let token = getToken("token") || "";
    // let each request carry token
    if (token) {
      config.headers["token"] = token; // 除了登录接口，其他都需要带token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    if (response.status == 200) {
      // return resStatusFun(response)
      const res = response.data;
      if (res.status !== 100) {
        //100: 正常返回
        // 500200：登录失败，用户名或密码错误
        // 500201: Token expired;
        // 500202：用户权限不足

        // 500100：服务端异常
        // 500101：参数校验异常
        // 500102：没有该项目的数据权限
        // 500203：用户未绑定钉钉

        if (res.status === 500201) {
          // 500201: Token expired;
          let msgg = res.msg ? res.msg : "登录失效！请重新登录";
          Message({
            message: msgg,
            type: "error",
            duration: 1500,
            customClass: "mes-box-zindex",
            offset: 45,
          });
          removeTokens();
          location.reload();
        } else if (res.status === 500200) {
          // 500200：登录失败，用户名或密码错误
          let msgg = res.msg ? res.msg : "用户名或密码错误";
          Message({
            message: msgg,
            type: "error",
            duration: 1500,
            customClass: "mes-box-zindex",
            offset: 45,
          });
          removeTokens();
          return Promise.reject(new Error(msgg));
        } else if (res.status === 500203) {
          // 500203：用户未绑定钉钉
          let msgg =
            res.detailMsg ||
            res.msg ||
            res.data ||
            "用户未绑定钉钉，请联系管理员";
          let rejObj = {
            status: res.status,
            data: msgg,
          };
          Message({
            message: msgg,
            type: "error",
            duration: 2000,
            customClass: "mes-box-zindex",
            offset: 45,
          });
          removeTokens();
          return Promise.reject(rejObj);
        } else {
          let msgg = res.detailMsg || res.msg || res.data || "Error";
          if (res.status === 500111) {
            //参数校验异常 每个表单元素单独验证
            let errObj = res.data;
            Object.keys(errObj).forEach((key, ind) => {
              setTimeout(() => {
                Message({
                  message: errObj[key],
                  type: "error",
                  duration: 3 * 1000,
                  customClass: "mes-box-zindex",
                  offset: 45,
                });
              }, ind * 100);
            });
            return Promise.reject(JSON.stringify(res.data));
          } else {
            Message({
              message: msgg,
              type: "error",
              duration: 3 * 1000,
              customClass: "mes-box-zindex",
              offset: 45,
            });
          }
          return Promise.reject(new Error(msgg));
        }
      } else {
        return res;
      }
    }
  },
  (error) => {
    let resData = error.response;
    let res = error.response.data;

    if (resData.status == 401) {
      if (res.status === 500201) {
        // 500201: Token expired;
        let msgg = res.msg ? res.msg : "登录失效！请重新登录";
        Message({
          message: msgg,
          type: "error",
          duration: 1500,
          customClass: "mes-box-zindex",
          offset: 45,
        });
        removeTokens();
        // location.reload();
      } else if (res.status === 500200) {
        // 500200：登录失败，用户名或密码错误
        let msgg = res.msg ? res.msg : "用户名或密码错误";
        Message({
          message: msgg,
          type: "error",
          duration: 1500,
          customClass: "mes-box-zindex",
          offset: 45,
        });
        removeTokens();
        return Promise.reject(new Error(msgg));
      } else {
        let msgg =
          res.detailMsg || res.msg || res.data || "服务器正忙，请稍后再试~";
        if (res.status === 500111) {
          //参数校验异常 每个表单元素单独验证
          let errObj = res.data;
          for (const key in errObj) {
            if (errObj.hasOwnProperty(key)) {
              const element = errObj[key];
              Message({
                message: element,
                type: "error",
                duration: 3 * 1000,
                customClass: "mes-box-zindex",
                offset: 45,
              });
            }
          }
          return Promise.reject(JSON.stringify(res.data));
        } else {
          Message({
            message: msgg,
            type: "error",
            duration: 3 * 1000,
            customClass: "mes-box-zindex",
            offset: 45,
          });
        }
        return Promise.reject(new Error(msgg));
      }
    } else if (resData.status == 400) {
      let msgg =
        res.detailMsg || res.msg || res.data || "错误请求（Bad Request）";
      Message({
        message: msgg,
        type: "error",
        duration: 3 * 1000,
        customClass: "mes-box-zindex",
        offset: 45,
      });
      return Promise.reject(new Error(msgg));
    } else if (resData.status == 404) {
      let msgg = res.detailMsg || res.msg || res.data || "请求的资源不存在~";
      Message({
        message: msgg,
        type: "error",
        duration: 3 * 1000,
        customClass: "mes-box-zindex",
        offset: 45,
      });
      return Promise.reject(new Error(msgg));
    } else if (resData.status == 500) {
      let msgg =
        res.detailMsg || res.msg || res.data || "服务器正忙，请稍后再试~";
      Message({
        message: msgg,
        type: "error",
        duration: 3 * 1000,
        customClass: "mes-box-zindex",
        offset: 45,
      });
      return Promise.reject(new Error(msgg));
    } else {
      let msgg =
        res.detailMsg || res.msg || res.data || "服务器正忙，请稍后再试~";
      Message({
        message: msgg,
        type: "error",
        duration: 3 * 1000,
        customClass: "mes-box-zindex",
        offset: 45,
      });
      return Promise.reject(new Error(msgg));
    }
  }
)

export default service

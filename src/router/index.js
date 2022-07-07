import Vue from 'vue'
import Router from 'vue-router'
import { clearLoginInfo } from '@/utils'
import axios from 'axios'
import constantRouter from './constant-router'
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import { getToken } from '@/utils/auth' // get token from cookie
import { setLocalStorage } from '@/utils/storage'
// TODO 模拟动态路由
import mokcDynamicRoutes from './dynamic-route.mock'
Vue.use(Router)

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register']

// 当前路由下 cancel token 的 source，用于跳转路由时取消请求
let currentCancelTokenSource = {
  token: null,
  cancel: null
}

export function getCurrentCancelToken() {
  return currentCancelTokenSource.token
}

// 取消现有所有未完成的请求
export function cancelRequest() {
  currentCancelTokenSource.cancel && currentCancelTokenSource.cancel()
}

// 静态路由
const mainRoutes = constantRouter

let firstRoute = null
const router = createRouter()

// 创建路由
function createRouter() {
  return new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    hasDynamicRoutes: false, // 是否已经添加动态(菜单)路由
    routes: mainRoutes
  })
}
// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
  firstRoute = null
}

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()
  // 取消旧页面的请求
  cancelRequest()
  // 生成当前页新的 cancel token
  currentCancelTokenSource = axios.CancelToken.source()

  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  const hasToken = getToken('token') || ''
  if (hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      if (firstRoute) {
        next(firstRoute)
      } else {
        next({ path: '/' })
      }
      NProgress.done()
    } else {
      if (router.options.hasDynamicRoutes) {
        if (to.path == '/') {
          // 解决初次从/login进入到/ 但并未重定向导致空页面的情况
          next(firstRoute)
        } else {
          next()
        }
        NProgress.done()
        return
      }
      // 需要判断登录权限的路由
      //TODO 在这里调用api获取路由及权限相关信息
      Promise.resolve(mokcDynamicRoutes)
        .then(res => {
          const { data } = res
          // 重置路由
          resetRouter()

          const dynamicRoutes = dynamicRoutesBuilder(data)
          mainRoutes[0].children = dynamicRoutes
          mainRoutes[0].redirect = dynamicRoutes[0].path

          router.options.hasDynamicRoutes = true
          router.addRoutes([
            ...mainRoutes,
            { path: '*', redirect: { name: '404' } }
          ])

          stageMainRoutes(mainRoutes)
          // 默认路由
          firstRoute = { path: getFirstUrl(mainRoutes) || '/' }

          next({ ...to, replace: true })
        })
        .catch(e => {
          clearLoginInfo()
          setLocalStorage('menuList', '[]')
          console.log(
            `%c${e} 请求菜单列表和权限失败，跳转至登录页！！`,
            'color:blue'
          )
          next({ name: 'login', params: { target: to.path } })
          NProgress.done()
        })
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

// 获取第一个可用的菜单 url
function getFirstUrl(menuList) {
  for (const item of menuList) {
    if (item.redirect && /\S/.test(item.redirect)) {
      return item.redirect
    } else if (item.path && /\S/.test(item.path)) {
      return item.path
    } else if (item.children && item.children.length) {
      const result = getFirstUrl(item.children[0])
      if (result) return result
    }
  }
  return null
}

/**
 * 动态路由生成器
 * @param {*} menuList 菜单列表
 * @param {*} routes 动态路由
 */
function dynamicRoutesBuilder(menuList = []) {
  return menuList.map(({ name, menuName, pageRouting, child }) => {
    let route = {
      path: pageRouting,
      component: resolve => require([`@/views${pageRouting}.vue`], resolve),
      name: name,
      meta: {
        title: menuName,
        require: true,
        icon: name.toLowerCase()
      }
    }

    if (child && child.length > 0) {
      route.children = dynamicRoutesBuilder(child)
      route.redirect = route.children[0].path
    }

    return route
  })
}

/**
 * 保存动态路由
 */
function stageMainRoutes(mainRoutes) {
  mainRoutes.some(route => {
    // 找到我们存到根路由下的动态路由 再存起来
    if (route.name == 'Home') {
      store.commit('SET_ROUTES', route.children)
      setLocalStorage('menuList', JSON.stringify(route.children || '[]'))
      return true
    }
  })
}

export default router

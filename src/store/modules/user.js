// import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router/index'
import { clearLoginInfo } from '@/utils'

const getDefaultState = () => {
  return {
    token: getToken('token'),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // TODO 这里需要调用登录接口
      // login({ username: username.trim(), password: password }).then(response => {
      //   const { data } = response
      //   commit('SET_TOKEN', data.token)
      setToken('token', 'test-token')
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }

      //   const { roles, name, avatar } = data

      //   // roles must be a non-empty array
      //   if (!roles || roles.length <= 0) {
      //     reject('getInfo: roles must be a non-null array!')
      //   }

      //   commit('SET_ROLES', roles)
      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
      // TODO 这里需要调用用户信息接口
      resolve()
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // TODO 这里需要调用退出登录接口
      // logout(state.token).then(() => {
      removeToken('token') // must remove  token  first
      resetRouter()
      clearLoginInfo()
      commit('RESET_STATE')
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken('token') // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

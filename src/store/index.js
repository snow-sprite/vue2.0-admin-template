import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
Vue.use(Vuex)

const state = {
  asyncRoutes: []
}
const mutations = {
  SET_ROUTES(state, routes) {
    state.asyncRoutes = routes
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store

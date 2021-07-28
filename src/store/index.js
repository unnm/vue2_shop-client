import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import home from './modules/home'
import user from './modules/user'

export default new Vuex.Store({
  modules: {
    home,
    user
  }
})

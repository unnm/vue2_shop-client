import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import home from './modules/home'
import user from './modules/user'
import search from './modules/search'
import detail from './modules/detail'
import shopcart from './modules/shopcart'
import trade from './modules/trade'

export default new Vuex.Store({
  modules: {
    home,
    user,
    search,
    detail,
    shopcart,
    trade
  }
})

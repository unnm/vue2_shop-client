// home模块

import { reqCategoryList, reqBannerList, reqFloorList } from '@/api'

const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}

const mutations = {
  GET_CATEGORYLIST(state, data) {
    state.categoryList = data
  },
  GET_BANNERLIST(state, data) {
    state.bannerList = data
  },
  GET_FLOORLIST(state, data) {
    state.floorList = data
  }
}

const actions = {
  async getCategoryList({ commit }) {
    // 发送请求拿数据，提交给mutations
    // async、await的作用
    // 可以通过同步代码实现异步效果，代码可读性强
    // .then .catch 也可以用，只是可读性不强，里面还是有异步代码（异步回调函数）
    const result = await reqCategoryList()
    if (result.code === 200) {
      commit('GET_CATEGORYLIST', result.data)
    }
  },
  async getBannerList({ commit }) {
    const result = await reqBannerList()
    if (result.code === 200) {
      commit('GET_BANNERLIST', result.data)
    }
  },
  async getFloorList({ commit }) {
    const result = await reqFloorList()
    if (result.code === 200) {
      commit('GET_FLOORLIST', result.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

import { reqSearchInfo } from '@/api/index'

const state = {
  searchInfo: {}
}

const getters = {
  // 为什么要getters，是因为我们获取的数据内部结构比较复杂，使用起来不方便，甚至可能出现小问题（假报错）
  // 所以我们拿到复杂的数据之后，会把这个数据先去做计算，计算出来我们要直接使用的数据，简化数据操作
  attrsList(state) {
    return state.searchInfo.attrsList || [] // 这里给空数组是为了后期不出现假报错
  },
  goodsList(state) {
    return state.searchInfo.goodsList || []
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList || []
  }
}

const mutations = {
  GET_SEARCHINFO(state, info) {
    state.searchInfo = info
  }
}

const actions = {
  async getSearchInfo({ commit }, searchParams) {
    // searchParams这个参数是用户调用dispatch时传递过来的payload载荷数据
    let result = await reqSearchInfo(searchParams)
    commit('GET_SEARCHINFO', result.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

import { reqDetailInfo } from '@/api'

const state = {
  detailInfo: {}
}

// state是vuex存储数据的地方，但是这个state并不是永久存储
// 当我们刷新页面或者重新启动项目（可以认为刷新页面就是重启了一下项目）
// 那么vuex当中所有的数据，都要重新初始化，重新发请求去获取
// state里面的数据一开始就是有的，只不过是我们初始化的，不是请求回来的
// 但是state这个初始化的数据，也会影响组件（组件也可以获取这个初始化数据）

// 就是因为vue和vuex没办法去永久存储数据，才有了以下两个本地存储方案
// localStorage
// sessionStorage

const getters = {
  categoryView(state) {
    return state.detailInfo.categoryView || {}
  },
  skuInfo(state) {
    // 当请求的数据回来时，skuInfo才是真正的对象
    // 当请求的数据没回来时，skuInfo就是undefined
    // 这里或一个{}，目的就是为了不给组件传递undefined，否则使用skuInfo.xxx会报错
    // 因此这里必须或一个{}，即使数据没有获取回来，但是我们给组件的不是undefined，这样就保证不会报错了
    return state.detailInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || []
  }
}

const mutations = {
  GET_DETAILINFO(state, detailInfo) {
    state.detailInfo = detailInfo
  }
}

const actions = {
  async getDetailInfo({ commit }, skuId) {
    const result = await reqDetailInfo(skuId)
    if (result.code === 200) {
      commit('GET_DETAILINFO', result.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

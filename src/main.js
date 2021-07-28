import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import 'swiper/css/swiper.css' // 引入swiper的css

import '@/mock/mockServer' // 引入mockServer，让模拟的接口生效

// 测试ajax请求是否成功
// import '@/api'
// import { reqCategoryList } from '@/api'
// reqCategoryList()

import TypeNav from '@/components/TypeNav'
import SlideLoop from '@/components/SlideLoop'
// 全局注册的组件（如果一个非路由组件被多个组件使用，那么定义在components目录中，注册在全局）
Vue.component('TypeNav', TypeNav)
Vue.component('SlideLoop', SlideLoop)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, //所有的组件都可以使用this.$route和this.$router
  store //所有的组件都可以拿到this.$store
}).$mount('#app')

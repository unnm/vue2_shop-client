import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store' // 默认导入简写形式
// import {default as store} from '@/store'  // 默认导入全写形式

import 'swiper/css/swiper.css' // 引入swiper的css

import '@/mock/mockServer' // 引入mockServer，让模拟的接口生效

// Element-UI 相关
import { Button, MessageBox, Message, Input } from 'element-ui'
// element-ui当中分为两种组件
// 第一种组件就和下面这个Button一样，可以引入然后全局注册，使用的时候直接写标签
// Vue.use(Button)   //两种使用方式都可以
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
// 第二种组件就和MessageBox类似，引入之后不能直接注册，而是挂载到Vue的原型上使用，使用的时候写的js代码
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message //用来做提示消息，比原生的alert要好看

import * as API from '@/api' // 一次性导入接口请求函数文件中所有暴露的成员
// 无论什么样的暴露方式，往外暴露的都是一个对象
// 只不过，暴露的对象形成方式不一样

//**默认暴露**
// export default {a:100}
// 暴露的是一个对象，这个对象里面是以default为属性名，以default后面的东西为值的对象
// {
//   default:{a:100}
// }

// 引入的时候，如果是默认暴露
// 通常我们是这样引入   import a from './xxx.js'  它其实是一个简写方式
// 全写应该是   import {default as a} from './xxx.js'
// 由于默认暴露引入的时候如果全写会很麻烦，因此才出现上面的简写方式

//**分别暴露**
// export const a = 100
// export const reqXX = () => {}
// 最终暴露出文件的时候，会自动的把分别暴露的信息封装为一个对象
// {
//   a:a,
//   reqXX:reqXX
// }

// 引入的时候
// import {reqXX} from './xx.js'
// import {a} from './xx.js

//**整体暴露**
// const a = 100
// const obj = {a:100}

// 最终暴露的就是你export 后面的对象
// export {
//   a,
//   obj
// }

// 引入的时候
// import {a} from './xx.js'
// import {obj} from './xx.js'

// 无论什么暴露方式，如果想拿到暴露文件的整个那个对象，就得这么干
// import * as xxx from './xx.js'

// 测试ajax请求是否成功
// import '@/api'
// import { reqCategoryList } from '@/api'
// reqCategoryList()

import TypeNav from '@/components/TypeNav'
import SlideLoop from '@/components/SlideLoop'
import Pagination from '@/components/Pagination'
// 全局注册的组件（如果一个非路由组件被多个组件使用，那么定义在components目录中，注册在全局）
Vue.component('TypeNav', TypeNav)
Vue.component('SlideLoop', SlideLoop)
Vue.component('Pagination', Pagination)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, //所有的组件都可以使用this.$route和this.$router
  store, //所有的组件都可以拿到this.$store
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线，这代表任意组件内部都可以通过this.$bus访问到vm实例（总线）
    Vue.prototype.$API = API // 把一次性导入的接口请求函数中的所有暴露的模块成员后形成的对象放到Vue的原型身上
  }
}).$mount('#app')

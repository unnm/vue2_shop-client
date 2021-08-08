import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './routes'

const router = new VueRouter({
  routes,
  // 配置滚动行为，即跳转到新的路由界面时滚动条的位置
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function(location, onResolved, onRejected) {
  if (onRejected === undefined && onRejected === undefined) {
    return originPush.call(this, location).catch(() => {})
  } else {
    return originPush.call(this, location, onResolved, onRejected)
  }
}

VueRouter.prototype.replace = function(location, onResolved, onRejected) {
  if (onRejected === undefined && onRejected === undefined) {
    return originReplace.call(this, location).catch(() => {})
  } else {
    return originReplace.call(this, location, onResolved, onRejected)
  }
}

export default router

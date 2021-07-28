import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login,
      meta: { isHidden: true }
    },
    {
      path: '/register',
      component: Register,
      meta: { isHidden: true }
    },
    {
      name: 'search',
      path: '/search/:keyword?',
      component: Search
    }
  ]
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

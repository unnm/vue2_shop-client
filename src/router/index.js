import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './routes'
import store from '@/store'

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

// token 校验----重点知识
// 注册全局前置导航守卫，用来对token进行校验（根据token获取用户信息）
router.beforeEach(async (to, from, next) => {
  // to 代表即将要进入的目标路由对象（去哪里）
  // from 代表当前导航正要离开的路由对象（从哪来）
  // next 是一个函数，代表是否放行。而根据参数不同，其功能也不同。（是否放行）
  //   next() 代表无条件放行
  //   next('/') 或者 next({path: '/}) 代表强制跳转到指定的位置
  //   next(false) 代表什么都不做，原地不动。即中断当前导航

  //第一步：守卫拦截住，先去获取用户的token和用户的信息
  let token = store.state.user.token
  let userInfo = store.state.user.userInfo.name

  if (token) {
    //如果token存在，代表用户登录过
    if (to.path === '/login') {
      //用户已经登录了，就没必要去往登录页面了，我们让其跳转到首页
      next('/')
    } else {
      // 如果用户已经登录，并且跳转的不是登录页，那么我们得看用户的信息获取了没有
      if (userInfo) {
        //如果用户的信息已经获取，则无条件放行
        next()
      } else {
        //用户已经登录，但是用户还没有获取用户信息，在这里就需要请求获取用户信息
        try {
          await store.dispatch('getUserInfo') //用户根据token获取用户信息
          //如果获取用户信息成功，用户信息拿到就无条件放行
          next()
        } catch (error) {
          //根据token获取用户信息失败，代表token可能过期
          //我们需要把用户的过期token给清理掉，然后重新跳转到登录页面
          store.dispatch('clearToken')
          next('/login')
        }
      }
    }
  } else {
    //用户根本没登录，
    //目前我们什么都不做，直接放行，后面我们是需要添加功能的
    //如果用户访问的是 交易相关  支付相关 个人中心相关，那么跳转到登录页面
    let targetPath = to.path
    if (
      targetPath.indexOf('/trade') !== -1 ||
      targetPath.indexOf('/pay') !== -1 ||
      targetPath.startsWith('/center')
    ) {
      // next('/login') 这样写可以直接去到登录页，但是登录成功不会去到之前想去的地方
      next('/login?redirect=' + targetPath) //想要回到之前想去的地方，必须把想去的那个路径给带到登录里面
    } else {
      next()
    }
  }
})

export default router

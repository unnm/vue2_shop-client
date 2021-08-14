// import Home from '@/pages/Home'
const Home = () => import('@/pages/Home') // import函数可以让文件单独打包，并且动态加载
// import Login from '@/pages/Login'
const Login = () => import('@/pages/Login')
// import Register from '@/pages/Register'
const Register = () => import('@/pages/Register')
// import Search from '@/pages/Search'
const Search = () => import('@/pages/Search')
// import Detail from '@/pages/Detail'
const Detail = () => import('@/pages/Detail')
// import AddCartSuccess from '@/pages/AddCartSuccess'
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
// import ShopCart from '@/pages/ShopCart'
const ShopCart = () => import('@/pages/ShopCart')
// import Pay from '@/pages/Pay'
const Pay = () => import('@/pages/Pay')
// import PaySuccess from '@/pages/PaySuccess'
const PaySuccess = () => import('@/pages/PaySuccess')
// import Trade from '@/pages/Trade'
const Trade = () => import('@/pages/Trade')
// import Center from '@/pages/Center'
const Center = () => import('@/pages/Center')
// import MyOrder from '@/pages/Center/MyOrder'
const MyOrder = () => import('@/pages/Center/MyOrder')
// import GroupOrder from '@/pages/Center/GroupOrder'
const GroupOrder = () => import('@/pages/Center/GroupOrder')

// 使用import  from 这样的方式是同步执行，将所有的路由组件一次性打包在一个大的文件当中
// 这样打包之后，打包出来的文件体积比较大，当浏览器在访问这个文件加载的时候，效率不高
// 所以我们就想办法将所有的路由组件，分别打包为一个小的文件
// 浏览器在访问哪个组件的时候，再去加载哪一个小的文件，效率就会提升
// 这个过程就是我们所说的路由懒加载

// import store from '@/store'

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
    // component后面可以是一个组件（静态加载），也可以是一个函数（静态加载）
    // 这个函数会在用户第一次访问Home组件的时候，执行这个Home函数
  },
  {
    path: '/login',
    component: Login,
    meta: { isHidden: true } // 路由对象当中的meta元信息中可以配置我们所需要的任何数据
    // 路由独享守卫
    // beforeEnter: (to, from, next) => {
    //   // 只有没登录才能去到登录页面（在全局前置守卫中已经实现这个功能，这里就可以不写了）
    //   let token = store.state.user.token
    //   if (token) {
    //     next('/')
    //   } else {
    //     next()
    //   }
    // }
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
  },
  {
    path: '/detail/:goodsId',
    component: Detail
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 只有携带了skuNum和sessionStorage内部有skuInfo数据，才能看到添加购物车成功的界面
      let skuNum = to.query.skuNum
      let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
      if (skuNum && skuInfo) {
        next()
      } else {
        alert('必须要携带skuNum参数，也必须得存储skuInfo')
        // next('/')  // 跳转到首页
        next(false) // 这个是什么都不做
      }
    }
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/pay',
    component: Pay,
    beforeEnter: (to, from, next) => {
      // 只有从交易界面才能跳转到支付页面
      if (from.path === '/trade') {
        next()
      } else {
        alert('只有从交易页面（创建订单）页面才能跳转到支付页面')
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      // 只有从支付界面才能跳转到支付成功页面
      if (from.path === '/pay') {
        next()
      } else {
        alert('只有从支付页面才能跳转到支付成功页面')
        next(false)
      }
    }
  },
  {
    path: '/trade',
    component: Trade
    // beforeEnter: (to, from, next) => {
    //   // 只有从购物车界面才能跳转到交易页面
    //   if (from.path === '/shopcart') {
    //     next()
    //   } else {
    //     alert('只有从购物车界面才能跳转到交易页面')
    //     next(false)
    //   }
    // }
  },
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: '',
        redirect: 'myorder'
      },
      {
        path: 'myorder',
        component: MyOrder
      },
      {
        path: 'grouporder',
        component: GroupOrder
      }
    ]
  }
]

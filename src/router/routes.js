import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

export default [
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
  },
  {
    path: '/detail/:goodsId',
    component: Detail
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess
  },
  {
    path: '/shopcart',
    component: ShopCart
  }
]

// 这个文件写的都是函数，我们叫接口请求函数
// 以后我们的每个接口都对应一个函数，如果想要拿相关接口的数据，只需要调用相关的接口请求函数即可
import request from './ajax'
import mockAjax from './mockAjax'

// axios使用：函数用法、对象用法
// 三种参数：params参数、query参数、请求体参数
// 1) params参数：是在url中携带的，属于路径的一部分
// 2) query参数：可以在url当中携带，以？分隔，后面就是query参数
//           也可以在配置对象当中去配置，而配置的属性名叫params
// 3) 请求体参数：是在配置对象当中data里面配置，请求方式是put和post才有请求体参数
/*
axios({
  url: 'localhost:8080/userinfo/hehe?name=joker',
  method: ,
  params: {
    //特别主要：这里代表query参数
    name: 'joker'
  },
  data: {
    //这里配的是请求体参数
  }
}) */

// 请求三级分类列表数据
// /qpi/product/getBaseCategooryList
// get
// 无参数
export const reqCategoryList = () => {
  return request({
    url: '/get/product/getBaseCategoryList',
    method: 'get'
  })
}
// 验证请求是否成功
// reqCategoryList() // 这里如果要调用，得把模块引入到main当中

// 请求获取模拟接口的数据 banner和floor
export const reqBannerList = () => {
  return mockAjax({
    url: '/banner',
    method: 'get'
  })
}
export const reqFloorList = () => {
  return mockAjax({
    url: '/floor',
    method: 'get'
  })
}

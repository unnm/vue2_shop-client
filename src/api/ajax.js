// 这个文件是对axios进行二次封装
// 目的：让axios发送请求时，添加额外的功能（比如进度条提示）
/* 1. 配置基础路径和超时时间
2. 添加进度条信息（nprogress）
3. 返回的响应不再需要从data属性中拿数据，而是直接拿到我们所需的数据
4. 统一处理请求错误，具体请求也可以选择处理或不处理 */
import axios from 'axios'
// 引入nprogress相关的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

// 以后只要是对axios二次封装，不会在axios身上直接去封装，而是创建axios实例进行封装
// axios.create()创建一个新的和axios具有相同功能的一个实例
const instance = axios.create({
  baseURL: '/api/v2', // 基础路径
  timeout: 20000 // 超时时间，当ajax超过设置的时间就会报错
})

// 添加进度条信息功能  nprogress
// 如果想对axios添加额外的功能，或是给请求添加额外的信息，必然要用到axios的请求拦截器和响应拦截器

// Add a request interceptor
instance.interceptors.request.use(
  // 请求拦截器中成功的回调
  config => {
    // config其实就是请求报文，这个请求报文最后一定要返回去，因为还要继续往下走
    // 在这里我们可以添加额外的功能，也可以给请求头添加需要的数据
    NProgress.start() // 开启进度条

    // 请求头内部需要添加临时标识，后期每个请求都会带上这个临时标识
    let userTemId = store.state.user.userTemId
    if (userTemId) {
      config.headers.userTemId = userTemId
    }

    // 登录成功后，需要把token添加到请求头当中，今后所有的请求当中都要带上这个token
    let token = store.state.user.token
    if (token) {
      config.headers.token = token
    }

    return config
  }
  // 请求拦截器当中失败的回调一般不写，因为失败了，也就没有下文了
  // () => {
  // }
)

// Add a response interceptor
// 返回的响应不再需要从data属性中拿数据，而是直接拿到我们所需的数据
instance.interceptors.response.use(
  response => {
    // response其实就是响应报文
    // 在这里我们也可以添加额外功能或者对响应报文进行处理
    NProgress.done() // 停止进度条
    return response.data //直接将响应数据进行返回
  },
  error => {
    NProgress.done() // 停止进度条
    // 可以统一处理错误
    alert('发送ajax请求失败' + error.message || '未知错误')
    // 统一处理完成后，这个错误可以让后面继续处理
    // return Promise.reject(new Error('发送ajax请求失败')) // 如果后面想继续处理这个错误，就返回失败的Promise
    // 也可以不让后面继续处理这个错误，只需中断Promise链即可
    return new Promise(() => {}) // 返回pending状态的promise，代表中断Promise链，后期也就没办法处理了
  }
)

export default instance // 把封装好的axios实例暴露出去

import Vue from 'vue'
import App from './App.vue'
// 查找文件
import router from './router/index'
import Element from 'element-ui'
// 加载第三方包资源不需要写相对路径，直接包名/路径即可
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'
import axios from 'axios'

// 配置axios的基本路由，
// 也就是说配置了这个东西，你就不用每次都写长长的 http://xxxx
// 只需要，例如 axios({ url: '/authorizations' })
// 路径中的 / ，多退少补
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// axios请求拦截器，所有使用axios发出的请求都会先经过这里然后再发出去
axios.interceptors.request.use(config => {
  // 因为所有的请求都要经过这里，所以可以把之前手动加上的自定义发送的请求头放在这里
  // 给每一个请求都给予token授权,所有需要提供token的请求都可以直接去用了
  // 因为token在本地储存的用户登录信息中，所以要先获取用户登录信息
  // 调用JSON.parse（）方法是把JSON字符串转换成对象
  const userinfo = JSON.parse(window.localStorage.getItem('user_info'))
  // console.log('请求发送出去了')
  // return config是允许通过的方式，没有的话请求就发不出去了
  // config是本次请求相关的配置对象，是一个对象，所以可以修改里面的属性
  // console.log(config)
  config.headers.Authorization = `Bearer ${userinfo.token}`
  return config
}, error => {
  return Promise.reject(error)
})

// axios的响应拦截器，所有响应回来的数据都会先经过这里
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

// 因为几乎每个组件都会使用axios，频繁的 import 就变得非常麻烦，我们可以把一些常用的成员放到Vue.prototype(vue实例原型)中
// 就可以在组建中直接this.xxx使用了
// 为什么？因为所有组件都是 Vue 的实例
// 所以往 Vue.prototype 中添加的成员可以直接通过组件实例 this 进行访问
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(Element)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

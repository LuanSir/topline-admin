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

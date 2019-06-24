import Vue from 'vue'
import App from './App.vue'
// 查找文件
import router from './router/index'
import Element from 'element-ui'
// 加载第三方包资源不需要写相对路径，直接包名/路径即可
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

Vue.use(Element)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

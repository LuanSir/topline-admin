// Vuex容器，集中式（数据）管理
// 这里的数据和组件无关
// 任何组件都可以：读取:this.$store.state.xxx来访问容器中的数据，state中的数据也是响应式的，数据改变也会驱动视图更新
//               修改: 不要直接在直接在组件中 this.$store.state.xxx = xxx 修改容器数据
//                  正确的修改方式是：
//                              1. 在容器中定义 mutation 函数修改 state 状态
//                              2. 在组件中提交 mutation 完成对状态的修改
//                              说白了，不要在组件中修改 state 数据，而是在容器中修改 state 数据

// 配置
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建容器对象
const store = new Vuex.Store({
  // state 中储存容器中的数据，类似于组件中的data
  state: {
    user: JSON.parse(window.localStorage.getItem('user_info'))
  },
  // mutations 类似于组件中的 methods
  // 记住一个原则，修改state永远通过mutation函数修改，不要在组件中去this.$store.state.xxx = xxx
  // 函数自己定义，默认接收一个参数 state，也就是容器中的state
  // 我们可以在mutation函数中去state.xxx = xxx
  mutations: {
    changeUser (state, data) {
      // // 修改容器中的用户信息。对象拷贝，将 data 中的数据成员拷贝到 state.user 中
      Object.assign(state.user, data)
      // 将修改之后的用户信息保存到本地存储
      window.localStorage.setItem('user_info', JSON.stringify(state.user))
    }
  }
})

// 导出容器对象
export default store

// 在main.js中
// import store from './store'
// new Vue({
//      ...
//      store
//      ...
//    })

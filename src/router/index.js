import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const router = new Router ()

export default new Router({
  routes: [
    {
      // 路由的名字，和组件名没关系，说白了就是path的别名
      // 好处就是，假如你的path 是 /x/x/x/x ,我们跳转的时候就可以直接
      // $router.push('/x/x/x/x')  => $router.push({name: 'xxx'}),还不仅仅如此
      name: 'home',
      path: '/',
      component: () => import('@/views/home') // @表示 src 目录，无论你当前文件在哪里，@都是src
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const router = new Router ()

export default new Router({
  routes: [
    // {
    //   // 路由的名字，和组件名没关系，说白了就是path的别名
    //   // 好处就是，假如你的path 是 /x/x/x/x ,我们跳转的时候就可以直接
    //   // $router.push('/x/x/x/x')  => $router.push({name: 'xxx'}),还不仅仅如此
    //   name: 'home',
    //   path: '/',
    //   component: () => import('@/views/home') // @表示 src 目录，无论你当前文件在哪里，@都是src
    // },
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      // 路由嵌套
      children: [ // 所有children路由都显示到父路由的router-view中
        {
          name: 'home',
          // 它就是layout的默认子路由，当匹配到layout的时候，会把该路由显示到router-view
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})

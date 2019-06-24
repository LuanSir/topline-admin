import Vue from 'vue'
import Router from 'vue-router'
// import nprogress from 'nprogress'

Vue.use(Router)


const router = new Router({
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
      // name: 'layout',因为它有默认的子路由，所以它的名字没有意义，否则Vue会黄牌警告
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

// 所有的路由导航都会经过路由拦截器，to:去哪；from从哪来；next:通过的方法
// 使用路由拦截器处理页面访问权限
router.beforeEach((to, from, next) => {
  // 获取登录用户信息
  const userinfo = window.localStorage.getItem('user_info')

  // 如果是非login页面，就判断登录状态
  if (to.path !== '/login') {
    // 如果没有登录就跳转到登录页面
    if (!userinfo) {
      next({ name: 'login' })
    } else {
      // 如果登录了，就允许通过
      next()
    }
  } else {
    // 如果登陆过了，就不允许再次访问登录页面了
    if (userinfo) {
      next(false)
    } else {
      // 没有登录，才允许访问登录页面
      next()
    }
  }
})

export default router

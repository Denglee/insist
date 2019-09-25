import Vue from 'vue'
import Router from 'vue-router'
import firstItem from '@/views/one/firstItem'
import secondMain from '@/views/two/secondMain'
import thirdIndex from '@/views/three/thirdIndex'


Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'home',
      redirect:'/index'   //重定向
    },
    {
      path: '/index',
      name: 'index',

      // vue异步组件实现路由懒加载
      // component：resolve=>(['需要加载的路由的地址'，resolve])
      component: () => import('@/views/index/index'),
    },
    {
      path: "/reception/register",
      name: 'register',
      component: () => import('@/views/contract/register'),
    },
    {
      path: "/reception/query",
      name: 'query',
      component: () => import('@/views/contract/query'),
    },

    {
      path: '/home',
      name: 'home',
      component: firstItem
    },

    {
      path: '/firstItem',
      name: 'firstItem',
      component: firstItem
    },
    {
      path: '/secondMain',
      name: 'secondMain',
      component: secondMain
    },
    {
      path: '/thirdIndex',
      name: 'thirdIndex',
      component: thirdIndex
    },

    // {
    // path: '/about',
    // name: 'about',
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

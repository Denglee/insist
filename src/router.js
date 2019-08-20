import Vue from 'vue'
import Router from 'vue-router'
import firstItem from './views/one/firstItem'
import secondMain from './views/two/secondMain'
import thirdIndex from './views/three/thirdIndex'
import forthList from './views/four/forthList'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'home',
      redirect:'/firstItem'   //重定向
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
    {
      path: '/forthList',
      name: 'forthList',
      component: forthList
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

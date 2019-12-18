import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qs from 'qs'
Vue.config.productionTip = false

import Axios from 'axios'

// import '../mock/index.js'


/*引入 element*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/*更换 element 主题*/
import '@/assets/css/element-variables.scss'



// 引入自己的全局的css
import '@/assets/css/global.scss'

// 引用全局js
import global from  '@/assets/js/global.js'
Vue.prototype.GLOBAL = global


// 注册全局组件
// import topTabbar from '@/components/topTabbar'
// Vue.component(topTabbar.name,topTabbar);

// 通用iframe
import publicIframe from '@/components/publicIframe/publicIframe'
Vue.component(publicIframe.name,publicIframe);

// import goTop from "@/components/goTop";
// Vue.component(goTop.name,goTop)

// 引用md5
// import md5 from 'js-md5';


Vue.prototype.$axios=Axios;

// 引用qs
Vue.prototype.$qs = qs

/*第一层if判断生产环境和开发环境*/
if (process.env.NODE_ENV === 'production') {
  /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
  if (process.env.VUE_APP_FLAG === 'pro') {
    //production 生产环境发布 地址
    Axios.defaults.baseURL = '/';//路径

  } else {
    //test 测试环境 测试地址 http://vikily.f3322.net:10007
    Axios.defaults.baseURL = 'http://vikily.f3322.net:2000';//路径
    config.optimization.minimize(false)
  }
} else {
  // dev 开发环境 本地 /api
  Axios.defaults.baseURL = '/api';
  // Axios.defaults.baseURL = 'http://vikily.f3322.net:10007';
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
Vue.config.productionTip = false

// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 使用 mint-ui引入全部的组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


// 引入自己的全局的css
import '@/assets/css/global.scss'
import '@/assets/js/global.js'

// 注册全局组件
import topTabbar from '@/components/topTabbar'
Vue.component(topTabbar.name,topTabbar);

// import goTop from "@/components/goTop";
// Vue.component(goTop.name,goTop)

// 引用md5
// import md5 from 'js-md5';


// 配置公共的url
// Axios.defaults.baseURL = '/api';
Axios.defaults.headers.post['Content-Type'] = 'application/json';

// 配置 axios
Vue.prototype.$axios=Axios;


/*第一层if判断生产环境和开发环境*/
if (process.env.NODE_ENV === 'production') {
  /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
  if (process.env.VUE_APP_FLAG === 'pro') {
    //production 生产环境发布 地址
    // Axios.defaults.baseURL = 'http://www.gddcdz.cn:10009/';//路径
    Axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d5bb688d3464d21642b18e0/ld.com';//路径

  } else {
    //test 测试环境 测试地址 http://vikily.f3322.net:10007
    // Axios.defaults.baseURL = 'http://vikily.f3322.net:10007';//路径
    config.optimization.minimize(false)
  }
} else {
  // dev 开发环境 本地 /api
  Axios.defaults.baseURL = '/api';
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


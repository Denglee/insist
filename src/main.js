import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import '../mock/index.js'

// 引入element
import ElementUI from 'element-ui';
import '@/assets/css/changeEleCss.scss';
Vue.use(ElementUI);

// 引入自己的全局的css
import '@/assets/css/global.scss'
import utils  from  '@/assets/js/global.js'
Vue.prototype.utils = utils

// 注册全局组件
// import topTabbar from '@/components/topTabbar'
// Vue.component(topTabbar.name,topTabbar);

// import goTop from "@/components/goTop";
// Vue.component(goTop.name,goTop)

// 引用md5
// import md5 from 'js-md5';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


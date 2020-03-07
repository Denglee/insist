import Vue from 'vue'

/* 3、 引入 element*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {
    size: 'middle'
});

/* 1、引入自定义的全局的css*/
import '@/assets/css/global.scss'
import '@/assets/css/animate37.css'


/* 2、 引用 自定义 全局js*/
import global from  '@/assets/js/global.js'
Vue.prototype.GLOBAL = global;

/* 2.1、 全局 通用iframe 组件*/
import publicIframe from '@/components/publicIframe/publicIframe'
Vue.component(publicIframe.name,publicIframe);

/* 2.2、  引用 自定义  回到顶部*/
// import goTop from "@/components/goTop";
// Vue.component(goTop.name,goTop)

/*2.4、注册全局组件*/
// import topTabbar from '@/components/topTabbar'
// Vue.component(topTabbar.name,topTabbar);



/* 4、 引入 echarts 图表*/
// import echarts from'echarts'
// Vue.prototype.$echarts = echarts //将echarts注册成Vue的全局属性
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
/*引入折线图/柱状图等组件*/
require('echarts/lib/chart/line'); //折线
require('echarts/lib/chart/bar');  //柱状
require('echarts/lib/chart/funnel');//漏斗
require('echarts/lib/chart/pie'); //饼图

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/legendScroll');//图例滚动

//vue全局注入echarts
Vue.prototype.$echarts = echarts;


/* 5、 引入 vue-cropper 图片 裁剪*/
import VueCropper from 'vue-cropper'
Vue.use(VueCropper);


/* 6、 引入 moment 时间转换 */
/*凡是用的prototype 使用都要this.继承 console.log(this.$moment().format("YYYY-MM"));*/
import moment from 'moment'  //引用moment js
Vue.prototype.$moment = moment;//赋值使用
moment.locale('zh-cn');//需要汉化

// 6 moment 用法将时间戳转日期格式的 全局 过滤器
Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD') =>{
    return moment(dataStr).format(pattern)
})

Vue.filter('tempTme', (dataStr) => {
    return dataStr*1000
});




/*7、 引用md5*/
// import md5 from 'js-md5';
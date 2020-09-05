/*https://liubing.me/vue-auto-regist-global-component-and-plugin.html
1、项目中新建plugins目录，和components目录保持同级。
2、plugins目录中新建index.js
3、以引入element-ui为例：再在plugins目录中新建element.js
4、plugins目录中的index.js中引入element.js
5、main.js中引入plugins中的index.js
这样main.js看起来就清爽很多了，后面有新增的插件，只需要再plugins目录下新建相应的插件名称，然后在index.js中引入即可，再多的插件也可以很方便的进行维护。

*/

// import './element'

/*下面是elementjs*/
import Vue from 'vue'

/* 3、 引入 element*/
import ElementUI from 'element-ui';
// import '@/assets/theme/index.css'

// Vue.use(ElementUI, {
//     size: 'small'
// });


import '@/assets/theme/index.css'

import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    Link,
    Divider,
    Image,
    Calendar,
    Backtop,
    PageHeader,
    CascaderPanel,
    Loading,
    MessageBox,
    Message,
    Notification
} from 'element-ui';
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
// Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
// Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
// Vue.use(Breadcrumb);
// Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
// Vue.use(Tree);
// Vue.use(Alert);
// Vue.use(Slider);
// Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
// Vue.use(Spinner);
// Vue.use(Badge);
// Vue.use(Card);
// Vue.use(Rate);
// Vue.use(Steps);
// Vue.use(Step);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// Vue.use(Collapse);
// Vue.use(CollapseItem);
// Vue.use(Cascader);
// Vue.use(ColorPicker);
// Vue.use(Transfer);
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
// Vue.use(Main);
// Vue.use(Footer);
// Vue.use(Timeline);
// Vue.use(TimelineItem);
// Vue.use(Link);
Vue.use(Divider);
// Vue.use(Image);
// Vue.use(Calendar);
Vue.use(Backtop);
// Vue.use(PageHeader);
// Vue.use(CascaderPanel);

Vue.use(Loading.directive);


Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;



/* 1、引入自定义的全局的css*/
import '@/assets/css/allGlobal.scss'
import '@/assets/css/animate37.css'



/* 2.1、 全局 通用iframe 组件*/
import publicIframe from '@/components/publicIframe/publicIframe'
Vue.component(publicIframe.name,publicIframe);

/* 2.2、  引用 自定义  回到顶部*/
// import goTop from "@/components/goTop";
// Vue.component(goTop.name,goTop)

/*2.4、注册全局组件*/
// import topTabbar from '@/components/topTabbar'
// Vue.component(topTabbar.name,topTabbar);


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
    return moment(dataStr*1000).format(pattern)
})
Vue.filter('minuteFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') =>{
    return moment(dataStr*1000).format(pattern)
})

Vue.filter('tempTme', (dataStr) => {
    return dataStr*1000
});


Vue.filter('mathFloor', (math) => {
    return Math.abs(Number(math))

});

/*7、 引用md5*/
// import md5 from 'js-md5';



/*8、引入v-charts 官网：https://v-charts.js.org/#/histogram*/
import VCharts from 'v-charts'
import VeLine from 'v-charts/lib/line.common'  //折线图
import VeBar from 'v-charts/lib/bar.common' //条形图
import VeHistogram from 'v-charts/lib/histogram.common' //柱状图
import VePie from 'v-charts/lib/pie.common' //饼图
import VeRing from 'v-charts/lib/ring.common' //环图
// import VeFunnel from 'v-charts/lib/funnel.common' //图

Vue.component(VeLine.name, VeLine);
Vue.component(VeBar.name, VeBar);
Vue.component(VeHistogram.name, VeHistogram);
Vue.component(VePie.name, VePie);
Vue.component(VeRing.name, VeRing);
// Vue.component(VeFunnel.name, VeLine);
Vue.use(VCharts);


/*9、打印   https://www.cnblogs.com/dhpong/p/10500370.html */
// import Print from 'vue-print-nb'
// Vue.use(Print);  //注册

/*9、打印   https://www.cnblogs.com/dhpong/p/10500370.html */
import Print from '@/assets/js/print'
Vue.use(Print);  //注册


/* 2、 引用 自定义 全局js*/
import GLOBAL from  '@/assets/js/global.js'
Vue.prototype.GLOBAL = GLOBAL;


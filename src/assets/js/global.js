/** 字体 */
// fnResize();
//  window.onresize = function () {
//    fnResize()
//  };
//  function fnResize() {
//    let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
//    console.log(deviceWidth);
//    if (deviceWidth >= 750) {
//      deviceWidth = 750;
//    }
//    if (deviceWidth <= 320) {
//      deviceWidth = 320
//    }
//    document.documentElement.style.fontSize = (deviceWidth / 7.5*2) + 'px';
//    console.log( document.documentElement.style.fontSize);
//  }

/** session 存储

sessionStorage.setItem('currentIndex', 0)
// 获取
index=sessionStorage.getItem('currentIndex');
// 删除一个
sessionStorage.removeItem("currentIndex");
// 删除全部
sessionStorage.clear();

 //对象
 let obb = {
      name:'zhangyachoa',
      age:'18'
  }
 let str = JSON.stringify(obb)//把对象转化为字符串（stringify）存放进sessionStorage
 sessionStorage.setItem('obbj',str)

 JSON.parse(sessionStorage.getItem('obbj')

*/

import { get, post } from './axios';



// 获取今天的日期
function getToday() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    // 如果需要时分秒
    // var h = now.getHours();
    // var m = now.getMinutes();
    // var s = now.getSeconds();
    let formatDate = year + '-' + month + '-' + day;
    return formatDate;
}

/*时间戳转换 */
function formatTime(dataStr, pattern = 'YYYY-MM-DD'){
    // return this.$moment(dataStr).format(pattern)
}


// 全局 js
let localUrl = '';  //全局路径
var localOrigin = window.location.origin;

// console.log(localOrigin);
if(localOrigin == 'http://localhost:8282'){
    localUrl = 'http://vikily.f3322.net:20000';
    //192.168.0.133
} else {
    localUrl = localOrigin;
}
console.log(localUrl);
// const localUrl = 'http://vikily.f3322.net:20000';  //测试
// const localUrl = 'https://spt.zmtek.net';  //系统正式
// const localUrl = 'https://swim.zmtek.net';    //游泳馆正式


/*职位类型*/
let userTypeList = [
    {id:'10000', catname:'全部职位'},
    {id:'1', catname:'店长'},
    {id:'2', catname:'顾问'},
    {id:'3', catname:'教练'},
    {id:'4', catname:'操课'},
    {id:'5', catname:'财务'},
    {id:'6', catname:'前台'},
    {id:'7', catname:'保洁员'},
    {id:'8', catname:'后勤'},
    {id:'100', catname:'教练经理'},
    {id:'200', catname:'顾问经理'},
    {id:'9', catname:'boss'},
    {id:'10', catname:'行政'}
];

/*提成类型*/
let royaltyType =[
    {id:1, catname:'销售额百分比',},
    {id:2, catname:'上课节数百分比',},
];

/*潜在会员*/
// 获取渠道
let getChannel = [
    {id:0, name:'未填'},
    {id:1, name:'外出获取'},
    {id:2, name:'自有网络'},
    {id:3, name:'大众点评'},
    {id:4, name:'美团'},
    {id:5, name:'其他第三方平台'},
    {id:6, name:'直接到访(WI)'},
    {id:7, name:'朋友转介绍(BR)'},
    {id:8, name:'拉访(DI)'},
    {id:9, name:'电话咨询(TI)'},
    {id:10, name:'其他'},
    {id:11, name:'全民健身'},
];

// 渠道属性
let channelArr = [
    {id:0, name:'未填'},
    {id:1, name:'人力推广'},
    {id:2, name:'广告'},
    {id:3, name:'公司网络'},
    {id:4, name:'市场活动'},
    {id:5, name:'其他'},
    {id:6, name:'营销活动'},
];

// 跟进等级
let followLevel = [
    {id:0, name:'未填'},
    {id:1, name:'1级'},
    {id:2, name:'2级'},
    {id:3, name:'3级'},
    {id:4, name:'4级'},
    {id:5, name:'5级'},
];

// 客户分类
let customerType = [
    {id:0, name:'未填'},
    {id:1, name:'A类用户'},
    {id:2, name:'B类用户'},
    {id:3, name:'C类用户'},
    {id:4, name:'D类用户'},
    {id:5, name:'BR特别多'},
    {id:6, name:'投诉多'},
];


/*elementui把上传的图片转为base64
https://blog.csdn.net/woshidamimi0/article/details/86082428
页面  直接 this.GLOBAL.getEleBase64调用
GLOBAL在main.js中声明了*/
function getEleBase64(file) {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
            imgResult = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(imgResult);
        };
    });
}

/*按钮点击状态 变化*/
function btnStateChange(that, id, val,  state = true,time=1500){
    that[id][val] = state;
    // that[id].text = textTrue;
    setTimeout(()=>{
        that[id][val] = false;
        // that[id].text = textFalse;
    },time);

    /*使用方法  搜索中 记得加状态 true */
    //this.GLOBAL.btnStateChange(this,'loadState','searchLoad',true);

}

export default {
    userTypeList,
    royaltyType,
    localUrl,
    getEleBase64:getEleBase64,
    getToday:getToday(),
    btnStateChange:btnStateChange,

    formatTime:formatTime(),
    getChannel,
    channelArr,
    followLevel,
    customerType,
}
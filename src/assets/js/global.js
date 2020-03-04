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

/** session 存储*/
/*/storage 存储
sessionStorage.setItem('currentIndex', 0)
// 获取
index=sessionStorage.getItem('currentIndex');
// 删除一个
sessionStorage.removeItem("currentIndex");
// 删除全部
sessionStorage.clear();*/


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


// 全局 js
let localUrl = '';  //全局路径
var localOrigin = window.location.origin;

console.log(localOrigin);
if(localOrigin == 'http://localhost:8282'){
    localUrl = 'http://vikily.f3322.net:20000';
} else {
    localUrl = localOrigin;
}

// $user_type_list[] = array(
//     'id' => '3',
//     'catname' => '教练'
// );
// $user_type_list[] = array(
//     'id' => '1',
//     'catname' => '店长'
// );
// $user_type_list[] = array(
//     'id' => '2',
//     'catname' => '顾问'
// );
// $user_type_list[] = array(
//     'id' => '4',
//     'catname' => '操课'
// );
// $user_type_list[] = array(
//     'id' => '5',
//     'catname' => '财务'
// );
// $user_type_list[] = array(
//     'id' => '6',
//     'catname' => '前台'
// );
// //==== 新添加 保洁员   ===
// //      if($city_id == '16'){
// $user_type_list[] = array(
//     'id' => '7',
//     'catname' => '保洁员'
// );
// $user_type_list[] = array(
//     'id' => '8',
//     'catname' => '后勤'
// );
// //      }
// $user_type_list[] = array(
//     'id' => '100',
//     'catname' => '教练经理'
// );
// $user_type_list[] = array(
//     'id' => '200',
//     'catname' => '顾问经理'
// );
// $user_type_list[] = array(
//     'id' => '9',
//     'catname' => 'boss'
// );
// $user_type_list[] = array(
//     'id' => '10',
//     'catname' => '行政'
// );

console.log(localUrl);

// const localUrl = 'http://vikily.f3322.net:20000';  //测试
// const localUrl = 'https://spt.zmtek.net';  //系统正式
// const localUrl = 'https://swim.zmtek.net';    //游泳馆正式


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

export default {
    localUrl,
    getEleBase64:getEleBase64,
    getToday:getToday(),
}
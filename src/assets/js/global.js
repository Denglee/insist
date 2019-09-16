/** 字体 */
 fnResize();
  window.onresize = function () {
    fnResize()
  };
  function fnResize() {
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    console.log(deviceWidth);
    if (deviceWidth >= 750) {
      deviceWidth = 750;
    }
    if (deviceWidth <= 320) {
      deviceWidth = 320
    }
    document.documentElement.style.fontSize = (deviceWidth / 7.5*2) + 'px';
    console.log( document.documentElement.style.fontSize);
  }

/** session 存储*/
/*/storage 存储
sessionStorage.setItem('currentIndex', 0)
// 获取
index=sessionStorage.getItem('currentIndex');
// 删除一个
sessionStorage.removeItem("currentIndex");
// 删除全部
sessionStorage.clear();*/

export default {
    /** 按钮 禁止重复点击*/
    buttonClicked: function(e) {
        console.log(e);
        console.log(this);
        setTimeout(function () {
            that.isDisable= false
        }, 10000)
    }
}


function onStart(res) { //onStart回调
    // this.sho
};

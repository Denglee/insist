(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Layout"],{"0950":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"layout-box row-bg",attrs:{type:"flex",justify:"space-between"}},[a("el-col",{staticClass:"layout-left",attrs:{span:2}},[a("LeftNav")],1),a("el-col",{staticClass:"layout-right",attrs:{span:22}},[a("header",{staticClass:"layoutR-header"},[a("header-top"),a("tag-nav")],1),a("div",{staticClass:"back-top"},[a("el-backtop",{attrs:{bottom:20}},[a("el-tooltip",{attrs:{content:"回到顶部",placement:"right"}},[a("span")])],1),a("router-view")],1)])],1)},n=[],o=a("b147"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("aside",{staticClass:"layoutLeft-nav"},[a("div",{staticClass:"img-logoBox",on:{click:function(e){return t.goIndex()}}},[a("img",{staticClass:"img-logo",attrs:{src:"https://swim.zmtek.net/assets/images/logo-daka.png",alt:""}})]),a("el-menu",{staticClass:"Menu-LeftNav-Box",attrs:{collapse:t.isCollapse,"background-color":"#253954","text-color":"#fff","active-text-color":"#fff","default-active":"this.$route.path"}},t._l(t.StateNavList.data,(function(e,r){return a("el-submenu",{key:r,staticClass:"sunmenu-box",attrs:{"popper-class":"Menu-LeftNav",index:r+""}},[a("template",{slot:"title"},[a("i",{staticClass:"iconNav",class:"iconNav"+e.fonts}),a("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.name))])]),t._l(e.sub_menu,(function(e,n){return a("el-menu-item-group",{key:n},[""==e.action?a("el-menu-item"):a("el-menu-item",{attrs:{index:r+"-"+n,dataIndex2:r+"-"+n}},[a("router-link",{attrs:{to:{path:"/"+e.controller+"/"+e.action},dataPath:e.controller+"/"+e.action}},[t._v("\n                            "+t._s(e.name)+"\n                        ")])],1)],1)}))],2)})),1)],1)},i=[],l=(a("8e6e"),a("ac6a"),a("456d"),a("a481"),a("bd86")),c=a("2f62"),u=a("a474");function f(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function h(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?f(Object(a),!0).forEach((function(e){Object(l["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var v={name:"LeftNav",data:function(){return{localUrl:this.GLOBAL.localUrl,isCollapse:!0}},methods:h({},Object(c["b"])({getNavList:"StoreTagNav/actNavList"}),{getNavObj:function(){var t=this;Object(u["b"])().then((function(e){1==e.status&&t.getNavList(e),0==e.status&&(t.$message({message:e.info,type:"error",duration:1500,offset:40}),setTimeout((function(){t.$router.replace({path:"/login"})}),1500))})).catch((function(t){console.log(t)}))},goIndex:function(){this.$router.push({path:"/index"})},goNext:function(t){console.log(t);var e=t.currentTarget.dataset.datanum;console.log("".concat(e)),this.dataNum=e}}),created:function(){this.getNavObj()},computed:h({},Object(c["c"])({StateNavList:"StoreTagNav/getNavList",UserInfo:"StoreTagNav/getsUserInfo"}))},p=v,d=a("2877"),g=Object(d["a"])(p,s,i,!1,null,null,null),b=g.exports,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tag-nav"},[a("scroll-bar",{ref:"scrollBar"},t._l(t.openedPageList,(function(e,r){return a("div",{key:r,ref:"tag",refInFor:!0,staticClass:"tag-nav-item",class:t.isActive(e)?"cur":"",attrs:{to:e.path,Path:e.path},on:{click:function(e){return t.reloadRouter(e)}}},[t._v("\n                        "+t._s(e.title)+"\n                        "),a("i",{staticClass:"el-icon-close",on:{click:function(a){return a.preventDefault(),a.stopPropagation(),t.closeTheTag(e,r)}}})])})),0)],1)},O=[],y=(a("ac4d"),a("8a81"),a("7f7f"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"scrollWrap",staticClass:"scroll-wrap",on:{wheel:function(e){return e.preventDefault(),t.scroll(e)}}},[a("div",{ref:"scrollCont",staticClass:"scroll-cont",style:{left:t.left+"px"}},[t._t("default")],2)])}),j=[],$={data:function(){return{left:0,wheelSpeed:30}},methods:{scroll:function(t){var e=this.$refs.scrollWrap.offsetWidth,a=this.$refs.scrollCont.offsetWidth;if(a>e){var r=t.deltaY>0?-1*this.wheelSpeed:this.wheelSpeed;t.deltaY>0?Math.abs(this.left+r)<=a-e&&(this.left+=r):this.left+r<0?this.left+=r:this.left=0}},scrollToCurTag:function(t){var e=this.$refs.scrollWrap.offsetWidth,a=t.offsetWidth,r=t.offsetLeft;r<-1*this.left?this.left=-r:r+a>e&&(this.left=-(r+a-e))}}},N=$,w=Object(d["a"])(N,y,j,!1,null,null,null),x=w.exports;function P(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function S(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?P(Object(a),!0).forEach((function(e){Object(l["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):P(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var L={data:function(){return{defaultPage:"/index"}},computed:S({},Object(c["d"])("StoreActiveNav",["openedPageList"]),{tagNavList:function(){return this.$store.state.StoreActiveNav.openedPageList}}),mounted:function(){this.addTagNav()},created:function(){},watch:{$route:function(){this.addTagNav()}},methods:{reloadRouter:function(t){var e=t.target.getAttribute("Path");console.log(e),this.$router.replace({path:"/redirect",query:{nextPath:e}})},addTagNav:function(){this.$store.commit("StoreActiveNav/addTagNav",{name:this.$router.name,path:this.$route.path,title:this.$route.meta.title})},isActive:function(t){return t.path===this.$route.path},closeTheTag:function(t,e){console.log(t),console.log(e),console.log(this.tagNavList),this.$store.commit("StoreActiveNav/removeTagNav",t),this.$route.path==t.path&&(e?this.$router.push(this.tagNavList[e-1].path):(this.$router.push(this.defaultPage),"/index"==this.$route.path&&this.addTagNav()))},scrollToCurTag:function(){var t=this;this.$nextTick((function(){var e=!0,a=!1,r=void 0;try{for(var n,o=t.$refs.tag[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var s=n.value;if(s.to===t.$route.path){t.$refs.scrollBar.scrollToCurTag(s.$el);break}}}catch(i){a=!0,r=i}finally{try{e||null==o.return||o.return()}finally{if(a)throw r}}}))}},components:{ScrollBar:x}},T=L,C=Object(d["a"])(T,m,O,!1,null,null,null),k=C.exports,_={data:function(){return{localUrl:this.GLOBAL.localUrl,dialogFormVisible:"false",activeIndex:"1",activeIndex2:"1"}},computed:{},methods:{getGlobal:function(){},handleSelect:function(t,e){console.log(t,e)},changePass:function(){}},created:function(){this.getGlobal()},components:{HeaderTop:o["a"],LeftNav:b,TagNav:k}},A=_,I=(a("9713"),Object(d["a"])(A,r,n,!1,null,null,null));e["default"]=I.exports},9713:function(t,e,a){"use strict";var r=a("ecc1"),n=a.n(r);n.a},a481:function(t,e,a){"use strict";var r=a("cb7c"),n=a("4bf8"),o=a("9def"),s=a("4588"),i=a("0390"),l=a("5f1b"),c=Math.max,u=Math.min,f=Math.floor,h=/\$([$&`']|\d\d?|<[^>]*>)/g,v=/\$([$&`']|\d\d?)/g,p=function(t){return void 0===t?t:String(t)};a("214f")("replace",2,(function(t,e,a,d){return[function(r,n){var o=t(this),s=void 0==r?void 0:r[e];return void 0!==s?s.call(r,o,n):a.call(String(o),r,n)},function(t,e){var n=d(a,t,this,e);if(n.done)return n.value;var f=r(t),h=String(this),v="function"===typeof e;v||(e=String(e));var b=f.global;if(b){var m=f.unicode;f.lastIndex=0}var O=[];while(1){var y=l(f,h);if(null===y)break;if(O.push(y),!b)break;var j=String(y[0]);""===j&&(f.lastIndex=i(h,o(f.lastIndex),m))}for(var $="",N=0,w=0;w<O.length;w++){y=O[w];for(var x=String(y[0]),P=c(u(s(y.index),h.length),0),S=[],L=1;L<y.length;L++)S.push(p(y[L]));var T=y.groups;if(v){var C=[x].concat(S,P,h);void 0!==T&&C.push(T);var k=String(e.apply(void 0,C))}else k=g(x,h,P,S,T,e);P>=N&&($+=h.slice(N,P)+k,N=P+x.length)}return $+h.slice(N)}];function g(t,e,r,o,s,i){var l=r+t.length,c=o.length,u=v;return void 0!==s&&(s=n(s),u=h),a.call(i,u,(function(a,n){var i;switch(n.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,r);case"'":return e.slice(l);case"<":i=s[n.slice(1,-1)];break;default:var u=+n;if(0===u)return a;if(u>c){var h=f(u/10);return 0===h?a:h<=c?void 0===o[h-1]?n.charAt(1):o[h-1]+n.charAt(1):a}i=o[u-1]}return void 0===i?"":i}))}}))},ecc1:function(t,e,a){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["StatisRevenue"],{"39e4":function(t,e,i){},"3f6f":function(t,e,i){"use strict";var a=i("39e4"),l=i.n(a);l.a},"619c":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"echartsBox",staticClass:"echarts-box",style:t.style})},l=[],n={data:function(){return{eCharts:{}}},props:{width:{type:String},height:{type:String},eChartObj:{type:Object,default:{}}},created:function(){},mounted:function(){var t=this,e=this;window.onresize=function(){e.eCharts.resize()},this.$nextTick((function(){t.loadEchart()}))},computed:{style:function(){return{height:this.height,width:this.width}}},watch:{eChartObj:{handler:function(t,e){this.eChartObj=t,this.loadEchart()},deep:!0}},methods:{loadEchart:function(){this.eCharts=this.$echarts.init(this.$refs.echartsBox),this.eCharts.setOption(this.eChartObj)}}},s=n,c=i("2877"),o=Object(c["a"])(s,a,l,!1,null,null,null);e["a"]=o.exports},"7f39":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-breadcrumb",{staticClass:"nav-bread",attrs:{separator:"/"}},[i("el-breadcrumb-item",[i("span",{staticClass:"hover-bread",on:{click:function(e){return t.$emit("GoBack")}}},[i("i",{staticClass:"el-icon-back"}),t._v(t._s(t.breadTitle)+"\n            ")])]),i("el-breadcrumb-item",[t._v(t._s(t.breadContent1))])],1)],1)},l=[],n=i("a026");i("3c4e");const s=Object.prototype.hasOwnProperty;function c(t,e){return s.call(t,e)}const o=/(%|)\{([0-9a-zA-Z_]+)\}/g;var r=function(t){function e(t,...e){return 1===e.length&&"object"===typeof e[0]&&(e=e[0]),e&&e.hasOwnProperty||(e={}),t.replace(o,(i,a,l,n)=>{let s;return"{"===t[n-1]&&"}"===t[n+i.length]?l:(s=c(e,l)?e[l]:null,null===s||void 0===s?"":s)})}return e};r(n["default"]);var v={name:"navBread",props:{breadTitle:{type:String,default:function(){return"首页"}},breadContent1:{type:String,default:function(){return""}},breadContent2:{type:String,default:function(){return""}}},data:function(){return{}},methods:{},created:function(){}},A=v,u=(i("3f6f"),i("2877")),b=Object(u["a"])(A,a,l,!1,null,"622ba906",null);e["a"]=b.exports},"88f5":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAOCAYAAADez2d9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5QUMzNTJFOTI4OEUxMUVBQTQyQ0ZERDZBNEU3NUY2RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5QUMzNTJFQTI4OEUxMUVBQTQyQ0ZERDZBNEU3NUY2RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlBQzM1MkU3Mjg4RTExRUFBNDJDRkRENkE0RTc1RjZEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlBQzM1MkU4Mjg4RTExRUFBNDJDRkRENkE0RTc1RjZEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+tdKJLgAAAZ5JREFUeNqs1MsrRGEYx/EZxv2SSe63RhQKNWmILCxkJ1aWytIfYGknGQuXhbVkYWUtdnLdIJuRkHIpl6jJ/TJ83/qdmjIO08xTn+Z0zpz3Oe/7Pu/j/PIPO2wiAYn6zUc53EhCCA+4xBlede/zt8FcNveT0YJGZMKJNlRqUPMBQazjXP8/xiqu8YEvu2RmgFy0ohQ+dOl/5uWCCB9WjUekYx8eXGAPB5rxj2RmaZpRgwEUakZ5DvvIEhNNKNOMFrEpF+HJ3FqyHtTDixRH9JGKCl33og7FWEHApUQdGNR1g81eRhMeFUu/tmTEDJqBJ1Wd1xHfqMKVCinbJLvBmtbZVFm79i8eYY7FDOZMHpeqxVhWVQ2hU+sfS5xiGrO4t0rdCjOzDYxhCe8xJDrBFOatRJHOWUgJ/Ureo/uHWtoP7cEt0lRp2XhGEXJwhAks4O6vDmKSbGNcz03X2A3rDBZziEtUwbXo0+CTmlHwv+0qpISj6Nb6mwFe9MxqQ/tqYz61q4AOczCa3hiecFfnJdIeWk13Czt65+23Ab8FGADLiGhr0NYOhgAAAABJRU5ErkJggg=="},"9a0a":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAPCAYAAAAVk7TYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGU2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMS0xN1QxNToyMzozNiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDEtMTdUMTY6NDE6NDcrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDEtMTdUMTY6NDE6NDcrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZTBkNjdlNzUtNmQxOC1iZDQ1LTk1MDgtNzMzMWRlMDZiNjFhIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6N2ZlYTkwNzctMDFhYy04ZTQyLWIxZWMtNGJmMmJjZGRiZjdhIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NmEzNThkZTAtNTVlMC1jYzQ4LWExMjEtMWJhNWEzMjQwYTQwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2YTM1OGRlMC01NWUwLWNjNDgtYTEyMS0xYmE1YTMyNDBhNDAiIHN0RXZ0OndoZW49IjIwMjAtMDEtMTdUMTU6MjM6MzYrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZTBkNjdlNzUtNmQxOC1iZDQ1LTk1MDgtNzMzMWRlMDZiNjFhIiBzdEV2dDp3aGVuPSIyMDIwLTAxLTE3VDE2OjQxOjQ3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoRaLmEAAAEmSURBVDiNvdTBKwRRHAfwz25L9i7lwoGbmxxEclwHSnFRDnt1VlIcbQ5aKQfFn0BRFMpJSWpr5aqUXISLKOWyDjNb09hZyq5vTa9+b958Xr+ZealKpeK/koGJ0ku9e9IYxgzmaswf4RR7eEx6yOFAu3QdpAMneMd5AgTj2MQD9tFZb9fx9OM4XJxDts6GoslgEndY/QnLYgWXGEPrL5F42rAo6EpfLaxH0PelPyDx5HCAwTh2hZEGIdH0YhejUWyjCVA1LbiOYkWsNQG6xyxeo9gHFrDcQOgG0zirFuKffqFBYBl5lKLFWv9ZAfMNgMrxiUzCgvVwLIbjDi7wjFvBO+hCd3hNYUjQunw4fksSVgXfBOfitlhL8BSpfYbAVhIEqf889b8A4Uk8olQXYxwAAAAASUVORK5CYII="},a85f:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"layoutR-main"},[a("el-tabs",{directives:[{name:"show",rawName:"v-show",value:t.showState.tabRevenueState,expression:"showState.tabRevenueState"}],staticClass:"vip-tabBox pubWidth",attrs:{id:"staffPay-tabBox"},on:{"tab-click":t.tabTotal},model:{value:t.activeTabName,callback:function(e){t.activeTabName=e},expression:"activeTabName"}},[a("el-tab-pane",{attrs:{lazy:t.tabLazy,label:"营收总览",name:"revenueTotal"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"index-item revenue-item"},[a("header",{staticClass:"index-item-title"},[a("div",{staticClass:"title"},[t._v("总收入")])]),a("ul",{staticClass:"index-item-tipUl"},[a("li",[a("span",{staticClass:"addVip-tagY"}),t._v("本月")]),a("li",[a("span",{staticClass:"addVip-tagB"}),t._v("上月")])]),a("div",{staticClass:"flex-between revenueRatio-tip clearfix"},[a("ve-funnel",{style:t.funnelStyle,attrs:{data:t.revenueTotal,"legend-visible":!1,colors:t.totalColor,settings:t.funnelSettings}}),a("ul",{staticClass:"vipNum"},[a("li",[t._v("上月："),a("span",{staticClass:"vipTipY"},[t._v(t._s(t.revenueTotal.rows[0].value))]),t.revenueRatio.lastMonth>0?a("span",{staticClass:"vipTipG revenue-tip"},[a("i",{staticClass:"el-icon-top"}),t._v("\n                                        "+t._s(t.revenueRatio.lastMonth)+"\n                                    ")]):a("span",{staticClass:"vipTipY revenue-tip"},[a("i",{staticClass:"el-icon-bottom"}),t._v(t._s(t._f("mathFloor")(t.revenueRatio.lastMonth))+"\n                                    ")])]),a("li",[t._v("本月："),a("span",{staticClass:"vipTipB"},[t._v(t._s(t.revenueTotal.rows[1].value))]),t.revenueRatio.nowMonth>0?a("span",{staticClass:"vipTipB revenue-tip"},[a("i",{staticClass:"el-icon-top"}),t._v(t._s(t.revenueRatio.nowMonth)+"\n                                    ")]):a("span",{staticClass:"vipTipB revenue-tip"},[a("i",{staticClass:"el-icon-bottom"}),t._v(t._s(t._f("mathFloor")(t.revenueRatio.nowMonth))+"\n                                    ")])])])],1)])]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"index-item revenue-item"},[a("header",{staticClass:"index-item-title",on:{click:function(e){return t.changeData(e)}}},[a("div",{staticClass:"title"},[t._v("现有会员")])]),a("ul",{staticClass:"index-item-tipUl"},[a("li",[a("img",{attrs:{src:i("9a0a"),alt:""}}),t._v("潜在会员")]),a("li",[a("img",{attrs:{src:i("b874"),alt:""}}),t._v("正式会员")]),a("li",[a("img",{attrs:{src:i("88f5"),alt:""}}),t._v("私教会员")])]),a("div",{staticClass:"flex-between"},[a("ul",{staticClass:"vipNum"},[a("li",[t._v("潜在会员： "),a("span",{staticClass:"vipTipG"})]),a("li",[t._v("正式会员： "),a("span",{staticClass:"vipTipB"})])])])])]),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"index-item revenue-item"},[a("header",{staticClass:"index-item-title",on:{click:function(e){return t.changeData(e)}}},[a("div",{staticClass:"title"},[t._v("现有会员")])]),a("ul",{staticClass:"index-item-tipUl"},[a("li",[a("img",{attrs:{src:i("9a0a"),alt:""}}),t._v("潜在会员")]),a("li",[a("img",{attrs:{src:i("b874"),alt:""}}),t._v("正式会员")]),a("li",[a("img",{attrs:{src:i("88f5"),alt:""}}),t._v("私教会员")])]),a("div",{staticClass:"flex-between"},[a("ul",{staticClass:"vipNum"},[a("li",[t._v("潜在会员： "),a("span",{staticClass:"vipTipG"})]),a("li",[t._v("正式会员： "),a("span",{staticClass:"vipTipB"})])])])])])],1)],1),a("el-tab-pane",{attrs:{lazy:t.tabLazy,label:"营收详细",name:"revenueDetails"}})],1)],1)},l=[],n=(i("7f7f"),i("619c")),s=i("7f39"),c=i("a474"),o={name:"StatisRevenue",data:function(){return this.totalColor=["#FF8A7E","#005AD4"],this.OverdueColor=["#FFBE00","#FF8A7E","#4CCBEB","#005AD4"],this.vipPtColor=["#FFBE00","#FF8A7E","#1EAAA1","#4CCBEB"],this.extend={tooltip:{trigger:"axis",textStyle:{fontSize:12}},grid:{top:"30px",left:"80px",right:"60px",bottom:"40px",width:"90%",height:"80%"},xAxis:{axisTick:{alignWithLabel:!0},type:"category",axisLine:{lineStyle:{color:"#8E8E8E"}},axisLabel:{margin:15,textStyle:{color:"#8E8E8E"}}},yAxis:{type:"value",axisLine:{lineStyle:{color:"#8E8E8E"}}},series:{type:"line",symbolSize:9,lineStyle:{normal:{type:"dashed"}}}},this.lineGrid={show:!0,top:"30px",left:"80px",right:"60px",bottom:"40px",width:"90%",height:"80%"},{activeTabName:"revenueTotal",tabLazy:!0,showState:{tabRevenueState:!0},picStyle:{height:"200px",width:"200px"},funnelStyle:{height:"200px",width:"200px"},funnelSettings:{offsetY:80,offsetX:10,width:"100%",label:{normal:{position:"inner",show:!1}},labelLine:{normal:{show:!1}}},lineStyle:{height:"180px",width:"100%"},revenueTotal:{columns:["name","value"],rows:[{name:"",value:0},{name:"",value:0}]},revenueRatio:{lastMonth:0,nowMonth:0}}},methods:{tabTotal:function(t,e){var i=t.name;this.callTabApi(i)},getRevenueTotal:function(){var t=this;Object(c["r"])().then((function(e){console.log(e);var i=[],a=e[1],l=e[2];i.push(a,l),t.revenueTotal.rows=i;var n=e[0].value,s=e[1].value,c=e[2].value;console.log(s),console.log(n),console.log(c);var o=s-n,r=c-s;console.log(o),console.log(r),t.revenueRatio.lastMonth=o,t.revenueRatio.nowMonth=r})).catch((function(t){console.log(t)}))},callTabApi:function(t){console.log(t),"revenueTotal"==t&&this.getRevenueTotal()}},created:function(){var t=this.activeTabName;this.callTabApi(t)},components:{eCharts:n["a"],navBread:s["a"]}},r=o,v=i("2877"),A=Object(v["a"])(r,a,l,!1,null,null,null);e["default"]=A.exports},b874:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAOCAYAAAAxDQxDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5Q0UyMjZEMjI4OEUxMUVBQTdENUFBMTBGMTY0NTQ5NSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5Q0UyMjZEMzI4OEUxMUVBQTdENUFBMTBGMTY0NTQ5NSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlDRTIyNkQwMjg4RTExRUFBN0Q1QUExMEYxNjQ1NDk1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlDRTIyNkQxMjg4RTExRUFBN0Q1QUExMEYxNjQ1NDk1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+h4mwBAAAAZBJREFUeNqs1MsrRVEUx/F7uV3v9zOSlBQhKQOZGBkoA2HAP2NmoEQZUKQwlAFGpowkkkfIgDyvPEvII8d31e/UKefedFn1aZ/uY6+919lrBwN9u4EokeCRhzLkIgUOnnGDUzzhSxy/yUI+nyUiGdVoQoEmaESdZyIbV3GiZ0u4jmN86D++iYJIRwuqUIFOZOEdmVqAN4rxpsVdYA532MSGEv5IZCuuRS/q8alyxYpMz7Nb1jQsYwH7OHQT2S4a0IFmlSc7EF9UamxDEVawZOW1RDXoR6qSZAT+HiUqZ7qqNBLSrl7QGuVwxBu2ozC2bLSJdzCgl9quGv9HXGMW49YGIfXAmsr3im6V8S9xiUmM4tZtSjfshAxh3nss4wibeApjbhK/ht3GsBqwR8f1TLdAWDdBRAssRY6qkI9CXCnJhH4X82awlzeoJu3CkXrCyvGg0RKV61RVqtzv2sUMzn9zBdlu9pQsone4qJ05nqvlQKM1dxIeMY17v3oGY1yqQU3gaLVOjMs3rO/fok32LcAAQo9i/oqCFCsAAAAASUVORK5CYII="}}]);
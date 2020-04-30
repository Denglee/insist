
let toolTip= {
    trigger: 'axis',
    textStyle: {
        fontSize:12,
    },
    formatter : function (params) {
        var rec = '';
        for(var i = 0;i < params.length;i++){
            // console.log(params[i].data[1]);
            let data = params[i].data[1];
            if(data == undefined){
                data = 0;
            }
            var rea = '<div style="margin:2px 0 0 4px;color:#f7f8f9;">' +
            ''+ params[i].axisValue + '</div>';
            var reb = '<div style="margin: 4px">'+
            '<span style="display:inline-block;margin-right:2px;border-radius:8px;width:8px;height:8px;background-color:' + params[i].color +';"></span>' +
            // '<span style="display:inline-block;margin:2px 4px;">'+ params[i].seriesName+'</span>:  '+params[i].data+'' +
            '<span style="display:inline-block;margin:2px 4px;">'+ params[i].seriesName+'</span>:' +
            '<span style="display:inline-block;margin:0 4px;font-size:16px;">'+data+'</span>' +
            '</div>';
            rec= rec + reb;
        }
        return rea + rec;
    },
};

/*折线图 配置*/
let  lineExtendConfig = {
    tooltip:toolTip,

    grid: {
        // show:true,//是否显示直角坐标系网格。[ default: false ]
        // borderColor:"#c45455",//网格的边框颜色
        top: "30px",
        left: "3%",
        right: "3%",
        bottom: "4%",
        width: "94%", //图例宽度
        height: "80%", //图例高度
    },

    xAxis: {
        axisTick: {
            alignWithLabel: true
        },
        type: 'category',
        axisLine: {
            lineStyle: {
                color: '#8E8E8E',
            }
        },
        //设置字体倾斜
        axisLabel: {
            // interval:0,
            // rotate:10,//倾斜度 -90 至 90 默认为0
            margin:15,
            textStyle: {
                color: "#8E8E8E"
            }
        },
    },

    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: '#8E8E8E',
            }
        },
    },
    series: {
        type: 'line',
        // animation:false,
        //     borderWidth: 2,
        symbolSize: 9,   //设定实心点的大小
        symbolRotate : 10,
            // 折线拐点的样式
         itemStyle: {
            emphasis:{ // 鼠标经过时：
                symbolSize: 9,   //设定实心点的大小
                borderWidth:1,

                width:10,
                height:10,
                borderRadius:50,
                // color:'#005ad4',
                // borderColor:'#005ad4',
            }
        },

    },

};

/*柱状图 配置*/
let histogramExtendConfig ={
    tooltip:toolTip,
    grid: {
        top: "30px",
        left: "3%",
        right: "3%",
        bottom: "4%",
        width: "94%", //图例宽度

        // show:true,//是否显示直角坐标系网格。[ default: false ]
        // borderColor:"#DADFE8",//网格的边框颜色
        // top: "30px",
        // left: "10px",
        // right: "20px",
        // bottom: "10px",
    },
    xAxis: {
        axisTick: {
            alignWithLabel: true
        },
        type: 'category',
        axisLine: {
            lineStyle: {
                color: '#8E8E8E',
            }
        },
        //设置字体倾斜
        axisLabel: {
            // interval:0,
            // rotate:10,//倾斜度 -90 至 90 默认为0
            margin:15,
            textStyle: {
                color: "#8E8E8E"
            }
        },
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: '#8E8E8E',
            }
        },
    },
    series: {
        barWidth: 20
    },
};

let hisRevenueExtendConfig ={
    // tooltip:toolTip,
    grid: {
        // show:true,//是否显示直角坐标系网格。[ default: false ]
        // borderColor:"#DADFE8",//网格的边框颜色
        top: "30px",
        left: "10px",
        right: "20px",
        bottom: "10px",
    },
    xAxis: {
        axisTick: {
            alignWithLabel: true
        },
        type: 'category',
        axisLine: {
            lineStyle: {
                color: '#8E8E8E',
            }
        },
        //设置字体倾斜
        axisLabel: {
            // interval:0,
            // rotate:10,//倾斜度 -90 至 90 默认为0
            margin:15,
            textStyle: {
                color: "#8E8E8E"
            }
        },
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: '#8E8E8E',
            }
        },
    },
    series: {
        barWidth: 20,
        itemStyle: {
            normal: {
                //这里是重点
                color: function(params) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = ['#ff8a7e','#005ad4','#00a0e9','#8763ce','#1eaaa1','#4ccbeb','#5b5ec7','#ffbe00','#005ad4','#00a0e9','#8763ce',];
                    return colorList[params.dataIndex];
                }
            }
        }
    },
};

/*柱状图 配置*/
let barExtendConfig ={
    tooltip:toolTip,
    grid: {
        // show:true,//是否显示直角坐标系网格。[ default: false ]
        // borderColor:"#DADFE8",//网格的边框颜色
        left: '3%',
        right: '4%',
        bottom: '10px',
        top:'10px',
        containLabel: true
    },

    /*xAxis: {
        axisTick: {
            alignWithLabel: true
        },
        type: 'category',
        axisLine: {
            lineStyle: {
                color: '#8E8E8E',
            }
        },
        //设置字体倾斜
        axisLabel: {
            // interval:0,
            // rotate:10,//倾斜度 -90 至 90 默认为0
            margin:15,
            textStyle: {
                color: "#8E8E8E"
            }
        },
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: '#8E8E8E',
            }
        },
    },*/

    series: {
        barWidth: 20,
        type: 'bar',
        itemStyle: {
            normal: {
                //这里是重点
                color: function(params) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = ['#ff8a7e','#005ad4','#00a0e9','#8763ce','#1eaaa1','#4ccbeb','#5b5ec7','#ffbe00'];
                    return colorList[params.dataIndex]
                }
            }
        }
    }
};

/*饼状图配置*/
let picExtendConfig = {

    tooltip: {
        trigger: 'item',
        position: 'right'
    },
    series:{
        tooltip: {
            trigger: 'item',
            position: 'right'
        },
        // offsetY: 100,
        // offsetX: 100,
        // radius: 70,
        radius: '70%',  //大小
        center: ['50%', '40%'], // 位置
        label: {   //去掉指引线
            normal: {
                position: 'inner',
                show: false,
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
    }
}

export {
    lineExtendConfig,
    histogramExtendConfig,
    hisRevenueExtendConfig,
    picExtendConfig,
    barExtendConfig,
}
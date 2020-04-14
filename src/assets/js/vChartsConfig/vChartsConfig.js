/*折线图 配置*/
let  lineExtendConfig = {
    tooltip: {
        trigger: 'axis',
        textStyle: {
            fontSize:12,
        },
        // formatter : function (params) {
        //
        //     var rec = '';
        //     for(var i = 0;i < params.length;i++){
        //         var rea = '<div style="margin:2px 0 0 4px;color:#f7f8f9;">' +
        //             ''+ params[i].axisValue + '</div>';
        //         var reb = '<div style="margin: 4px">'+
        //             '<span style="display:inline-block;margin-right:2px;border-radius:8px;width:8px;height:8px;background-color:' + params[i].color +';"></span>' +
        //             '<span style="display:inline-block;margin:2px 4px;">'+ params[i].seriesName+'</span>:  '+params[i].data+'' +
        //             '</div>';
        //         rec= rec + reb;
        //     }
        //     return rea + rec;
        // },
    },

    grid: {
        // show:true,//是否显示直角坐标系网格。[ default: false ]
        // borderColor:"#c45455",//网格的边框颜色
        top: "30px",
        left: "4%",
        right: "4%",
        bottom: "4%",
        width: "92%", //图例宽度
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
        symbolSize: 9,   //设定实心点的大小
        lineStyle: {
            normal: {
                type: 'dashed',
            }
        },
    }
};

/*柱状图 配置*/
let histogramExtendConfig ={
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
        barWidth: 30
    },
};


let hisRevenueExtendConfig ={
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
        barWidth: 30,
        itemStyle: {
            normal: {
                //这里是重点
                color: function(params) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = ['#84CCC9','#AA89BD', '#F19EC2', '#FF8A7E', '#00A0E9','#0000FF', '#FFBE00','#00B7EE'];
                    return colorList[params.dataIndex]
                }
            }
        }
    },
};

/*柱状图 配置*/
let barExtendConfig ={
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
        barWidth: 30,
        type: 'bar',
        itemStyle: {
            normal: {
                //这里是重点
                color: function(params) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = ['#84CCC9','#AA89BD', '#F19EC2', '#FF8A7E', '#00A0E9','#0000FF', '#FFBE00','#00B7EE'];
                    return colorList[params.dataIndex]
                }
            }
        }
    }
};

/*饼状图配置*/
let picExtendConfig = {
    series:{
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
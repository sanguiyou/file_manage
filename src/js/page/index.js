var chart1;
var chart2;
var chart3;

function setChart1() {
    var dom = document.getElementById("chart_01");
    chart1 = echarts.init(dom);
    option = null;
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: "成交",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: 0.3,
            lineStyle: {
                width: 1,
                color: '#d6ebfe',
                opacity: 1
            },
            areaStyle: {
                color: '#d6ebfe',
                opacity: 0.5
            }
        }, {
            name: "通过",
            data: [720, 1232, 701, 1234, 1090, 1030, 320],
            type: 'line',
            smooth: 0.3,
            lineStyle: {
                width: 1,
                color: '#b4e2ec',
                opacity: 1
            },
            areaStyle: {
                color: '#b4e2ec',
                opacity: 0.5
            }
        }],
        grid: {
            show: true,
            height: 400,
            x: 50,
            x2: 20,
            y: 12
        }
    };
    chart1.setOption(option, true);
}

function setChart2() {
    var dom = document.getElementById("chart_02");
    chart2 = echarts.init(dom);
    var option = {
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            min: 0,
            max: 100,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],           // 文本，默认为数值文本
            calculable: true
        },
        series: [
            {
                tooltip: {
                    formatter: function (params) {
                        var html = "<div >";
                        var data = params.data;
                        html += "<span style='color:#efecec;'>项目</span>：<span style='font-size:20px;color:#f57a5b;'>" + data.value + "</span><br/>";
                        html += "<span style='color:#efecec;'>金额</span>：<span style='font-size:20px;color:#f57a5b;'>" + data.money + "</span>";
                        html += "</div>";
                        return html;
                    }
                },
                name: '项目',
                type: 'map',
                mapType: 'china',
                roam: false,
                top: '0%',
                bottom: '0%',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    {name: '北京', value: 1, money: 2},
                    {name: '天津', value: 2, money: 2},
                    {name: '上海', value: 3, money: 2},
                    {name: '重庆', value: 4, money: 2},
                    {name: '河北', value: 5, money: 2},
                    {name: '河南', value: 6, money: 2},
                    {name: '云南', value: 7, money: 2},
                    {name: '辽宁', value: 8, money: 2},
                    {name: '黑龙江', value: 9, money: 2},
                    {name: '湖南', value: 10, money: 2},
                    {name: '安徽', value: 11, money: 2},
                    {name: '山东', value: 12, money: 2},
                    {name: '新疆', value: 13, money: 2},
                    {name: '江苏', value: 14, money: 2},
                    {name: '浙江', value: 15, money: 2},
                    {name: '江西', value: 16, money: 2},
                    {name: '湖北', value: 17, money: 2},
                    {name: '广西', value: 18, money: 2},
                    {name: '甘肃', value: 19, money: 2},
                    {name: '山西', value: 20, money: 2},
                    {name: '内蒙古', value: 21, money: 2},
                    {name: '陕西', value: 22, money: 2},
                    {name: '吉林', value: 23, money: 2},
                    {name: '福建', value: 24, money: 2},
                    {name: '贵州', value: 25, money: 2},
                    {name: '广东', value: 26, money: 2},
                    {name: '青海', value: 27, money: 2},
                    {name: '西藏', value: 28, money: 2},
                    {name: '四川', value: 29, money: 2},
                    {name: '宁夏', value: 30, money: 2},
                    {name: '海南', value: 31, money: 2},
                    {name: '台湾', value: 32, money: 2},
                    {name: '香港', value: 33, money: 2},
                    {name: '澳门', value: 34, money: 2}
                ]
            }
        ]
    };
    ;
    chart2.setOption(option, true);
}

function setChart3() {
    var dom = document.getElementById("chart_03");
    chart3 = echarts.init(dom);
    option = null;
    var colors = ['#9393FE', '#EA51EE', '#FDEECF'];
    option = {
        color: colors,

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            right: '1%',
            left: '3%'
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: ['陈天宝部门', '安冰部门', '全塞部门', '如为部门', '能华部门', '周堵红部门', '李东部门']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'kvar',
                min: 0,
                max: 100,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                }
            },
            {
                type: 'value',
                name: 'kvar',
                min: 0,
                max: 100,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[1]
                    }
                }
            },
            {
                type: 'value',
                name: 'kvar',
                min: 0,
                max: 100,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[2]
                    }
                }
            }
        ],
        series: [
            {
                name: '年度任务(kvar)',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
                name: '已完成任务(kvar)',
                type: 'bar',
                yAxisIndex: 1,
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
            },
            {
                name: '回款率',
                type: 'line',
                yAxisIndex: 2,
                data: [5.0, 2.2, 3.3, 10.5, 6.3, 15.2, 50.3],
                smooth: 0.3,
                lineStyle: {
                    width: 1,
                    color: colors[2],
                    opacity: 1
                },
                areaStyle: {
                    color: colors[2],
                    opacity: 0.5
                }
            }
        ]
    };

    chart3.setOption(option, true);
}

window.onresize = function () {
    chart1 && chart1.resize();
    chart2 && chart2.resize();
    chart3 && chart3.resize();
}
setChart1();
setChart2();
setChart3();
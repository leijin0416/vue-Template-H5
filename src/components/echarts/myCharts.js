import echarts from 'echarts'
import 'echarts/map/js/china.js'  // 引入地图，3.0后需要

/**
 * 图标折叠
 * -用法：_that.$chart.lineChina('chart', newArr);  -父传子
 * -参考：https://www.jianshu.com/p/8cac22daca98
 * 
 * @param {id} Vue  标签ID
 * @param {mapData} Vue     图表数据
 */
const install = function (Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    // 画一条简单的线
                    line1: function (id, xAxisData) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            title: {
                                text: '堆叠区域图',
                                x: 'center',
                                top: 0
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    label: {
                                        backgroundColor: '#6a7985'
                                    }
                                }
                            },
                            legend: {
                                x: 'center',      // 可设定图例在左、右、居中
                                y: 'top',        // 可设定图例在上、下、居中,
                                top: 25,
                                data: ['邮件营销', '联盟广告']
                            },
                            toolbox: {
                                show: false,      // 是否显示工具栏组件
                                feature: {
                                    saveAsImage: {}
                                }
                            },
                            grid: {
                                left: '15px',
                                right: '15px',
                                bottom: '0%',
                                containLabel: true
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: xAxisData
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '邮件营销',
                                    type: 'line',
                                    stack: '总量',
                                    smooth: 0.3,    // 线条曲线
                                    itemStyle: {
                                        normal: {
                                            color: '#b198dc',   // 改变折线点的颜色
                                            lineStyle: {
                                                color: '#b198dc' // 改变折线颜色
                                            }
                                        }
                                    },
                                    areaStyle: {
                                        normal: { color: 'transparent', }  // 改变区域颜色
                                    },
                                    data: [120, 132, 101, 134, 90, 230, 210]
                                },
                                {
                                    name: '联盟广告',
                                    type: 'line',
                                    stack: '总量',
                                    smooth: 0.3,
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'top'
                                        }
                                    },
                                    itemStyle: {
                                        normal: {
                                            color: '#ff8762',   // 改变折线点的颜色
                                            lineStyle: {
                                                color: '#ff8762' // 改变折线颜色
                                            }
                                        }
                                    },
                                    areaStyle: {
                                        normal: { color: 'rgb(213, 213, 213)', }  // 改变区域颜色
                                    },
                                    data: [220, 182, 191, 234, 290, 330, 310]
                                }
                            ]
                        };
                        this.chart.setOption(optionData);
                    },
                    lineChina: function (id, mapData) {
                        this.chart = echarts.init(document.getElementById(id));
                        this.chart.clear();

                        const optionData = {
                            backgroundColor: '#fbfbfb',  
                            title: {
                                text: '中国疫情图',
                                left: 'center'
                            },
                            tooltip: {
                                trigger: 'item'
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['中国疫情图']
                            },
                            visualMap: {
                                type: 'piecewise',
                                pieces: [
                                    { min: 5000, max: 1000000, label: '>= 10000人', color: '#451913' },
                                    { min: 2000, max: 4999, label: '5000-9999人', color: '#6c190e' },
                                    { min: 500, max: 1999, label: '1000-4999人', color: '#974236' },
                                    { min: 100, max: 499, label: '100-999人', color: '#ee7263' },
                                    { min: 1, max: 99, label: '1-99人', color: '#f5bba7' },
                                ],
                                color: ['#E0022B', '#E09107', '#A3E00B']
                            },
                            toolbox: {
                                show: false, // 下载按钮
                                orient: 'vertical',
                                left: 'right',
                                top: 'center',
                                feature: {
                                    mark: { show: true },
                                    dataView: { show: true, readOnly: false },
                                    restore: { show: true },
                                    saveAsImage: { show: true }
                                }
                            },
                            roamController: {
                                show: true,
                                left: 'right',
                                mapTypeControl: {
                                    'china': true
                                }
                            },
                            series: [
                                {
                                    name: '确诊数',
                                    type: 'map',
                                    mapType: 'china',
                                    roam: false,
                                    showLegendSymbol: false,    // 圆点显示
                                    symbol: 'circle',
                                    itemStyle: {
                                        // color: 'transparent' // 圆点显示
                                    },
                                    label: {
                                        normal: {
                                            show: true,     // 文字显示
                                            textStyle: {
                                                fontSize: 10,
                                                color: '#333',
                                                fontWeight: 'lighter'
                                            }
                                        }
                                    },
                                    data: mapData
                                }
                            ]
                        };
                        this.chart.setOption(optionData);
                    }
                }
            }
        },
    })
}

export default {
    install
}
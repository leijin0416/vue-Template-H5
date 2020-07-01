<template>
    <!-- echarts案例 -->
	<div class="page v-router">
		<div class="container">
            <div class="v-echarts-box">
                <div class="v-echarts" id="mapChart" :style="{width: screenWidth+'px'}"></div>
                <div class="v-echarts" id="myChart" :style="{width: screenWidth+'px'}"></div>
            </div>
		</div>
	</div>
</template>

<script>
import { ajWebGetSendChina } from '@/mock/api/mock';

export default {
	name: "",
	//组件
	components: {
	},
	//接收父组件传参
	props: {},
	data() {
		return {
            screenWidth: '',
			bg: require('@/assets/img/hk/logo.png'),
		}
    },
    created() {
        let _that = this;
        // 获取当前屏幕的宽度
        this.screenWidth = document.body.clientWidth;
        window.onresize = () => {
            return (() => {
                this.screenWidth = document.body.clientWidth;
            })();
        };
        _that.$nextTick( () => {
            _that.initChart();
            _that.fetchData();
        });
        console.log(this.screenWidth);
    },
	//页面初始化
	mounted(){
        let _that = this;
    },
	//监听click方法
	methods: {
        fetchData () {
            let _that = this;
            ajWebGetSendChina({
            }).then( res => {
                let data = JSON.parse(res.data.data);
                let newArr = [];
                // 获取到各个省份的数据
                var province = data.areaTree[0].children;
                for (var i = 0; i < province.length; i++) {
                    var json = {
                        name: province[i].name,
                        value: province[i].total.confirm
                    }
                    newArr.push(json)
                }
                // 疫情地图
                _that.$chart.lineChina('mapChart', newArr);
                // console.log(newArr)
                // console.log(data.areaTree);
            })
        },
        /**
         *  挂载
         */
        initChart() {
            let _that = this;
            let newArr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            let xAxisName ="价格";
            let xAxisNameTwo ="成交量";
            _that.$chart.line1('myChart', newArr, xAxisName, xAxisNameTwo);
        }
	}
}
</script>

<style lang="scss" scoped>
.v-echarts {
    height: 600px;
    padding: 0 30px 30px;
    box-sizing: border-box;
}
</style>

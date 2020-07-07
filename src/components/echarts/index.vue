<template>
	<div class="page">
		<div class="container">
            <div class="v-echarts-map" id="chartMap"></div>
            <div class="v-echarts" id="myChart" :style="{width: screenWidth+'px'}"></div>
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
            xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			bg: require('@/assets/img/hk/logo.png'),
		}
    },
    created() {
        let _that = this;
        _that.screenWidth = document.body.clientWidth;
        window.onresize = () => {
            return (() => {
                _that.screenWidth = document.body.clientWidth;
            })();
        };
        _that.$nextTick( () => {
            _that.fetchData();
        })
    },
	//页面初始化
	mounted(){
    },
	//监听click方法
	methods: {
        fetchData () {
            let _that = this;
            ajWebGetSendChina({
            }).then( res => {
                let data = JSON.parse(res.data.data);
                let newArr = [];
                //获取到各个省份的数据
                var province = data.areaTree[0].children;
                for (var i = 0; i < province.length; i++) {
                    var json = {
                        name: province[i].name,
                        value: province[i].total.confirm
                    }
                    newArr.push(json)
                }
                // console.log(newArr)
                _that.initChart(newArr)
                // console.log(data.areaTree);
            })
        },
        /**
         *  挂载
         */
        initChart(newArr) {
            let _that = this;
            let newArrs = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            let xAxisName = '价格';
            let xAxisNameTwo = '成交量';

            _that.$chart.line1('myChart', newArrs, xAxisName, xAxisNameTwo);
            _that.$chart.lineChina('chartMap', newArr);
        }
	}
}
</script>

<style lang="scss" scoped>
.v-echarts {
    width: 100%;
    height: 600px;
}
.v-echarts-map {
    width: 100%;
    height: 800px;
}

@media only screen and (max-width: 375px) {
}
</style>

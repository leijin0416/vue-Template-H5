<template>
	<div class="page v-router" :class="dynamicClass">
        <van-button type="primary">主要按钮</van-button>
        <p>“工业品采购上一呼百应！”，一呼百应工业品直卖网（www.youboy.com）优选710多万家制造业云工厂直卖，劳保用品、包装印刷、化工橡塑、电子仪表、五金建材、电动工具、机械配件、原材料等2000多品类供应链产品。</p>
	</div>
</template>

<script>

export default {
	data() {
		return {
            navActive: 0,      
            icon: {
                active: 'https://img.yzcdn.cn/vant/user-active.png',
                inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
            },
            dynamicClass: 'avh',
			valLocale: 'zh_CN',
			orIPhone: true
		}
	},
	//组件
	components: {
	},
	//接收父组件传参
	props: {
	},
	//页面初始化
	created(){
	},
	watch: {
		"orIPhone": {
			handler: function(newer, older) {
				if (newer == null) {
					return
				} else {
					let _that = this;
					_that.orIPhone = newer;
					//this.getList(); // methods中定义好的获取数据列表的方法
					//alert(newer)
				}
			},
	　　　　deep: true
		}
	},
	//监听click方法
	methods: {
	},
	destroyed () {

    }
}
</script>

<style lang="scss" scoped>
.page {
    p {
        font-size: 32px;
    }
}

//小于1024
@media only screen and (max-width: 1024px) {
}
</style>

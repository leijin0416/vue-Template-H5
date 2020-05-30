<template>
	<iframe ref="iframe" id="bdIframe" :src="bdTokenUrl" frameborder="0" scrolling="no" width = "100%" ></iframe>
	
</template>

<script>
import vue from 'vue'


export default {
	name: "",
	//组件
	components: {
	},
	//接收父组件传参
	props: {},
	data() {
		return {
			bdTokenUrl: 'http://www.ethexc.io/pdf/whitepaper_en.pdf'
		}
	},
	//页面初始化
	mounted(){
		const oIframe = document.getElementById('bdIframe');
        const deviceWidth = document.documentElement.clientWidth;
        const deviceHeight = document.documentElement.clientHeight;
        oIframe.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
        oIframe.style.height = (Number(deviceHeight)) + 'px'; //数字是页面布局高度差

	},
	//监听click方法
	methods: {
	},
	
}
</script>

<style lang="" scoped>
</style>

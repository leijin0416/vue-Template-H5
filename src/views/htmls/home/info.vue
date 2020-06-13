<template>
	<div class="page">
		<div class="container-wd">
			<v-canvasImgUrl />
            <!-- <router-link to="/home">返回首页</router-link> -->
		</div>
	</div>
</template>

<script>
import qrCanvasImgUrl from "@/components/qrCanvasImgUrl/index"
export default {
	name: "",
	//组件
	components: {
        'v-canvasImgUrl': qrCanvasImgUrl
	},
	//接收父组件传参
	props: {
	},
	data() {
		return {
			bg: require('@/assets/img/hk/logo.png'),
		}
	},
	//页面初始化
	mounted(){},
	//监听click方法
	methods: {
	}
}
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: calc(100vh);
    background: gray;
}

@media only screen and (max-width: 375px) {
}
</style>

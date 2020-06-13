<template>
	<div class="page">
		<div class="container">
			<v-canvasImgUrl />
		</div>
	</div>
</template>

<script>
import qrCanvasImgUrl from "@/components/qrCanvasImgUrl/index";

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
}

@media only screen and (max-width: 375px) {
}
</style>

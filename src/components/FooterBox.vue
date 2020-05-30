<template>
	<div class="g-footer-box">
		<div class="container-wd">
			<h4 class="font-h4">© 2019-2020 Woopay </h4>
		</div>
	</div>
</template>

<script>
export default {
	name: "",
	//组件
	components: {
	},
	//接收父组件传参
	props: {
		'FooterName': String
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
	.g-footer-box {
		padding: 20px 0;
		font-size: 14px;
		text-align: center;
		background-color: #1F2227;
		.font-h4 {
			color: #697080;
		}
		.v-ahover {
			display: inline-block;
			padding-bottom: 10px;
			color: #b2bdd6 !important;
		}
	}
	@media only screen and (max-width: 1024px) {
	}
</style>

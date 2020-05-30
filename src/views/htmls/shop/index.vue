<template>
	<div class="page">
		<div class="container-wd">
			<h4 class="font-h4">© 2019-2020 Woopay 2</h4>
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
@media only screen and (max-width: 375px) {
}
</style>

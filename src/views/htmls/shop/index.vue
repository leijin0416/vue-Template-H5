<template>
	<div class="page">
		<div class="container-wd">
			<h4 class="font-h4">© 2019-2020 Woopay 2</h4>
		</div>
	</div>
</template>

<script>
import { ajWebGetSendChinaNews } from '@/mock/api/mock'

export default {
	name: "",
	//组件
	components: {
	},
	//接收父组件传参
	props: {
	},
	data() {
		return {
			data: {
				page: 1,
				num: 1
			},
			bg: require('@/assets/img/hk/logo.png'),
		}
	},
	//页面初始化
	mounted(){
		this.fetchNewsData()
	},
	//监听click方法
	methods: {
        fetchNewsData () {
			let _that = this;
			let {page, num} = _that.data;

            ajWebGetSendChinaNews({
				'page': 1
            }).then( res => {
                // let data = JSON.parse(res.data.data);
                console.log(res)
            })
        },
	}
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 375px) {
}
</style>

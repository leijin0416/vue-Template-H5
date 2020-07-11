<template>
	<div class="page">
		<div class="container">
            <div class="v-fiexd-box" style="z-index: 99999;">
                <van-icon name="arrow-left" size="24" color="#fff" @click="onPrevGoClick" />
            </div>
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
        /**
         *  返回上一级
         */
        onPrevGoClick() {
            let _that = this;
            _that.$router.go(-1);
        }
	}
}
</script>

<style lang="scss" scoped>
.v-fiexd-box {
    position: fixed;
    top: 50px;
    left: 50px;
    width: 60px;
    height: 60px;
    line-height: 4;
    text-align: center;
    border-radius: 10px;
    background-color: $color-body-c;
}

@media only screen and (max-width: 375px) {
}
</style>

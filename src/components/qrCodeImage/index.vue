<template>
    <!-- 生成二维码 -->
    <div class="ivu-code">
        <div id="qrCode" ref="qrCodeDiv" class="ivu-img"></div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
    data() {
        return { }
    },
    props: {
        // developCode: String
    },
    components: {},
    // 监听属性 类似于data概念
    computed: {
		// 取
		// ...mapGetters("localUser", ["developCode"])
    },
    watch: {
		"developCode": {
			handler: function(newer, older) {
				if (newer == null) {
					return
				} else {
                    let _that = this;
                    _that.showQRCodeDialog(newer)
					// alert(newer)
				}
			},
	　　　　deep: true
		}
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        let url = this.developCode;
        if (url) {
            // 监听 vuex 中的 developCode
            setTimeout(() => {
                this.onQrcode(url);
            }, 300);
        }
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
    },
    // 方法集合
    methods: {
        // 清除上一次的二维码
        showQRCodeDialog(type) {
            this.$refs.qrCodeDiv.innerHTML = '';
            this.onQrcode(type);
        },
        onQrcode(url) {
            let that = this;
            let urls = url;
            // console.log(url);
            if (urls) {
                new QRCode(this.$refs.qrCodeDiv, {
                    text: urls,
                    width: 120,
                    height: 120,
                    colorDark: "#333333",    // 二维码颜色
                    colorLight: "#ffffff",   // 二维码背景色
                    correctLevel: QRCode.CorrectLevel.L  // 容错率，L/M/H
                })
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.ivu-img {
    display: inline-block;
}
</style>
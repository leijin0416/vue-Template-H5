<template>
    <!-- 分享海报 -->
    <div class="v-share">
        <!-- 背景盒子 -->
        <div ref="box" class="v-share-box">
            <div class="v-flex" :style="{height: fullHeight}">
                <div class="v-flex-bd">
                    <img class="v-img-box" src="@/assets/img/hk/icon-share_bg2.png" alt="logo.png">
                </div>
            </div>
            <div class="v-share-ft">
                <div class="v-qrcode-box">
                    <div class="v-qrcode" id="qrcode"></div>
                </div>
            </div>
        </div>
        <!-- 海报盒子 -遮罩层 -->
        <img :src="imgUrl" 
            ref="imgBg"
            alt="share_bg" 
            class="v-share-top" v-if="imgUrl" >
    </div>
</template>

<script>
import './html2canvas.js';

import html2canvas from 'html2canvas';
import { qrcanvas } from 'qrcanvas';
import { sessionData } from '@/filters/storage';

export default {
    name: 'html2canvas',
    data() {
        return{
            fullHeight: 'auto',  // 计算处理手机高度
            // fullHeight: document.documentElement.clientHeight,  // 计算处理手机高度
            localeName: 'zh_CN',
            imgUrl:'',  // 海报
            qrCodeUrl: ''
        }
    },
    props: {
		//payImgUrl: {
		//	type: String,
		//	default: ""
		//}
    },
	// 创建完成（访问当前this实例）
	created: async function() {
        let _that = this;
        // 获取中英文状态
        let localeName = sessionData('get', 'setLanguages') || 'zh_CN';
        _that.localeName = localeName;

        // 链接
        _that.qrCodeUrl = 'http://www.baidu.com';
        _that.drawUrl();
	},
    mounted () {
    },
    methods:{
        async drawUrl(){
            await setTimeout(() => {
                let that = this;
                let shareContent = that.$refs.box;      // 需要截图的包裹的（原生的）DOM 对象 -'box'
                let width = shareContent.offsetWidth;   // 获取dom 宽度
                let height = shareContent.offsetHeight; // 获取dom 高度
                let canvas = document.createElement("canvas"); // 创建一个canvas节点
                //var scale = window.devicePixelRatio; // 定义任意放大倍数 支持小数
                let scale = 2; // 定义任意放大倍数 支持小数
                    canvas.width = width * scale; // 定义canvas 宽度 * 缩放
                    canvas.height = height * scale; // 定义canvas高度 *缩放
                    canvas.style.width = width/2 + "px";
                    canvas.style.height = height/2 + "px";
                    canvas.getContext("2d").scale(scale,scale); // 获取context,设置scale
            
                let opts = {
                    scale: scale/2, // 添加的scale 参数
                    useCORS: true,
                    canvas: canvas,
                    dpi: 1000,
                }
                // 生成二维码
                let canvas1 = qrcanvas({
                    data: decodeURIComponent(this.qrCodeUrl),
                    size: 90
                })
                document.getElementById('qrcode').appendChild(canvas1)

                html2canvas(shareContent, opts).then(function(canvas) {
                    let dataUrl = canvas.toDataURL();
                　　that.imgUrl = dataUrl;
            　　})

            }, 1000)
        },
        getPixelRatio(context){
            var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
                return (window.devicePixelRatio || 1) / backingStore;
        },
    },
    destroyed() {
        let _that = this;
        // sessionData('clean', 'getInfo');
    }
};
</script>

<style lang="scss" scoped>
.v-share {
    position: relative;
    // 背景盒子
    .v-share-box {
        z-index: 1;
        position: relative;
        .v-flex {
            display: flex;
            flex-direction: column;
            .v-flex-bd {
                flex: 1;
                overflow: hidden;
                .v-img-box {
                    vertical-align: top;
                    line-height: 0;
                }
            }
        }
        .v-share-ft {
            z-index: 9999;
            position: absolute;
            right: 0;
            bottom: 6%;
            display: block;
            width: 100%;
            text-align: right;
            .v-qrcode-box {
                display: inline-block;
                min-height: 140px;
                margin-right: 48px;
                .v-qrcode {line-height: 0; border: 10px solid #fff;}
            }
            .v-text-box {
                padding-top: 30px;
                font-size: 20px;
            }
        }
    }
    // 海报盒子
    .v-share-top {
        z-index: 99;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
}

@media only screen and (max-width: 370px) {
}
</style>
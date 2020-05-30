<template>
    <!-- 分享海报 -->
    <div class="v-share">
        <!-- 背景盒子 -->
        <div ref="box" class="v-share-box">
            <div class="v-flex" :style="{height: fullHeight + 'px'}">
                <div class="v-flex-bd">
                    <!-- <div class="v-img-box" :style="{height: fullHeight + 'px', backgroundImage: 'url(' + img + ')'}"></div> -->
                    <img class="v-img-box" src="@/assets/img/hk/icon-share_bg2.png" alt="logo.png">
                </div>
                <div class="v-flex-ft">
                    <div class="v-qrcode-box">
                        <div class="v-qrcode" id="qrcode"></div>
                    </div>
                    <div class="v-text-box">
                        <p class="v-title">邀请码：{{title}}</p>
                        <p class="v-text">(长按屏幕保存图片海报进行分享)</p>
                    </div>
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
import { getStore } from '@/common/localUtil';

export default {
    data() {
        return{
            fullHeight: document.documentElement.clientHeight,  // 计算处理手机高度
            img: require('@/assets/img/hk/icon-share_bg2.png'),
            localeCut: 'zh-CN',
            title: '12',  // ID
            imgUrl:'',  // 海报
            qrCodeUrl: ''
        }
    },
    methods:{
        getPixelRatio(context){
            var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
                return (window.devicePixelRatio || 1) / backingStore;
        },
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
                    size: 80
                })
                document.getElementById('qrcode').appendChild(canvas1)

                html2canvas(shareContent, opts).then(function(canvas) {
                    let dataUrl = canvas.toDataURL();
                　　that.imgUrl = dataUrl;
            　　})

            }, 1000)
        }  
    },
	// 创建完成（访问当前this实例）
	created: async function() {
        let _that = this;
        // 获取中英文状态
        let localeName = getStore('localeCut')
        // 获取用户ID
        let userId = getStore('userNameId')

        if (localeName) {
            _that.localeCut = localeName;
        }
        if (userId) {
            _that.title = userId;
        }
        // 注册链接
        _that.qrCodeUrl = 'http://timchains.com/register?user=' + userId;
        _that.drawUrl();
	},
    mounted () {
        let _that = this;
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
            .v-flex-ft {
                position: relative;
                display: block;
                min-height: 210px;
                padding: 30px 40px;
                text-align: right;
                color: #333;
                background-color: #fff;
                .v-qrcode-box {
                    display: inline-block;
                    .v-qrcode {line-height: 0;}
                }
                .v-text-box {
                    @include tb;
                    left: 40px;
                    font-size: 20px;
                    text-align: left;
                    .v-title {
                        padding-bottom: 20px;
                        font-size: 36px;
                        font-weight: bold;
                    }
                    .v-text {
                        color: #666;
                    }
                }
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
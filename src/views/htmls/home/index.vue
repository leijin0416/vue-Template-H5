<template>
	<div class="page">
		<div class="container">
            <div class="v-head-portrait">
                <div class="weui-flex">
                    <div class="weui-cell-hd">
                        <div class="v-img-box">
                            <img :src="headImage" alt="head.png" class="img">
                        </div>
                    </div>
                    <div class="weui-cell-bd">
                        <h3 class="v-h3">{{name}}</h3>
                        <p class="v-text">UID：{{nameId}}</p>
                    </div>
                </div>
                <div class="v-head-bottom">
                    <div class="weui-flex">
                        <div class="weui-cell-bd">
                            <p class="v-text">我的爱心</p>
                            <p class="v-text" style="color: #fe3062">{{numberLove}}</p>
                        </div>
                        <div class="weui-cell-bd">
                            <p class="v-text">活力值</p>
                            <p class="v-text" style="color: #00c775">{{numberVitality}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="v-main-box">
                <div class="v-inlink-list van-hairline--top">
                    <div class="v-img-box">
                        <img src="@/assets/img/hk/i-home-cell01.png" alt="cell.png" class="v-img">
                    </div>
                    <div class="v-cell">
                        <van-cell title="实名认证" :value="attestation ? '已认证' : '未认证'" is-link to="info" />
                    </div>
                </div>
                <div class="v-inlink-list van-hairline--top">
                    <div class="v-img-box">
                        <img src="@/assets/img/hk/i-home-cell02.png" alt="cell.png" class="v-img">
                    </div>
                    <div class="v-cell">
                        <van-cell title="我的传递" is-link to="info" />
                    </div>
                </div>

                <div class="v-inlink-list van-hairline--top margin-top-min">
                    <div class="v-img-box">
                        <img src="@/assets/img/hk/i-home-cell03.png" alt="cell.png" class="v-img">
                    </div>
                    <div class="v-cell">
                        <van-cell title="感召我的人" :value="Nickname" />
                    </div>
                </div>
                <div class="v-inlink-list van-hairline--top">
                    <div class="v-img-box">
                        <img src="@/assets/img/hk/i-home-cell04.png" alt="cell.png" class="v-img">
                    </div>
                    <div class="v-cell">
                        <van-cell title="我的邀请" is-link to="share" />
                    </div>
                </div>
                <div class="v-inlink-list van-hairline--top">
                    <div class="v-img-box">
                        <img src="@/assets/img/hk/i-home-cell05.png" alt="cell.png" class="v-img">
                    </div>
                    <div class="v-cell">
                        <van-cell title="我的感召力" value="治沙卫士" />
                    </div>
                </div>

                <div class="v-inlink-list van-hairline--top margin-top-min">
                    <div class="v-img-box">
                        <img src="@/assets/img/hk/i-home-cell06.png" alt="cell.png" class="v-img">
                    </div>
                    <div class="v-cell">
                        <van-cell title="传递方式" is-link to="info" />
                    </div>
                </div>
                <div class="v-inlink-list van-hairline--top">
                    <div class="v-img-box">
                        <img src="@/assets/img/hk/i-home-cell07.png" alt="cell.png" class="v-img">
                    </div>
                    <div class="v-cell">
                        <van-cell title="问题反馈" is-link to="info" />
                    </div>
                </div>
                <div class="v-inlink-list van-hairline--top">
                    <div class="v-img-box">
                        <img src="@/assets/img/hk/i-home-cell08.png" alt="cell.png" class="v-img">
                    </div>
                    <div class="v-cell">
                        <van-cell title="系统设置" is-link to="info" />
                    </div>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
import { groupDetail } from '@/mock/api/mock'

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
            headImage: '',
            name: '',
            Nickname: '',
            nameId: '',
            numberLove: '',
            numberVitality: '',
            attestation: false,
			bg: require('@/assets/img/hk/logo.png'),
		}
	},
	//页面初始化
	mounted(){
        this.getData()
    },
	//监听click方法
	methods: {
        async getData() {
            let _this = this;
            const params = {
                TopCataID: 0,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }
            const res = await groupDetail(params);
            let data = res.data.list;
            _this.headImage = data.img;
            _this.name = data.name;
            _this.Nickname = data.Nickname;
            _this.nameId = data.ipone;
            _this.numberLove = data.numberLove;
            _this.numberVitality = data.numberVitality;
            _this.attestation = data.attestation;

            console.log(res);
        }
	}
}
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100vh;
    font-size: 28px;
    background-color: #f6f7f9;
    .v-head-portrait {
        z-index: 1;
        position: relative;
        min-height: 300px;
        padding: 60px 30px;
        color: #fff;
        background-color: #00c775;
        &::after {
            z-index: -1;
            content: " ";
            position: absolute;
            bottom: -104px;
            left: 0;
            right: 0;
            width: 100%;
            height: 190px;
            border-radius: 100%;
            background-color: #f6f7f9;
        }
        .weui-cell-bd {
            padding-left: 30px;
        }
        .v-img-box {
            display: block;
            width: 100px;
            height: 100px;
            line-height: 0;
            border-radius: 50%;
            overflow: hidden;
            background-color: #f6f7f9;;
        }
        .v-h3 {
            padding-bottom: 10px;
            font-size: 32px;
            font-weight: bold;
        }
        .v-head-bottom {
            z-index: 9;
            position: absolute;
            bottom: -60px;
            left: 30px;
            right: 30px;
            border-radius: 20px;
            box-shadow: 0 8px 16px #e5e5e5;
            color: #989898;
            background-color: #fff;
            .weui-flex {
                padding: 20px 0;
                .weui-cell-bd:nth-child(1) {
                    border-right: 1px solid #eee;
                }
            }
            .v-text {
                padding: 10px 0;
                text-align: center;
                &:nth-child(2) {
                    font-size: 36px;
                    font-weight: bold;
                }
            }
        }
    }
    .v-main-box {
        z-index: 1;
        position: relative;
        padding: 100px 30px 30px;
        .van-hairline--top:nth-child(1)::after {
            border-top: none;
        }
        .v-inlink-list {
            position: relative;
            background-color: #fff;
            .v-img-box {
                position: absolute;
                top: 50%;
                left: 20px;
                width: 40px;
                height: 40px;
                line-height: 0;
                transform: translateY(-50%);
            }
            .v-cell {
                padding-left: 70px;
            }
        }
    }
}
@media only screen and (max-width: 375px) {
}
</style>

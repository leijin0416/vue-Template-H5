<template>
    <!-- 爱心值列表 -->
    <div class="page v-overflow">
        <div class="v-return-lf">
            <van-icon name="arrow-left" size="24" color="#fff" @click="onPrevGoClick" />
        </div>
        <div class="v-love-top">
            <div class="weui-flex">
                <div class="weui-cell-bd">
                    <p class="v-text">
                        <van-icon name="like" size="24" color="#fe3062" style="vertical-align: middle;" /> 
                        <span style="display: inline-block; vertical-align: middle;padding-left: 5px;"> {{$t('homePage_021')}}</span>
                    </p>
                    <p class="v-text">{{loveNum}}</p>
                </div>
                <div class="weui-cell-ft">
                    <img src="@/assets/img/hk/i-love.png" alt="love.png" class="v-img">
                </div>
            </div>
        </div>
        <div class="v-love-box">
            <van-tabs v-model="activeTab">
                <van-tab title="爱心收入" name="a">
                    <!-- 加载列表 -->
                    <van-pull-refresh v-model="refreshing" success-text="小主~ 刷新成功" @refresh="onRefresh">
                        <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="小主~ 没有更多了"
                            @load="onloadLoveData" >
                            <div class="v-love-list" v-for="item in loveData" :key="item.id">
                                <div class="weui-flex">
                                    <div class="weui-cell-hd">
                                        <p>{{item.remark}}</p>
                                    </div>
                                    <div class="weui-cell-bd">
                                        <p class="v-text">+ {{item.changeNum}}</p>
                                    </div>
                                    <div class="weui-cell-ft">
                                        <p>{{item.createTime}}</p>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
                <van-tab title="爱心支出" name="b">
                    <!-- 加载列表 -->
                    <van-pull-refresh v-model="refreshingPay" success-text="小主~ 刷新成功" @refresh="onRefreshPay">
                        <van-list
                            v-model="loadingPay"
                            :finished="finishedPay"
                            finished-text="小主~ 没有更多了"
                            @load="onloadLovePayData" >
                            <div class="v-love-list" v-for="item in lovePayData" :key="item.id">
                                <div class="weui-flex">
                                    <div class="weui-cell-hd">
                                        <p>{{item.remark}}</p>
                                    </div>
                                    <div class="weui-cell-bd">
                                        <p class="v-text" style="color: #00c775">- {{item.changeNum}}</p>
                                    </div>
                                    <div class="weui-cell-ft">
                                        <p>{{item.createTime}}</p>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { sessionData } from '@/filters/local';
import { webGetLoveTransList, webGetUsersCoreInfo } from '@/api/common';

export default {
    data() {
        return {
            activeTab: 'a',
			loading: false,
			finished: false,
			refreshing: false,
			loveData: [],
            pages: {
                pageNum: 0,
                pageSize: 20,
                uid: ''
            },
			loadingPay: false,
			finishedPay: false,
			refreshingPay: false,
			lovePayData: [],
            pagesPay: {
                pageNum: 1,
                pageSize: 20,
                uid: ''
            },
            loveNum: ''
        }
    },
    components: {

    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        let _that = this;
        let data = sessionData('get', 'getUserInfo');
        _that.pages.uid = data.uid;
        _that.loveNum = data.loveNum;
        _that.getLoveInfoData();
        // console.log(data);
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        let _that = this;
    },
    //方法集合
    methods: {
        /**
         *  返回上一级
         */
        onPrevGoClick() {
            let _that = this;
            _that.$router.go(-1);
        },
        /**
         *  下拉刷新
         */
        onRefresh () {
            let _that = this;
            _that.finished = false;
            _that.loading = true;
            _that.pages.pageNum = 0;
            _that.onloadLoveData();
        },
        onRefreshPay () {
            let _that = this;
            _that.finishedPay = false;
            _that.loadingPay = true;
            _that.pagesPay.pageNum = 0;
            _that.onloadLovePayData();
        },
        /**
         *  爱心信息
         */
        getLoveInfoData() {
            let _that = this;
            let pages = _that.pages;
            webGetUsersCoreInfo({
                'id': pages.uid
            }).then(res => {
                // console.log(res);
                let data = res.data.data;
                _that.loveNum = data.loveNum;
            })
        },
        onloadLoveData() {
            let _that = this;
            let pages = _that.pages;
            // 延迟1秒
            setTimeout(() => {
                webGetLoveTransList({
                    'id': pages.uid,
                    'type': 1,
                    'pageNum': pages.pageNum + 1,
                    'pageSize': pages.pageSize
                }).then( res => {
                    if (_that.refreshing) {
                        _that.loveData = [];
                        _that.refreshing = false;
                    }
                    let data = res.data.data.rows;
                    data.forEach(item => {
                        _that.loveData.push(item);
                    });

                    let totalRow = res.data.data.totalRow;  // 总条数
                    let pageNum = res.data.data.pageNum;	// 当前页码
                    _that.pages.pageNum = pageNum;
                    _that.loading = false;

                    if (_that.loveData.length >= totalRow) {
                        _that.finished = true;
                    }

                    // console.log(_that.refreshing);
                    // console.log(res);
                    // console.log(_that.loveData);
                })
            }, 1000);
        },
        onloadLovePayData() {
            let _that = this;
            let pagesPay = _that.pagesPay;
            setTimeout(() => {
                webGetLoveTransList({
                    'id': pagesPay.uid,
                    'type': 2,
                    'pageNum': pagesPay.pageNum,
                    'pageSize': pagesPay.pageSize
                }).then(res => {
                    // console.log(res);
                    if (_that.refreshingPay) {
                        _that.lovePayData = [];
                        _that.refreshingPay = false;
                    }
                    let data = res.data.data.rows;
                    data.forEach(item => {
                        _that.lovePayData.push(item);
                    });

                    let totalRow = res.data.data.totalRow;  // 总条数
                    let pageNum = res.data.data.pageNum;	// 当前页码
                    _that.pagesPay.pageNum = pageNum;
                    _that.loadingPay = false;

                    if (_that.lovePayData.length >= totalRow) {
                        _that.finishedPay = true;
                    }
                })
            }, 1000);
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/.van-tabs__content {min-height: 800px;}
.page {
    position: relative;
    background-color: #f1f1f1;
    &::before {
        z-index: 1;
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: block;
        height: 340px;
        background-color: #fe3062;
    }
    .v-return-lf {
        z-index: 9;
        position: relative;
        padding: 30px;
    }
    .v-love-top {
        z-index: 9;
        position: relative;
        padding: 30px;
        margin-top: 40px;
        .weui-flex {
            padding: 30px;
            box-shadow: 0 -12px 24px #d7244f;
            border-radius: 30px;
            color: #fff;
            background-color: #ff9799;
            .v-text {
                padding: 10px 0;
                font-size: 34px;
                &:nth-child(2) {font-size: 52px;font-weight: bold;}
            }
            .v-img {
                display: block;
                width: 160px;
            }
        }
    }
    .v-love-box {
        padding: 30px;
        /deep/.van-tabs__line {background-color: #fe3062;}
        /deep/.van-tab--active {font-weight: bold; color: #fe3062;}
        /deep/.van-list {min-height: 800px; padding: 10px 30px; background-color: #fff;}
        .v-love-list {
            padding: 30px 0;
            border-top: 2px solid #f1f1f1;
            &:nth-child(1) {border-top: none;}
            .weui-flex {
                font-size: 24px;
                .weui-cell-hd {
                    min-width: 160px;
                }
                .weui-cell-bd {
                    font-size: 28px;
                    color: #fe3062;
                    font-weight: bold;
                    text-align: center;
                }
                .weui-cell-ft {color: #666;}
            }
        }
    }
}

</style>
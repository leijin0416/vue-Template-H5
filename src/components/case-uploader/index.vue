<template>
    <!-- 上传图片 -->
    <div class="page">
        <div class="v-return-lf">
            <van-icon name="arrow-left" size="24" color="#fff" @click="onPrevGoClick" />
        </div>
        <div class="v-appeal-box">
            <div class="v-text">
                <p class="v-title">{{$t('homePage_056')}}</p>
                <div class="v-input">
                    <van-field
                        v-model="messageText"
                        rows="2"
                        autosize
                        type="textarea"
                        maxlength="100"
                        placeholder="请输入申诉理由" show-word-limit />
                </div>
            </div>
            <div class="v-img-box">
                <p class="v-title">{{$t('homePage_057')}}</p>
                <div class="v-uploader-box" :style="{backgroundImage: 'url(' + uploaderBg + ')'}">
                    <div class="v-uploader">
                        <van-uploader :max-size="3 * 1024 * 1024" :after-read="onAfterReadClick" />
                    </div>
                </div>
                <p class="v-text-ft">{{$t('orderStatus_020')}}</p>
            </div>
            <!-- 提交 -->
            <div style="margin: 40px 16px;">
                <van-button 
                    :loading="loading" 
                    type="info" 
                    class="btn-backgColor" 
                    @click="onAppealClick"
                    round block >{{$t('orderStatus_016')}}
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { sessionData } from '@/filters/local';
import { getUrlBase64 } from '@/filters/index';
import { webUploadImages, webBuyersAppeal, webSellerAppeal } from '@/api/common';

export default {
    data() {
        return {
            id: '',
            status: '',
            loading: false,
            messageText: '',
            uploaderBg: require('@/assets/img/hk/i-upload.png')
        }
    },
    props: {},
    components: {

    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        let _that = this;
        let id = _that.$route.query.ids;
        let status = _that.$route.query.statusId;
        let item = _that.$route.query.info;

        if (id && status) {
            _that.id = id;
            _that.status = status;
        }
        if (item) {
            if (typeof item == 'string') {
                let sessionInfo = sessionData('get', 'getAfterInfo');
                _that.messageText = sessionInfo.remark;
                _that.uploaderBg = sessionInfo.appealUrl;
                // console.log(sessionInfo);
            } else {
                sessionData('set', 'getAfterInfo', item);
                _that.messageText = item.remark;
                _that.uploaderBg = item.appealUrl;
            }
        }
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    // 方法集合
    methods: {
        /**
         *  返回上一级
         */
        onPrevGoClick() {
            let _that = this;
            _that.$router.go(-1);
        },
        /**
         *  获取图片路径
         */
        onAfterReadClick(item) {
            let _that = this;
            let content = item.content;
            if (content) {
                _that.$toast({
                    duration: 2000, 
                    message: '图片上传中...',
                    onClose: () => {
                    }
                });
                // 解压
                getUrlBase64(item.file).then(base64 => {
                    // 解析，去除前缀
                    base64 = base64.replace('data:image/jpeg;base64,', '')
                    base64 = base64.replace('data:image/png;base64,', '')
                    webUploadImages({
                        'file': base64 
                    }).then( res => {
                        if (res.data.code == 200) {
                            let img = res.data.data.picture;
                            _that.$toast({
                                duration: 2000, 
                                message: '图片上传成功',
                                onClose: () => {
                                    _that.uploaderBg = img;
                                }
                            });
                        }
                        // console.log(res);
                    })
                    // console.log(base64);
                })
            }
        },
        /**
         *  提交
         */
        onAppealClick() {
            let _that = this;
            let id = _that.id;
            let status = _that.status; // 0买 1卖
            let appealUrl = _that.uploaderBg;
            let remark = _that.messageText;

            if (appealUrl == '' || remark == '') {
                _that.$toast({
                    duration: 2000, 
                    message: '输入框不能为空',
                    onClose: () => {}
                });
            } else {

            }
        }
    },
    destroyed() {
        sessionData('clean', 'getAppealInfo');
    }
}
</script>

<style lang="scss" scoped>
.page {
    position: relative;
    height: 100vh;
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
        background-color: $color-body-c;
    }
    .v-return-lf {
        z-index: 9;
        position: relative;
        padding: 30px;
    }
    .v-appeal-box {
        z-index: 9;
        position: relative;
        padding: 30px;
        .v-img-box, .v-text {
            margin-bottom: 30px;
            background-color: #fff;
        }
        .v-title {
            padding: 30px;
            font-size: 28px;
            font-weight: bold;
            border-bottom: 2px solid #f1f1f1;
        }
        .v-text-ft {
            padding: 30px;
            color: #999;
        }
        .v-input {
            margin-top: 10px;
        }
        .v-uploader-box {
            position: relative;
            height: 450px;
            margin-top: 30px;
            overflow: hidden;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 240px;
        }
        .v-uploader {
            position: absolute;
            top: 50%;
            left: 50%;
            opacity: 0;
            transform: translate(-50%, -50%);
        }
    }
}
</style>
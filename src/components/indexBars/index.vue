<template>
    <!-- 索引栏 -->
	<div class="page">
        <van-popup v-model="showCode" position="right" :style="{ width: '75%', height: '100%' }">
            <!-- 城市列表 -->
            <van-index-bar class="indexBar" z-index="999" :sticky="false" highlight-color="red">
                <van-index-anchor v-for="(item,index) in cityDts" :key="index" :index="item.letter">
                    <span class="indexWord">{{item.letter}}</span>
                    <div style="padding: 0 15px 0 5px">
                        <van-cell
                        @click="onChooseCity(citem)"
                        v-for="(citem,cindex) in item.list"
                        :key="cindex"
                        :title="citem.cname"
                        :value="citem.value" />
                    </div>
                </van-index-anchor>
            </van-index-bar>
        </van-popup>
	</div>
</template>

<script>
import vPinyin from './vuePY';

import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { removeHTMLTag } from '@/filters/index';
import { webGetSelectAreaCode, webGetUsersCoreLogin } from '@/api/common';

export default {
	name: "",
	// 组件
	components: {
	},
	// 接收父组件传参
	props: {
	},
	data() {
		return {
            areaNum: '86',
            showCode: true,
			bg: require('@/assets/img/hk/logo.png')
		}
	},
	// 页面初始化
	mounted(){},
	// 监听click方法
	methods: {
		//传
        ...mapMutations("localUser", ['handleUserSession', 'handleUserInfo']),
        /**
         *  控制遮罩
         */
        onShowCodeClick() {
            let _that = this;
            _that.showCode = true;
        },
        /**
         *  查询城市区号列表
         */
        onAreaCodeClick () {
            let _that = this;
            webGetSelectAreaCode({
                'pageNum': 1,
                'pageSize': 223
            }).then( res => {
                let data = res.data.data.rows;
                let areacodeList = [];
                data.forEach( (item, index, arr) => {
                    areacodeList.push({
                        'value': item.areaNum, 
                        'label': item.areaNum, 
                        'cname': item.cname, 
                        'id': item.id,
                        'name': vPinyin.chineseToPinYin(item.cname)} ); // 生成拼音
                });
                // 获取到改造后的城市区号列表
                _that.cityDts = vPinyin.sortData(areacodeList, 'name'); // 转换按字母排序

                // console.log(areacodeList);
                // console.log(_that.sortData(areacodeList, 'name'));
            })
        },
        /**
         *  城市区号列表点击返回
         */
        onChooseCity(item) {
            let _that = this;
            _that.areaNum = item.value;
            _that.showCode = false;
            // console.log(item);
        }
	}
}
</script>

<style lang="scss" scoped>
/deep/.van-index-anchor {padding: 0;}
.indexBar {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    .indexWord {
        display: block;
        padding: 0 15px;
        background-color: #eee;
    }
}
@media only screen and (max-width: 414px) {
}
</style>

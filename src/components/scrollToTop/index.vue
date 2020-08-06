<template>
    <div class="page">
        <div v-if="btnTopFlag" class="v-go-top">
            <p @click="backTop()"><van-icon name="arrow-up" size="20" color="#fff" /></p>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { sessionData } from '@/filters/local';

export default {
    data() {
        return {
            btnTopFlag: false,
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
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        let _that = this;
        window.addEventListener('scroll', _that.scrollToTop, true);  // 监听（绑定）滚轮滚动事件
    },
    // 方法集合
    methods: {
        /**
         * 点击图标回到顶部方法，加计时器是为了缓慢回到顶部  https://www.jianshu.com/p/90ccd4b503ac
         * 
         * 回到顶部功能实现过程：
         *  1. 获取页面当前距离顶部的滚动距离（虽然IE不常用了，但还是需要考虑一下兼容性的）
         *  2. 计算出每次向上移动的距离，用负的滚动距离除以5，因为滚动的距离是一个正数，想向上移动就是做一个减法
         *  3. 用当前距离加上计算出的距离，然后赋值给当前距离，就可以达到向上移动的效果
         *  4. 最后记得在移动到顶部时，清除定时器
         */
        backTop () {
            let _that = this;
            let timer = setInterval(function(){
                let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                let ispeed = Math.floor(-osTop / 5); 
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                _that.isTop = true;
                if(osTop === 0){
                    clearInterval(timer);
                }
            },30)
        },
        /**  
         * 显示回到顶部按钮  https://blog.csdn.net/weixin_43421652/article/details/91425869
         * 
         */
        scrollToTop(){
            let _that = this;
            // height 不能100%
            let scrollTop = window.scrollY || window.pageYOffset || 
                            document.documentElement.scrollTop || document.body.scrollTop;    // 获取页面滚动高度
            if (scrollTop >= 600) {
                _that.btnTopFlag = true;
                
            } else {
                _that.btnTopFlag = false;

            }
            // console.log(scrollTop);
        },
    },
    destroyed() {
        let _that = this;
        window.removeEventListener('scroll', _that.scrollToTop, true);
        // sessionData('clean', 'getInfo');
    }
}
</script>

<style lang="scss" scoped>
.page {
    .v-go-top {
        z-index: 9999;
        position: fixed;
        bottom: 120px;
        right: 30px;
        p {
            display: inline-block;
            padding: 18px 24px;
            border-radius: 10px;
            background-color: rgba(50, 50, 50, 0.6);
        }
    }
}
</style>
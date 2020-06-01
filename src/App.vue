<template>
	<div id="app" class="g-content-box">
        <transition :name="'vux-pop-'+(direction === 'next' ? 'in' : direction==='prev' ? 'out' : '')">
            <router-view v-wechat-title="$route.meta.title" />
        </transition>
        <MTabBar 
            v-if="$route.meta.displayNavBar"
            :data="tabBarData"
            @changeActive="changeTabBarActive"></MTabBar>
	</div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

import Layout from "@/layouts";
import MTabBar from "@/components/navBarTabs/navbar";
import { sessionData } from '@/filters/local';

export default {
    name: "App",
	components: {
        Layout,
        MTabBar,
	},
	data () {
        return {
            tabBarData: [
                {label: '首页', name: 1, active: require('@/assets/img/hk/nav-index-inactive.png'), inactive: require('@/assets/img/hk/nav-index-active.png'), path: '/'},
                {label: '传递', name: 2, active: require('@/assets/img/hk/nav-otc-inactive.png'), inactive: require('@/assets/img/hk/nav-otc-active.png'), path: '/transmit'},
                {label: '商城', name: 3, active: require('@/assets/img/hk/nav-shop-active.png'), inactive: require('@/assets/img/hk/nav-shop-active.png'), path: '/shop'},
                {label: '我的', name: 4, active: require('@/assets/img/hk/nav-home-inactive.png'), inactive: require('@/assets/img/hk/nav-home-active.png'), path: '/home'}
            ],
            transition_name: ''
        }
    },
    computed: {
        ...mapGetters([ 'direction' ])
    },
	methods: {
		//传
        ...mapMutations("localUser", ['handleUserNavId']),
        // 监听tabBar变化，派发给store，以此避免刷新tabBarActive初始化问题
        changeTabBarActive (active) {
            let id = active;
            if (id) this.handleUserNavId(id)
            // console.log(id);
        }
	},
	//页面离开时
	destroyed: function () {
        // sessionData('clean', 'setTabBarActive');
        //console.log("我已经离开了！");
	}
};
</script>

<style lang="scss" scoped>
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
    will-change: transform;
    transition: all 0.3s linear;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 500px;
}

.vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
</style>

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './locale';
import filters from './filters';

import VueWechatTitle from 'vue-wechat-title';
import VideoPlayer from 'vue-video-player';
import VueLazyLoad from 'vue-lazyload';
// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper';
// 挂载图表
import myCharts from "@/components/echarts/myCharts";

import 'swiper/css/swiper.css';
import "./style/reset.scss";
import "./style/animation.scss";
import "./style/common.scss";

require('vue-video-player/src/custom-theme.css');

Vue.config.productionTip = false; // 关闭生产模式下给出的提示

Vue.use(VueWechatTitle);
Vue.use(VueAwesomeSwiper);
Vue.use(VideoPlayer);
Vue.use(myCharts);
Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    attempt: 1,
    listenEvents: ['scroll'],
    error: require('@/assets/error.jpg'),        //报错需要的图片
    loading: require('@/assets/loadingTimg.png')	// 替换需要的图片
});

// 全局过滤器
Object.keys(filters).forEach(filterName => {
    Vue.filter(filterName, filters[filterName])
})

/* eslint-disable no-new */
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');

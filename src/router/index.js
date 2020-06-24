import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { constantRouterMaps } from './routersMaps';
import { sessionData } from '@/filters/storage';

Vue.use(Router);

let base = `${process.env.BASE_URL}`;
const createRouter = () => new Router({
    mode: 'history',
    base: base,
    routes: constantRouterMaps,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

/**
 * router 路由守卫可配置参数
 * @param {Number} handleDirectionId vuex 参数
 * @param {Number} toIndex 即将要进入的目标 路由对象
 * @param {Number} prevIndex 当前导航正要离开的路由
 */
const router = createRouter();

const history = window.sessionStorage;
let count = history.getItem('count') || 0;
history.removeItem('count');

router.beforeEach((to, from, next) => {
    const token = sessionData('get', 'getSessionToken');
    
    // 第一级栏目
    const subArr = ['/', '/transmit', '/home', '/shop']
    let [toIndex, prevIndex] = [parseInt(history.getItem(to.path)), parseInt(history.getItem(from.path))]
    for (let index in subArr) history.setItem(subArr[index], 0)

    if (toIndex || toIndex === 0) {
        if (toIndex > prevIndex) {
            store.commit('handleDirectionId', 'next')
        } else if (toIndex === prevIndex) {  // 一级栏目无切换效果
            store.commit('handleDirectionId', '')
        } else {
            store.commit('handleDirectionId', 'prev')
        }
    } else if (!subArr.includes(to.path)) {
        ++count;
        history.setItem(to.path, count)
        store.commit('handleDirectionId', 'next')
    }
    next();
})

export default router;

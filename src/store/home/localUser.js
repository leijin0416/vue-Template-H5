import { sessionData } from '@/filters/local'

export default {
	namespaced: true,
	//1、要设置的全局访问的state对象
    state: {
        getSessionToken: null,
        getNavId: null
	},
	//2、实时监听state值的变化(最新状态)
    getters: {
        getSessionToken: (state) => state.getSessionToken,
        getNavId: (state) => state.getNavId
	},
	//3、自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性，list 为要变化的形参
    actions: {
	},
	//4、如何变化 datalist
	mutations: {
		//用户id
		handleUserSession: (state, getSessionToken) => {
            state.getSessionToken = getSessionToken;
            sessionData('set', 'getSessionToken', getSessionToken);
        },
        handleUserNavId: (state, getNavId) => {
            state.getNavId = getNavId;
            sessionData('set', 'setTabBarActive', getNavId);
            // console.log(getNavId);
        }
	}
};
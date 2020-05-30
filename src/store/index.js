import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import { getters } from './getters';
import state from './state';
import mutations from './mutations';
import home from './home';
import createLogger from 'vuex/dist/logger';  // 日志

Vue.use(Vuex);

let modules = {
    ...home,
};

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    modules,
    actions,    // 根级别的 action
    mutations,  // 根级别的 mutations
    getters, // 根级别的 getters
    strict: debug,
    plugins: debug ? [createLogger()] : []
})

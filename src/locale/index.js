import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './messages'
import { sessionData } from '@/filters/storage';

Vue.use(VueI18n);

/**
 *  中英文切换
 */
const i18n = new VueI18n({
    locale: sessionData('get', 'localeCut') || 'zh-CN',    // 语言标识
    messages
});

// console.log(sessionData('get', 'localeCut'));

export default i18n;

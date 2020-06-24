import axios from "axios";
import CryptoJS from './cryptoJS';
import { sessionData } from '@/filters/storage';
// 格式化返回数据
import { getRealJsonData } from './json';
// import { Toast } from 'vant';

axios.defaults = {
    baseURL: '',
    timeout: 5000,
    withCredentials: true
}
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭 vant.Toast('提示');
 */
const tip = msg => {
    vant.Toast({
        message: msg,
        duration: 3000,
        forbidClick: true
    });
}

/**
 *  跳转登录页
 *  携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

/**
 * 2、request 请求拦截器, 传给后台的，每次请求前，如果存在token则在请求头中携带token
 *    - Encrypt加密
 *    - config.data.hash = md5((new Date()).valueOf() + config.data.func);
 *    - JSON.stringify()
 */
axios.interceptors.request.use( config => {
    const token = sessionData('get', 'getSessionToken');

    token && (config.headers.token = token);
    config.data = {
        data: CryptoJS.Encrypt(JSON.stringify(config.data))
    }

    return config;
}, error => {

    return Promise.reject(error);
})

/**
 * 1、response 响应拦截器, 拿后台返回的
 *    - Decrypt解密
 *    - getRealJsonData -去掉双引号，转化json格式
 */
axios.interceptors.response.use( response => {
    response.data = getRealJsonData(CryptoJS.Decrypt(response.data.data))
    // console.log(response.data.code);
    if (response.data.code === 600) {
        tip('小主~ 登录过期，请重新登录');
        setTimeout(() => {
            // toLogin();
            sessionData('clean', 'getSessionToken');
            window.location.reload();
        }, 1000);
    }
    
    return response;
}, error => {
    // 拦截http状态码
    const status = error.response.status;
    const { response } = error;
    // console.log(status);
    if (error && error.response) {
        switch (status) {
            case 400:
                tip('小主~ 我们请求出错了');
                break;
            case 401:
                // 401: 未登录状态，跳转登录页
                tip('系统提示：账号未登录');
                setTimeout(() => {
                    sessionData('clean', 'getSessionToken');
                    window.location.reload();
                }, 1000);
                break;
            case 403:
                tip('小主~ 登录过期，请重新登录');
                setTimeout(() => {
                    sessionData('clean', 'getSessionToken');
                    window.location.reload();
                }, 1000);
                break;
            case 404:
                tip('小主~ 请求错误，未找到该资源');
                break;
            case 500:
                tip('小主~ 服务端错误');
                break;
        }
        return status >= 200 && status < 300;
    } else {
        tip('小主~ 网络开小差啦，稍后再试');
    }
    return Promise.reject(error.response);
})


export default {
    //get请求
    get(url, param) {
        return new Promise( (resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: param
            })
            .then( res => {
                resolve(res)
            })
            .catch( res => {
                reject(res)
            })
        })
    },
    //post请求
    post(url, param) {
        // console.log(url);
        // console.log(param);
        return new Promise( (resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: param
            })
            .then( res => {
                resolve(res);
            })
            .catch( res => {
                reject(res)
            })
        })
    }
}
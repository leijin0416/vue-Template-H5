//引入axios
import axios from 'axios'

axios.defaults.baseURL = ''
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

//请求拦截器
axios.interceptors.request.use(config => {

    return config
}, error => {
    return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {

    return response
    
}, error => {
    const status = error.response.status;
    const { response } = error;
    if (error && error.response) {
        switch (status) {
            case 400:
                tip('小主~ 我们请求出错');
                break;
            case 401:
                // 401: 未登录状态，跳转登录页
                tip('系统提示：您未登录');
                setTimeout(() => {
                    removeStore('hasSessionToken');
                    window.location.reload();
                }, 1000);
                break;
            case 403:
                tip('登录过期，请重新登录');
                setTimeout(() => {
                    removeStore('hasSessionToken');
                    window.location.reload();
                }, 1000);
                break;
            case 404:
                tip('系统提示：请求资源未找到');
                break;
            case 500:
                tip('系统提示：服务端出错');
                break;
        }
        return status >= 200 && status < 300;
    } else {
        tip('小主~ 网络开小差，稍后再试');
    }
    // console.log(error);
    return Promise.reject(error.response);
})

export default {
    //get请求
    get(url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: param
            }).then(res => {
                resolve(res)
            })
        })
    },
    //post请求
    post(url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: param
            }).then(res => {
                resolve(res)
            })
        })
    }
}
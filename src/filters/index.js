import dayjs from 'dayjs';

/**
 * 格式化时间戳（秒|毫秒）
 * @param {timestamp} value
 */
const timeFilter = (value) => {
    value = value.toString();
    if (value) {
        if (value.length === 13) {
            return dayjs(Number(value)).format("YYYY-MM-DD HH:mm:ss");
        }
        return dayjs.unix(Number(value)).format("YYYY-MM-DD HH:mm:ss");
    } else {
        return '-';
    }
}

/**
 * 手机号格式化
 * @param {String} phone
 */
const formatPhone = (phone) => {
    phone = phone.toString();
    return phone.substr(0, 3) + '****' + phone.substr(7, 11);
};

/**
 * 4位一空格（格式化银行卡）
 * @param {String} val
 */
const formatBank = (val) => {
    if (val) {
        return val.toString().replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
    }
};

/**
 * 千分位格式化
 * @param {数字} val
 */
const toThousands = (val) => {
    let num = (val || 0).toString(),
        result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}

/**
 * 格式化小数位
 * @param val 传入的值
 * @param pos 保留的小数位
 * @returns {*}
 */
const formatFloat = (val, pos = 2) => {
    let f = parseFloat(val);
    if (isNaN(f)) {
        return false;
    }
    f = Math.round(val * Math.pow(10, pos)) / Math.pow(10, pos); // pow 幂
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + pos) {
        s += '0';
    }
    return s;
}

/**
 * 格式化时长
 * @param second
 * @returns {string}
 */
const realFormatSecond = (second) => {
    let secondType = typeof second;

    if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second);

        let hours = Math.floor(second / 3600);
        second = second - hours * 3600;
        let mimute = Math.floor(second / 60);
        second = second - mimute * 60;

        return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
        return '0:00:00'
    }
}

/**
 *  数组对象去重
 *  mapFilter(datas)
 */
const mapFilter = (arr) => {
    const res = new Map();
    return arr.filter((arr) => !res.has(arr.name) && res.set(arr.name, 1))
}

/**
 * 去除HTML tag
 * @param {String} str 文本内容
 */
export function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/\s+/g, ''); //去除多余空行
    str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
    return str;
}

/**
 * 产生10位随机整数，包含下限值，包括上限值
 * @return {Array} 返回一个10位的数组
 */
export function randomMath() {
    var arr = [];
    while (arr.length < 10) {//原数组长度为0，每次成功添加一个元素后长度加1，则当数组添加最后一个数字之前长度为9即可
        var num = Math.floor(Math.random() * 100);//生成一个0-100的随机整数
        if (arr.length === 0) {//如果数组长度为0则直接添加到arr数组
            arr.push(num);
        } else {
            for (var i = 0; i < arr.length; i++) {//当新生成的数字与数组中的元素不重合时则添加到arr数组
                if (arr.join(',').indexOf(num) < 0) {
                    arr.push(num);
                }
            }
        }
    }
    return arr;
}

/**
 * 上传图片，去除base64前缀
 * @return {file} 对象
 */
export function getUrlBase64(file) {
    return new Promise(function (resolve, reject) {
        let files = file;
        let reader = new FileReader()
        let imgResult = ''
        if (typeof files !== 'object') return;
        reader.readAsDataURL(files)
        reader.onload = function () {
            imgResult = reader.result
        }
        reader.onerror = function (error) {
            reject(error)
        }
        reader.onloadend = function () {
            resolve(imgResult)
        }
    })
}

export default {
    timeFilter,
    formatPhone,
    formatBank,
    toThousands,
    formatFloat,
    realFormatSecond,
}

/**
 * https://www.cnblogs.com/bert227/p/10260424.html
 * https://www.cnblogs.com/baiyang2292/p/11166650.html
 * ( num * value ).toFixed(4); -四舍五入
 * parseFloat(this.otcList.sell_lave_count); -转换为数值
 * 
 * 特殊字符
 * !regExpZF.test(num)
 *
 **/
export const regExpZF = /[`~!#$%^&*()_\-+=<>?:"{}|,\/;'\\[\]·~！#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im;

/**
 * 邮箱格式
 */
export const regExpEM = /\@/g;
export const reEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
export const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
export const regEmailNet = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;

/**
 * 手机格式
 */
export const regExpPhone = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;

/**
 * 纯数字
 */
export const regExpNum = /^[0-9]*$/;
export const regExpNumSm = /^[\w]{6,}$/

/**
 * 整数
 */
export const regExpNumber = /^\+?[1-9][0-9]*$/;
export const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;

/**
 * 密码
 * 必须含字母+数字 /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i
 */
export const regZM = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{8,18}$/; 



/**
 * 请求统一管理 
 */
import Request from '@/common/api/http';

/**
 * 短信验证码
 * @param {*} params 
 */
export const ajWebGetSendChina = params => Request.get('/china/g2/getOnsInfo?name=disease_h5', params)
/**
 * 请求统一管理 
 */
import mockRequest from './mockHttp';

/**
 * 短信验证码
 * @param {*} params 
 */
export const groupDetail = params => mockRequest.post('/api/user', params)
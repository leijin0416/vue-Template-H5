/**
 * 请求统一管理 
 */
import mockRequest from './mockHttp';

/**
 * 
 * @param {*} params 
 */
export const groupDetail = params => mockRequest.post('/api/user', params)

export const ajWebGetSendChina = params => mockRequest.get('/china/g2/getOnsInfo?name=disease_h5', params)
/**
 * 请求统一管理 
 */
import mockRequest from './mockHttp';

/**
 * 疫情数据
 * @param {*} params 传参对象
 */
export const groupDetail = params => mockRequest.post('/api/user', params);

export const ajWebGetSendChina = params => mockRequest.get('/china/g2/getOnsInfo?name=disease_h5', params);

export const ajWebGetSendChinaNews = params => mockRequest.get('/cv/ncov/rumor/getRumorList', params);

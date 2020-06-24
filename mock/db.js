/**
 *  mock文件下 打开npm，执行 json-server mock/db.js 
 */
var Mock = require('mockjs');
const user = require('./api/user.json');

module.exports = function () {
    return {
        'user': Mock.mock({
            'list|1': [{
                'id|+1': 1,
                'status': 1,
                'Nickname': "@cname",
                'name': '@cname',
                "img": Mock.Random.image('200x200', '#fb0a2a'),
                'numberLove|1-100.1-5': 1,
                'numberVitality|1-100.1-5': 1,
                'attestation': Mock.Random.boolean(),
                province: '@province',
                ipone: /^1[0-9]{10}$/,  // 用正则匹配1开头的11位数字的手机号
                state: Mock.Random.integer(1, 2),
                createtime: Mock.Random.now(),
                "msg": "success"
            }]
        }),
        'list': Mock.mock({
            'data|1': [{
                'status': 200,
                'data': user
            }]
        })
    }
}
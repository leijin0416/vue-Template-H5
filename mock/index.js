import Mock from "mockjs"

/**
 *  https://www.cnblogs.com/whkl-m/p/6679537.html
 *  https://my.oschina.net/tongjh/blog/2999834 
 */
export const dataSource = Mock.mock({
    'data|5': [{
        "code": 0,
        'fId|+1': 1,
        'Nickname': "@CNAME",
        createtime: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
        ipone: /^1[0-9]{10}$/,  //用正则匹配1开头的11位数字的手机号
        state: Mock.Random.integer(1, 2),
        province: '@province',
        "msg": "success"
    }]
})

export const dataAssets = Mock.mock({
    'data|5': [{
        "code": 0,
        'fId|+1': 1,
        'Nickname': "@CNAME",
        createtime: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
        ipone: /^1[0-9]{10}$/,  //用正则匹配1开头的11位数字的手机号
        'num1|1-4': 1,
        'num2|1-100.2': 1,
        'num3|1-100.2': 1,
        'num4|1-100.2': 1,
        "msg": "success"
    }]
})

export const dataAuditor = Mock.mock({
    'data|5': [{
        "code": 0,
        'fId|+1': 1,
        'Nickname': "@CNAME",
        createtime: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
        auditorTime: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
        ipone: /^1[0-9]{10}$/,  //用正则匹配1开头的11位数字的手机号
        'num1': Mock.Random.id(),
        'image': "https://www.timchains.com/img/icon-banner_logo.2d78f288.png",
        'image1': "https://www.timchains.com/img/icon-banner_logo.2d78f288.png",
        "msg": "success"
    }]
})

export const dataNutrient = Mock.mock({
    'data|5': [{
        "code": 0,
        'fId|+1': 1,
        createtime: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
        auditorTime: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
        ipone: /^1[0-9]{10}$/,  //用正则匹配1开头的11位数字的手机号
        'num1': Mock.Random.integer(1, 100),
        'num2': Mock.Random.integer(1, 100),
        'num3': Mock.Random.integer(1, 100),
        'num4': Mock.Random.integer(1, 100),
        'num5': Mock.Random.integer(1, 100),
        "msg": "success"
    }]
})

export const dataNutrientList = Mock.mock({
    'data|5': [{
        "code": 0,
        'fId|+1': 1,
        createtime: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
        ipone: /^1[0-9]{10}$/,  //用正则匹配1开头的11位数字的手机号
        'num4': Mock.Random.integer(1, 100),
        "msg": "success"
    }]
})
/**
 *  mock文件下 打开npm，执行 json-server mock/faker-data.js
 */
var faker = require("faker");
faker.locale = "zh_CN";
var _ = require("lodash");

module.exports = function () {
    return {
        people: _.times(100, function (n) {
            return {
                id: n,
                name: faker.name.findName(),
                avatar: faker.internet.avatar()
            }
        }),
        address: _.times(100, function (n) {
            return {
                id: faker.random.uuid(),
                city: faker.address.city(),
                county: faker.address.county()
            }
        })
    }
}
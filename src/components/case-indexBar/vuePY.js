import { pinyin } from './constAZ';

export default {
    chineseToPinYin: function (l1) {
        var l2 = l1.length
        var I1 = ''
        var reg = new RegExp('[a-zA-Z0-9]')
        for (var i = 0; i < l2; i++) {
            var val = l1.substr(i, 1)
            var name = this.arraySearch(val, pinyin)
            if (reg.test(val)) {
                I1 += val
            } else if (name !== false) {
                I1 += name
            }
        }
        I1 = I1.replace(/ /g, '-')
        while (I1.indexOf('--') > 0) {
            I1 = I1.replace('--', '-')
        }
        return I1
    },
    arraySearch: function (l1, l2) {
        for (var name in pinyin) {
            if (pinyin[name].indexOf(l1) !== -1) {
                return this.ucfirst(name)
            }
        }
        return false
    },
    ucfirst: function (l1) {
        if (l1.length > 0) {
            var first = l1.substr(0, 1).toUpperCase()
            var spare = l1.substr(1, l1.length)
            return first + spare
        }
    },
    // 处理数据按字母排序分类。
    sortData(data, field) {
        //data原数据，field数据的拼音键名。
        let letter_reg = /^[A-Z]$/;
        let list = [];
        let letter = '';
        for (let i = 0; i < data.length; i++) {
            // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
            list['#'] = [];
            // 首字母 转 大写英文
            letter = (data[i][field]).slice(0, 1).toUpperCase();
            // 是否 大写 英文 字母
            if (!letter_reg.test(letter)) {
                letter = '#';
            }
            // 创建 字母 分组
            if (!(letter in list)) {
                list[letter] = [];
            }
            // 字母 分组 添加 数据
            list[letter].push(data[i]);
        }
        // 转换 格式 进行 排序；
        let resault = [];
        for (let key in list) {
            resault.push({
                letter: key,
                list: list[key]
            });
        }
        resault.sort((a, b) => {
            return a.letter.charCodeAt(0) - b.letter.charCodeAt(0);
        });
        // # 号分组 放最后
        let last_arr = resault[0];
        resault.splice(0, 1);
        resault.push(last_arr);

        // 转换 数据 格式
        let json_sort = {}
        for (let i = 0; i < resault.length; i++) {
            json_sort[resault[i].letter] = resault[i].list;
        }

        return resault;
    }
}
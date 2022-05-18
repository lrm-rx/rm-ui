const moment = require('moment');

export default {
    // 格式化时间
    dateFormater(value, str = 'YYYY-MM-DD') {

        return moment(value).format(str)
    },

    // 转换成大写
    upperCase(value) {
        return value.toUpperCase()
    }
}
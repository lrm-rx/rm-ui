import { colorObj } from './color'
import { countdownObj } from './countdown'
import { resize } from './resize'

let directives = {
    color: colorObj,
    countdown: countdownObj,
    resize
}

export default function (Vue) {
    Object.keys(directives).forEach(key => {
        Vue.directive(key, directives[key])
    })
};
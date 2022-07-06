import { colorObj } from './color'
import { countdownObj } from './countdown'
import { resize } from './resize'
import { int } from './int'

let directives = {
    color: colorObj,
    countdown: countdownObj,
    resize, 
    int
}

export default function (Vue) {
    Object.keys(directives).forEach(key => {
        Vue.directive(key, directives[key])
    })
};
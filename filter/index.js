
import filters from '../filter/filters/filtermain'

export default function (Vue) {
    Object.keys(filters).forEach((key) => {
        Vue.filter(key, filters[key])
    })
}

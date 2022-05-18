import RmCollapse from './src/Collapse.vue'
import RmCollapseItem from './src/CollapseItem.vue'

RmCollapse.install = function (Vue) {
  Vue.component(RmCollapse.name, RmCollapse)
}
RmCollapseItem.install = function (Vue) {
  Vue.component(RmCollapseItem.name, RmCollapseItem)
}

export { RmCollapse, RmCollapseItem }
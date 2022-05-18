import RmTree from './src/tree.vue'

RmTree.install = function (Vue) {
  Vue.component(RmTree.name, RmTree)
}

export default RmTree
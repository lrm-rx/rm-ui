import Vue from 'vue'
import App from './App.vue'

// 全局导入过滤器
import filters from '../filter'
Vue.use(filters)

// const directive = function (Vue) {
//   Object.keys(directives).forEach(key => {
//       Vue.directive(key,directives[key])
//   })
// }
// 导入指令
import directive from '../directive' // directive
//Vue会帮我们去调用directive这个插件里的install方法
Vue.use(directive)

// 导入组件库
//Vue会帮我们去调用HmUI这个插件里的install方法
import HmUI from './../packages'
Vue.use(HmUI)


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

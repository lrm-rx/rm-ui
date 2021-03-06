// 导入颜色选择器组件
import ColorPicker from './color-picker'
import Button from './button'
import Dialog from './dialog'
import Input from './input'
import Checkbox from './checkbox'
import Radio from './radio'
import Switch from './switch'
import BackTop from './backTop'
import {RmSwiper, RmSwiperItem} from './swiper'
import {RmCollapse, RmCollapseItem} from './collapse'
import notice from './notice'
import RmTree from './tree'
import RmDrag from './drag'
import RmToast from './toast'
import RmMenu from './menu'
import RxCollapse from './rxCollapse'
import './fonts/font.scss'
// 存储组件列表
const components = [
  ColorPicker,
  Button,
  Dialog,
  Input,
  Checkbox,
  Radio,
  Switch,
  BackTop,
  RmSwiper,
  RmSwiperItem,
  RmCollapse,
  RmCollapseItem,
  RmTree,
  RmDrag,
  RmMenu,
  RxCollapse
]
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 遍历注册全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  // notice组件
  Vue.prototype.$notice = notice
  // toast组件
  Vue.prototype.$rmtoast = RmToast
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ColorPicker,
  Button,
  Dialog,
  Input,
  Checkbox,
  Radio,
  Switch,
  BackTop,
  RmSwiper,
  RmSwiperItem,
  RmCollapse,
  RmCollapseItem,
  RmTree,
  RmDrag,
  RmMenu,
  RxCollapse
}

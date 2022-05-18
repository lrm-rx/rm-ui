import Vue from 'vue'
import Notice from './src/notice.vue'
const NoticeContructor = Vue.extend(Notice);
export default function notice(options) {
    // 实例化
    const instance = new NoticeContructor({
        data: options
    })
    // 手动挂载
    instance.$mount() // dom元素渲染完成
    // 挂载到body
    document.body.appendChild(instance.$el)
    return instance
}
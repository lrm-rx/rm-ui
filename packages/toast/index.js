import Vue from 'vue'
import Toast from './src/toast.vue'
const ToastComponent = Vue.extend(Toast);
export default function toast({
    message, 
    duration,
    type,
    showToast
}) {
    // 实例化
    const ToastDom = new ToastComponent({
        name: "RmToast",
        el: document.createElement('div'),
        data() {
            return {
                message,
                type: type || 'normal',
                showToast: showToast || true,
                timer: null
            }
        },
        mounted() {
            this.timer = setTimeout(()=> {
                this.showToast = false;
            },duration||3000)
        },
        beforeCreate(){
            clearTimeout(this.timer)
        }
    })
    // 手动挂载
    ToastDom.$mount() // dom元素渲染完成
    // 挂载到body
    document.body.appendChild(ToastDom.$el)

    return ToastDom
}
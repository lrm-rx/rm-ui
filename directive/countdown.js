let timer;
const countdownObj = {
    bind(el, binding, vnode) {
        el.style.background = "pink";
        el.style.width = "120px";
        el.style.borderRadius = "50px";
        el.style.height = "50px";
        el.style.textAlign = "center";
        el.style.lineHeight = "50px";
        el.style.fontSize = "30px";
        el.style.color = "red";
        el.innerText = binding.value;
    },
    inserted(el, binding, vnode) {
        timer = setInterval(() => {
            binding.value--;
            el.innerText = binding.value;
            if (binding.value > 0) return
            clearInterval(timer)
            el.parentNode.removeChild(el)
        }, 1000)
    }
}

export {countdownObj}

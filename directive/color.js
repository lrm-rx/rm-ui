const changeColor = function (e) {
    const colorVal = e.target.getAttribute('color-value')
    e.target.style.background = colorVal
}
const colorObj = {
    bind(el, binding, vnode) {
        el.style.background = "rgba(0,0,0, 0.5)";
        el.style.width = "150px";
        el.style.borderRadius = "50px";
        el.style.height = "50px";
        el.style.textAlign = "center";
        el.style.lineHeight = "50px"
    },
    inserted(el, binding, vnode) {
        let {
            value
        } = binding;

        el.setAttribute('color-value', value)
        el.addEventListener('click', changeColor)
    },
    unbind(el, binding, vnode) {
        el.removeEventListener('click', changeColor)
    }
}

export {colorObj}

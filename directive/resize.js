const resize = {
    bind(el, binding) {
        let w = '',h = '';
        function isResize() {
            const style = document.defaultView.getComputedStyle(el)
            if (w !== style.width || h !== style.height) {
                binding.value({ w: style.width, h: style.height })
            }
            w = style.width
            h = style.height
        }
        window.addEventListener('resize', function() {
            isResize();
        })
    },
    unbind(el) {
        window.removeEventListener('resize');
    }
}

export {resize}
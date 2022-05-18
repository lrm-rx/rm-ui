<template>
  <div class="rm-swiper-slide" :style="style" :class="{'active':active}">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'RmSwiperItem',
  data () {
    return {
      offset: 0, // 由父组件swiper更新
      active: false // 当前添加样式，同样由父组件更新
    }
  },
  computed: {
    style () {
      let animation = {
        width: this.$parent.containerWidth + 'px',
        float: 'left',
        transform: `translate3d(${this.offset}px, 0, 0)`,
        transition: `transform 0ms`
      }
      if (this.$parent.animation === 'fade') {
        animation = {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: this.$parent.containerHeight + 'px',
          // zIndex: this.active ? 1 : 0,
          opacity: this.active ? 1 : 0,
          transition: `all ${this.$parent.duration}ms`
        }
      }
      return animation
    }
  },
  mounted () {
    this.$parent.swipes.push(this)// 更新item个数
  },
}
</script>
<style>
.rm-swiper-slide {
    width: 100%;
    height: 100%;
}
</style>

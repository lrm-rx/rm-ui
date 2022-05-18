<!--原理：
当处于最后一个到循环到第一个时，toucrmove时将第一个移到最后，下次touchStart时先恢复第一个
-->
<template>
  <div 
       class="rm-swiper-container"
       style="position: relative;overflow: hidden"
       ref="container"
       @touchstart="_touchStart"
       @touchmove="_touchMove"
       @touchend="_touchEnd"
       @touchcancel="_touchEnd"
       @mouseover="_mouseOver"
       @mouseleave="_mouseLeave">
    <div class="rm-swiper-wrapper" :style="styleWrap">
      <slot/>
    </div>
    <div class="rm-direction-nav" v-if="directionNav">
      <span class="swiper-prev" @click="_directionNavClick(-1)"></span>
      <span class="swiper-next" @click="_directionNavClick(1)"></span>
    </div>
    <div class="rm-control-nav" v-if="controlNav">
      <span
         v-for="(item,index) in swipes"
         :class="[ 'control-nav-noactive', {'control-nav-active':index===current}]"
         :key="index" @click="_controlNavClick(index)"></span>
    </div>
  </div>
</template>
<script>

export default {
  name: 'RmSwiper',
  data () {
    return {
      containerWidth: '', // 组件宽
      containerHeight: '',
      swipes: [], // 切换的item，由item更新
      translate: 0, // 移动的距离
      duration2: '', // 切换时间
      startX: 0, // 触摸点位置
      current: this.active, // 从0开始，当前第几个
      timer: '' // 控制自动播放
    }
  },
  props: {
    active: {// 当前第几个
      type: Number,
      default: 0
    },
    showTime: {// 自动播放时动画停留时间，单位毫秒
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    slideBefore: Function,
    slideAfter: Function,
    distance: {// 触摸松开时触发距离，单位px
      type: Number,
      default: 50
    },
    duration: {// transition-duration过渡时间，单位毫秒
      type: Number,
      default: 500
    },
    controlNav: {// 显示分页小圆点
      type: Boolean,
      default: true
    },
    directionNav: { // 显示前后控制
      type: Boolean,
      default: true
    },
    pauseOnHover: { // 鼠标滑过暂停
      type: Boolean,
      default: true
    },
    touch: { // 允许触摸
      type: Boolean,
      default: false
    },
    /* loop: { // 循环
      type: Boolean,
      default: false
    }, */
    animation: { // 动画
      default: 'slide',
      validator: function (value) {
        return ['fade', 'slide'].indexOf(value) !== -1
      }
    }
  },
  watch: {
    active (v) {
      this.current = v
      this._translate(v)
    }
  },
  components: {},
  methods: {
    _getTouch (event) {
      return event.changedTouches[0] || event.touches[0]
    },
    _touchStart (event) {
      if (!this.touch || this.animation === 'fade') {
        return
      }
      clearInterval(this.timer)
      const touch = this._getTouch(event)
      this.startX = touch.clientX
      // 重置item项初始状态
      event.preventDefault()
    },
    _touchMove (event) {
      if (!this.touch || this.animation === 'fade') {
        return
      }
      const touch = this._getTouch(event)
      const distance = touch.clientX - this.startX
      this._setItem(-distance)
      this.duration2 = 0
      this.translate = -this.containerWidth * this.current + distance
      event.preventDefault()
    },
    _touchEnd (event) {
      if (!this.touch || this.animation === 'fade') {
        return
      }
      const index = this.current
      this._slideBefore(index)
      const touch = this._getTouch(event)
      const distance = touch.clientX - this.startX// 大于0向右
      if (Math.abs(distance) > this.distance) {
        // 移动大于多少个单位触发
        if (distance > 0) {
          // 向右移，
          this.current--
        } else if (distance < 0) {
          // 向左移
          this.current++
        }
        const len = this.swipes.length - 1
        if (this.current < 0) {
          // this.current = len
          this._setCurrent(len)
        }
        if (this.current > this.swipes.length - 1) {
          // this.current = 0
          this._setCurrent(0)
        }
      }
      this._translate(this.current)
      this._slideAfter(index)
      this._autoPlay()
    },
    _setCurrent (current) {
      setTimeout(() => {
        this.current = current
        // 将滑动恢复为0,0,0位置
        this.swipes[current].offset = 0
        this._translate(current, 0)
      }, this.duration)
    },
    _translate (current, duration) {
      this.duration2 = duration === 0 ? 0 : this.duration
      this.translate = -this.containerWidth * current
      if (this.animation === 'fade') {
        this._swipesActive(current)
      }
      // this.swipes[current].active = true
    },
    _swipesActive (current) {
      let len = this.swipes.length
      if (current > len - 1) {
        this.current = 0
      }
      if (current < 0) {
        this.current = len - 1
      }
      for (let i = 0; i < len; i++) {
        this.swipes[i].active = i === this.current
      }
      console.log(this.current)
      // 设置当前滑动的样式为active
    },
    _directionNavClick (direction) {
      // direction -1 上一个，1下一个
      // 开始滑动前回调
      this._slideBefore(this.current)
      if (this.animation === 'slide') {
        const item = this._setItem(direction)
        const moveFirstOrLast = item[0]
        const index = item[1]
        this.current = this.current + direction
        // 向左或右移动一个单位
        this._translate(this.current)
        // this.translate = -this.containerWidth * this.current
        // 移动完后，如果有将第一或最后一个移动了位置的
        if (moveFirstOrLast) {
          this.current = index
          setTimeout(() => {
            // this.duration2 = 0 // 这个时候不能有过渡时间
            // this.translate = -this.containerWidth * index
            this._translate(index, 0)
            this.swipes[index].offset = 0
          }, this.duration)
        }
      } else {
        this.current = this.current + direction
        // 向左或右移动一个单位
        this._translate(this.current)
      }
      this._slideAfter(this.current)
    },
    _controlNavClick (index) {
      this._slideBefore(index)
      this.current = index
      this._translate(index)
      this._slideAfter(index)
    },
    _setItem (direction) {
      // direction方向，大于0下一个，小于0上一个
      // 触摸和前后点击共同项
      const len = this.swipes.length
      const offset = this.containerWidth * len// 最后或第一个将要偏移的距离
      let moveFirstOrLast = false
      let index = this.current
      if (direction > 0 && this.current >= len - 1) {
        // 到最后一个时，再下一个，先将第一个移到最后面
        this.swipes[0].offset = offset
        moveFirstOrLast = true
        index = 0
      }
      if (direction < 0 && this.current <= 0) {
        // 从第一个到时后一个时，先将最后一个移到最前面
        this.swipes[len - 1].offset = -offset
        moveFirstOrLast = true
        index = len - 1
      }
      return [moveFirstOrLast, index]
    },
    _autoPlay () {
      if (this.autoPlay) {
        this.timer = setInterval(() => {
          // 每隔一定的时单，点下一个
          this._directionNavClick(1)
        }, this.showTime)
      }
    },
    _slideBefore (index) {
      this.slideBefore && this.slideBefore(index)
      this.$emit('slideBefore', index)
    },
    _slideAfter (index) {
      setTimeout(() => {
        this.slideAfter && this.slideAfter(index)
        this.$emit('slideAfter', index)
      }, this.duration)
    },
    _mouseOver () {
      // 如果鼠标滑动过时暂停和自动播放时，鼠标移上暂停
      if (this.pauseOnHover && this.autoPlay) {
        clearInterval(this.timer)
      }
    },
    _mouseLeave () {
      this._autoPlay()
    }
  },
  computed: {
    styleWrap () {
      let animation = {
        width: this.containerWidth * this.swipes.length + 'px',
        transform: `translate3d(${this.translate}px,0,0)`,
        transition: `transform ${this.duration2}ms`
      }
      if (this.animation === 'fade') {
        animation = {
          height: this.containerHeight + 'px',
          overflow: 'hidden',
          position: 'relative'
        }
      }
      return animation
    }
  },
  mounted () {
    this.containerWidth = this.$refs.container.offsetWidth// 宽
    this.containerHeight = this.$refs.container.offsetHeight
    this._translate(this.current)
    this._autoPlay()
  },
}
</script>

<style>
.rm-swiper-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: pink;
}
.rm-swiper-wrapper{
    width: 100%;
    height: 100%;
}
.rm-direction-nav {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: calc(100% - 40px);
    height: 100%;
    /* background-color: gray; */
}
.rm-direction-nav:hover .swiper-prev,
.rm-direction-nav:hover .swiper-next{
    visibility: visible;
}
.swiper-prev, .swiper-next {
    width: 20px;
    height: 20px;
    transform-origin:50% 50%;
    transform: rotate(45deg);
    visibility: hidden;
    cursor: pointer;
}
.swiper-prev {
    border-left: 2px solid skyblue;
    border-bottom: 2px solid skyblue;
}
.swiper-next {
    border-top: 2px solid skyblue;
    border-right: 2px solid skyblue;
}

.rm-control-nav {
    position: absolute;
    bottom: 6px;
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
}
.control-nav-noactive {
    margin: 0 2px;
    width: 30px;
    height: 10px;
    background-color: gray;
    cursor: pointer;
}
.control-nav-active {
    width: 30px;
    height: 10px;
    background-color: skyblue;
}
</style>

<template>
  <transition name="rm-fade">
    <div
      v-show="show"
      class="rm-backtop"
      :style="{
        right: right + 'px',
        bottom: bottom + 'px',
        opacity: show ? 1 : 0,
      }"
      @click="_click"
    >
      <span v-text="text" class="icon top"></span>
    </div>
  </transition>
</template>

<script>
import comm from "../../mixins/dom.js";
export default {
  name: "RmBacktop",
  data() {
    return {
      show: false,
    };
  },
  mixins: [comm],
  props: {
    text: {
      type: String,
      default: "返回顶部",
    },
    height: {
      type: Number,
      default: 200,
    },
    bottom: {
      type: Number,
      default: 30,
    },
    right: {
      type: Number,
      default: 30,
    },
    click: {
      type: Function,
    },
  },
  methods: {
    _winScroll() {
      if (this.scrollTop() > this.height) return (this.show = true);
      this.show = false;
    },
    _click() {
      smoothscroll.bind(this)();
      function smoothscroll() {
        const currentScroll = this.scrollTop();
        if (this.scrollTop() <= 0) return;
        window.requestAnimationFrame(smoothscroll.bind(this));
        window.scrollTo(0, currentScroll - currentScroll / 5);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      document.body.appendChild(this.$el);
      this._winScroll();
    });
    window.addEventListener("scroll", this._winScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this._winScroll);
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
};
</script>

<style>
.rm-backtop {
  position: fixed;
  width: 60px;
  height: 60px;
  padding: 10px;
  text-align: center;
  background-color: gray;
  border-radius: 50px;
  box-sizing: border-box;
  cursor: pointer;
}
.rm-fade-enter-active,
.rm-fade-leave-active {
  transition: opacity 2s;
}
.rm-fade-enter,
.rm-fade-leave-to {
  opacity: 0;
}
</style>

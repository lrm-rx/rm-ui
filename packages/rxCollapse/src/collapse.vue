<template>
  <div class="RxCollapse" :style="{ backgroundColor: bgColor, width: width }">
    <div class="RxCollapseHead" :style="{
        color: headColor,
        borderLeftColor: borderColor,
      }" @click="collapse = !collapse">
      <span>{{ title }}</span>
      <span style="float: right">
        <i v-if="collapse" class="rx-icon-arrow-down"></i>
        <i v-else class="rx-icon-arrow-right"></i>
      </span>
    </div>
    <collapseTransition>
      <div v-if="collapse" class="rx-main-collapse-context">
        <slot></slot>
      </div>
    </collapseTransition>
    <div style="text-align: center;" @click="collapse = !collapse">展开</div>
  </div>
</template>
 
<script>
import CollapseTransition from './transition'
export default {
  name: "RxCollapse",
  components: {
    CollapseTransition
  },
  props: {
    title: {
      type: String,
      default: "标题",
    },
    headColor: {
      type: String,
      default: "orange",
    },
    borderColor: {
      type: String,
      default: "orange",
    },
    bgColor: {
      type: String,
      default: "rgba(41, 41, 41, 0.589)", //浅黑
      // default: "#253266b7",//浅蓝
    },
    width: {
      type: String,
      default: "100%",
    },
    isCollapse: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      collapse: this.isCollapse,
    };
  },
  computed: {},
  created () { },
  mounted () { },
  filters: {},
  methods: {},
  watch: {},
};
</script>
 
<style scoped>
.RxCollapse {
  /* margin: 10px 0; */
  color: white;
  background-color: rgba(41, 41, 41, 0.589);
  padding: 10px;
}
.rx-main-collapse-context {
  margin-top: 10px;
}
.RxCollapseHead {
  line-height: 25px;
  border-left: 3px solid;
  font-weight: bold;
  padding-left: 10px;
  font-size: 15px;
  caret-color: transparent;
}
.rx-icon-arrow-down {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-top: 2px solid #ffa500;
  border-right: 2px solid #ffa500;
  transform: rotate(135deg);
  transition: all ease .1s;
}
.rx-icon-arrow-right {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-top: 2px solid #ffa500;
  border-right: 2px solid #ffa500;
  transform: rotate(45deg);
  transition: all ease .1s;
}
</style>

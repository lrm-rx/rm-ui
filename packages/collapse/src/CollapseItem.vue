<template>
  <div>
    <div @click="handleHeaderClick">
      <h4>{{ title }}</h4>
    </div>
    <div v-show="isShow">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "RmCollapseItem",
  props: {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: [String, Number],
    },
  },
  inject: ["collapse"],
  data() {
    return {};
  },
  methods: {
    handleHeaderClick() {
      this.collapse.$emit("item-click", this);
    },
  },
  computed: {
    isShow() {
      return this.collapse.value.indexOf(this.name) > -1;
    },
  },
};
</script>

<style scoped>
</style>
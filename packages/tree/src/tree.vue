<template>
  <div>
      <div @click="toggle">
          {{treeData.label}}
          <span v-if="isOpenFolder">[{{open?'-':'+'}}]</span>
      </div>
      <ul v-if="isOpenFolder" v-show="open">
          <RmTree v-for="data in treeData.children" :treeData="data" :key="data.label"></RmTree>
      </ul>
  </div>
</template>

<script>
export default {
    name: "RmTree", // name对递归组件是必须的
    props: {
        treeData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            open: false
        }
    },
    methods: {
        toggle() {
            if(this.isOpenFolder) {
                this.open = !this.open
            }
        }
    },
    computed: {
        isOpenFolder() {
            return this.treeData.children && this.treeData.children.length;
        }
    }
}
</script>

<style scoped>

</style>
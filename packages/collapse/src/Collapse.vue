<template>
  <div>
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'RmCollapse',
    props: {
        value: {
            type: Array,
            default: ()=> []
        }
    },
    created() {
        this.$on("item-click", (item) => {
            let index = this.value.indexOf(item.name)
            if(index > -1) {
                this.value.splice(index,1)
            }else {
                this.value.push(item.name)
            }
        })
    },
    provide() {
        return {
            collapse: this,
        }
    }
}
</script>

<style scoped>

</style>
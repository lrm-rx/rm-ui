<template>
  <div class="toast" :class="type" v-if="showToast">
      {{message}}
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 10px 20px;
    background: rgba(0,0,0,0.6);
    border-radius: 5px;
    animation: show-toast 0.2s;
    color: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
}
@keyframes show-toast {
    from{
        opacity: 0;
    }to {
        opacity: 1;
    }
}
.success {
  color: #67c23a;
  background: rgb(225, 243, 216);
}

.warning {
  color: #e6a23c;
  background: rgb(250, 236, 216);
}

.fail {
  color: #f56c6c;
  background: rgb(253, 226, 226);
}
</style>
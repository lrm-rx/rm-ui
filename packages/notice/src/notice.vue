<template>
  <div v-if="isShow" class="notification right">
    <div class="notification__group">
      <h2 class="notification__title" v-text="title"></h2>
      <div class="notification__content" v-show="message">
        <p v-html="message"></p>
      </div>
      <div class="closeBtn el-icon-close" @click.stop="hide"></div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'notice',
    data() {
        return {
            title: "",
            message: "",
            duration: 4500,
            isShow: false,
            timer: null
        }
    },
    methods: {
        hide() {
            this.isShow = false
        }
    },
    mounted() {
        this.isShow = true
        this.timer = setTimeout(()=> {
            this.isShow = false;
        }, this.duration)
    },
    beforeDestroy() {
        clearTimeout(this.timer)
    }
}
</script>

<style scoped>
.notification {
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s,
    bottom 0.3s;
  overflow: hidden;
}
.notification.right {
  right: 16px;
  top: 16px;
  z-index: 2002;
}
.notification__group {
  margin-left: 13px;
  margin-right: 8px;
}
.notification__title {
  font-weight: 700;
  font-size: 16px;
  color: #303133;
  margin: 0;
}
.notification__content {
  font-size: 14px;
  line-height: 21px;
  margin: 6px 0 0;
  color: #606266;
  text-align: justify;
}
.closeBtn {
  position: absolute;
  top: 18px;
  right: 15px;
  cursor: pointer;
  color: #909399;
  font-size: 16px;
}
</style>
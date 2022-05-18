<template>
  <div style="height: 3000px">
    <div v-color="'deepskyblue'">vue自定义指令</div>
    <div v-countdown="10" />
    <!-- <button @click="openNotice">打开</button>
    <h2>tree组件</h2>
    <rm-tree :treeData="treeData"></rm-tree>
    <h2>collapse组件</h2>
    <rm-collapse :value="activeNames">
      <rm-collapse-item title="一致性 Consistency" name="1">
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
        <div>
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
      </rm-collapse-item>
      <rm-collapse-item title="反馈 Feedback" name="2">
        <div>
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
        </div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </rm-collapse-item>
      <rm-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>
          清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
        </div>
        <div>
          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
      </rm-collapse-item>
      <rm-collapse-item title="可控 Controllability" name="4">
        <div>
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
        </div>
        <div>
          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
        </div>
      </rm-collapse-item>
    </rm-collapse>
    <rm-backtop />
    <hr />

    <div class="rm-swiper">
      <rm-swiper>
        <rm-swiper-item>我是第一屏</rm-swiper-item>
        <rm-swiper-item>我是第二屏</rm-swiper-item>
        <rm-swiper-item>我是第三屏</rm-swiper-item>
      </rm-swiper>
    </div> -->
    <!-- <h2>显示格式化后的时间</h2>
    <h3>{{ time | dateFormater }}</h3>
    <h3>{{ time | dateFormater("YYYY-MM-DD HH:mm:ss") }}</h3>

    <h2>小写转换成大写</h2>
    <p>{{str}}</p>
    <p>{{str | upperCase}}</p> -->
    <div class="box1" v-resize="DomResize"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: Date.now(),
      str: "I like doing sports. It's good for my health",
      activeNames: ["2"],
      treeData: {
        label: "web课程",
        children: [
          {
            label: "JS+ES6",
            children: [
              {
                label: "Promise",
                children: [
                  {
                    label: "resolve和reject",
                  },
                  {
                    label: "all()和race()",
                  },
                ],
              },
            ],
          },
          {
            label: "Vue全家桶",
            children: [
              {
                label: "Vue基础",
              },
              {
                label: "Vue组件化",
              },
              {
                label: "vue-router",
              },
              {
                label: "vuex",
              },
            ],
          },
          {
            label: "React全家桶",
            children: [
              {
                label: "二级 3-1",
                children: [
                  {
                    label: "三级 3-1-1",
                  },
                ],
              },
              {
                label: "二级 3-2",
                children: [
                  {
                    label: "三级 3-2-1",
                  },
                ],
              },
            ],
          },
          {
            label: "Nodejs实战",
            children: [
              {
                label: "二级 3-1",
                children: [
                  {
                    label: "三级 3-1-1",
                  },
                ],
              },
              {
                label: "二级 3-2",
                children: [
                  {
                    label: "三级 3-2-1",
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    openNotice() {
      this.$notice({
        title: "组件化设计",
        message: "你学到了么?",
        duration: 2000,
      });
    },
    DomResize(data) {
      console.log('变化', data)
    }
  }
};
</script>

<style lang="scss" scoped>
.box1 {
  height: 400px;
  background-color: pink;
}
.row {
  padding: 10px 0;
}
.rm-button {
  margin-left: 10px;
}
.rm-swiper {
  width: 500px;
  height: 300px;
}
</style>

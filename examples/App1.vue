<template>
  <div>
    <div
      style="
        height: 500px;
        width: 1000px;
        border: 1px solid red;
        position: relative;
      "
    >
      <rm-drag :w="300" :h="300" :x="100" :y="100" @dragging="onDrag" :parent="true">
        <p>X: {{ x }} / Y: {{ y }}</p>
        <input type="text" />
      </rm-drag>
    </div>
    <button @click="$rmtoast({message: '操作成功！', duration: 2000, type: 'success'})">toast</button>
  </div>
  <!-- <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
    <vue-draggable-resizable :w="100" :h="100" @dragging="onDrag" @resizing="onResize" :parent="true">
      <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
      X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
    </vue-draggable-resizable>
  </div> -->
</template>

<script>
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import VueDraggableResizable from "vue-draggable-resizable";

export default {
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  methods: {
    onDrag: function (x, y) {
      this.x = x;
      this.y = y;
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>

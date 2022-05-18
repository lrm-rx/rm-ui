<template>
  <div
    :style="style"
    :class="[className]"
    @mousedown="elementMouseDown"
    @touchstart="elementTouchDown"
  >
    <slot></slot>
  </div>
</template>

<script>
import {
  getComputedSize,
  addEvent,
  removeEvent,
} from "../utils/dom";
import {
  restrictToBounds,
  snapToGrid,
} from "../utils/fns";

const events = {
  mouse: {
    start: "mousedown",
    move: "mousemove",
    stop: "mouseup",
  },
  touch: {
    start: "touchstart",
    move: "touchmove",
    stop: "touchend",
  },
};

const userSelectNone = {
  userSelect: "none",
  MozUserSelect: "none",
  WebkitUserSelect: "none",
  MsUserSelect: "none",
};

const userSelectAuto = {
  userSelect: "auto",
  MozUserSelect: "auto",
  WebkitUserSelect: "auto",
  MsUserSelect: "auto",
};

let eventsFor = events.mouse;

export default {
  replace: true,
  name: "rm-drag",
  props: {
    className: {
      type: String,
      default: "rm-drag",
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    w: {
      type: [Number, String],
      default: 200,
      validator: (val) => {
        if (typeof val === "number") {
          return val > 0;
        }

        return val === "auto";
      },
    },
    h: {
      type: [Number, String],
      default: 200,
      validator: (val) => {
        if (typeof val === "number") {
          return val > 0;
        }

        return val === "auto";
      },
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    z: {
      type: [String, Number],
      default: "auto",
      validator: (val) => (typeof val === "string" ? val === "auto" : val >= 0),
    },
    axis: {
      type: String,
      default: "both",
      validator: (val) => ["x", "y", "both"].includes(val),
    },
    grid: {
      type: Array,
      default: () => [1, 1],
    },
    parent: {
      type: Boolean,
      default: false,
    },
    onDragStart: {
      type: Function,
      default: () => true,
    },
    onDrag: {
      type: Function,
      default: () => true,
    }
  },

  data() {
    return {
      left: this.x,
      top: this.y,
      right: null,
      bottom: null,

      width: null,
      height: null,

      widthTouched: false,
      heightTouched: false,

      parentWidth: null,
      parentHeight: null,

      handle: null,
      dragging: false,
      dragEnable: false,
      zIndex: this.z,
    };
  },

  created() {
    this.resetBoundsAndMouseState();
  },
  mounted() {

    const [parentWidth, parentHeight] = this.getParentSize();

    this.parentWidth = parentWidth;
    this.parentHeight = parentHeight;

    const [width, height] = getComputedSize(this.$el);

    this.width = this.w !== "auto" ? this.w : width;
    this.height = this.h !== "auto" ? this.h : height;

    this.right = this.parentWidth - this.width - this.left;
    this.bottom = this.parentHeight - this.height - this.top;

    
  },
  beforeDestroy() {
    removeEvent(document.documentElement, "touchstart", this.handleUp);
    removeEvent(document.documentElement, "mousemove", this.move);
    removeEvent(document.documentElement, "touchmove", this.move);
    removeEvent(document.documentElement, "mouseup", this.handleUp);
  },

  methods: {
    // 需要
    resetBoundsAndMouseState() {
      this.mouseClickPosition = {
        mouseX: 0,
        mouseY: 0,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      };

      this.bounds = {
        minLeft: null,
        maxLeft: null,
        minRight: null,
        maxRight: null,
        minTop: null,
        maxTop: null,
        minBottom: null,
        maxBottom: null,
      };
    },
    // 需要
    getParentSize() {
      if (this.parent) {
        const style = window.getComputedStyle(this.$el.parentNode, null);

        return [
          parseInt(style.getPropertyValue("width"), 10),
          parseInt(style.getPropertyValue("height"), 10),
        ];
      }

      return [null, null];
    },
    // ---------------------------------------------------
    elementTouchDown(e) {
      eventsFor = events.touch;

      this.elementDown(e);
    },
    elementMouseDown(e) {
      eventsFor = events.mouse;

      this.elementDown(e);
    },
    elementDown(e) {
      if (e instanceof MouseEvent && e.which !== 1) {
        return;
      }

      const target = e.target || e.srcElement;

      if (this.$el.contains(target)) {
        if (this.onDragStart(e) === false) {
          return;
        }

        if (this.draggable) {
          this.dragEnable = true;
        }

        this.mouseClickPosition.mouseX = e.touches
          ? e.touches[0].pageX
          : e.pageX;
        this.mouseClickPosition.mouseY = e.touches
          ? e.touches[0].pageY
          : e.pageY;

        this.mouseClickPosition.left = this.left;
        this.mouseClickPosition.right = this.right;
        this.mouseClickPosition.top = this.top;
        this.mouseClickPosition.bottom = this.bottom;

        if (this.parent) {
          this.bounds = this.calcDragLimits();
        }

        addEvent(document.documentElement, eventsFor.move, this.move);
        addEvent(document.documentElement, eventsFor.stop, this.handleUp);
      }
    },
    // -------------------------------------------------------
    // *** 可以尝试在这里判断是否碰到左右侧
    calcDragLimits() {
      return {
        minLeft: this.left % this.grid[0],
        maxLeft:
          Math.floor(
            (this.parentWidth - this.width - this.left) / this.grid[0]
          ) *
            this.grid[0] +
          this.left,
        minRight: this.right % this.grid[0],
        maxRight:
          Math.floor(
            (this.parentWidth - this.width - this.right) / this.grid[0]
          ) *
            this.grid[0] +
          this.right,
        minTop: this.top % this.grid[1],
        maxTop:
          Math.floor(
            (this.parentHeight - this.height - this.top) / this.grid[1]
          ) *
            this.grid[1] +
          this.top,
        minBottom: this.bottom % this.grid[1],
        maxBottom:
          Math.floor(
            (this.parentHeight - this.height - this.bottom) / this.grid[1]
          ) *
            this.grid[1] +
          this.bottom,
      };
    },
    
    // ***
    move(e) {
      if (this.dragEnable) {
        this.handleDrag(e);
      }
    },
    // ***
    handleDrag(e) {
      const axis = this.axis;
      const grid = this.grid;
      const bounds = this.bounds;
      const mouseClickPosition = this.mouseClickPosition;

      const tmpDeltaX =
        axis && axis !== "y"
          ? mouseClickPosition.mouseX -
            (e.touches ? e.touches[0].pageX : e.pageX)
          : 0;
      const tmpDeltaY =
        axis && axis !== "x"
          ? mouseClickPosition.mouseY -
            (e.touches ? e.touches[0].pageY : e.pageY)
          : 0;

      const [deltaX, deltaY] = snapToGrid(
        grid,
        tmpDeltaX,
        tmpDeltaY,
      );

      const left = restrictToBounds(
        mouseClickPosition.left - deltaX,
        bounds.minLeft,
        bounds.maxLeft
      );
      const top = restrictToBounds(
        mouseClickPosition.top - deltaY,
        bounds.minTop,
        bounds.maxTop
      );

      if (this.onDrag(left, top) === false) {
        return;
      }

      const right = restrictToBounds(
        mouseClickPosition.right + deltaX,
        bounds.minRight,
        bounds.maxRight
      );
      const bottom = restrictToBounds(
        mouseClickPosition.bottom + deltaY,
        bounds.minBottom,
        bounds.maxBottom
      );

      this.left = left;
      this.top = top;
      this.right = right;
      this.bottom = bottom;

      this.$emit("dragging", this.left, this.top);
      this.dragging = true;
    },
    
    // 需要
    handleUp(e) {
      this.handle = null;

      this.resetBoundsAndMouseState();

      this.dragEnable = false;

      if (this.dragging) {
        this.dragging = false;
        this.$emit("dragstop", this.left, this.top);
      }
    },
  },
  computed: {
    style() {
      return {
        transform: `translate(${this.left}px, ${this.top}px)`,
        width: this.computedWidth,
        height: this.computedHeight,
        zIndex: this.zIndex,
        ...(this.dragging? userSelectNone:userSelectAuto),
      };
    },
    actualHandles() {
      return this.handles;
    },
    computedWidth() {
      if (this.w === "auto") {
        if (!this.widthTouched) {
          return "auto";
        }
      }

      return this.width + "px";
    },
    computedHeight() {
      if (this.h === "auto") {
        if (!this.heightTouched) {
          return "auto";
        }
      }

      return this.height + "px";
    }
  },
};
</script>
<style scoped>
.rm-drag {
  touch-action: none;
  position: absolute;
  box-sizing: border-box;
  border: 1px dashed black;
}


</style>
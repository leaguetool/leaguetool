<template>
  <div
    class="navbar"
    :class="{ fixed: fixed, 'transparent fixed': transparent }"
  >
    <div
      class="navbar-wrap flexbox flex-alignc drag"
      :style="{ background: bgcolor, 'z-index': zIndex }"
    >
      <!-- 标题 -->
      <div class="navbar-title" :class="{ center: center }">
        <img
          v-if="showIcon"
          src="../../assets/logo.png"
          class="navbar-icon"
          width="16"
          height="16"
        />
        <template v-if="$slots.title">
          <slot name="title" />
        </template>
        <template v-else>
          {{ title }}
        </template>
      </div>
    </div>
    <WinBar
      :minimizable="minimizable"
      :maximizable="maximizable"
      :closable="closable"
    >
      <slot name="wbtn" />
    </WinBar>
  </div>
</template>

<script>
import WinBar from "./WinBar.vue";
export default {
  components: {
    WinBar,
  },
  props: {
    // 标题
    title: { type: String, default: "" },
    // 背景颜色
    bgcolor: String,
    // 标题是否居中
    center: { type: [Boolean, String], default: false },
    // 是否固定
    fixed: { type: [Boolean, String], default: false },
    // 背景透明
    transparent: { type: [Boolean, String], default: false },
    // 设置层级
    zIndex: { type: [Number, String], default: "2021" },
    // 显示左上角图标
    showIcon: { type: [Boolean], default: true },

    /**
     * WinBar组件参数
     */
    // 窗口是否可以最小化
    minimizable: { type: [Boolean, String], default: true },
    // 窗口是否可以最大化
    maximizable: { type: [Boolean, String], default: true },
    // 窗口是否可以关闭
    closable: { type: [Boolean, String], default: true },
  },
  setup() {
    return {};
  },
};
</script>
<style>
.drag {
  -webkit-app-region: drag;
}
.navbar {
  width: 100%;
}
.navbar-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;

  background: transparent;
}
.fixed {
  display: flex;
}
.navbar-title {
  padding-left: 5px;
  opacity: 0.7;
  color: #fff;
}
.navbar-icon {
  margin-right: 4px;
}
.navbar-title.center {
  text-align: center;
}
.transparent {
}
</style>

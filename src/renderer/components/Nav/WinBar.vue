<template>
  <div class="winbar">
    <slot />
    <MinusOutlined
      v-if="JSON.parse(minimizable)"
      @click="minimizeApp"
      class="winbtn"
      title="最小化"
    />
    <FullscreenOutlined
      v-if="JSON.parse(maximizable)"
      class="winbtn"
      title="最大化"
    />
    <CloseOutlined
      v-if="JSON.parse(closable)"
      @click="closeAppcloseApp"
      class="winbtn close"
      title="关闭"
    />
  </div>
</template>

<script>
import CloseOutlined from "@ant-design/icons-vue/CloseOutlined";
import MinusOutlined from "@ant-design/icons-vue/MinusOutlined";
import FullscreenOutlined from "@ant-design/icons-vue/FullscreenOutlined";
import { ipcRenderer } from "electron";

export default {
  components: {
    MinusOutlined,
    CloseOutlined,
    FullscreenOutlined,
  },
  props: {
    color: { type: String, default: "" },
    // 窗口是否可以最小化
    minimizable: { type: [Boolean, String], default: true },
    // 窗口是否可以最大化
    maximizable: { type: [Boolean, String], default: true },
    // 窗口是否可以关闭
    closable: { type: [Boolean, String], default: true },
  },
  setup() {
    function closeAppcloseApp() {
      ipcRenderer.send("closeApp");
    }
    function minimizeApp() {
      ipcRenderer.send("minimizeApp");
    }
    return {
      closeAppcloseApp,
      minimizeApp,
    };
  },
};
</script>

<style>
.winbar {
  display: flex;
  color: #fff;
}
.winbtn {
  cursor: pointer;
  opacity: 0.7;
}
.winbtn.close:hover {
  opacity: 1;
  color: #fff;
  background-color: #ff4d4f !important;
}
.winbtn:hover {
  opacity: 1;
  background-color: #c3c3c345;
}
.winbar .winbtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
}
</style>

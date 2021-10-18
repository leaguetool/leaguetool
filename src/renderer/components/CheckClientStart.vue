<template>
  <a-result :title="title" :sub-title="subTitle">
    <template #icon>
      <img src="../assets/logo.png" class="navbar-icon" height="150"
    /></template>
    <template #extra>
      <a-button type="primary" loading>检测启动中</a-button>
    </template>

    <div class="desc">
      <p style="font-size: 16px">
        <strong class="desc-title">检测到游戏未启动可能有以下几种可能：</strong>
      </p>
      <p>
        <close-circle-outlined :style="{ color: 'red' }" />
        您的游戏客户端未启动
        <a-tag color="default">
          <template #icon>
            <sync-outlined :spin="true" />
          </template>
          {{ second }}S后重新检测
        </a-tag>
      </p>
      <p>
        <close-circle-outlined :style="{ color: 'red' }" />
        可能未检测到游戏目录
        <a-tag
          class="game-path"
          @click="select"
          @close.prevent="handleClose"
          :closable="!!selectDir"
        >
          {{ selectDir || defaultMsg }}
        </a-tag>
      </p>
    </div>
  </a-result>
</template>

<script>
import { CloseCircleOutlined, SyncOutlined } from "@ant-design/icons-vue";
export default {
  emits: ["select", "handleClose"],
  props: {
    title: String,
    subTitle: String,
    selectDir: String,
    defaultMsg: {
      type: String,
      default: "点击此处重新选择",
    },
    second: { type: Number, default: 10 },
  },
  components: { CloseCircleOutlined, SyncOutlined },
  setup(props, content) {
    return {
      select() {
        content.emit("select");
      },
      handleClose() {
        content.emit("handleClose");
      },
    };
  },
};
</script>

<style>
.ant-result {
  padding: 100px 30px !important;
}
.ant-result .ant-result-title {
  color: #fff;
}
.ant-result .ant-result-subtitle {
  color: #fff;
}
.ant-result .ant-result-content {
  background-color: #00000052;
}
.desc-title {
  opacity: 1;
}
.desc p {
  opacity: 0.8;
  color: #fff;
  margin-bottom: 1em;
}
.game-path {
  background: #fff;
  border-style: dashed;
  cursor: pointer;
}
</style>

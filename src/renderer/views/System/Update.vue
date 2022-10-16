<template>
  <div class="app-update-box">
    <div
      class="app-update-bg"
      style="
        background: url(static/images/update_bg.jpg) no-repeat center center;
      "
    ></div>
    <div class="app-update">
      <div class="app-update-title">版本更新 {{ versionTxt }}</div>
      <div class="app-update-content">
        <div v-for="log in update.logs" :key="log" v-html="log"></div>
      </div>
      <div class="app-update-progress">
        <a-progress
          :strokeColor="strokeColor"
          :percent="update.percent"
          :strokeWidth="strokeWidth"
          status="active"
        />
      </div>
    </div>
  </div>
</template>

<script>
import mitt from "@/common/mitt";
import { reactive, computed } from "vue";
import { ipcRenderer } from "electron";
export default {
  setup() {
    mitt.emit("app-update");
    let update = reactive({
      logs: [],
      percent: 0,
      version: "",
    });
    //开始下载包
    ipcRenderer.invoke("confirm-downloadUpdate");

    ipcRenderer.on("app-update-version", (event, versionInfo) => {
      update.version = versionInfo.version;
      update.logs = versionInfo.releaseNotes;
    });

    //监听下载进度
    ipcRenderer.on("app-update-progress", (event, progress) => {
      update.percent = progress.percent.toFixed(0);
    });
    let versionTxt = computed(() =>
      update.version ? `v${update.version}` : ""
    );
    return {
      update,
      versionTxt,
      strokeWidth: 25,
      strokeColor: { "0%": "#f9cc16", "100%": "#87d068" },
    };
  },
};
</script>

<style>
.app-update {
  position: absolute;
  width: 100%;
  height: calc(100vh);
  padding: 25px;
  color: #fff !important;
}
.app-update-bg {
  z-index: 1;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: calc(100vh);
}
.app-update-bg::after {
  content: "";
  position: absolute;
  inset: 0 0 0 0;
  background: inherit;
  filter: blur(5px);
}
.app-update .app-update-title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
.app-update .app-update-content {
  height: calc(100% - 75px);
  overflow: hidden;
  margin-bottom: 15px;
}
.app-update .app-update-content div {
  padding-bottom: 5px;
}

.app-update .app-update-content:hover {
  overflow-y: auto;
}
.app-update .app-update-progress .ant-progress .ant-progress-text {
  color: #fff;
}
</style>

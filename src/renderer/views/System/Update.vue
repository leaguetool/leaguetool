<template>
  <div
    class="app-update"
    style="background: url(static/images/update_bg.jpg) no-repeat center center;"
  >
    <div class="app-update-title">版本更新 {{ versionTxt }}</div>
    <div class="app-update-content">
      <div v-for="log in update.logs" :key="log" v-html="log"></div>
    </div>
    <div class="app-update-progress">
      <a-progress
        :success="{ percent: update.percent, strokeColor: '#87d068' }"
        :stroke-color="strokeColor"
        :percent="update.percent"
        :strokeWidth="strokeWidth"
      />
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

<style scoped>
.app-update {
  width: 100%;
  height: calc(100vh);
  padding: 25px;
  color: rgb(226, 226, 226);
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
</style>

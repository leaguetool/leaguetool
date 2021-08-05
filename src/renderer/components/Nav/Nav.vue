<template>
  <NavBar :maximizable="false" transparent center fixed>
    <template #title>{{ title }}</template>
    <template #wbtn>
      <GithubOutlined title="Github" @click="github" class="winbtn" />
      <BugOutlined title="Bug反馈" @click="bug" class="winbtn" />
    </template>
  </NavBar>
</template>

<script>
import { ipcRenderer } from "electron";
import GithubOutlined from "@ant-design/icons-vue/GithubOutlined";
import BugOutlined from "@ant-design/icons-vue/BugOutlined";
import NavBar from "./NavBar.vue";
export default {
  components: {
    NavBar,
    GithubOutlined,
    BugOutlined,
  },
  props: ["title"],
  setup() {
    function github() {
      ipcRenderer.send("github");
    }
    function bug() {
      ipcRenderer.send("bug");
    }
    return {
      github,
      bug,
    };
  },
};
</script>

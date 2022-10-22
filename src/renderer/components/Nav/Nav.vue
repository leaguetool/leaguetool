<template>
  <NavBar class="navbar" :maximizable="false" transparent center fixed>
    <template #title>{{ title }}</template>
    <template #wbtn>
      <BellTwoTone
        title="公告"
        @click="notificationModel"
        class="winbtn"
        twoToneColor="#f9cc16"
        style="color: #f9cc16"
      />

      <!-- <GithubOutlined title="Github" @click="github" class="winbtn" />
      <BugOutlined title="Bug反馈" @click="bug" class="winbtn" /> -->
    </template>
  </NavBar>
</template>

<script>
import { ipcRenderer } from "electron";
import GithubOutlined from "@ant-design/icons-vue/GithubOutlined";
import BugOutlined from "@ant-design/icons-vue/BugOutlined";
import {
  NotificationFilled,
  NotificationOutlined,
  QqOutlined,
  QqCircleFilled,
  SoundTwoTone,
  BellTwoTone,
} from "@ant-design/icons-vue";
import NavBar from "./NavBar.vue";
import Html from "../Content/Html.vue";
import { Modal } from "ant-design-vue";
import { computed, createVNode } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    NavBar,
    Html,
    GithubOutlined,
    BugOutlined,
    NotificationFilled,
    NotificationOutlined,
    QqOutlined,
    QqCircleFilled,
    SoundTwoTone,
    BellTwoTone,
  },
  props: ["title"],
  setup() {
    const store = useStore();
    const notification = computed(() => {
      return store.state.system.notice;
    });

    function github() {
      ipcRenderer.send("github");
    }
    function bug() {
      ipcRenderer.send("bug");
    }
    function notificationModel() {
      Modal.warning({
        title: "通知",
        content: createVNode(Html, { html: notification.value }),
        centered: true,
      });
    }
    function qq() {}
    return {
      github,
      bug,
      notificationModel,
      qq,
    };
  },
};
</script>
<style>
.navbar {
  height: 30px;
}
</style>

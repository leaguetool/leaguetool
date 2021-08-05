<template>
  <CheckClientStart class="check-start" :title="title" :subTitle="subTitle" />
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ipcRenderer } from "electron";
import CheckClientStart from "../components/CheckClientStart.vue";

export default {
  components: {
    CheckClientStart,
  },
  setup() {
    let title = ref("");
    let subTitle = ref("您未启动游戏客户端，请先打开LOL客户端");
    const router = useRouter();
    const login = async () => {
      const pro = await ipcRenderer.invoke("login");
      //未启动客户端就有消息反馈出来
      if (pro.msg) {
        title.value = pro.msg;
      } else {
        router.push("/home");
      }
    };
    login();
    return {
      title,
      subTitle,
    };
  },
};
</script>
<style>
.check-start {
  padding: 0;
}
</style>

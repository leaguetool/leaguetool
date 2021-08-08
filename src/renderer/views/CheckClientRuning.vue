<template>
  <CheckClientStart class="check-start" :title="title" :subTitle="subTitle" />
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ipcRenderer } from "electron";
import mitt from "@/common/mitt";
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
      console.log(pro);
      //未启动客户端就有消息反馈出来
      if (pro.msg) {
        title.value = pro.msg;
      } else if (pro.token) {
        router.push("/home");
      }
    };
    onMounted(() => {
      //采用mitt组件总线通信
      mitt.on("game-online", () => {
        login();
      });
    });
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

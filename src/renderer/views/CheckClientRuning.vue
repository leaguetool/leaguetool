<template>
  <CheckClientStart
    class="check-start"
    @handleClose="handleClose"
    @select="onSelectDir"
    :selectDir="gamePath"
    :title="title"
    :subTitle="subTitle"
    :second="second"
  />
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { ipcRenderer } from "electron";
import store from "~/store";
import mitt from "@/common/mitt";
import CheckClientStart from "../components/CheckClientStart.vue";

export default {
  components: {
    CheckClientStart,
  },
  setup() {
    let timer = null;
    let data = reactive({
      title: "",
      subTitle: "您未启动游戏客户端，请先打开LOL客户端",
      second: 10,
      gamePath: store.get("gamePath"),
      routerHome: "/home",
    });
    const router = useRouter();
    router.push(data.routerHome);
    const login = async () => {
      const pro = await ipcRenderer.invoke("login");
      console.log(pro);
      //未启动客户端就有消息反馈出来
      if (pro.msg) {
        data.title = pro.msg;
      } else if (pro.token) {
        router.push(data.routerHome);
      }
    };
    const onSelectDir = async () => {
      const { canceled, filePaths } = await ipcRenderer.invoke("onSelectDir");
      if (canceled) {
        return;
      }
      const dir = filePaths[0];
      store.set("gamePath", dir);
      data.gamePath = dir;
      //设置路径后在尝试登录
      login();
    };

    const handleClose = () => {
      data.gamePath = "";
    };
    onMounted(() => {
      const startTimer = () => {
        timer = setInterval(() => {
          data.second -= 1;
        }, 1000);
      };
      //采用mitt组件总线通信
      mitt.on("game-online", () => {
        login();
      });
      //检测
      mitt.on("game-testing", () => {
        if (timer) {
          data.second = 10;
        } else {
          startTimer();
        }
      });
    });
    login();
    return {
      ...toRefs(data),
      onSelectDir,
      handleClose,
    };
  },
};
</script>
<style>
.check-start {
  padding: 0;
}
</style>

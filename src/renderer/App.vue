<template>
  <div id="app">
    <Nav
      class="nav"
      v-show="isShow"
      :title="appName"
      :showIcon="appName != ''"
    />
    <div id="content-holder">
      <router-view class="router-content" />
    </div>
    <BackGround v-show="isShow" />
  </div>
</template>

<script>
import mitt from "@/common/mitt";
import { ipcRenderer } from "electron";
import { useRouter, useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import Nav from "./components/Nav/Nav.vue";
import BackGround from "./components/BackGround.vue";
export default {
  name: "App",
  components: {
    Nav,
    BackGround,
  },
  setup() {
    let name = "LeagueTool";
    let appName = ref(name);
    let isShow = ref(true);
    // 获取路由器实例
    const router = useRouter();
    // route是响应式对象,可监控器变化
    const route = useRoute();
    ipcRenderer.on("game-kill", () => {
      router.push("/");
    });
    ipcRenderer.on("game-online", () => {
      //游戏在线时，如果在检测页面，那么只需要抛出事件即可
      if (route.path === "/") {
        mitt.emit("game-online");
      }
    });

    //监听改变顶部标题
    watch(
      () => route.path,
      (newValue) => {
        appName.value = newValue === "/" ? name : "";
      }
    );
    mitt.on("app-update", () => {
      isShow.value = !isShow.value;
    });
    onMounted(() => {
      setTimeout(() => {
        ipcRenderer.send("stop-loading-main");
      }, 1000);
    });

    return {
      appName,
      isShow,
    };
  },
};
</script>

<style>
@font-face {
  font-family: "Cascadia Mono Regular";
  src: url("./common/font/CascadiaMono.ttf");
  font-weight: normal;
  font-style: normal;
}
#app {
  font-family: Cascadia Mono Regular, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #fff;
  /* width: 1000px; */
  /* height: 720px; */
  width: 100%;
  height: calc(100vh);
  /* background-color: #f5f5f5; */
  -webkit-user-select: none;
}

#content-holder {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.nav {
  position: absolute;
  z-index: 999;
}
#content-holder .router-content {
  position: relative;
  z-index: 2 !important;
  /* padding-top: -30px; */
  /* padding: 0 10px; */
}

#content-holder * {
  z-index: inherit;
}
.cursor-op {
  cursor: pointer;
  opacity: 0.85;
  -webkit-user-select: none;
}
.cursor-font {
  cursor: pointer;
  opacity: 0.85;
  -webkit-user-select: none;
}

.cursor-op:hover {
  color: #fff;
  opacity: 1;
}

.select-none {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f9cc16;
}
</style>

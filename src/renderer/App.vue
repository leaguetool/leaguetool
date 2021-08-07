<template>
  <div id="app">
    <Nav class="nav" :title="appName" />
    <div id="content-holder">
      <router-view class="router-content" />
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";
import Nav from "./components/Nav/Nav.vue";
export default {
  name: "App",
  components: {
    Nav,
  },
  setup() {
    let name = "LeagueTool";
    let appName = ref(name);
    // 获取路由器实例
    const router = useRouter();
    // route是响应式对象,可监控器变化
    const route = useRoute();
    ipcRenderer.on("game-kill", () => {
      router.push("/");
    });
    ipcRenderer.on("game-online", () => {
      //游戏在线时，如果在检测页面，那么只需要刷新一次检测页面即可
      if (route.path === "/") {
        router.go(0);
      }
    });

    //监听改变顶部标题
    watch(
      () => route.path,
      (newValue) => {
        appName.value = newValue === "/" ? name : "";
      }
    );
    return {
      appName,
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
  color: #2c3e50;
  width: 1000px;
  height: 720px;
  background-color: #f5f5f5;
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
  z-index: 2;
  /* top: 0; */
}
#content-holder .router-content {
  position: relative;
  z-index: 1 !important;
  /* padding-top: -30px; */
  /* padding: 0 10px; */
}

#content-holder * {
  z-index: inherit;
}
.cursor-op {
  cursor: pointer;
  opacity: 0.85;
}
.cursor-op:hover {
  color: #fff;
  opacity: 1;
}

.select-none {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
::-webkit-scrollbar {
  display: none;
}
</style>

<template>
  <div class="home-page">
    <Menu class="home-menu" />
    <Content class="home-content" />
  </div>
</template>

<script>
import Menu from "@/components/Menu/Menu";
import Content from "@/components/Content/Content";
import { useStore } from "vuex";
export default {
  components: { Menu, Content },
  setup() {
    const store = useStore();
    // store.dispatch("user/initSummoner");
    store.dispatch("chat/init");
    store.dispatch("system/getNotice");
    store.dispatch("chat/getEmoji");
    return {};
  },
};
</script>

<style>
.home-page {
  width: 100%;
  height: 100%;
  display: flex;
}
.home-page .home-menu {
  width: calc(20%);
}
.home-page .home-content {
  width: calc(80%);
}
.home-page:after {
  content: "";
  position: absolute;
  top: 0;
  width: 100%;
  height: 31px;
  /* background-color: rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0 5px 62px rgba(0, 0, 0, 0.3), 0 10px 75px #000;
  box-shadow: 0 5px 62px rgba(0, 0, 0, 0.3), 0 10px 75px #000; */
}
</style>

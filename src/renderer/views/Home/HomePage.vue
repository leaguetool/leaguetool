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
    store.dispatch("user/initSummoner");
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
</style>

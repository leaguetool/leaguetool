<template>
  <div class="home-page">
    <Menu />
    <Content />
  </div>
</template>

<script>
import Menu from "@/components/Menu/Menu";
import Content from "@/components/Content/Content";
export default {
  components: { Menu, Content },
};
</script>

<style>
.home-page {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>

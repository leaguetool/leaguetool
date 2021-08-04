<template>
  <a-avatar :size="60" :headimgsrc="headimg" :title="gameName" class="head-img">
  </a-avatar>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    let headimg = ref("");
    let gameName = ref("");
    return {
      headimg,
      gameName,
    };
  },
};
</script>
<style>
.head-img {
  background-color: #fff;
  cursor: pointer;
}
</style>

<template>
  <div>
    <p v-for="log in logs" :key="log" v-html="log"></p>
    <div class="update-tis">
      <div>大约需要：{{ size }}</div>
      <div>发布时间：{{ time }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    logs: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: "54.8 MB",
    },
    time: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.update-tis {
  padding: 10px 0px;
}
</style>

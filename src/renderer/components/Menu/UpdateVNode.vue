<template>
  <div>
    <p v-for="log in logs" :key="log" v-html="log"></p>
  </div>
</template>

<script>
export default {
  props: {
    logs: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>

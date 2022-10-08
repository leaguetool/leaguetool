<template>
  <div v-html="notification"></div>
</template>

<script>
export default {
  props: {
    notification: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>

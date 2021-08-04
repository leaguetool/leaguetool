<template>
  <a-result status="403" :title="title" :subTitle="subTitle">
    <template #extra> </template>
  </a-result>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String,
  },
};
</script>

<style>
.ant-result {
  padding: 100px 30px !important;
}
</style>

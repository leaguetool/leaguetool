<template>
  <a-result status="403" :title="title" :subTitle="subTitle">
    <template #extra>
      <CustomerServiceOutlined />
      <a-button key="console" type="primary">Go Console</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
    props: {
        title: String,
        subTitle: String
    }
}
</script>

<style>
.ant-result{
    padding: 110px 32px;
}
</style>
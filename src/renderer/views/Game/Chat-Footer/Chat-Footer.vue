<template>
  <div class="chat-footer-container">
    <a-input-search
      :bordered="false"
      placeholder="文明发言，友好交友"
      enter-button="发送"
      size="large"
      @search="onSearch"
    />
  </div>
</template>

<script>
export default {
  setup: () => {
    let onSearch = (value) => {
      console.log(value);
    };
    return { onSearch };
  },
};
</script>

<style>
.chat-footer-container {
  width: 100%;
}
</style>

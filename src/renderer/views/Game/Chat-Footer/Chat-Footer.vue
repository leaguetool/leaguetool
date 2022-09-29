<template>
  <div class="chat-footer-container">
    <div class="chat-footer-emoji cursor-op"><smile-outlined /></div>
    <div class="chat-footer-input">
      <a-textarea
        class=""
        :bordered="false"
        :auto-size="{ minRows: 1, maxRows: 2 }"
        placeholder="文明发言，友好交友"
        enter-button="发送"
        size="large"
        @search="onSearch"
      />
    </div>
    <div class="chat-footer-send">
      <a-button type="primary">
        <template #icon><SendOutlined /></template>
        发送
      </a-button>
    </div>
  </div>
</template>

<script>
import { SmileOutlined, SendOutlined } from "@ant-design/icons-vue";
export default {
  components: { SmileOutlined, SendOutlined },
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
  height: 70px;
  display: flex;
  align-items: center;
  border-top: 0.5px solid #8888886e;
  /* background-color: red; */
}

.chat-footer-input {
  width: 100%;
  padding-left: 20px;
}
.chat-footer-emoji {
  display: flex;
  font-size: 20px;
}
.chat-footer-input .ant-input {
  background-color: #fff0;
  color: #fff;
}
.chat-footer-send {
  padding: 10px;
}
</style>

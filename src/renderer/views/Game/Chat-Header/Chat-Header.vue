<template>
  <div class="chat-header">
    <div class="chat-title">英雄联盟开黑大厅 |</div>
    <!-- <div class="chat-hot">🔥热度:32131人</div> -->
    <div class="chat-region">祖安 <SwapOutlined /></div>
  </div>
</template>

<script>
import { SwapOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    SwapOutlined,
  },
};
</script>

<style>
.chat-header {
  font-size: 20px;
  font-weight: 600;
  padding-top: 5px;
}
.chat-header .chat-title,
.chat-region,
.chat-hot {
  display: inline-block;
}
.chat-hot {
  font-size: 14px;
}
.chat-region {
  color: #f9cc16;
  padding-left: 5px;
  cursor: pointer;
}
</style>

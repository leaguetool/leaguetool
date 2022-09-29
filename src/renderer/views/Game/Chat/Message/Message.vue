<template>
  <div class="chat-message chat-item">
    <!-- 头像 -->
    <div class="chat-message-avatar">
      <a-avatar :size="54" :src="msg.avatar" />
    </div>
    <!-- 消息体 -->
    <div>
      <!-- 消息头 -->
      <div class="chat-message-header">
        <div class="chat-message-header-name">{{ msg.name }}</div>
        <div class="chat-message-header-time">{{ msg.time }}</div>
      </div>
      <!-- 消息内容 -->
      <div class="chat-message-content">
        <div class="chat-message-content-text">{{ msg.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: { type: Object },
  },
  setup: (props) => {
    console.log(props.msg);
    return {};
  },
};
</script>

<style>
.chat-message {
  display: flex;
  margin-bottom: 20px;
}
.chat-message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* overflow: hidden; */
  margin-right: 10px;
}
</style>

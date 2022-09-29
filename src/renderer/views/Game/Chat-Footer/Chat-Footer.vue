<template>
  <div class="chat-footer-container">
    <div class="chat-footer-emoji cursor-op"><smile-outlined /></div>
    <div class="chat-footer-input">
      <a-textarea
        v-model:value="messageText"
        :bordered="false"
        :auto-size="{ minRows: 1, maxRows: 2 }"
        placeholder="文明发言，友好交友"
        enter-button="发送"
        size="large"
      />
    </div>
    <div class="chat-footer-send">
      <a-button type="primary" @click="sendMessage()">
        <template #icon><SendOutlined /></template>
        发送
      </a-button>
    </div>
  </div>
</template>

<script>
import { SmileOutlined, SendOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { message } from "ant-design-vue";

export default {
  components: { SmileOutlined, SendOutlined },
  setup: () => {
    const messageText = ref("");
    const store = useStore();
    const displayName = computed(() => {
      return store.state.user.displayName;
    });
    let sendMessage = () => {
      //判断messageText不能为空并且用ant弹出提示
      if (messageText.value === "") {
        message.warning("内容不能为空哦！", 1, null);
        return;
      }

      store
        .dispatch("chat/addMessage", {
          id: Math.random(),
          name: "dsa",
          avatar: `https://api.multiavatar.com/${
            new Date().getTime() + Math.random()
          }.png`,
          content: messageText.value,
          time: new Date().getTime(),
          type: "text",
          region: "祖安",
          rank: "最强王者",
          isSelf: true,
        })
        .then(() => {
          //发送成功后，清空输入框，禁用一段时间
          messageText.value = "";
        });
    };
    return { messageText, sendMessage, displayName };
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

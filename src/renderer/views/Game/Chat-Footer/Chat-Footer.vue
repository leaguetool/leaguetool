<template>
  <div class="chat-footer-container">
    <div class="chat-footer-emoji cursor-op" @click="emoji()">
      <smile-outlined />
    </div>
    <div class="chat-footer-hotword cursor-op">
      <a-dropdown :trigger="['click']" placement="top">
        <span>热词</span>
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-for="(word, index) in hotWord"
              :key="index"
              @click="hotWordSend(word)"
            >
              {{ word }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div class="chat-footer-input">
      <a-textarea
        v-model:value="messageText"
        :bordered="false"
        @pressEnter="handleEnter"
        :auto-size="{ minRows: 1, maxRows: 2 }"
        placeholder="文明发言，友好交友"
        enter-button="发送"
        size="large"
      />
    </div>
    <div class="chat-footer-send">
      <a-button type="primary" ghost block @click="sendMessage()">
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
    let sendMessage = (word) => {
      //判断messageText, word不能为空并且用ant弹出提示
      if (!word && messageText.value === "") {
        message.warning("内容不能为空哦！", 1, null);
        return;
      }
      //登陆检测
      if (!store.state.user.uid) {
        message.warning("请登陆后在发言", 1, null);
        return;
      }

      store
        .dispatch("chat/sendMessage", {
          name: store.state.user.displayName,
          uid: store.state.user.uid,
          avatar: store.state.user.avatar,
          content: word || messageText.value,
          time: new Date().getTime(),
          type: "text",
          region: store.state.chat.currentRegion,
          rank: store.state.user.rank,
          isSelf: true,
        })
        .then(() => {
          //发送成功后，清空输入框，禁用一段时间
          messageText.value = "";
        });
    };

    //使用热词发送
    let hotWordSend = (hotWord) => {
      sendMessage(hotWord);
    };

    //TODO 表情待开发
    const emoji = () => {
      message.warning("开发中...", 1, null);
      return;
    };

    //回车发送 ctrl+enter 换行
    const handleEnter = (event) => {
      if (event.keyCode == 13) {
        //判断是否按下了ctrl键
        if (!event.ctrlKey) {
          event.preventDefault();
          sendMessage();
        } else {
          messageText.value = messageText.value + "\n";
        }
      }
    };

    return {
      messageText,
      displayName,
      sendMessage,
      emoji,
      hotWordSend,
      handleEnter,
      hotWord: [
        "大乱斗快来人加我",
        "求大腿有麦会躺",
        "有妹妹来大佬能C的",
        "灵活4=1，来人秒开",
      ],
    };
  },
};
</script>

<style scoped>
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
  /* padding-left: 20px; */
}
.chat-footer-emoji {
  display: flex;
  font-size: 20px;
}
.chat-footer-hotword {
  display: flex;
  width: 60px;
}
.chat-footer-emoji,
.chat-footer-hotword {
  padding: 10px;
}
.chat-footer-input .ant-input {
  background-color: #fff0;
  color: #fff;
}
.chat-footer-send {
  padding: 0px 20px;
}
.chat-footer-send .ant-btn-primary {
  border-color: #ffffff00;
  background: #ffffff00;
}
</style>

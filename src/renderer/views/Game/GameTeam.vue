<template>
  <div>
    <a-alert
      v-if="connectStatus"
      message="连接到开黑大厅服务器失败，重试中..."
      banner
    />
    <a-row class="game-team">
      <a-col :span="20">
        <div class="game-left">
          <ChatHeader />
          <Chat ref="chatBody" :connectStatus="connectStatus" />
          <ChatFooter
            class="game-footer"
            :class="{ 'adaptation-footer': connectStatus }"
            @sendMessage="onSendMessage"
          />
        </div>
      </a-col>
      <a-col :span="4">
        <div class="game-right"><ChatRight /></div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ChatHeader from "./Chat-Header/Chat-Header.vue";
import ChatFooter from "./Chat-Footer/Chat-Footer.vue";
import ChatRight from "./Chat-Right/Chat-Right.vue";
import Chat from "./Chat/Chat.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  components: {
    ChatHeader,
    ChatFooter,
    ChatRight,
    Chat,
  },
  setup() {
    const chatBody = ref(null);
    const store = useStore();
    store.dispatch("chat/init");
    // store.dispatch("chat/initBaseInfo");
    return {
      chatBody,
      connectStatus: computed(() => {
        return !store.state.chat.connectStatus;
      }),
      onSendMessage: (message) => {
        //自己发送消息要滚动到底部
        chatBody.value.setVirtualListToBottom();
      },
    };
  },
};
</script>

<style>
.game-team {
  position: relative;
  /* display: flex; */
  /* justify-items: left; */
  padding: 0px 0px 0px 20px;
  height: calc(100vh - 30px);
}
.game-left {
}
.game-footer {
  position: absolute;
  bottom: 0px;
}
.adaptation-footer {
  bottom: 38px;
}
</style>

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
          <Chat :connectStatus="connectStatus" />
          <ChatFooter
            class="game-footer"
            :class="{ 'adaptation-footer': connectStatus }"
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
import { computed } from "vue";
export default {
  components: {
    ChatHeader,
    ChatFooter,
    ChatRight,
    Chat,
  },
  setup() {
    const store = useStore();
    store.dispatch("chat/init");
    // store.dispatch("chat/initBaseInfo");
    return {
      connectStatus: computed(() => {
        return !store.state.chat.connectStatus;
      }),
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

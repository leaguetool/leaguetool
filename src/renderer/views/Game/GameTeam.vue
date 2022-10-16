<template>
  <a-row class="game-team">
    <a-col :span="24">
      <div class="game-left">
        <ChatHeader />
        <Chat />
        <ChatFooter class="game-footer" />
      </div>
    </a-col>
    <!-- <a-col :span="4">
      <div class="game-right"><ChatRight /></div>
    </a-col> -->
  </a-row>
</template>

<script>
import ChatHeader from "./Chat-Header/Chat-Header.vue";
import ChatFooter from "./Chat-Footer/Chat-Footer.vue";
// import ChatRight from "./Chat-Right/Chat-Right.vue";
import Chat from "./Chat/Chat.vue";
import { useStore } from "vuex";
export default {
  components: {
    ChatHeader,
    ChatFooter,
    // ChatRight,
    Chat,
  },
  setup() {
    const store = useStore();
    store.dispatch("chat/init");
    // store.dispatch("chat/initBaseInfo");
    return {};
  },
};
</script>

<style>
.game-team {
  position: relative;
  /* display: flex; */
  /* justify-items: left; */
  padding: 0px 0px 0px 30px;
  height: calc(100vh - 30px);
}
.game-left {
}
.game-footer {
  position: absolute;
  bottom: 0px;
}
</style>

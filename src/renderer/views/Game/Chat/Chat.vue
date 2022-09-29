<template>
  <div class="chat">
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
    <Message v-for="chat in chatList" :msg="chat" :key="chat.time" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Message from "./Message/Message.vue";
export default {
  components: { Message },
  setup: () => {
    const store = useStore();
    // let user = computed(() => store.state.user);
    let user = computed(() => {
      return store.state.user;
    });
    console.log(user.displayName);
    const chatList = [
      {
        id: 1,
        name: user.displayName,
        avatar:
          "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        content: "test",
        time: "2021-01-01 12:00:00",
        type: "text",
        isSelf: true,
      },
    ];
    console.log(user);
    return {
      user,
      chatList,
    };
  },
};
</script>

<style>
.chat {
  height: calc(100vh - 136px);
  padding-top: 10px;
  overflow: auto;
}
</style>

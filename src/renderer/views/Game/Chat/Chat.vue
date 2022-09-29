<template>
  <div class="chat">
    <InfiniteList
      :data="chatList"
      infinite-scroll-distance="1"
      :width="'100%'"
      :height="574"
      :itemSize="95"
      :overscanCount="2"
      :scrollToIndex="scrollToIndex"
      scrollToAlignment="end"
      v-slot="{ item, index }"
    >
      <Message :msg="item" :key="index" />
    </InfiniteList>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Message from "./Message/Message.vue";
import InfiniteList from "vue3-infinite-list";
export default {
  components: { Message, InfiniteList },
  setup: () => {
    const store = useStore();
    const scrollToIndex = ref(0);
    const chatList = computed(() => {
      console.log(store.state.chat.chatList.lenght);
      if (store.state.chat.chatList.length > 0) {
        scrollToIndex.value = store.state.chat.chatList.length - 1;
      }
      return store.state.chat.chatList;
    });
    return {
      chatList,
      scrollToIndex,
    };
  },
};
</script>

<style>
.chat {
  height: calc(100vh - 136px);
  padding-top: 10px;
  overflow: auto;
  padding-right: 15px;
}
</style>

<template>
  <div class="chat-body">
    <DynamicScroller
      ref="scroller"
      :items="chatList"
      :min-item-size="50"
      class="scroller"
      @resize="scrollToBottom()"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.content]"
          :data-index="index"
        >
          <Message :msg="item" :key="index" />
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script>
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Message from "./Message/Message.vue";

export default {
  components: { Message, DynamicScroller, DynamicScrollerItem },
  setup: () => {
    const store = useStore();
    store.dispatch("chat/init");
    const scrollToIndex = ref(0);
    const scroller = ref(null);
    const chatList = computed(() => {
      // console.log(store.state.chat.chatList.length);
      // if (store.state.chat.chatList.length > 0) {
      //   //延迟几秒
      setTimeout(() => {
        // scrollToIndex.value = store.state.chat.chatList.length - 1;
        scrollToBottom();
      }, 30);
      // }
      return store.state.chat.chatList;
    });
    const scrollToBottom = () => {
      scroller.value.scrollToBottom();
    };

    return {
      chatList,
      scrollToIndex,
      scroller,
      scrollToBottom,
    };
  },
};
</script>

<style>
.chat-body {
  height: calc(100vh - 146px);
  padding-top: 10px;
  /* overflow: auto; */
  /* padding-right: 10px; */
}
.scroller {
  height: calc(100vh - 146px);
}
</style>

<template>
  <div class="chat-body">
    <VirtualList
      v-show="!!chatList.length"
      ref="vsl"
      class="scroller"
      :class="{ 'chat-body-adaptation': connectStatus }"
      :data-key="'id'"
      :data-sources="chatList"
      :data-component="MessageItem"
      :estimate-size="100"
      @scroll="scroll"
      @tobottom="onBottom"
      @resized="onItemRendered"
    >
    </VirtualList>
  </div>
</template>

<script>
import VirtualList from "vue3-virtual-scroll-list";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import MessageItem from "./MessageItem.vue";
import mitt from "@/common/mitt";

export default {
  props: {
    connectStatus: Boolean,
  },
  components: { MessageItem, VirtualList },
  setup: () => {
    const firstEntry = ref(true);
    const isbottom = ref(true);
    const vsl = ref();
    const store = useStore();
    const chatList = computed(() => {
      return store.state.chat.chatList;
    });

    //创建一个节流函数
    const throttle = (fn, delay) => {
      let timer = null;
      return function () {
        let context = this;
        let args = arguments;
        if (!timer) {
          timer = setTimeout(function () {
            fn.apply(context, args);
            timer = null;
          }, delay);
        }
      };
    };
    //滚动事件
    const scroll = throttle(() => {
      isbottom.value = false;
    }, 400);

    //触底事件
    const onBottom = throttle(() => {
      isbottom.value = true;
    }, 500);

    const onItemRendered = () => {
      if (!vsl.value) {
        return;
      }
      //第一进来就要滚动到底部
      if (firstEntry.value) {
        firstEntry.value = false;
        vsl.value.scrollToBottom();
      }

      //当有新消息来了,如果当前在底部就让继续滚动到底部,否则滚动不会变化
      if (isbottom.value) {
        setVirtualListToBottom();
      }
    };

    //滚动到底部
    const setVirtualListToBottom = () => {
      if (vsl.value) {
        vsl.value.scrollToBottom();
      }
    };
    mitt.on("send-message-end", () => {
      setVirtualListToBottom();
    });

    return {
      chatList,
      firstEntry,
      vsl,
      MessageItem: MessageItem,
      setVirtualListToBottom,
      onItemRendered,
      onBottom,
      scroll,
    };
  },
};
</script>

<style>
.chat-body {
  /* height: calc(100vh - 140px); */
  /* padding-top: 10px; */
  /* overflow: auto; */
  /* padding-right: 10px; */
}

.scroller {
  overflow-y: auto;
  height: calc(100vh - 146px);
}
.chat-body-adaptation {
  height: calc(100vh - 184px);
}
</style>

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
    <a-empty
      class="chat-empty"
      v-show="!chatList.length"
      description="还没有人在此发言过嗷~"
      :image="simpleImage"
    />
    <MessageTips class="chat-message-tips" />
  </div>
</template>

<script>
import { Empty } from "ant-design-vue";
import VirtualList from "vue3-virtual-scroll-list";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import MessageItem from "./MessageItem.vue";
import MessageTips from "./MessageTips/MessageTips.vue";
import mitt from "@/common/mitt";

export default {
  props: {
    connectStatus: Boolean,
  },
  components: { MessageItem, MessageTips, VirtualList },
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
      //滚动到底部那么就需要把底部新消息数量统计清零
      store.dispatch("chat/setMessageTipsCount", 0);
    }, 500);

    const onItemRendered = () => {
      if (!vsl.value) {
        return;
      }
      //第一进来就要滚动到底部
      if (firstEntry.value) {
        firstEntry.value = false;
        setVirtualListToBottom();
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
        //滚动到底部那么就需要把底部新消息数量统计清零
        store.dispatch("chat/setMessageTipsCount", 0);
      }
    };
    mitt.on("send-message-end", () => {
      setVirtualListToBottom();
    });
    mitt.on("send-message-checkbottom", () => {
      if (!isbottom.value) {
        //如果不在底部,那么就需要把底部新消息数量统计加一 内部使用了count++
        store.dispatch("chat/setMessageTipsCount");
      }
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
      simpleImage: Empty.PRESENTED_IMAGE_DEFAULT,
    };
  },
};
</script>

<style>
.chat-body {
  position: relative;
  /* height: calc(100vh - 140px); */
  /* padding-top: 10px; */
  /* overflow: auto; */
  /* padding-right: 10px; */
}
.chat-message-tips {
  position: absolute;
  bottom: 5px;
  right: 10px;
}

.chat-empty {
  padding-top: 20%;
}

.scroller {
  overflow-y: auto;
  height: calc(100vh - 146px);
}
.chat-body-adaptation {
  height: calc(100vh - 184px);
}
</style>

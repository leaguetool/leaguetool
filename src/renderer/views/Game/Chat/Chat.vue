<template>
  <div class="chat-body">
    <VirtualList
      v-show="!!chatList.length"
      ref="vsl"
      class="scroller"
      :start="chatList.value.length > 0 ? chatList.value.length - 1 : 0"
      :class="{ 'chat-body-adaptation': connectStatus }"
      :data-key="'id'"
      :data-sources="chatList"
      :data-component="MessageItem"
      :estimate-size="100"
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
import { computed, ref, nextTick } from "vue";
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
    const vsl = ref();
    const store = useStore();
    const chatList = computed(() => {
      return store.state.chat.chatList;
    });

    const startIndex = computed(() => {
      console.log("computedstartIndex: ", chatList.value.length);
      return chatList.value.length > 0 ? chatList.value.length - 1 : 0;
    });

    console.log("startIndex: ", startIndex.value);

    const isBottom = computed(() => {
      return (
        vsl.value.getScrollSize() -
          (vsl.value.getOffset() + vsl.value.getClientSize()) <=
        10
      );
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
    //触底事件
    const onBottom = throttle(() => {
      store.dispatch("chat/setMessageTipsCount", 0);
    }, 500);

    const onItemRendered = () => {
      if (!vsl.value) {
        return;
      }

      //当有新消息来了,如果当前在底部就让继续滚动到底部,否则滚动不会变化
      // if (
      //   vsl.value.getScrollSize() -
      //     (vsl.value.getOffset() + vsl.value.getClientSize()) <
      //   10
      // ) {
      //   nextTick(() => {
      //     setVirtualListToBottom();
      //   });
      // }
    };

    //滚动到底部
    const setVirtualListToBottom = () => {
      if (vsl.value) {
        // vsl.value.scrollToBottom();
        //滚动到底部那么就需要把底部新消息数量统计清零
        store.dispatch("chat/setMessageTipsCount", 0);
      }
    };
    mitt.on("send-message-end", () => {
      setVirtualListToBottom();
    });
    mitt.on("send-message-checkbottom", () => {
      console.log("是否在底部: ", !isBottom.value);
      if (!isBottom.value) {
        //如果不在底部,那么就需要把底部新消息数量统计加一 内部使用了count++
        store.dispatch("chat/setMessageTipsCount");
      }
    });

    return {
      chatList,
      startIndex,
      vsl,
      MessageItem: MessageItem,
      setVirtualListToBottom,
      onItemRendered,
      onBottom,
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

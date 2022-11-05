<template>
  <div class="message-tips" v-show="messageTipsCount > 0">
    <div class="message-tips-text" @click="scrollToBottom">
      <double-right-outlined class="message-tips-icon" :rotate="90" />
      <span>{{ messageTipsCount }}条新消息</span>
    </div>
    <div class="message-tips-line">
      <span></span>
    </div>
    <div class="message-tips-close" @click="closeMessageTips">
      <span>x</span>
    </div>
  </div>
</template>

<script>
import { DoubleRightOutlined } from "@ant-design/icons-vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import mitt from "@/common/mitt";
export default {
  components: { DoubleRightOutlined },
  setup: () => {
    const store = useStore();
    const messageTipsCount = computed(() => {
      return store.state.chat.messageTipsCount;
    });
    //滚动到底部
    const scrollToBottom = () => {
      mitt.emit("send-message-end");
    };

    //关闭消息提示
    const closeMessageTips = () => {
      store.dispatch("chat/setMessageTipsCount", 0);
    };
    const messageTips = ref(false);
    return { messageTips, scrollToBottom, messageTipsCount, closeMessageTips };
  },
};
</script>

<style>
.message-tips {
  padding: 10px 0px;
  background-color: #1f1f1f;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.message-tips-icon {
  padding: 0px 10px;
}
.message-tips-text {
  padding-right: 10px;
}
.message-tips-line {
  border: 1px solid #4a4d4d;
  height: 14px;
}
.message-tips-close {
  padding: 0px 12px;
  /* font-size: 16px; */
}
</style>

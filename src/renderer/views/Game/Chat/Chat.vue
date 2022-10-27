<template>
  <div class="chat-body">
    <VirtualList
      v-show="!!chatList.length"
      ref="vsl"
      class="scroller"
      :class="{ overflow: overflow, 'chat-body-adaptation': connectStatus }"
      :data-key="'id'"
      :data-sources="chatList"
      :data-component="Message"
      :estimate-size="100"
      @scroll="scroll"
      @tobottom="onBottom"
      @resized="onItemRendered"
    >
      <template #header>
        <div v-show="overflow" class="header">
          <!-- <div class="spinner" v-show="!finished"></div> -->
          <!-- <div class="finished" v-show="finished">没有更多了</div> -->
        </div>
      </template>
    </VirtualList>
  </div>
</template>

<script>
import VirtualList from "vue3-virtual-scroll-list";
// import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import { dateformatNotsecond, dateMinute, getToday } from "@/common/converter";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Message from "./Message/Message.vue";

export default {
  props: {
    connectStatus: Boolean,
  },
  components: { Message, VirtualList, DynamicScroller, DynamicScrollerItem },
  setup: (props) => {
    const flg = ref(true);
    const isbottom = ref(true);
    const vsl = ref();
    const overflow = ref(false);
    const store = useStore();
    const scrollToIndex = ref(0);
    const scroller = ref(null);
    const chatList = computed(() => {
      // console.log(store.state.chat.chatList.length);
      // if (store.state.chat.chatList.length > 0) {
      //   //延迟几秒
      setTimeout(() => {
        // scrollToIndex.value = store.state.chat.chatList.length - 1;
        scrollToBottom();
      }, 10);
      // }
      return store.state.chat.chatList;
    });
    console.log(props);
    const scrollToBottom = () => {
      // scroller.value.scrollToBottom();
    };

    const scroll = () => {
      setTimeout(() => {
        isbottom.value = false;
      }, 20);
      console.log(isbottom.value);
    };

    const onBottom = () => {
      console.log("onBottom");
      isbottom.value = true;
      console.log(isbottom.value);
    };

    const onItemRendered = () => {
      console.log("onItemRendered", vsl.value);
      if (!vsl.value) {
        return;
      }
      // first page items are all mounted, scroll to bottom
      // if (!param.isFirstPageReady && vsl.value.getSizes() >= param.pageSize) {
      //   param.isFirstPageReady = true;
      // }
      if (flg.value) {
        flg.value = false;
        vsl.value.scrollToBottom();
      }
      console.log(isbottom.value);
      if (isbottom.value) {
        setVirtualListToBottom();
      }
      checkOverFlow();
    };

    const checkOverFlow = () => {
      if (vsl.value) {
        overflow.value = vsl.value.getScrollSize() > vsl.value.getClientSize();
      }
    };

    const setVirtualListToBottom = () => {
      if (vsl.value) {
        vsl.value.scrollToBottom();
      }
    };

    const getDateStr = (AddDayCount) => {
      let dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
      let y = dd.getFullYear();
      let m = dd.getMonth() + 1 + ""; //获取当前月份的日期
      let d = dd.getDate() + "";
      if (m.length == 1) {
        m = "0" + m;
      }
      if (d.length == 1) {
        d = "0" + d;
      }
      return y + "/" + m + "/" + d;
    };

    return {
      flg,
      chatList,
      scrollToIndex,
      scroller,
      scrollToBottom,
      onItemRendered,
      vsl,
      overflow,
      Message: Message,
      onBottom,
      scroll,
      showTime: (message, index) => {
        if (index === 0) {
          return true;
        }
        //只要大于0了，就可以取他前一个时间
        if (index > 0) {
          return message.time - chatList.value[index - 1].time > 300000;
        }
        return false;
      },
      formatTime: (message) => {
        let time = parseInt(message.time);
        // //相差值
        let differ = new Date(getDateStr(0)).getTime() - time;
        // //是今天吗？ 负数就是今天
        if (differ <= 0) {
          return dateMinute(time);
        } //是昨天吗？ 86400000（一天的时间）
        else if (differ < 86400000) {
          return `昨天 ${dateMinute(time)}`;
        } //是前天吗？ 172800000（前天的时间）
        else if (differ < 172800000) {
          return `前天 ${dateMinute(time)}`;
        } //是在一周吗？
        else if (differ < 604800000) {
          return `${getToday(time)} ${dateMinute(time)}`;
        } //否则就显示 x年x月x日 x:x
        return dateformatNotsecond(time);
      },
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
.message-time {
  text-align: center;
  color: #a5a5a5;
  padding: 10px 0px;
}
.message-time span {
  padding: 8px 8px 8px 8px;
  background: #222022eb;
  border-radius: 10px;
}
.scroller {
  overflow-y: auto;
  height: calc(100vh - 146px);
}
.chat-body-adaptation {
  height: calc(100vh - 184px);
}
</style>

<template>
  <Message :msg="source">
    <template v-slot:time>
      <div v-show="showTime(source, index)" class="message-time">
        <span>{{ formatTime(source) }}</span>
      </div>
    </template>
  </Message>
</template>

<script>
import Message from "./Message/Message.vue";
import { dateformatNotsecond, dateMinute, getToday } from "@/common/converter";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    source: { type: Object },
    index: {},
  },
  components: { Message },
  setup() {
    const store = useStore();
    const chatList = computed(() => {
      return store.state.chat.chatList;
    });

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
</style>

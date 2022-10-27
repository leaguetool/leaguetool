<template>
  <div class="chat-footer-container">
    <div class="chat-footer-emoji cursor-op" @click="emojiModel = true">
      <a-popover trigger="click" v-model:visible="emojiModel">
        <template #content>
          <Emoji @emojiSend="emojiSend" />
        </template>
        <smile-outlined />
      </a-popover>
    </div>
    <div class="chat-footer-hotword cursor-op">
      <a-dropdown :trigger="['click']" placement="top">
        <span>热词</span>
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-for="(word, index) in hotWord"
              :key="index"
              @click="hotWordSend(word)"
            >
              {{ word }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div class="chat-footer-input">
      <a-textarea
        v-model:value="messageText"
        :bordered="false"
        @pressEnter="handleEnter"
        @blur="campaignNameBlur"
        :auto-size="{ minRows: 1, maxRows: 2 }"
        placeholder="文明发言，友好交友"
        enter-button="发送"
        size="large"
      />
    </div>
    <div class="chat-footer-send">
      <a-button
        type="primary"
        :disabled="sendBlock"
        block
        @click="sendMessage()"
      >
        <template #icon><SendOutlined /></template>
        {{ sendText }}
      </a-button>
    </div>
  </div>
</template>

<script>
import { SmileOutlined, SendOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { message } from "ant-design-vue";
import Emoji from "../Chat/Emoji/Emoji.vue";

export default {
  components: { SmileOutlined, SendOutlined, Emoji },
  setup: () => {
    const messageText = ref("");
    const campaignNameIndex = ref("");
    const emojiModel = ref(false);
    const sendBlockSecond = ref(5);
    const sendBlock = ref(false);
    const store = useStore();
    const displayName = computed(() => {
      return store.state.user.displayName;
    });

    const hotWords = computed(() => {
      return store.state.chat.hotWords;
    });

    const sendText = computed(() => {
      return sendBlock.value ? sendBlockSecond.value + "s后" : "发送";
    });

    let sendMessage = (word) => {
      //频率限制
      if (sendBlock.value) {
        message.warning({
          content: "请等待禁用时间结束后再发言",
          duration: 1,
          key: "messageBody",
        });
        return;
      }

      //判断messageText, word不能为空并且用ant弹出提示
      //检测是否为空或者空格或者换行
      let text = word || messageText.value;
      if (
        (!text && text.trim() === "") ||
        text.trim().replaceAll("\n", "") === ""
      ) {
        message.warning({
          content: "消息不能为空",
          duration: 1,
          key: "messageBody",
        });
        return;
      }

      //登陆检测
      if (!store.state.user.uid) {
        message.warning({
          content: "请登陆后在发言",
          duration: 1,
          key: "messageBody",
        });
        return;
      }

      store
        .dispatch("chat/sendMessage", {
          name: store.state.user.displayName,
          uid: store.state.user.uid,
          avatar: store.state.user.avatar,
          content: word || messageText.value,
          time: new Date().getTime(),
          type: "text",
          region: store.state.chat.currentRegion,
          rank: store.state.user.rank,
          isSelf: true,
        })
        .then(() => {
          //发送成功后，清空输入框，禁用一段时间
          messageText.value = "";
          //开启禁用
          sendBlock.value = true;
          //让一个按钮发送消息后,禁用5秒钟倒计时
          let timer = setInterval(() => {
            sendBlockSecond.value--;
            if (sendBlockSecond.value < 0) {
              sendBlock.value = false;
              sendBlockSecond.value = 5;
              clearInterval(timer);
            }
          }, 1000);
        });
    };

    //使用热词发送
    let hotWordSend = (hotWord) => {
      sendMessage(hotWord);
    };

    //TODO 表情待开发
    const emoji = () => {
      message.warning({
        content: "暂未开放，敬请期待~",
        duration: 1,
        key: "emojiMessage",
      });
      return;
    };

    //回车发送 ctrl+enter 换行
    const handleEnter = (event) => {
      if (event.keyCode == 13) {
        //判断是否按下了ctrl键
        if (!event.ctrlKey) {
          event.preventDefault();
          sendMessage();
        } else {
          messageText.value = messageText.value + "\n";
        }
      }
    };

    const campaignNameBlur = (e) => {
      campaignNameIndex.value = e.srcElement.selectionStart;
    };

    /**  **/
    const campaignFormatChar = (val) => {
      if (messageText.value) {
        let index = campaignNameIndex.value;
        let text = messageText.value;
        //this.form.campaignName = this.form.campaignName + val;
        //有这种情况，用户没有光标,直接就选择表情包,那么这时候index就是0所以就需要单独处理
        if (index == 0) {
          messageText.value = text + val;
        } else {
          messageText.value = text.slice(0, index) + val + text.slice(index);
          campaignNameIndex.value = (text.slice(0, index) + val).length;
        }
      } else {
        messageText.value = val;
      }
    };

    return {
      messageText,
      displayName,
      sendBlock,
      sendBlockSecond,
      sendText,
      emojiModel,
      sendMessage,
      emoji,
      hotWordSend,
      handleEnter,
      campaignNameBlur,
      hotWord: hotWords || [
        "大乱斗快来人加我",
        "求大腿有麦会躺",
        "有妹妹来大佬能C的",
        "灵活4=1，来人秒开",
      ],
      emojiSend: (emoji) => {
        campaignFormatChar(`[${emoji.text}]`);
        emojiModel.value = false;
      },
    };
  },
};
</script>

<style>
.chat-footer-container {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-top: 0.5px solid #8888886e;
  /* background-color: red; */
}

.chat-footer-input {
  width: 100%;
  /* padding-left: 20px; */
}
.chat-footer-emoji {
  display: flex;
  font-size: 20px;
}
.chat-footer-hotword {
  display: flex;
  width: 60px;
}
.chat-footer-emoji,
.chat-footer-hotword {
  padding: 10px;
}
.chat-footer-input .ant-input {
  background-color: #fff0;
  color: #fff;
}
.chat-footer-send {
  padding: 0px 5px 0px 0px;
}
.chat-footer-send .ant-btn-primary {
  border-color: #ffffff00;
  background: #ffffff00;
}
.chat-footer-send .ant-btn-primary:hover {
  border-color: #ffffff00;
  background: #ffffff00;
}
.chat-footer-send .ant-btn-primary:focus {
  border-color: #ffffff00;
  background: #ffffff00;
}
.ant-popover .ant-popover-inner-content {
  width: 100%;
}
</style>

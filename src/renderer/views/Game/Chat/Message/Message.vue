<template>
  <div>
    <!-- 消息中间的时间 -->
    <slot name="time" />
    <div class="chat-message chat-item" :class="{ 'chat-self': msg.isSelf }">
      <!-- 头像 -->
      <div class="chat-message-avatar" :class="{ 'cursor-op': !msg.isSelf }">
        <a-avatar :size="54" :src="msg.avatar" />
      </div>
      <!-- 消息体 -->
      <div class="chat-message-body">
        <!-- 消息头 -->
        <div class="chat-message-header" v-show="!msg.isSelf">
          <div class="chat-message-header-name cursor-op" @click="copyName()">
            {{ msg.name }}
          </div>
          <div v-show="msg.woman" class="chat-message-header-woman">
            <a-tag color="pink">妹子</a-tag>
          </div>
          <div class="chat-message-header-region">
            <a-tag color="cyan">{{ msg.region.name }}</a-tag>
          </div>
          <div class="chat-message-header-rank">
            <a-tag color="blue">{{ msg.rank }}</a-tag>
          </div>
        </div>
        <!-- 消息内容 -->
        <div class="chat-message-content">
          <div
            class="chat-message-content-text"
            v-dompurify-html:svgandimg="msg.content"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//导入ant的message组件
import { message } from "ant-design-vue";
// import {ref} from 'vue'
export default {
  props: {
    msg: { type: Object },
  },
  setup: (props) => {
    // console.log(props.msg);
    //将名字复制到粘贴板
    let copyName = () => {
      navigator.clipboard.writeText(props.msg.name);
      message.success("已复制到粘贴板", 1, null);
    };
    return { copyName };
  },
};
</script>

<style>
.chat-self {
  display: flex;
  flex-direction: row-reverse;
  padding-right: 20px !important;
  transform: rotateX(180deg);
  align-items: flex-end;
}

.chat-self .chat-message-header {
  display: flex;
  flex-direction: row-reverse;
}

.chat-self .chat-message-avatar {
  margin-left: 10px;
  transform: rotateX(180deg);
}
.chat-self .chat-message-content::after {
  color: #40ff7091;
}
.chat-self .chat-message-content .chat-message-content-text {
  background-color: #40ff7091;
  border-radius: 5px 5px 5px 5px;
  transform: rotateY(180deg);
}
.chat-message {
  display: flex;
  padding: 15px 15px 15px 0px;
  min-height: 60px;
  color: rgb(226, 226, 226);
}
.chat-message-avatar {
  width: 54px;
  height: 54px;
  border-radius: 50%;
}
.chat-message-header {
  display: flex;
  flex-direction: row;
  /* justify-content: left; */
}

.chat-message-header-name {
  margin-right: 8px;
}
.chat-message-header .chat-message-header-name,
.chat-message-header-woman,
.chat-message-header-region,
.chat-message-header-rank {
  padding-left: 6px;
}

.chat-message-content {
  position: relative;
}
.chat-message-content::after {
  content: "";
  position: absolute;
  right: 100%;
  top: 10px;
  width: 14px;
  height: 14px;
  border-width: 0;
  border-style: solid;
  border-color: transparent;
  border-bottom-width: 10px;
  border-bottom-color: currentColor;
  border-radius: 0 0 0 32px;
  color: #22202291;
}
.chat-message-content .chat-message-content-text {
  width: 100%;
  color: #ffffffbf;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
  background-color: #22202291;
  word-break: break-all;
  letter-spacing: 1px;
  white-space: pre-wrap;
  display: flex;
  align-items: center;

  -webkit-user-select: text;
  -khtml-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  /* min-height: 80px; */
}

.chat-message-content .chat-message-content-text .icon {
  color: #333;
  font-size: 20px;
}
.chat-message-content .chat-message-content-text .icon + .icon {
  margin-left: 2px;
}

.chat-message-body {
  padding-left: 1em;
}

.chat-self .chat-message-body {
  transform: rotate(180deg);
}
</style>

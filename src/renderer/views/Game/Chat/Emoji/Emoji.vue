<template>
  <div class="card-container">
    <a-tabs v-model:activeKey="activeKey" tab-position="bottom" type="card">
      <a-tab-pane
        v-for="(emoji, index) in emojis"
        :key="index"
        :tab="emoji.title"
      >
        <div class="all-emoji">全部表情</div>
        <div class="emoji-list">
          <div
            v-for="(item, index) in emoji.data"
            :key="index"
            class="emoji-item cursor-op"
            @click="emojiSend(item)"
          >
            {{ item.emoji }}
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  emits: ["emojiSend"],
  setup(props, { emit }) {
    return {
      emojis: [
        {
          title: "😀",
          data: [
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
          ],
        },
        {
          title: "👋",
          data: [
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
          ],
        },
        {
          title: "🐸",
          data: [
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😀",
              text: "😀",
            },
            {
              emoji: "😃",
              text: "😃",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
            {
              emoji: "😄",
              text: "😄",
            },
            {
              emoji: "😁",
              text: "😁",
            },
          ],
        },
      ],
      activeKey: ref(0),
      emojiSend: (emoji) => {
        console.log("emojiSend");
        emit("emojiSend", emoji);
      },
    };
  },
});
</script>
<style>
.card-container {
  width: 405px;
  height: 318px;
}
.card-container p {
  margin: 0;
}
.card-container > .ant-tabs-card .ant-tabs-content {
  height: 263px;
  overflow-y: auto;
  /* margin-top: -16px; */
}
.card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  padding: 0px 0px 5px 0px;
  background: #1f1f1f;
}
.card-container > .ant-tabs-card > .ant-tabs-nav::before {
  display: none;
}

.ant-tabs-tab-btn {
  -webkit-user-select: none;
}

.emoji-list {
  display: flex;
  flex-wrap: wrap;
}
.emoji-list .emoji-item {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}
.all-emoji {
  padding: 5px 0px 0px 10px;
  -webkit-user-select: none;
}
</style>

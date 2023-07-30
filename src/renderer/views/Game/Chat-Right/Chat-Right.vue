<template>
  <div class="chat-right-container">
    <div class="chat-notification cursor-op" @click="notificationModel()">
      <NotificationFilled style="color: #f9cc16" />
      <span :title="notification" class="chat-notification-text">{{
        notification
      }}</span>
    </div>
    <div class="chat-hotuser">
      <div class="chat-admin">
        <div>管理员</div>
        <div
          class="chat-user cursor-op"
          @click="chatUserModel()"
          v-for="(user, index) in adminUser"
          :key="index"
        >
          <div class="chat-user-avatar">
            <a-avatar :src="user.avatar"></a-avatar>
          </div>
          <div
            class="chat-user-body"
            :title="user.name + '-' + (user.online ? '在线' : '离线')"
          >
            <div class="chat-user-name">{{ user.name }}</div>
            <div class="chat-user-status">
              <a-badge :color="user.online ? '#52c41a' : '#909090'" />{{
                user.online ? "在线" : "离线"
              }}
            </div>
          </div>
        </div>
      </div>

      <div class="chat-room">
        <div>房间热度</div>
        <div
          class="chat-user cursor-op"
          @click="chatUserModel()"
          v-for="(user, index) in chatUser"
          :key="index"
        >
          <div class="chat-user-avatar">
            <a-avatar :src="user.avatar"></a-avatar>
          </div>
          <div
            class="chat-user-body"
            :title="user.name + '-' + (user.online ? '在线' : '离线')"
          >
            <div class="chat-user-name">{{ user.name }}</div>
            <div class="chat-user-status">
              <a-badge :color="user.online ? '#52c41a' : '#909090'" />{{
                user.online ? "在线" : "离线"
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//导入notification-outlined
import Mock from "mockjs";
import Notice from "./Notice.vue";
import { NotificationFilled } from "@ant-design/icons-vue";
import { Modal, message } from "ant-design-vue";
import { ref, computed, createVNode } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    NotificationFilled,
  },
  setup() {
    let visible = ref(false);
    const store = useStore();
    const notification = computed(() => {
      return store.state.system.notice;
    });
    const adminUser = computed(() => {
      return store.state.system.adminUser;
    });
    const notificationModel = () => {
      Modal.warning({
        title: "公告",
        content: createVNode(Notice, { notification: notification.value }),
      });
    };

    const data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      "chatUser|20": [
        {
          name: "@ctitle(5,10)",
          avatar: "@dataImage('200x100')",
          "online|1-2": true,
        },
      ],
    });
    const chatUser = ref(data.chatUser);

    const chatUserModel = () => {
      message.info({
        content: "暂未开放",
        key: "clickRightUser",
      });
    };
    return {
      notification,
      adminUser,
      chatUser,
      visible,
      notificationModel,
      chatUserModel,
    };
  },
};
</script>

<style>
.chat-right-container {
  height: calc(100vh - 30px);
  padding: 5px;
  border-left: 0.5px solid #8888886e;
  display: flex;
  flex-direction: column;
}
.chat-notification {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  letter-spacing: 2px;
  width: 100%;
  font-size: 12px;
  border-bottom: 0.5px solid #8888886e;
}
.chat-notification-text {
  padding-left: 5px;
}

.chat-user {
  display: flex;
  padding: 5px 0px;
}
.chat-user-avatar {
  display: flex;
  align-items: center;
}
.chat-user-body {
  display: flex;
  flex-direction: column;
  padding-left: 5px;
}
.chat-user-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  letter-spacing: 1px;
  width: 100%;
}

.chat-user-status {
  font-size: 12px;
}

.chat-hotuser {
  height: calc(100vh - 84px);
  padding-top: 5px;
  overflow: hidden;
  overflow-y: auto;
}
</style>

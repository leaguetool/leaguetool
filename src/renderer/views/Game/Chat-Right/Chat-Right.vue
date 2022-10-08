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
    const notificationModel = () => {
      Modal.warning({
        title: "公告",
        content: createVNode(Notice, { notification: notification.value }),
      });
    };
    const adminUser = ref([
      {
        name: "理想三旬",
        avatar:
          "https://img2.baidu.com/it/u=1114729443,1120710416&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
        online: true,
      },
      {
        name: "风车车的猫尾饼",
        avatar:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F75%2F84%2F5a34de267c8a6_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667622664&t=910490b881759efd58326d88c8c7444c",
        online: false,
      },
    ]);
    //生成随机数据在chatUser里面 头像也随机生成
    const chatUser = ref([]);
    for (let i = 0; i < 8; i++) {
      chatUser.value.push({
        name: "用户名字" + i,
        avatar: "https://joeschmoe.io/api/v1/random",
        online: Math.random() > 0.5 ? true : false,
      });
    }

    const chatUserModel = () => {
      message.info("暂未开放");
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

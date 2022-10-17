<template>
  <a-tooltip placement="bottom" arrowPointAtCenter>
    <template #title>
      <div class="tooltip">
        <div>当前等级：{{ user.summonerLevel }}</div>
        <div>
          经验值：{{ user.xpSinceLastLevel }} / {{ user.xpUntilNextLevel }}
        </div>
      </div>
    </template>

    <a-badge :offset="[-5, 50]" @click="changeStatus">
      <template #count>
        <CheckCircleFilled
          v-if="user.onlineStatus === 'chat'"
          color="green"
          style="color: #87d068"
        />
        <ApiFilled v-if="user.onlineStatus === 'away'" style="color: #f50" />

        <LoginOutlined
          v-if="user.onlineStatus === 'dnd'"
          style="color: #108ee9"
        />
        <RobotOutlined
          v-if="user.onlineStatus === 'offline'"
          style="color: #d9d9d9"
        />
        <WhatsAppOutlined
          v-if="user.onlineStatus === 'mobile'"
          style="color: #2db7f5"
        />
      </template>
      <a-avatar
        @click.stop="clickHead"
        :size="60"
        :src="user.avatar"
        :title="user.displayName"
        class="head-img"
      />
    </a-badge>
  </a-tooltip>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

import {
  CheckCircleFilled,
  ApiFilled,
  LoginOutlined,
  RobotOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons-vue";
export default {
  components: {
    CheckCircleFilled,
    ApiFilled,
    LoginOutlined,
    RobotOutlined,
    WhatsAppOutlined,
  },
  emits: ["changeStatus", "clickHead"],
  setup: (prop, context) => {
    const store = useStore();

    return {
      user: computed(() => store.state.user),
      changeStatus: () => {
        context.emit("changeStatus");
      },
      clickHead: () => {
        context.emit("clickHead");
      },
    };
  },
};
</script>
<style>
.head-img {
  cursor: pointer;
  margin: 0px !important;
}
.tooltip {
}
</style>

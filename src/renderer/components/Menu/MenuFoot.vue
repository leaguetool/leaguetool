<template>
  <div>
    <a-popover
      trigger="click"
      v-model:visible="footModel"
      placement="rightBottom"
    >
      <template #content>
        <div class="setting-list">
          <div v-show="!isLogin" class="cursor-font" @click="login()">
            <a-space :size="8">
              <LoginOutlined class="cursor-op" />
              <div>立即登陆</div>
            </a-space>
          </div>
          <div class="cursor-font" @click="setting()">
            <a-space :size="8">
              <SettingFilled twoToneColor="#f9cc16" class="cursor-op" />
              <div>应用设置</div>
            </a-space>
          </div>
          <div class="cursor-font" @click="notCode()">
            <a-space :size="8">
              <ExclamationCircleFilled class="cursor-op" />
              <div>关于我们</div>
            </a-space>
          </div>
          <div class="cursor-font" @click="checkUpdate()">
            <a-space :size="8">
              <DownloadOutlined class="cursor-op" />
              <div>检查更新</div>
            </a-space>
          </div>
          <div v-show="isLogin" class="cursor-font" @click="logoutOut()">
            <a-space :size="8">
              <LogoutOutlined class="cursor-op" />
              <div>退出登陆</div>
            </a-space>
          </div>
        </div>
      </template>
      <!-- < /> -->
      <a-space :size="5" class="setting cursor-op">
        <BarsOutlined twoToneColor="#f9cc16" class="" />
        <div>更多</div>
      </a-space>
    </a-popover>
    <app-settings ref="AppSettings"></app-settings>
  </div>
</template>

<script scoped>
import {
  BarsOutlined,
  SettingFilled,
  ExclamationCircleFilled,
  DownloadOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons-vue";
import { ipcRenderer } from "electron";
import { useRouter } from "vue-router";
import { message, notification } from "ant-design-vue";
import { Modal } from "ant-design-vue";
import { computed, createVNode, ref } from "vue";
import { useStore } from "vuex";
import AppSettings from "../Setting/index.vue";
import UpdateVNode from "./UpdateVNode";
import { convertFileSize, convertDateFormat } from "@/common/converter";

export default {
  components: {
    BarsOutlined,
    SettingFilled,
    ExclamationCircleFilled,
    DownloadOutlined,
    LogoutOutlined,
    LoginOutlined,
    AppSettings,
  },
  setup() {
    const footModel = ref(false);
    const AppSettings = ref(null);
    const router = useRouter();
    const store = useStore();
    const checkUpdate = () => {
      footModel.value = false;
      ipcRenderer.invoke("checkUpdate").then((info) => {
        if (info) {
          //开启更新进程
          console.log("检测到有新版本呢：", info);
          // return createUpdateWindow();
          return updateApp(info);
        } else {
          //弹出通知提醒，3秒自动关闭
          return notification.open({
            message: `版本更新`,
            description: "您已经是最新的版本了~",
            placement: "bottomRight",
            duration: 3,
            key: "lastVersionUpdateMessage",
            icon: () =>
              createVNode(DownloadOutlined, { style: "color: #f9cc16" }),
          });
        }
      });
    };

    const updateApp = (info) => {
      if (!info) {
        return;
      }
      //info是update-available检测更新返回的信息并保存的
      // info = {
      //   version: "2.3.4",
      //   releaseNotes: ["修复了若干问题"],
      //   files: [
      //     {
      //       size: 57427045,
      //     },
      //   ],
      //   releaseDate: "2022-10-14T12:47:34.647Z",
      // };
      Modal.confirm({
        title: `更新到新版本 v${info.version}`,
        icon: createVNode(DownloadOutlined),
        content: createVNode(UpdateVNode, {
          logs: info.releaseNotes,
          size: convertFileSize(info.files[0].size),
          time: convertDateFormat(info.releaseDate),
        }),
        okText: "立即升级",
        cancelText: "关闭",
        async onOk() {
          try {
            return await new Promise((resolve, reject) => {
              // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              ipcRenderer.send("updateApp");
            });
          } catch (e) {
            return console.log("Oops errors!");
          }
        },

        onCancel() {},
      });
    };

    const logoutOut = () => {
      footModel.value = false;
      store.dispatch("user/logout");
      setTimeout(() => {
        //断开连接后，连接一个浏览用户
        store.dispatch("chat/init");
      }, 500);
      ipcRenderer.send("logoutOut");
      message.success("退出成功");
    };

    const login = () => {
      footModel.value = false;
      ipcRenderer.invoke("loginLOL");
    };

    const isLogin = computed(() => {
      return store.state.user.uid;
    });

    const gotoPath = (path) => {
      footModel.value = false;
      router.push(path);
    };

    const notCode = () => {
      console.log(AppSettings.value);
      footModel.value = false;
      message.warning({
        content: "暂未开放，敬请期待~",
        duration: 2,
        key: "notCode",
      });
    };
    const setting = () => {
      footModel.value = false;
      AppSettings.value.show();
    };

    return {
      footModel,
      isLogin,
      AppSettings,
      gotoPath,
      login,
      notCode,
      checkUpdate,
      logoutOut,
      setting,
    };
  },
};
</script>

<style>
.setting {
  font-size: 16px;
}
.ant-popover .ant-popover-inner-content {
  padding: 0px 0px;
  width: 120px;
  color: #fff;
  box-shadow: 0px 0px 3px #6b6b6b;
}
.setting-list {
  text-align: left;
  line-height: 40px;
  width: 120px;
}
.setting-list .cursor-font {
  font-size: 14px;
  height: 40px;
  padding-left: 12px;
  transition: 500ms;
  -moz-transition: 500ms;
  -webkit-transition: 500ms;
  -o-transition: 500ms;
}
.setting-list .cursor-font:hover {
  background-color: #2d2d2d;
}
.ant-popover-placement-right > .ant-popover-content > .ant-popover-arrow,
.ant-popover-placement-rightTop > .ant-popover-content > .ant-popover-arrow,
.ant-popover-placement-rightBottom > .ant-popover-content > .ant-popover-arrow {
  border-bottom-color: #101010 !important;
  border-left-color: #101010 !important;
}
</style>

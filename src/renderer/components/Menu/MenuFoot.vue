<template>
  <div>
    <a-popover
      trigger="click"
      v-model:visible="footModel"
      placement="rightBottom"
    >
      <template #content>
        <div class="setting-list">
          <div class="cursor-font">
            <a-space :size="5">
              <SettingFilled twoToneColor="#f9cc16" class="cursor-op" />
              <div>设置</div>
            </a-space>
          </div>
          <div class="cursor-font">
            <a-space :size="5">
              <ExclamationCircleFilled class="cursor-op" />
              <div>关于我们</div>
            </a-space>
          </div>
          <div class="cursor-font" @click="checkUpdate()">
            <a-space :size="5">
              <DownloadOutlined class="cursor-op" />
              <div>检查更新</div>
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
  </div>
</template>

<script scoped>
import {
  BarsOutlined,
  SettingFilled,
  ExclamationCircleFilled,
  DownloadOutlined,
} from "@ant-design/icons-vue";
import { ipcRenderer } from "electron";
import { notification } from "ant-design-vue";
import { Modal } from "ant-design-vue";
import { createVNode, ref } from "vue";
import UpdateVNode from "./UpdateVNode";
import { convertFileSize, convertDateFormat } from "@/common/converter";

export default {
  components: {
    BarsOutlined,
    SettingFilled,
    ExclamationCircleFilled,
    DownloadOutlined,
  },
  setup() {
    const footModel = ref(false);

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

    return { footModel, checkUpdate };
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
  background-color: #101010;
  box-shadow: 0px 0px 3px #6b6b6b;
}
.setting-list {
  text-align: left;
  line-height: 40px;
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

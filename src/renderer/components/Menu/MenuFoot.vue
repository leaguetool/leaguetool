<template>
  <div>
    <a-popover trigger="click" placement="rightBottom">
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
          <div class="cursor-font">
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
        <div>菜单</div>
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
export default {
  components: {
    BarsOutlined,
    SettingFilled,
    ExclamationCircleFilled,
    DownloadOutlined,
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
  font-size: 16px;
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

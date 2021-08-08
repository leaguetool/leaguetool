<template>
  <div class="ment-item cursor-op" :class="{ current: current === menu.path }">
    <a-space :size="14">
      <component
        class="ment-item-icon"
        :is="current === menu.path ? menu.selectIcon : menu.icon"
      />
      <span>{{ menu.title }}</span>
    </a-space>
    <div></div>
  </div>
</template>

<script>
import {
  HomeOutlined,
  HomeFilled,
  FlagOutlined,
  PlusSquareOutlined,
  PlusSquareFilled,
  UserOutlined,
} from "@ant-design/icons-vue";
export default {
  props: ["menu", "current"],
  components: {
    HomeOutlined,
    HomeFilled,
    FlagOutlined,
    PlusSquareOutlined,
    PlusSquareFilled,
    UserOutlined,
  },
  setup() {
    return {};
  },
};
</script>

<style>
.ment-item {
  padding: 15px 0px 15px 40px;
  text-align: left;
  transition: 500ms;
  -moz-transition: 500ms;
  -webkit-transition: 500ms;
  -o-transition: 500ms;
}
.ment-item:hover {
  background-color: #2d2d2d;
}
.ment-item.current {
  opacity: 1;
  color: #fff;
  background: #f9cc16; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #faad14,
    #f9cc16
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #faad14, #f9cc16);
}
.ment-item .ment-item-icon {
  font-size: 18px;
}
</style>

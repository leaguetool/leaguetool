<template>
  <div class="ment-item cursor-op">
    <div class="ment-item-icon"><component :is="menu.icon" /></div>
    <span>{{ menu.title }}</span>
  </div>
</template>

<script>
import {
  HomeOutlined,
  FlagOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons-vue";
export default {
  props: ["menu"],
  components: { HomeOutlined, FlagOutlined, PlusSquareOutlined },
  setup({ menu }) {
    return { menu };
  },
};
</script>

<style>
.ment-item {
  margin: 15px 0px;
}
.ment-item .ment-item-icon {
  font-size: 22px;
}
</style>

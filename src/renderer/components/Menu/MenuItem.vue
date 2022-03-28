<template>
  <div class="menu-item-box">
    <div class="ment-item cursor-op" :class="{ current: isCurrentPath }">
      <div class="ment-item-head" :class="{ current: isCurrentPath }"></div>
      <a-space :size="14" class="ment-item-content">
        <component
          class="ment-item-icon"
          :is="current === menu.path ? menu.selectIcon : menu.icon"
        />
        <span>{{ menu.title }}</span>
        <a-badge :color="hotColor" />
      </a-space>
    </div>
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
  DribbbleCircleFilled,
} from "@ant-design/icons-vue";
import { computed } from "vue";
export default {
  props: ["menu", "current"],
  components: {
    HomeOutlined,
    HomeFilled,
    FlagOutlined,
    PlusSquareOutlined,
    PlusSquareFilled,
    UserOutlined,
    DribbbleCircleFilled,
  },
  setup(props) {
    let isCurrentPath = computed(() => props.menu.path === props.current);
    let hotColor = computed(() =>
      props.menu.hot
        ? props.menu.path != props.current
          ? "#f9cc16"
          : null
        : null
    );
    console.log(hotColor);
    return { isCurrentPath, hotColor };
  },
};
</script>

<style scoped>
.menu-item-box span {
  color: #fff;
}
.ment-item {
  position: relative;
  overflow: hidden;
  text-align: left;
  transition: 500ms;
  -moz-transition: 500ms;
  -webkit-transition: 500ms;
  -o-transition: 500ms;
}
.ment-item:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 100%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.3s, opacity 0.9s;
}

.ment-item:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}
.ment-item:hover {
  background-color: #2d2d2d;
}
.ment-item.current {
  opacity: 1;
  color: #fff;
  background: #2d2d2d;
  /*background: #f9cc16;
  /* background: -webkit-linear-gradient(to right, #faad14, #f9cc16);
  background: linear-gradient(to right, #faad14, #f9cc16); */
}

.ment-item-head {
  position: absolute;
  left: 0;
  height: 100%;
  width: 5px;
}
.ment-item-head.current {
  background-color: #faad14;
}

.ment-item-content {
  padding: 15px 0px 15px 40px;
}

.ment-item .ment-item-icon {
  font-size: 18px;
}
</style>

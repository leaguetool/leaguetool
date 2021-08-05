<template>
  <div class="menu">
    <ProFileImg class="profile-headimg" @click="gotoPath('/home/pro-file')" />
    <MenuItem
      v-for="menu in menus"
      :key="menu.title"
      :menu="menu"
      @click="gotoPath(menu.path)"
    />
    <MenuFoot class="menu-foot" />
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { defineComponent, reactive } from "vue";
import ProFileImg from "../ProFileImg.vue";
import MenuItem from "./MenuItem.vue";
import MenuFoot from "./MenuFoot.vue";
export default defineComponent({
  components: {
    ProFileImg,
    MenuItem,
    MenuFoot,
  },
  setup() {
    let menus = reactive([
      {
        path: "/home/pro-file",
        title: "游戏设置",
        icon: "HomeOutlined",
      },
      {
        path: "/",
        title: "重开房间",
        icon: "FlagOutlined",
      },
      {
        path: "/home",
        title: "插件中心",
        icon: "PlusSquareOutlined",
      },
    ]);
    const router = useRouter();
    let gotoPath = (path) => {
      router.push(path);
    };

    return { menus, gotoPath };
  },
});
</script>
<style>
.menu {
  width: 100px;
  height: 100%;
  color: #eeeeee;
  background-color: #222022;
  padding-top: 30px;
  text-align: center;
  position: relative;
}
.profile-headimg {
  margin-bottom: 20px !important;
}
.menu .menu-foot {
  position: absolute;
  width: 100%;
  bottom: 15px;
}
</style>

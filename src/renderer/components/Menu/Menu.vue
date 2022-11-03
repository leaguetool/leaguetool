<template>
  <div class="menu">
    <ProFileImg
      class="profile-headimg"
      @changeStatus="changeStatus"
      @clickHead="clickHead"
    />
    <MenuItem
      v-for="menu in menus"
      :key="menu.title"
      :menu="menu"
      :current="current"
      @click="gotoPath(menu.path)"
    />
    <MenuFoot class="menu-foot" />
  </div>
</template>
<script>
import { ipcRenderer } from "electron";
import { useRouter, useRoute } from "vue-router";
import { reactive, watch, ref, computed } from "vue";
import ProFileImg from "../ProFileImg.vue";
import MenuItem from "./MenuItem.vue";
import MenuFoot from "./MenuFoot.vue";
import { useStore } from "vuex";

export default {
  components: {
    ProFileImg,
    MenuItem,
    MenuFoot,
  },
  setup() {
    let menus = reactive([
      {
        path: "/home/index",
        title: "主页",
        icon: "HomeOutlined",
        selectIcon: "HomeFilled",
      },
      // {
      //   path: "/home/pro-file",
      //   title: "个人信息",
      //   icon: "UserOutlined",
      //   selectIcon: "UserOutlined",
      // },
      {
        path: "/game/team",
        title: "开黑大厅",
        icon: "DribbbleCircleFilled",
        selectIcon: "DribbbleCircleFilled",
        hot: true,
      },
      // ,
      // {
      //   path: "/",
      //   title: "重开房间",
      //   icon: "FlagOutlined",
      //   selectIcon: "FlagOutlined",
      // },
      // {
      //   path: "/home/plugins",
      //   title: "插件中心",
      //   icon: "PlusSquareOutlined",
      //   selectIcon: "PlusSquareFilled",
      // },
    ]);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    let gotoPath = (path) => {
      router.push(path);
    };

    const changeStatus = () => {
      console.log("我要改变状态");
    };
    const clickHead = () => {
      // gotoPath("/home/pro-file");
      //没登陆才能去
      if (!isLogin.value) {
        ipcRenderer.invoke("loginLOL");
      }
    };
    const isLogin = computed(() => {
      return store.state.user.uid;
    });

    let current = ref(route.path || menus[0].path);
    watch(
      () => route.path,
      (newValue) => {
        current.value = newValue;
      }
    );

    return { menus, current, isLogin, changeStatus, clickHead, gotoPath };
  },
};
</script>
<style>
.menu {
  width: 200px;
  height: 100%;
  /* color: #eeeeee; */
  background-color: #222022;
  padding-top: 40px;
  text-align: center;
  position: relative;
}
.menu::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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

import { createApp } from "vue";
import App from "./App.vue";
import router from "./Router";
import store from "./store";
import ant from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import "ant-design-vue/dist/antd.dark.less";
process.on("unhandledRejection", (error) => {
  console.error(error);
});
createApp(App).use(store).use(ant).use(router).mount("#app");

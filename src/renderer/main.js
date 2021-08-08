import { createApp } from "vue";
import App from "./App.vue";
import router from "./Router";
import store from "./store";
import ant from "ant-design-vue";
import "ant-design-vue/dist/antd.less";

createApp(App)
  .use(store)
  .use(ant)
  .use(router)
  .mount("#app");

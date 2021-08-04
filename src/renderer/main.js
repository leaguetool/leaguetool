import { createApp } from "vue";
import App from "./App.vue";
import router from "./Router.js";
import ant from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

createApp(App)
  .use(ant)
  .use(router)
  .mount("#app");

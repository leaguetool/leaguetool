import { createApp } from "vue";
import App from "./App.vue";
import router from "./Router";
import store from "./store";
import ant from "ant-design-vue";
import VueDOMPurifyHTML from "vue-dompurify-html";
import "ant-design-vue/dist/antd.less";
import "ant-design-vue/dist/antd.dark.less";
process.on("unhandledRejection", (error) => {
  console.error(error);
});
createApp(App)
  .use(store)
  .use(ant)
  .use(router)
  .use(VueDOMPurifyHTML, {
    namedConfigurations: {
      svgandimg: {
        ADD_ATTR: ["src"],
        ADD_TAGS: ["svg", "use", "img"],
        USE_PROFILES: { svg: true },
      },
    },
    hooks: {
      uponSanitizeElement: (currentNode) => {
        // 匹配到emoji标签那么就解析表情
        if (currentNode.tagName === "EMOJI") {
          currentNode.innerHTML = `<svg class="icon" aria-hidden="true"><use xlink:href="${currentNode.innerText}"></use></svg>`;
        }
        //如果是图片那就解析为图片，这里先不处理
        if (currentNode.tagName === "LEAIMG") {
          //TODO
        }
      },
    },
  })
  .mount("#app");

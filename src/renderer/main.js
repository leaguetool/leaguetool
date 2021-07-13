import Vue from 'vue'
import App from './App.vue'
import ant from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.use(ant);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

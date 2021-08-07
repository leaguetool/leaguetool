import axios from "axios";
import store from "~/store";
const https = require("https");
var agent = new https.Agent({
  rejectUnauthorized: false,
});

axios.defaults.httpsAgent = agent;
axios.defaults.timeout = 6000;

// 请求拦截  设置统一header
axios.interceptors.request.use(
  (config) => {
    let { token, port, protocol, username, verification } = store.get(
      "gameInfo"
    );
    config.baseURL = `${protocol}://${username}:${token}${verification}127.0.0.1:${port}`;
    config.headers = {
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截  401 token过期处理
axios.interceptors.response.use(
  (response) => {
    console.log(response);
    return response.data;
  },
  (error) => {
    // 错误提醒
    console.log(error);
    return Promise.reject(error);
  }
);
export default axios;

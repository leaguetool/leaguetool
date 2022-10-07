import axios1 from "axios";
import store from "~/store";
import configs from "./config";
const https = require("https");
var agent = new https.Agent({
  rejectUnauthorized: false,
});

axios1.defaults.httpsAgent = agent;
axios1.defaults.timeout = 6000;
//在main.js设置全局的请求次数，请求的间隙
axios1.defaults.retry = 4;
axios1.defaults.retryDelay = 2000;

// 请求拦截  设置统一header
axios1.interceptors.request.use(
  (config) => {
    // let { token, port, protocol, username, verification } = store.get(
    //   "gameInfo"
    // );
    config.baseURL = configs.getServerUrl();
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
axios1.interceptors.response.use(
  (response) => {
    console.log(response);
    return response.data;
  },
  (err) => {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });

    console.log(err);
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
      return axios1(config);
    });
    // 错误提醒
    // return Promise.reject(error);
  }
);
export default axios1;

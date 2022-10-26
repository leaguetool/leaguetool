export default {
  getServerUrl: () => {
    //判断是否是开发环境
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:9999";
    } else {
      return "https://lol.s6.design/api";
    }
  },
};

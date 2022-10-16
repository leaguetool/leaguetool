const { ipcRenderer } = require("electron");
//定义一个第一次创建的变量
var loginEnd = true;
var AreaEnd = true;

const checkReady = () => {
  return new Promise((resolve, reject) => {
    if (T_Login && T_Login.checkReady()) {
      resolve(T_Login);
    }
  });
};
const isLogin = (T_Login) => {
  return T_Login.LoginManager.isLogin();
};

const useAccountData = (data) => {
  let PlayerRankInfo = { tier: data.tier, queue: data.queue };
  var rankList = T_Login.getTierText(PlayerRankInfo);
  const infoData = {
    displayName: data.nickName,
    rank:
      rankList.extended_tier +
      (data.tier != 255 ? rankList.extended_queue : ""),
    avatar: data.headImg,
    //胜率
    winRate: data.winRate,
    uid: data.uid,
    area: data.area,
    areaName: data.areaName,
  };
  sendMessage(infoData);
  sendIpcMessage("proFileData", infoData);
  // extended_queue: "Ⅰ"extended_tier: "华贵铂金"extended_tier_url: "//ossweb-img.qq.com/images/lol/space/rank/2019pre/season_2019_platinum_1.png"
};

window.addEventListener("DOMContentLoaded", () => {
  //   setTimeout(() => {
  //     if (T_Login && T_Login.gAccountData) {
  //       alert("你好：" + T_Login.gAccountData.data.nickName);
  //     }
  //   }, 2000);
  //T_Login.checkReady()
  setInterval(() => {
    initSummoner();
  }, 1000);
});

const initSummoner = () => {
  checkReady().then((T_Login) => {
    var isLoginState = isLogin(T_Login);
    if (!isLoginState) {
      //   alert("未登录请登陆");
      sendMessage("未登录请登陆");
      if (loginEnd) {
        T_Login.login();
        loginEnd = false;
        sendMessage("拉取登陆框");
      }
      return;
    }
    //登陆后是否绑定大区
    var isArea = T_Login.gAccountArea;
    if (!isArea) {
      sendMessage("未绑定大区");
      //   alert("未绑定大区");
      if (AreaEnd) {
        T_Login.changeArea();
        AreaEnd = false;
        sendMessage("拉取绑定大区框");
      }
      return;
    }
    if (T_Login.gAccountData && T_Login.gAccountData.data) {
      T_Login.gAccountData.data.uid = T_Login.gAccountId;
      T_Login.gAccountData.data.area = T_Login.gAccountArea;
      T_Login.gAccountData.data.areaName = T_Login.getAreaById(
        T_Login.gAccountArea
      );
      useAccountData(T_Login.gAccountData.data);
    }
  });
};

const sendMessage = (data) => {
  ipcRenderer.send("console", data);
};

const sendIpcMessage = (eventName, data) => {
  ipcRenderer.send(eventName, data);
};

// contextBridge.exposeInMainWorld("api", {
//   send: (channel, data) => ipcRenderer.invoke(channel, data),
//   handle: (channel, callable, event, data) =>
//     ipcRenderer.on(channel, callable(event, data)),
// });

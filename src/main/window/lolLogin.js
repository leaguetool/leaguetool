const { BrowserWindow } = require("electron");
const { getMainWindow } = require("./main");
const path = require("path");

var loginLoL;
export const LoginLoL = () => {
  if (loginLoL) {
    return loginLoL.show();
  }
  loginLoL = new BrowserWindow({
    width: 1500,
    height: 500,
    frame: true,
    // titleBarStyle: "hidden",
    //保持最上层
    // alwaysOnTop: app.isPackaged,
    resizable: false,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  loginLoL.loadURL(`https://lol.qq.com/main.shtml`);
  //事件后显示窗口将没有视觉闪烁 必须要设置show: false才生效
  loginLoL.once("ready-to-show", () => {
    loginLoL.show();
  });
};

//关闭登陆框
export const hideLogin = (event, data) => {
  if (loginLoL) {
    //拉起主窗口
    getMainWindow().show();
    // 强制关闭窗口, unload and beforeunload 不会触发，并且 close 也不会触发, 但是它保证了 closed 触发
    // 尝试关会闭窗口，这与用户点击关闭按钮的效果一样. 虽然网页可能取消关闭，查看 close event.
    loginLoL.destroy();
    loginLoL = null;
  }
};

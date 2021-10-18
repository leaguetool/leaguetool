const { app, BrowserWindow } = require("electron");
const path = require("path");

const { createTray } = require("./tray");
/**
 * 创建更新窗口
 * @returns
 */
const UPDATE_PATH = "/update";
var updateWindow;
export const createUpdateWindow = () => {
  updateWindow = new BrowserWindow({
    width: 700,
    height: 250,
    frame: false,
    titleBarStyle: "hidden",
    //保持最上层
    alwaysOnTop: app.isPackaged,
    resizable: false,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    updateWindow.loadFile(path.join(__dirname, "index.html/"), {
      hash: UPDATE_PATH,
    });
  } else {
    updateWindow.loadURL(
      `${process.env.WEBPACK_DEV_SERVER_URL}/#${UPDATE_PATH}`
    );
  }

  //事件后显示窗口将没有视觉闪烁 必须要设置show: false才生效
  updateWindow.once("ready-to-show", () => {
    updateWindow.show();
  });
  createTray(updateWindow);
};

export const getUpdateWindow = () => {
  return updateWindow;
};

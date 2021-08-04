const { BrowserWindow } = require("electron");
const { createTray } = require("./tray");
const path = require("path");

var mainWindow;

function createWindow() {
  if (mainWindow != null) {
    mainWindow.show();
    return mainWindow;
  }
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 800,
    height: 720,
    frame: false,
    titleBarStyle: "hidden",
    // transparent: true,
    backgroundColor: "#f5f5f5",
    resizable: false,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:8080");
  } else {
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  }

  //事件后显示窗口将没有视觉闪烁 必须要设置show: false才生效
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  
  //打开控制面板F12
  // mainWindow.webContents.openDevTools();

  //创建托盘
  createTray(mainWindow);
  return mainWindow;
}

//主进程推送渲染进程消息
function send(channel, ...args) {
  mainWindow.webContents.send(channel, args);
}

//获取主进程
function getMainWindow() {
  return mainWindow;
}

module.exports = { createWindow, send, getMainWindow };

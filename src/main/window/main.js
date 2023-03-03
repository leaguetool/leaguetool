const { app, BrowserWindow, BrowserView } = require("electron");
const {
  default: installExtension,
  VUEJS3_DEVTOOLS,
} = require("electron-devtools-installer");
const { createTray } = require("./tray");
const { gameClientRunnerTesting } = require("../game/game");
const { autoStartApp } = require("../common/system");
const path = require("path");

var mainWindow;
var loadingView;
export const createWindow = () => {
  if (mainWindow != null) {
    mainWindow.show();
    return mainWindow;
  }
  /**
   * Initial window options
   */

  loadDevTools();
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 720,
    frame: false,
    backgroundColor: "#2d2d2d",
    titleBarStyle: "hidden",
    // transparent: true,
    // backgroundColor: "#f5f5f5",
    resizable: false,
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: path.join(__dirname, "preload.js"),
    },
  });
  /**
   * 防止启动白屏，这里采用先加载loading页
   */
  loadingView = new BrowserView();
  mainWindow.setBrowserView(loadingView);
  loadingView.setBounds({ x: 0, y: 0, width: 1000, height: 720 });
  //当加载层视图 文本加载完成后触发该事件
  loadingView.webContents.on("dom-ready", () => {
    if (process.argv.indexOf("--openAsHidden") < 0) {
      //显示主进程
      mainWindow.show();
    }
  });

  if (app.isPackaged) {
    loadingView.webContents.loadFile(path.join(__dirname, "loading.html"));
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  } else {
    loadingView.webContents.loadURL(
      `${process.env.WEBPACK_DEV_SERVER_URL}/loading.html`
    );
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  }

  //事件后显示窗口将没有视觉闪烁 必须要设置show: false才生效
  mainWindow.once("ready-to-show", () => {
    startGameClientTesting();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  //打开控制面板F12
  // mainWindow.webContents.openDevTools();

  //创建托盘
  createTray(mainWindow);
  return mainWindow;
};

//检测游戏客户端是否存活
function startGameClientTesting() {
  gameClientRunnerTesting(send);
}

//主进程推送渲染进程消息
export const send = (channel, ...args) => {
  mainWindow.webContents.send(channel, args);
};

export const removeLoadingView = () => {
  loadingView && mainWindow.removeBrowserView(loadingView);
  loadingView = null;
};

//获取主进程
export const getMainWindow = () => {
  return mainWindow;
};
//获取加载View
export const getLoadingView = () => {
  return loadingView;
};
//加载插件
function loadDevTools() {
  if (!app.isPackaged) {
    /**
     * 开发环境安装 Vue3 Devtools 从google商店扩展下载 需要科学上网！！
     * 如果遇到此类型警告，忽略即可，Beta版本的devtools会有些问题，不影响项目正常使用
     * [issues] https://blog.csdn.net/x1017619024/article/details/109147848
     * [issues] https://github.com/vuejs/vue-devtools/issues/1279
     * (node:115780) ExtensionLoadWarning: Warnings loading extension at C:\Users\xxx\AppData\Roaming\leaguetool\extensions\ljjemllljcmogpfapbkkighbhhppjdbg:
     *   Cannot load extension with file or directory name _metadata. Filenames starting with "_" are reserved for use by the system.
     * (Use `electron --trace-warnings ...` to show where the warning was created)
     */
    installExtension(VUEJS3_DEVTOOLS)
      .then((name) => console.log(`load ${name} Successfully`))
      .catch((err) => console.log("An error occurred: ", err));
  }
}

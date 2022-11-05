const { app, globalShortcut } = require("electron");
const { getMainWindow } = require("./window/main");
var escCount = 0;
//快捷键绑定与注销
app.whenReady().then(() => {
  console.log("app.isPackaged", app.isPackaged);
  if (app.isPackaged) {
    //页面刷新与全屏快捷键
    globalShortcut.registerAll(["CommandOrControl+R", "F11"], () => {
      return false;
    });
    globalShortcut.registerAll(["ESC"], () => {
      escCount++;
      // console.log("ESC", escCount);
      //按下十次ESC，则弹起web控制台
      if (escCount >= 10) {
        const mainWindow = getMainWindow();
        if (mainWindow) {
          mainWindow.webContents.openDevTools();
        }
      }
      return false;
    });
  }

  app.on("will-quit", () => {
    // 注销所有快捷键
    globalShortcut.unregisterAll();
  });
});

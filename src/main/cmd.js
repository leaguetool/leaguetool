const { app, globalShortcut } = require("electron");

//快捷键绑定与注销
app.whenReady().then(() => {
  if (app.isPackaged) {
    //页面刷新与全屏快捷键
    globalShortcut.registerAll(["CommandOrControl+R", "F11"], () => {
      return false;
    });
  }
});

app.on("will-quit", () => {
  // 注销所有快捷键
  globalShortcut.unregisterAll();
});

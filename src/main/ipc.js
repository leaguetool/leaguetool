const { app, ipcMain, dialog } = require("electron");
const { startScanning } = require("./file/lockfile");
const { openBugreport, openGithub } = require("./conf/config");
const {
  send: sendMainWindow,
  getMainWindow,
  removeLoadingView,
} = require("./window/main");

//渲染进程申请控制主进程
ipcMain.on("test1", async (msg) => {
  console.log("test1,", msg);
});

//接收渲染进程发出的事件
ipcMain.handle("login", async () => {
  console.log("初始化Login");
  return startScanning();
});

//选择客户端路径
ipcMain.handle("onSelectDir", async () => {
  return await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
});

//开源社区
ipcMain.on("github", () => {
  //TODO 打开一个开源社区
  console.log("打开github");
  openGithub();
});

//反馈Bug的地方
ipcMain.on("bug", () => {
  //TODO 有个反馈BUG的地方，这个可以放在项目结束来写
  console.log("bug反馈");
  openBugreport();
});

//vue主页面加载完成后 关闭防白屏的加载loading
ipcMain.on("stop-loading-main", () => {
  removeLoadingView();
});

//关闭软件
ipcMain.on("closeApp", () => {
  //隐藏
  getMainWindow().hide();
  // app.exit(0);
});

//最小化
ipcMain.on("minimizeApp", () => {
  getMainWindow().minimize();
});

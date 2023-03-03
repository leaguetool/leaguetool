const { app, ipcMain, dialog, BrowserWindow } = require("electron");
const { startScanning } = require("../../file/lockfile");
const { openBugreport, openGithub } = require("../../conf/config");
const { checkForUpdates, downloadUpdate } = require("../../update");
const { createUpdateWindow } = require("../../window/update");
const { LoginLoL, hideLogin } = require("../../window/lolLogin");
//导入自己应用系统的ipc
require("./system-ipc");
const {
  send: sendMainWindow,
  getMainWindow,
  removeLoadingView,
} = require("../../window/main");

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
ipcMain.on("closeApp", (event, args) => {
  if (args === "exit") {
    //退出
    return app.exit(0);
  }
  if (args === "hide") {
    //隐藏
    return getMainWindow().hide();
  }
});

//最小化
ipcMain.on("minimizeApp", () => {
  getMainWindow().minimize();
});

//检测更新 获取版本信息
ipcMain.handle("checkUpdate", async () => {
  console.log("开始检测更新");
  return checkForUpdates(true);
});

//版本更新，触发更新
ipcMain.on("updateApp", () => {
  //隐藏主界面
  getMainWindow().hide();
  //创建更新视图
  createUpdateWindow();
});

// TODO: 手动下载更新文件
ipcMain.handle("confirm-downloadUpdate", () => {
  downloadUpdate();
});

// 登陆LOL
ipcMain.handle("loginLOL", () => {
  LoginLoL();
});

ipcMain.on("proFileData", (event, args) => {
  hideLogin(event, args);
  //存入store 主进程无法直接放vuex 所以可以通知给渲染进程
  sendMainWindow("loginSuccess", args);
});

//打印
ipcMain.on("console", (event, args) => {
  console.log(args);
});

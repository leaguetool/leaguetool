"use strict";
const { app } = require("electron");
const { createWindow, getMainWindow } = require("./window/main");
const { createUpdateWindow } = require("./window/update");
const { checkForUpdates } = require("./update");
require("./common");
require("./cmd");
require("./ipc");
require("./plugin");

//electron忽略证书相关的错误.
app.commandLine.appendSwitch("--ignore-certificate-errors", "true");
app.commandLine.appendSwitch("--disable-web-security", "true");

/**
 * 如果你的程序是应用的主要实例并且当这个方法返回true时，你应该继续让你的程序运行。
 * 如果当它返回false如果你的程序没有取得锁，它应该立刻退出，并且将参数发送给那个已经取到锁的进程。
 * 保持应用一直处于单例
 */
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

//当第二个实例被执行并且调用 app.requestSingleInstanceLock() 时，这个事件将在你的应用程序的首个实例中触发
app.on("second-instance", () => {
  let mainWindow = getMainWindow();
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("activate", () => {
  createWindow();
});

(async () => {
  await app.whenReady();
  checkForUpdates().then((info) => {
    if (info) {
      //开启更新进程
      return createUpdateWindow();
    }
    createWindow();
  });
})();

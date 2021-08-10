/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
const { app, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const store = require("./store");
const log = require("electron-log");
const { getUpdateWindow } = require("./window/update");

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

function sendStatusToWindow(text) {
  log.info(text);
  //   win.webContents.send("message", text);
}
function sendContentToWindow(key, text) {
  getUpdateWindow().webContents.send(key, text);
}

function checkForUpdates() {
  // 在下载之前将autoUpdater的autoDownload属性设置成false，通过渲染进程触发主进程事件来实现这一设置(将自动更新设置成false)
  autoUpdater.autoDownload = false;

  return new Promise((resolve, reject) => {
    // return resolve(true);
    if (app.isPackaged) {
      autoUpdater.checkForUpdates();
    } else {
      //开发环境不检测更新，直接跳过。
      resolve();
    }

    let message = {
      error: "检查更新出错",
      checking: "正在检查更新……",
      updateAva: "检测到新版本，正在下载……",
      updateNotAva: "现在使用的就是最新版本，不用更新",
    };

    //出现错误
    autoUpdater.on("error", function(error) {
      //   console.log(error);
      sendStatusToWindow(message.error);
    });

    //检测更新
    autoUpdater.on("checking-for-update", function() {
      //   console.log("checking-for-update");
      sendStatusToWindow(message.checking);
    });

    //有可用的新版本
    autoUpdater.on("update-available", function(info) {
      //TODO: 有新版本，打开更新渲染进程。
      sendStatusToWindow(message.updateAva);
      sendStatusToWindow(info);
      store.set("versionInfo", info);
      resolve(info);
    });

    //没有新版本
    autoUpdater.on("update-not-available", function() {
      store.delete("versionInfo");
      sendStatusToWindow(message.updateNotAva);
      resolve();
    });

    // 更新下载进度事件
    autoUpdater.on("download-progress", function(progressObj) {
      //TODO：在更新渲染进程中持续获取下载进度条渲染
      sendStatusToWindow(JSON.stringify(progressObj));
      sendContentToWindow("app-update-progress", progressObj);
    });

    //下载完成事件
    autoUpdater.on("update-downloaded", function(
      event,
      releaseNotes,
      releaseName,
      releaseDate,
      updateUrl,
      quitAndUpdate
    ) {
      sendStatusToWindow("下载完成，开始静默安装");
      //isSilent静默安装  isForceRunAfter完成后运行应用程序
      autoUpdater.quitAndInstall(true, true);
    });

    // TODO: 手动下载更新文件
    ipcMain.handle("confirm-downloadUpdate", () => {
      let versionInfo = store.get("versionInfo");
      sendStatusToWindow(versionInfo);
      sendContentToWindow("app-update-version", versionInfo);
      autoUpdater.downloadUpdate();
    });
  });
}

module.exports = {
  checkForUpdates,
};

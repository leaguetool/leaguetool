"use strict";

const { app } = require("electron");
const { createWindow } = require("./window/main");
const handleIPC = require("./ipc");
const store = require("./store");
require("./cmd");

//electron忽略证书相关的错误.
app.commandLine.appendSwitch("--ignore-certificate-errors", "true");
app.commandLine.appendSwitch("--disable-web-security", "true");

let mainWindow;

app.on("ready", () => {
  createWindow();
  handleIPC();
  console.log(store.get("gameInfo"));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  createWindow();
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

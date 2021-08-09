"use strict";

const { app } = require("electron");
const { createWindow } = require("./window/main");
const { checkForUpdates } = require("./update");
const handleIPC = require("./ipc");
const log = require("electron-log");
require("./cmd");

//electron忽略证书相关的错误.
app.commandLine.appendSwitch("--ignore-certificate-errors", "true");
app.commandLine.appendSwitch("--disable-web-security", "true");

app.on("ready", () => {
  log.info("App ready...");
  checkForUpdates().then(() => {
    createWindow();
    handleIPC();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  createWindow();
});

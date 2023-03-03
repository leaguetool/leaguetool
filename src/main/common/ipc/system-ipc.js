const { ipcMain } = require("electron");
const { autoStartApp } = require("../system");
//接收渲染进程发出的事件
ipcMain.on("autoStartApp", async (event, args) => {
  console.log("ipc: autoStart: ", args);
  autoStartApp(args);
});

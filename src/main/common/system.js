const { app } = require("electron");
const path = require("path");
module.exports = {
  //设置开机自动启动
  autoStartApp(autoStart) {
    const exeName = path.basename(process.execPath);
    //只有打包后才能设置开机自启动
    if (app.isPackaged) {
      console.log("设置开机自启动设置：Start", autoStart, "exeName:", exeName);
      app.setLoginItemSettings({
        openAtLogin: autoStart,
        openAsHidden: true,
        path: process.execPath,
        args: [
          "--processStart",
          `"${exeName}"`,
          "--process-start-args",
          `"--openAsHidden"`,
        ],
      });
    } else {
      console.log(
        "设置开机自启动，因为是开发环境所以不设置：Start",
        autoStart,
        "exeName:",
        exeName
      );
    }
  },
};

const { app, dialog, Menu, Tray } = require("electron");
const pkg = require("@/../package.json");
const path = require("path");

let tray = null;

module.exports = {
  createTray(mainWindow) {
    // 系统托盘图标目录
    let trayIcon = path.join(__static, "/favicon.ico");
    tray = new Tray(trayIcon);
    const contextMenu = Menu.buildFromTemplate([
      // {
      //   label: "设置",
      //   click: function() {
      //     console.log("点击设置");
      //   },
      // },
      // {
      //   label: "帮助",
      //   click: function() {
      //     console.log("点击帮助");
      //   },
      // },
      // {
      //   label: "打开调试面板",
      //   click() {
      //     mainWindow.webContents.openDevTools();
      //   },
      // },
      {
        label: "关于LeagueTool",
        click: function () {
          dialog.showMessageBox({
            title: pkg.name,
            message: pkg.description,
            detail: `Q群：810322958\n作者: ${pkg.author.name}\nversion: ${pkg.version}`,
          });
          console.log("点击关于LeagueTool");
        },
      },
      {
        label: "退出LeagueTool",
        click: function () {
          app.exit(0);
        },
      },
    ]);
    tray.setToolTip("LeagueTool");
    tray.setContextMenu(contextMenu);

    tray.on("double-click", () => {
      mainWindow.show();
    });

    tray.on("click", () => {
      mainWindow.show();
    });
  },
};

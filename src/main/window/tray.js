const { app, Menu, Tray } = require("electron");
const path = require("path");

let tray = null;
function createTray(mainWindow) {
  // 系统托盘图标目录
  let trayIcon = path.join(__static, "/favicon.ico");
  tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "设置",
      click: function() {
        console.log("点击设置");
      },
    },
    {
      label: "帮助",
      click: function() {
        console.log("点击帮助");
      },
    },{
      label: "打开调试面板",
      click(){
        mainWindow.webContents.openDevTools();
      }
    },
    {
      label: "关于LeagueTool",
      click: function() {
        console.log("点击关于LeagueTool");
      },
    },
    {
      label: "退出LeagueTool",
      click: function() {
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
}

module.exports = { createTray };

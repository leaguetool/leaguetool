const { BrowserWindow } = require('electron')
const path = require('path')

var mainWindow

function createWindow () {
    if(mainWindow != null){
      mainWindow.show()
      return mainWindow
    }
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
      width: 800,
      height: 720,
      frame:false,
      titleBarStyle: 'hidden',
      transparent: true,
      resizable: false,
      autoHideMenuBar: true,
      alwaysOnTop: true
    })
    if(process.env.NODE_ENV === 'development') {
      mainWindow.loadURL('http://localhost:8080')
    }else{
      mainWindow.loadFile(path.join(__dirname, 'index.html'))
    }
  
    mainWindow.on('closed', () => {
      mainWindow = null
    })
    mainWindow.webContents.openDevTools()
    return mainWindow;
}

//主进程推送渲染进程消息
function send(channel, ...args){
  mainWindow.webContents.send(channel, args)
}

module.exports = { createWindow , send}

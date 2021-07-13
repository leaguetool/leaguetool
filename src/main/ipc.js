const { ipcMain } = require('electron')
const { startScanning } = require('./file/lockfile')
const {send: sendMainWindow } = require('./window/main')

module.exports = function(){

    //渲染进程申请控制主进程
    ipcMain.on('test1', async (msg) => {
        console.log('test1,',msg)
    })

    //接收渲染进程发出的事件
    ipcMain.handle('login', async () => {
        sendMainWindow('check-client-isruning', startScanning())
    })
}

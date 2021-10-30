import {autoUpdater} from 'electron-updater'
import { ipcMain } from 'electron'

// 开始检查更新
ipcMain.on('checkForUpdates', () => autoUpdater.checkForUpdates())

// 开始下载更新
ipcMain.on('downLoadUpdate', () => autoUpdater.downloadUpdate())

const updateHandle = (mainWindow, updateURL) => {
    const webContents = mainWindow.webContents
    const statusMessage = {
        error: {status: -1, msg: '检测更新查询异常'},
        checking: {status: 0, msg: '正在检查应用程序更新'},
        updateAva: {status: 1, msg: '检测到新版本，正在下载,请稍后'},
        updateNotAva: {status: 2, msg: '您现在使用的版本为最新版本,无需更新!'},
        downloadSuccess: {status: 2, msg: '下载新版成功'}
    }

    autoUpdater.autoDownload = false  // 手动指定下载
    autoUpdater.setFeedURL(updateURL)   // 更新包的地址，如 https://xxx.com/app/

    //执行自动更新检查
    // autoUpdater.checkForUpdates()

    //更新错误
    autoUpdater.on('error', error => {
        console.log(error)
        webContents.send('uploadMessage', {payload: statusMessage.error, output: error})
    })

    //检查中
    autoUpdater.on('checking-for-update', v => {
        console.log('检查中')
        webContents.send('uploadMessage', {payload: statusMessage.checking, output: v})
    })

    //发现新版本
    autoUpdater.on('update-available', info => {
        console.log('发现新版本')
        webContents.send('uploadMessage', {payload: statusMessage.updateAva, output: info})
    })

    //当前版本为最新版本
    autoUpdater.on('update-not-available', info => {
        console.log('当前版本为最新版本')
        webContents.send('uploadMessage', {payload: statusMessage.updateNotAva, output: info})
    })

    // 更新下载进度事件
    autoUpdater.on('download-progress', progress => webContents.send('downloadProgress', progress))

    // 当下载完更新包后触发
    autoUpdater.on('update-downloaded', info => {
        webContents.send('uploadMessage', {payload: statusMessage.downloadSuccess, output: info})
        autoUpdater.quitAndInstall()
    })
}


export default updateHandle

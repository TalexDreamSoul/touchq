import { app, BrowserWindow } from 'electron'
// import '../renderer/store'

const { ipcMain } = require('electron')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(name, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${name}/src/index.ejs`

function createWindow () {

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 680,
    // useContentSize: true,
    width: 1680,
    frame: false,
    transparent: true,
    // resizable: false,
    // hasShadow: true,
    backgroundColor: '#00000000',
    webPreferences: {

      webSecurity: false,
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,

    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

}

ipcMain.on('close', e => mainWindow.close())
ipcMain.on('min', e => mainWindow.minimize())

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

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

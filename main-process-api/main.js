// Modules
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    },
    // show: false,
    backgroundColor: '#2B2E3B',
    frame: false,
    titleBarStyle: 'hidden',
  })

  secondaryWindow = new BrowserWindow({
    width: 600, height: 300,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true
    },
    backgroundColor: '#2B2E3B',
    parent: mainWindow,
    modal: true,
    show: false,
  })

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  secondaryWindow.loadFile('secondary.html')
  // mainWindow.loadURL('https://google.com')

  // setTimeout(() => {
  //   secondaryWindow.show();
  //   setTimeout(() => {
  //     secondaryWindow.close()
  //     secondaryWindow = null
  //   }, 3000)
  // }, 2000)

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // mainWindow.once('ready-to-show', mainWindow.show)

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

app.on('before-quit', e => {
  console.log('Prevent app from quitting');
  e.preventDefault();
})

app.on('browser-window-blur', e => {
  console.log('App unfocused')
  setTimeout(app.quit, 3000)
})

app.on('browser-window-focus', e => {
  console.log('App focused')
})

// Electron `app` is ready
app.on('ready', () => {
  console.log('Checking ready: ' + app.isReady());
  console.log(app.getPath('desktop'));
  console.log(app.getPath('music'));
  console.log(app.getPath('temp'));
  console.log(app.getPath('userData'));
  createWindow()
})

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

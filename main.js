/***
 * 主进程
 */

const path = require('path');

const E = require('electron');

const { app, BrowserWindow, Menu, Tray } = E;

let mainWindow, appIcon;

app.dock.hide();
app.on('ready', init);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (mainWindow = null) {
    init();
  }
})

function init() {
  var iconPath = path.join(__dirname, 'image/app-icon@2x.png');
  appIcon = new Tray(iconPath);
  appIcon.setToolTip('Snooker For Mac');
  appIcon.on('click', () => {
    if (!mainWindow) {
      createWindow();
    } else {
      mainWindow.close();
      mainWindow = null;
    }
  });
  app.on('browser-window-blur', () => {
    mainWindow.close();
    mainWindow = null;
  })
}

function createWindow() {
  const width = 300, height = 500;
  mainWindow = new BrowserWindow({
    x: appIcon.getBounds().x - width / 2 + 16,
    y: appIcon.getBounds().y,
    width: width,
    height: height,
    resizable: false,
    frame: false,
    backgroundColor: '#ffffff'
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('close', () => {
    mainWindow = null;
  });
}
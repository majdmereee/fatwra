const { app, BrowserWindow } = require('electron');
function createWindow () {
  const win = new BrowserWindow({
    width: 1280, height: 800,
    webPreferences: { nodeIntegration: true }
  });
  win.setMenuBarVisibility(false); // إخفاء شريط القوائم لواجهة أنظف
  win.loadFile('index.html');
}
app.whenReady().then(createWindow);

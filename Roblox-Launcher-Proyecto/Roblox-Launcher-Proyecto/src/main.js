const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000, height: 700, minWidth: 760, minHeight: 560,
    backgroundColor: '#0b0e14', title: 'Roblox Launcher', autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, nodeIntegration: false, sandbox: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

function status(message, kind = 'info') {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('status', { message, kind });
}

function launchRoblox() {
  // Solicita al sistema abrir el protocolo oficial de Roblox.
  const child = spawn('cmd.exe', ['/d', '/s', '/c', 'start', '""', 'roblox-player:'], {
    windowsHide: true, detached: true, stdio: 'ignore'
  });
  child.on('error', () => status('No se pudo abrir Roblox. Usa “Instalar Roblox” para ir a la página oficial.', 'warning'));
  child.unref();
  setTimeout(() => status('Se solicitó abrir Roblox. Si no está instalado, elige “Instalar Roblox”.'), 700);
}

ipcMain.handle('launch-roblox', () => { launchRoblox(); return true; });
ipcMain.handle('install-roblox', async () => {
  await shell.openExternal('https://www.roblox.com/download');
  status('Se abrió la página oficial para instalar Roblox.');
  return true;
});
ipcMain.handle('open-roblox-web', () => shell.openExternal('https://www.roblox.com/'));
ipcMain.handle('check-updates', async () => {
  if (!app.isPackaged) {
    status('La comprobación de actualizaciones está disponible en la versión instalada.', 'info');
    return false;
  }
  try {
    status('Buscando actualizaciones del lanzador…');
    await autoUpdater.checkForUpdates();
    return true;
  } catch {
    status('No se pudo comprobar la actualización. Revisa la configuración de GitHub Releases.', 'warning');
    return false;
  }
});

app.whenReady().then(() => {
  createWindow();
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('checking-for-update', () => status('Comprobando actualizaciones…'));
  autoUpdater.on('update-available', () => status('Nueva versión disponible. Descargando actualización…'));
  autoUpdater.on('update-not-available', () => status('El lanzador ya está actualizado.', 'success'));
  autoUpdater.on('download-progress', p => status(`Descargando actualización: ${Math.round(p.percent)}%`));
  autoUpdater.on('update-downloaded', () => {
    status('Actualización descargada. Se instalará al cerrar el lanzador.', 'success');
    if (mainWindow && !mainWindow.isDestroyed()) dialog.showMessageBox(mainWindow, {
      type: 'info', title: 'Actualización lista',
      message: 'La actualización del lanzador se instalará al cerrar la aplicación.',
      buttons: ['Entendido']
    });
  });
  autoUpdater.on('error', () => status('No se pudo actualizar el lanzador. Puedes seguir usando la versión actual.', 'warning'));
  if (app.isPackaged) setTimeout(() => autoUpdater.checkForUpdates().catch(() => {}), 2500);
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

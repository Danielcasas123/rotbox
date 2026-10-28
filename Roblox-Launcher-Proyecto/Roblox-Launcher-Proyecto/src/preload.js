const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('launcher', {
  launchRoblox: () => ipcRenderer.invoke('launch-roblox'),
  installRoblox: () => ipcRenderer.invoke('install-roblox'),
  openRobloxWeb: () => ipcRenderer.invoke('open-roblox-web'),
  checkUpdates: () => ipcRenderer.invoke('check-updates'),
  onStatus: callback => ipcRenderer.on('status', (_event, data) => callback(data))
});

const statusBox = document.getElementById('status');
const statusText = document.getElementById('status-text');
function setStatus(message, kind = 'info') {
  statusText.textContent = message;
  statusBox.dataset.kind = kind;
}
document.getElementById('play').addEventListener('click', async () => {
  setStatus('Intentando abrir Roblox…');
  await window.launcher.launchRoblox();
});
document.getElementById('install').addEventListener('click', () => window.launcher.installRoblox());
document.getElementById('website').addEventListener('click', () => window.launcher.openRobloxWeb());
document.getElementById('updates').addEventListener('click', () => window.launcher.checkUpdates());
window.launcher.onStatus(({ message, kind }) => setStatus(message, kind));

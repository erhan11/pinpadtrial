const contextBridge = require("electron").contextBridge;
const ipcRenderer = require("electron").ipcRenderer;

contextBridge.exposeInMainWorld("electronAPI", {
  sendPin: (pin) => {
    ipcRenderer.send("pin", pin);
  },
});

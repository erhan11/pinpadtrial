const electronApp = require("electron").app;
const electronBrowserWindow = require("electron").BrowserWindow;
const electronIpcMain = require("electron").ipcMain;

const nodePath = require("path");

// Prevent garbage collection
let window;

function createWindow() {
  const window = new electronBrowserWindow({
    fullscreen: true,
    //x: 0,
    //y: 0,
    //width: 800,
    //height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: nodePath.join(__dirname, "preload.js"),
    },
  });

  window.loadFile("pin-pad.html").then(() => {
    window.show();
  });

  return window;
}

electronApp.on("ready", () => {
  window = createWindow();
});

electronApp.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electronApp.quit();
  }
});

electronApp.on("activate", () => {
  if (electronBrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// ---

electronIpcMain.on("pin", (event, pin) => {
  // Simple check of pin validity
  if (pin === "1234") {
    window.loadFile("sales.html");
  }
});

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
    window.loadFile("sales.html"); // <-- Use this HTML file now...
  }
});

/////tests
const handlekeyUp = function (e) {
  e.stopPropagation();
  const input = document.getElementById("display");
  console.log(input, e.key, input.value);
  var reg = new RegExp("^[0-9]$");
  const number = document.querySelector(`[data-number="${e.key}"]`);

  if (reg.test(e.key)) input.value += e.key;
  if (number) number.style.backgroundColor = "#fff";
};

const handleKeyDown = (e) => {
  const number = document.querySelector(`[data-number="${e.key}"]`);
  if (!number) {
    return;
  }
  number.style.backgroundColor = "#eee";
};

document.addEventListener("keyup", handlekeyUp);

document.addEventListener("keydown", handleKeyDown);

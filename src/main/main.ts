import { app, BrowserWindow } from "electron";
// @ts-ignore
import installExtension, { REACT_DEVELOPER_TOOLS } from "iyobo-electron-devtools-installer";

installExtension(REACT_DEVELOPER_TOOLS)
    .then((name: string) => console.log(`Added Extension:  ${name}`))
    .catch((err: any) => console.log("An error occurred: ", err));

// Храните глобальную ссылку на объект окна, если вы этого не сделаете, окно будет
// автоматически закрываться, когда объект JavaScript собирает мусор.
let win: BrowserWindow | null;

const mode = "dev";

function createWindow() {
    win = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadFile("../renderer/index.html");

    if (mode == "dev") {
        win.webContents.openDevTools();
    }

    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (!win) {
        createWindow();
    }
});

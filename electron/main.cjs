const { loadEnv } = require('./env-loader.cjs');
loadEnv();

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, '..', 'SeoOptimizer 4.1.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        backgroundColor: '#0f172a',
        show: false
    });

    // Load the app
    const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../dist/index.html')}`;
    mainWindow.loadURL(startUrl);

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Open DevTools in development
    if (process.env.ELECTRON_START_URL) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Create menu
    createMenu();
}

function createMenu() {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Esci',
                    accelerator: 'Alt+F4',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Modifica',
            submenu: [
                { role: 'undo', label: 'Annulla' },
                { role: 'redo', label: 'Ripeti' },
                { type: 'separator' },
                { role: 'cut', label: 'Taglia' },
                { role: 'copy', label: 'Copia' },
                { role: 'paste', label: 'Incolla' },
                { role: 'selectAll', label: 'Seleziona tutto' }
            ]
        },
        {
            label: 'Visualizza',
            submenu: [
                { role: 'reload', label: 'Ricarica' },
                { role: 'forceReload', label: 'Ricarica forzata' },
                { type: 'separator' },
                { role: 'resetZoom', label: 'Zoom normale' },
                { role: 'zoomIn', label: 'Zoom avanti' },
                { role: 'zoomOut', label: 'Zoom indietro' },
                { type: 'separator' },
                { role: 'togglefullscreen', label: 'Schermo intero' }
            ]
        },
        {
            label: 'Aiuto',
            submenu: [
                {
                    label: 'Informazioni',
                    click: async () => {
                        const { shell } = require('electron');
                        await shell.openExternal('https://groq.com/');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

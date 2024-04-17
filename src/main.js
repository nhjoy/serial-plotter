const { app, BrowserWindow, ipcMain } = require('electron');
const SerialPort = require('serialport');
const path = require('path');
const fs = require('fs');

// Holds the main window object to prevent it from being garbage collected
let mainWindow;

/**
 * Creates the main window with specified dimensions and loads the HTML file.
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // Uncomment the following line to open the Developer Tools:
  // mainWindow.webContents.openDevTools();
}

// Initializes the window once Electron is ready
app.whenReady().then(createWindow);

// Exits the application when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Recreates the window in the app when the dock icon is clicked and there are no other windows open
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * Handles toggling the serial port's open/close state.
 */
ipcMain.on('toggle-serial-port', async (event, { path, baudRate }) => {
  try {
    if (global.serialPort && global.serialPort.path === path) {
      // Close the port if it's already open
      await global.serialPort.close();
      global.serialPort = null;
      event.reply('serial-port-closed', path);
    } else {
      // Open a new serial port
      global.serialPort = new SerialPort(path, { baudRate: baudRate });

      global.serialPort.on('open', () => {
        event.reply('serial-port-opened', path);
      });

      global.serialPort.on('data', (data) => {
        mainWindow.webContents.send('serial-data', data.toString());
      });

      global.serialPort.on('close', () => {
        event.reply('serial-port-closed', path);
      });

      global.serialPort.on('error', (error) => {
        event.reply('serial-port-error', error.message);
      });
    }
  } catch (error) {
    event.reply('serial-port-error', error.message);
  }
});

/**
 * Saves data to a file.
 */
ipcMain.handle('save-data-to-file', async (event, data) => {
  const filePath = path.join(app.getPath('documents'), 'serial_data.txt');
  try {
    fs.writeFileSync(filePath, data);
    return { status: 'success', path: filePath };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
});

/**
 * Exports data to a CSV file.
 */
ipcMain.handle('export-csv', async (event, data) => {
  const filePath = path.join(app.getPath('documents'), 'data.csv');
  try {
    // Consider using a library like 'papaparse' for actual CSV formatting
    fs.writeFileSync(filePath, data);
    return { status: 'success', path: filePath };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
});

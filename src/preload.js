const { contextBridge, ipcRenderer } = require('electron');
const SerialPort = require('serialport');

// Holds references to all open serial ports to ensure they can be closed when necessary.
let openPorts = {};

contextBridge.exposeInMainWorld('electronAPI', {
    // Lists all available serial ports.
    listSerialPorts: async () => {
        return SerialPort.list();
    },
    
    // Toggles the open or closed state of the specified serial port.
    toggleSerialPort: (path, baudRate) => {
        // Checks if the port is already open; closes it if so.
        if (openPorts[path] && openPorts[path].isOpen) {
            openPorts[path].close();
            delete openPorts[path];
        } else {
            // Creates and opens a new serial port.
            const port = new SerialPort(path, { baudRate: baudRate });

            // Event listener for when the port is successfully opened.
            port.on('open', () => {
                console.log('Port opened:', path);
                ipcRenderer.send('port-opened', path);
            });

            // Event listener for when data is received from the serial port.
            port.on('data', (data) => {
                ipcRenderer.send('serial-data', data.toString());
            });

            // Event listener for when the port is closed.
            port.on('close', () => {
                console.log('Port closed:', path);
                ipcRenderer.send('port-closed', path);
            });

            // Event listener for serial port errors.
            port.on('error', (error) => {
                console.error('Serial port error:', error);
                ipcRenderer.send('serial-error', error.message);
            });

            // Stores the reference to the open port.
            openPorts[path] = port;
        }
    },
    
    // Registers a callback for when serial data is received.
    onSerialDataReceived: (callback) => {
        ipcRenderer.on('serial-data', callback);
    },
    
    // Removes all listeners for the 'serial-data' event.
    removeSerialDataListener: () => {
        ipcRenderer.removeAllListeners('serial-data');
    },
    
    // Invokes a main process function to save data to a file.
    onSaveDataToFile: async (data) => {
        return ipcRenderer.invoke('save-data-to-file', data);
    },
    
    // Registers a callback for clearing data.
    onClearData: (callback) => {
        ipcRenderer.on('clear-data', callback);
    },
    
    // Invokes a main process function to export data to CSV.
    onExportCSV: async (data) => {
        return ipcRenderer.invoke('export-csv', data);
    },
    
    // Additional APIs can be added as needed for the application.
});

// Ensures that all open serial ports are closed when the app is reloaded or closed.
window.addEventListener('beforeunload', () => {
    Object.values(openPorts).forEach(port => {
        if (port && port.isOpen) {
            port.close();
        }
    });
});

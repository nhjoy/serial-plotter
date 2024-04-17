const { contextBridge, ipcRenderer } = require('electron');
const SerialPort = require('serialport');

contextBridge.exposeInMainWorld('electronAPI', {
    listSerialPorts: async () => {
        return await SerialPort.list();
    },
    openSerialPort: (path, baudRate) => {
        // Create a new SerialPort instance
        const port = new SerialPort(path, { baudRate: baudRate });

        // Set up event listeners for the serial port here
        port.on('data', function (data) {
            // When data is received from the serial port, send it to the renderer process
            ipcRenderer.send('serial-data', data.toString());
        });

        // Error handling
        port.on('error', function(err) {
            console.log('Error: ', err.message);
        });

        return port;
    },
    closeSerialPort: (port) => {
        // Close the serial port
        port.close();
    },
    writeToSerialPort: (port, data) => {
        // Write data to the serial port
        port.write(data);
    },
    onSaveData: (callback) => {
        // Listen for the 'save-data' event from the renderer process
        ipcRenderer.on('save-data', callback);
    }
});

// Error handling for unhandled errors
process.on('uncaughtException', (error) => {
    console.error(`preload error: ${error}`);
});

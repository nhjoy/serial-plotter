# Serial Plotter

**Status: Under Development**

Serial Plotter is an Electron-based application designed to interface with serial ports and plot data in real-time. It provides an intuitive graphical user interface for connecting to various serial devices, configuring port settings, and visually monitoring incoming data.

{note: project still under}

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Setup on Linux and Windows](#setup-on-linux-and-windows)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Building the Application](#building-the-application)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites
Before setting up the Serial Plotter, ensure that you have the following prerequisites installed:
- **Node.js**: The runtime for executing the Electron application. Download and install it from [Node.js official website](https://nodejs.org/).
- **npm**: Node.js package manager, used to install Electron and other dependencies. It comes bundled with Node.js.

## Installation

### Setup on Linux and Windows
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/serial-plotter.git
   cd serial-plotter
2. **Install Electron and other dependencies:**
   ```bash
    npm install --save-dev @electron-forge/cli
    npx electron-forge import
This configures your project to use Electron Forge, which simplifies building and packaging Electron applications.

3. **Install additional packaging tools:**
   ```bash
    npm install --save-dev @electron-forge/cli
    npx electron-forge import

-   For Linux
    ```bash
    npm install --save-dev @electron-forge/maker-deb @electron-forge/maker-zip

-   for Windows
    ```bash
    npm install --save-dev @electron-forge/maker-squirrel

## Running the Application

To run the application locally on your machine:

    
    npm make

This command starts the Electron application using Electron Forge, which compiles and launches the Serial Plotter.

## Usage

Upon launching, Serial Plotter provides a user interface to:

-   Select available COM ports detected on the system.
-   Set baud rates for serial communication.
-   Start and stop data plotting.
-   Save logged data to files.
-   Export data in CSV format.

## Building the Application

To package the application for distribution:

    npm run make

This command will generate executable file

## Contributing

Contributions are welcome!
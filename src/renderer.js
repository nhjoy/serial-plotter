// Attach event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  // DOM element references
  const serialPortSelect = document.getElementById('serialPort');
  const baudRateSelect = document.getElementById('baudRate');
  const connectButton = document.getElementById('connectButton');
  const startButton = document.getElementById('startButton');
  const saveButton = document.getElementById('saveButton');
  const clearButton = document.getElementById('clearButton');
  const exportButton = document.getElementById('exportButton');
  const plotCanvas = document.getElementById('plot').getContext('2d');

  // Maintains connection and plotting states
  let isConnected = false;
  let isPlotting = false;

  // Initializes the chart with default settings
  let chart = new Chart(plotCanvas, {
    type: 'line',
    data: {
      labels: [], // Placeholder for time labels
      datasets: [{
        label: 'Serial Data',
        data: [], // Placeholder for serial data values
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1 // Smoothes the line
      }]
    },
    options: {
      scales: {
        x: {
          type: 'linear', // Defines x-axis as linear
          position: 'bottom'
        }
      }
    }
  });

  // Toggles the connection state and updates button text and styling
  function toggleConnectButton() {
    isConnected = !isConnected;
    connectButton.textContent = isConnected ? 'Disconnect' : 'Connect';
    connectButton.classList.toggle('active', isConnected);
  }

  // Toggles the plotting state and updates button text and styling
  function toggleStartButton() {
    isPlotting = !isPlotting;
    startButton.textContent = isPlotting ? 'Stop Plotting' : 'Start Plotting';
    startButton.classList.toggle('active', isPlotting);
  }

  // Event listener for connect button
  connectButton.addEventListener('click', () => {
    // Placeholder for connection logic
    toggleConnectButton();
  });

  // Event listener for start button
  startButton.addEventListener('click', () => {
    // Placeholder for plotting logic
    toggleStartButton();
  });

  // Event listener for save button
  saveButton.addEventListener('click', () => {
    // Placeholder for save data logic
  });

  // Event listener for clear button
  clearButton.addEventListener('click', () => {
    // Clears the chart data
    chart.data.labels = [];
    chart.data.datasets.forEach((dataset) => {
      dataset.data = [];
    });
    chart.update();
  });

  // Event listener for export button
  exportButton.addEventListener('click', () => {
    // Placeholder for CSV export logic
  });

  // Additional functionality to handle serial port events and chart updates should be implemented here.
});

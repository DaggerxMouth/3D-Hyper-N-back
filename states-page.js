// Constants for localStorage keys - should match the main app
const LS_HISTORY_KEY = "hyper-history";

// Stimulus types and their display names
const STIMULUS_TYPES = [
  { id: "walls", name: "Walls" },
  { id: "camera", name: "Camera" },
  { id: "face", name: "Face" },
  { id: "position", name: "Position" },
  { id: "word", name: "Word" },
  { id: "shape", name: "Shape" },
  { id: "corner", name: "Corner" },
  { id: "sound", name: "Sound" },
  { id: "color", name: "Color" }
];

// Store current dimension filter
let currentDimension = 1;

// Load history data when the page loads
document.addEventListener("DOMContentLoaded", function() {
  // Set up dimension filter event listeners
  const dimensionRadios = document.querySelectorAll("input[name='dimension']");
  dimensionRadios.forEach(radio => {
    radio.addEventListener("change", function() {
      currentDimension = parseInt(this.value);
      updateStatistics();
    });
  });

  // Select dimension 1 by default (or get from URL if available)
  const urlParams = new URLSearchParams(window.location.search);
  currentDimension = parseInt(urlParams.get("dim") || "1");
  if (isNaN(currentDimension) || currentDimension < 1 || currentDimension > 9) {
    currentDimension = 1;
  }
  
  dimensionRadios[currentDimension - 1].checked = true;
  
  // Initial load of statistics
  updateStatistics();
});

// Update all statistics based on the current dimension filter
function updateStatistics() {
  const history = loadHistory();
  if (!history) return;

  const dimensionHistory = history[currentDimension];
  if (!dimensionHistory || Object.keys(dimensionHistory).length === 0) {
    showNoDataMessage();
    return;
  }

  // Update URL to reflect current dimension
  const url = new URL(window.location);
  url.searchParams.set("dim", currentDimension);
  window.history.replaceState({}, "", url);

  // Process history data for this dimension
  const processedData = processHistoryData(dimensionHistory);
  
  // Update overall statistics
  updateOverallStats(processedData.overall);
  
  // Update individual stimulus statistics
  updateStimulusStats(processedData.byStimulus);
  
  // Update the progress chart
  updateProgressChart(dimensionHistory);
}

// Load history data from localStorage
function loadHistory() {
  const historyJson = localStorage.getItem(LS_HISTORY_KEY);
  if (!historyJson) return null;
  
  try {
    return JSON.parse(historyJson);
  } catch (e) {
    console.error("Error parsing history data:", e);
    return null;
  }
}

// Process history data to extract overall and per-stimulus statistics
function processHistoryData(dimensionHistory) {
  const result = {
    overall: {
      minN: 10,
      maxN: 0,
      avgN: 0,
      right: 0,
      missed: 0,
      wrong: 0,
      accuracy: 0,
      totalSessions: 0
    },
    byStimulus: {}
  };
  
  // Initialize stimulus stats
  STIMULUS_TYPES.forEach(type => {
    result.byStimulus[type.id] = {
      right: 0,
      missed: 0,
      wrong: 0,
      accuracy: 0,
      sessions: 0
    };
  });
  
  let nLevelTotal = 0;
  let totalPoints = 0;
  
  // Process each day's data
  for (const date in dimensionHistory) {
    const dayPoints = dimensionHistory[date];
    
    for (const point of dayPoints) {
      nLevelTotal += point.nLevel;
      totalPoints++;
      
      // Update min/max N level
      result.overall.minN = Math.min(result.overall.minN, point.nLevel);
      result.overall.maxN = Math.max(result.overall.maxN, point.nLevel);
      
      // Update overall stats
      result.overall.right += point.right || 0;
      result.overall.missed += point.missed || 0;
      result.overall.wrong += point.wrong || 0;
      result.overall.totalSessions++;
      
      // Extract stimulus-specific data from the point
      // The newer format should have detailed stimulus data
      if (point.stimulusData) {
        for (const stimId in point.stimulusData) {
          if (result.byStimulus[stimId]) {
            const stimData = point.stimulusData[stimId];
            result.byStimulus[stimId].right += stimData.right || 0;
            result.byStimulus[stimId].missed += stimData.missed || 0;
            result.byStimulus[stimId].wrong += stimData.wrong || 0;
            result.byStimulus[stimId].sessions++;
          }
        }
      } 
      // For older data, try to estimate based on naming conventions
      else {
        // Try to extract from right/wrong/missed properties that might include the stimulus name
        for (const stimType of STIMULUS_TYPES) {
          const stimId = stimType.id;
          if (point[`right${stimId.charAt(0).toUpperCase() + stimId.slice(1)}`] !== undefined) {
            result.byStimulus[stimId].right += point[`right${stimId.charAt(0).toUpperCase() + stimId.slice(1)}`] || 0;
            result.byStimulus[stimId].missed += (point.missed / 9) || 0; // Rough estimate
            result.byStimulus[stimId].wrong += point[`wrong${stimId.charAt(0).toUpperCase() + stimId.slice(1)}`] || 0;
            result.byStimulus[stimId].sessions++;
          }
        }
      }
    }
  }
  
  // Calculate averages and accuracies
  if (totalPoints > 0) {
    result.overall.avgN = nLevelTotal / totalPoints;
  }
  
  // Calculate overall accuracy
  const overallTotal = result.overall.right + result.overall.missed + result.overall.wrong;
  if (overallTotal > 0) {
    result.overall.accuracy = result.overall.right / overallTotal;
  }
  
  // Calculate per-stimulus accuracy
  for (const stimId in result.byStimulus) {
    const stimData = result.byStimulus[stimId];
    const stimTotal = stimData.right + stimData.missed + stimData.wrong;
    if (stimTotal > 0) {
      stimData.accuracy = stimData.right / stimTotal;
    }
  }
  
  return result;
}

// Update the overall statistics section
function updateOverallStats(overallStats) {
  document.getElementById("sc-min").textContent = overallStats.minN === 10 ? "-" : overallStats.minN;
  document.getElementById("sc-max").textContent = overallStats.maxN || "-";
  document.getElementById("sc-avg").textContent = overallStats.avgN ? (Math.floor(overallStats.avgN * 10) / 10).toFixed(1) : "-";
  document.getElementById("sc-right").textContent = overallStats.right || "-";
  document.getElementById("sc-missed").textContent = overallStats.missed || "-";
  document.getElementById("sc-wrong").textContent = overallStats.wrong || "-";
  document.getElementById("sc-accuracy").textContent = overallStats.accuracy ? `${(overallStats.accuracy * 100).toFixed(0)}%` : "-";
}

// Update the individual stimulus statistics
function updateStimulusStats(stimulusStats) {
  const container = document.querySelector(".stimulus-stats-container");
  container.innerHTML = "";
  
  const accuracyChartContainer = document.querySelector(".accuracy-chart");
  accuracyChartContainer.innerHTML = "";
  
  // Get all stimulus types that have data
  const activeStimuli = STIMULUS_TYPES.filter(type => 
    stimulusStats[type.id] && stimulusStats[type.id].sessions > 0
  );
  
  // If no stimulus data found, show a message
  if (activeStimuli.length === 0) {
    container.innerHTML = "<div class='no-data'>No detailed stimulus data available for this dimension.</div>";
    return;
  }
  
  // Create a card for each stimulus type
  activeStimuli.forEach(type => {
    const stats = stimulusStats[type.id];
    
    // Create the stimulus card
    const card = document.createElement("div");
    card.className = "stimulus-card";
    card.innerHTML = `
      <h3>${type.name}</h3>
      <div class="stimulus-stats">
        <div class="stat-item">
          <div class="stat-label">Right</div>
          <div class="stat-value">${stats.right}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Missed</div>
          <div class="stat-value">${stats.missed}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Wrong</div>
          <div class="stat-value">${stats.wrong}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Sessions</div>
          <div class="stat-value">${stats.sessions}</div>
        </div>
      </div>
      <div class="accuracy-value">${(stats.accuracy * 100).toFixed(0)}%</div>
    `;
    container.appendChild(card);
    
    // Add bar to the accuracy chart
    const bar = document.createElement("div");
    bar.className = "accuracy-bar";
    bar.style.height = `${stats.accuracy * 300}px`;
    bar.setAttribute("data-value", `${(stats.accuracy * 100).toFixed(0)}%`);
    bar.setAttribute("data-label", type.name);
    accuracyChartContainer.appendChild(bar);
  });
}

// Update the progress chart
function updateProgressChart(dimensionHistory) {
  const bars = document.querySelector(".bar-chart-bars");
  bars.innerHTML = "";
  
  // Process data for the chart
  const entries = Object.entries(dimensionHistory);
  
  for (const [date, points] of entries) {
    let avgNLevel = 0;
    let totalPoints = 0;
    
    for (const point of points) {
      avgNLevel += point.nLevel;
      totalPoints++;
    }
    
    if (totalPoints > 0) {
      avgNLevel = avgNLevel / totalPoints;
      
      // Create a bar for this day
      const bar = document.createElement("div");
      bar.className = "bar-chart-bar";
      bar.style.height = `${avgNLevel * 2}rem`;
      
      const label = document.createElement("div");
      label.textContent = (Math.floor(avgNLevel * 10) / 10).toFixed(1);
      
      bar.appendChild(label);
      bars.appendChild(bar);
    }
  }
  
  // If no data, show message
  if (entries.length === 0) {
    const noData = document.createElement("div");
    noData.className = "no-data";
    noData.textContent = "No progress data available for this dimension.";
    bars.appendChild(noData);
  }
}

// Show message when no data is available
function showNoDataMessage() {
  document.getElementById("sc-min").textContent = "-";
  document.getElementById("sc-max").textContent = "-";
  document.getElementById("sc-avg").textContent = "-";
  document.getElementById("sc-right").textContent = "-";
  document.getElementById("sc-missed").textContent = "-";
  document.getElementById("sc-wrong").textContent = "-";
  document.getElementById("sc-accuracy").textContent = "-";
  
  const stimulusContainer = document.querySelector(".stimulus-stats-container");
  stimulusContainer.innerHTML = "<div class='no-data'>No data available for this dimension.</div>";
  
  const accuracyChart = document.querySelector(".accuracy-chart");
  accuracyChart.innerHTML = "<div class='no-data'>No data available.</div>";
  
  const bars = document.querySelector(".bar-chart-bars");
  bars.innerHTML = "<div class='no-data'>No data available.</div>";
}

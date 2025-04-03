// If we selected shape but not corner, we need to ensure corner is selected
  if (shapeSelected && !cornerSelected) {
    // Find corner index
    const cornerIndex = stimuliTypes.findIndex(stimulus => stimulus.name === "corner");
    
    // Replace the last selected stimulus with corner
    if (cornerIndex !== -1) {
      const lastIndex = selectedIndices.pop();
      selectedIndices.push(cornerIndex);
    }
  }
  
  // Enable all selected stimuli
  selectedIndices.forEach(index => {
    const selectedStimulus = stimuliTypes[index];
    selectedStimulus.handler(null, true);
    
    // Special case for corner - enable the shape dependency
    if (selectedStimulus.name === "corner" && shapeEnableTrig) {
      shapeEnableTrig.disabled = false;
    }
  });
  
  console.log("Randomly selected stimuli:", 
    selectedIndices.map(index => stimuliTypes[index].name));
}

function getGameCycle(n) {
  let walls;
  if (wallsEnabled) {
    walls = createBlocks(wallColorsList, n);
    // Count matching walls for individual stimulus accuracy
    matchingWalls = walls.filter(block => block && block.isMatching).length;
  }
  let cameras;
  if (cameraEnabled) {
    cameras = createBlocks(points, n);
    // Count matching cameras for individual stimulus accuracy
    matchingCamera = cameras.filter(block => block && block.isMatching).length;
  }
  let faces;
  if (faceEnabled) {
    faces = createBlocks(numbers, n);
    // Count matching faces for individual stimulus accuracy
    matchingFace = faces.filter(block => block && block.isMatching).length;
  }
  let positions;
  if (positionEnabled) {
    positions = createBlocks(moves, n);
    // Count matching positions for individual stimulus accuracy
    matchingPosition = positions.filter(block => block && block.isMatching).length;
  }
  
  let words;
  if (wordEnabled) {
    words = createBlocks(wordsList, n);
    // Count matching words for individual stimulus accuracy
    matchingWord = words.filter(block => block && block.isMatching).length;
  }
  let shapes;
  if (shapeEnabled) {
    shapes = createBlocks(shapeClasses, n);
    // Count matching shapes for individual stimulus accuracy
    matchingShape = shapes.filter(block => block && block.isMatching).length;
  }
  let corners;
  if (cornerEnabled) {
    corners = createBlocks(cornersList, n);
    // Count matching corners for individual stimulus accuracy
    matchingCorner = corners.filter(block => block && block.isMatching).length;
  }
  let sounds;
  if (soundEnabled) {
    sounds = createBlocks(letters, n);
    // Count matching sounds for individual stimulus accuracy
    matchingSound = sounds.filter(block => block && block.isMatching).length;
  }
  let colors;
  if (colorEnabled) {
    colors = createBlocks(colorClasses, n);
    // Count matching colors for individual stimulus accuracy
    matchingColor = colors.filter(block => block && block.isMatching).length;
  }
  
  console.log(
    walls, cameras, faces, positions, words, shapes, corners, sounds, colors
  );
  
  let i = 0;
  return function() {
    resetBlock();
    
    if (!isRunning) {
      return;
    }
    
    let length = targetNumOfStimuli * (n + 2) + targetNumOfStimuli;
    let dimensions = 0;
    
    // End game
    if (i > length - 1) {
      let correctStimuli = 0;
      if (wallsEnabled) {
        dimensions++;
        correctStimuli += rightWalls;
      }
      if (cameraEnabled) {
        dimensions++;
        correctStimuli += rightCamera;
      }
      if (faceEnabled) {
        dimensions++;
        correctStimuli += rightFace;
      }
      if (positionEnabled) {
        dimensions++;
        correctStimuli += rightPosition;
      }
      
      if (wordEnabled) {
        dimensions++;
        correctStimuli += rightWord;
      }
      if (cornerEnabled) {
        dimensions++;
        correctStimuli += rightCorner;
        if (shapeEnabled) {
          dimensions++;
          correctStimuli += rightShape;
        }
      }
      if (soundEnabled) {
        dimensions++;
        correctStimuli += rightSound;
      }
      if (colorEnabled) {
        dimensions++;
        correctStimuli += rightColor;
      }
      let percentage = correctStimuli / matchingStimuli;
      
      let mistakes = 0;
      if (wallsEnabled) {
        mistakes += wrongWalls;
      }
      if (cameraEnabled) {
        mistakes += wrongCamera;
      }
      if (faceEnabled) {
        mistakes += wrongFace;
      }
      if (positionEnabled) {
        mistakes += wrongPosition;
      }
      
      if (wordEnabled) {
        mistakes += wrongWord;
      }
      if (cornerEnabled) {
        mistakes += wrongCorner;
        if (shapeEnabled) {
          mistakes += wrongShape;
        }
      }
      if (soundEnabled) {
        mistakes += wrongSound;
      }
      if (colorEnabled) {
        mistakes += wrongColor;
      };
      
      const missed = matchingStimuli - correctStimuli;
      
      console.log("matchingStimuli", matchingStimuli);
      console.log("correctStimuli", correctStimuli);
      console.log("missed", missed);
      console.log("mistakes", mistakes);
      console.log("dimensions", dimensions);
      
      // Calculate accuracy
      const accuracy = calculateAccuracy(correctStimuli, missed, mistakes);
      console.log("Accuracy:", (accuracy * 100).toFixed(2) + "%");
      
      // Create stimuli data object to store individual stimuli performance
      const stimuliData = {
        walls: {
          enabled: wallsEnabled,
          right: rightWalls,
          wrong: wrongWalls,
          matching: matchingWalls
        },
        camera: {
          enabled: cameraEnabled,
          right: rightCamera,
          wrong: wrongCamera,
          matching: matchingCamera
        },
        face: {
          enabled: faceEnabled,
          right: rightFace,
          wrong: wrongFace,
          matching: matchingFace
        },
        position: {
          enabled: positionEnabled,
          right: rightPosition,
          wrong: wrongPosition,
          matching: matchingPosition
        },
        word: {
          enabled: wordEnabled,
          right: rightWord,
          wrong: wrongWord,
          matching: matchingWord
        },
        shape: {
          enabled: shapeEnabled,
          right: rightShape,
          wrong: wrongShape,
          matching: matchingShape
        },
        corner: {
          enabled: cornerEnabled,
          right: rightCorner,
          wrong: wrongCorner,
          matching: matchingCorner
        },
        sound: {
          enabled: soundEnabled,
          right: rightSound,
          wrong: wrongSound,
          matching: matchingSound
        },
        color: {
          enabled: colorEnabled,
          right: rightColor,
          wrong: wrongColor,
          matching: matchingColor
        }
      };
      
      stop(); // This resets stuff (matchingStimuli etc...)

      // Update recap dialog with results
      if (recapDialogContent) {
        const resDim = document.querySelector("#res-dim");
        const resRight = document.querySelector("#sc-res-right");
        const resMissed = document.querySelector("#sc-res-missed");
        const resWrong = document.querySelector("#sc-res-wrong");
        const lvlRes = document.querySelectorAll("[class^='lvl-res']");
        
        if (lvlRes.length) {
          [...lvlRes].forEach(el => el.style.display = "none");
        }

        if (resDim) resDim.innerHTML = dimensions + "D";
        if (resRight) resRight.innerHTML = correctStimuli;
        if (resMissed) resMissed.innerHTML = missed;
        if (resWrong) resWrong.innerHTML = mistakes;
        
        // Update accuracy in the recap dialog if the element exists
        const accuracyElement = document.querySelector("#sc-res-accuracy");
        if (accuracyElement) {
          accuracyElement.innerHTML = (accuracy * 100).toFixed(0) + "%";
        }

        const levelUpCond = (percentage >= nextLevelThreshold) && (mistakes <= maxAllowedMistakes) && nLevel < 9;
        const levelDownCond = ((percentage < prevLevelThreshold) || (mistakes > maxAllowedMistakes)) && nLevel > 1;

        localStorage.setItem("last-dim", dimensions);
        const historyPoint = {
          nLevel,
          right: correctStimuli,
          missed,
          wrong: mistakes,
          accuracy: accuracy,
          outcome: 0,
          stimuliData: stimuliData // Add the stimuli data to history
        };

        if (levelUpCond) {
          historyPoint.outcome = 1;
          nLevelInputHandler(null, nLevel + 1);
          const lvlResMove = document.querySelector(".lvl-res-move");
          const lvlBefore = document.querySelector(".lvl-before");
          const lvlAfter = document.querySelector(".lvl-after");
          
          if (lvlResMove) lvlResMove.style.display = "block";
          if (lvlBefore) lvlBefore.innerHTML = nLevel - 1;
          if (lvlAfter) lvlAfter.innerHTML = nLevel;
        } else if (levelDownCond) {
          historyPoint.outcome = -1;
          nLevelInputHandler(null, nLevel - 1);
          const lvlResMove = document.querySelector(".lvl-res-move");
          const lvlBefore = document.querySelector(".lvl-before");
          const lvlAfter = document.querySelector(".lvl-after");
          
          if (lvlResMove) lvlResMove.style.display = "block";
          if (lvlBefore) lvlBefore.innerHTML = nLevel + 1;
          if (lvlAfter) lvlAfter.innerHTML = nLevel;
        } else {
          const lvlResStay = document.querySelector(".lvl-res-stay");
          const lvlStays = document.querySelector(".lvl-stays");
          
          if (lvlResStay) lvlResStay.style.display = "block";
          if (lvlStays) lvlStays.innerHTML = nLevel;
        }
        
        recapDialogContent.parentElement.show();
      }
      
      const datestamp = new Date().toLocaleDateString("sv");
      history[dimensions][datestamp] = history[dimensions][datestamp] || [];
      history[dimensions][datestamp].push(historyPoint);
      console.log("history", history);
      
      saveSettings();
      saveHistory();
      return;
    }
    
    // Count stimulus
    stimuliCount++;
    
    // Animating stimuli
    if (wallsEnabled) {
      currWalls = walls[i];
      if (floors) {
        floors.forEach(floor =>
          setFloorBackground(
            floor,
            sceneDimmer,
            tileAHexColor,
            currWalls.symbol
          )
        );
      }
    }
    if (cameraEnabled) {
      currCamera = cameras[i];
      let [cx, cy] = currCamera.symbol.split("&");
      rotateCamera(cx, cy);
    }
    if (faceEnabled && faceEls) {
      currFace = faces[i];
      if (colorEnabled) {
        currColor = colors[i];
        wow(faceEls[currFace.symbol - 1], currColor.symbol, baseDelay - 500);
      } else {
        wow(faceEls[currFace.symbol - 1], "col-a", baseDelay - 500);
      }
    } else if (colorEnabled && faceEls) {
      currColor = colors[i];
      wow(faceEls[0], currColor.symbol, baseDelay - 500);
    }
    if (positionEnabled && cube) {
      currPosition = positions[i];
      move(cube, currPosition.symbol);
    }
    
    if (wordEnabled) {
      currWord = words[i];
      writeWord(currWord.symbol);
    }
    if (cornerEnabled && innerCube) {
      currCorner = corners[i];
      move(innerCube, currCorner.symbol);
      
      if (shapeEnabled && shape) {
        currShape = shapes[i];
        wow(shape, currShape.symbol, baseDelay - 700);
      }
    }
    if (soundEnabled) {
      currSound = sounds[i];
      speak(currSound.symbol);
    }
    
    // Increase block index
    i++;
  };
}

function play() {
  if (isRunning) {
    return;
  }

  document.querySelectorAll("dialog").forEach(d => d.close());
  closeOptions();
  
  // Check if randomize is enabled, if so select random stimuli
  if (randomizeEnabled) {
    selectRandomStimuli(numStimuliSelect);
  }
  
  isRunning = true;
  
  speak("Start.");
  const stopBtn = document.querySelector(".stop");
  const playBtn = document.querySelector(".play");
  
  if (stopBtn) stopBtn.classList.remove("active");
  if (playBtn) playBtn.classList.add("active");

  intervals.push(
    setInterval(getGameCycle(nLevel), baseDelay)
  );
}

function stop() {
  if (!isRunning) {
    return;
  }
  
  resetPoints();
  resetBlock();
  resetIntervals();
  
  isRunning = false;
  
  speak("Stop.");
  const stopBtn = document.querySelector(".stop");
  const playBtn = document.querySelector(".play");
  
  if (stopBtn) stopBtn.classList.add("active");
  if (playBtn) playBtn.classList.remove("active");
}

function checkHandler(stimulus) {
  let curr;
  let button;
  let enable;
  
  switch (stimulus) {
    case "play": {
      play();
      return;
    }
    case "stop": {
      stop();
      return;
    }
    case "options": {
      toggleOptions();
      return;
    }
    case "stats": {
      toggleStats();
      return;
    }
    case "walls": {
      curr = currWalls;
      button = checkWallsBtn;
      enable = enableWallsCheck;
      break;
    }
    case "camera": {
      curr = currCamera;
      button = checkCameraBtn;
      enable = enableCameraCheck;
      break;
    }
    case "face": {
      curr = currFace;
      button = checkFaceBtn;
      enable = enableFaceCheck;
      break;
    }
    case "position": {
      curr = currPosition;
      button = checkPositionBtn;
      enable = enablePositionCheck;
      break;
    }
    case "word": {
      curr = currWord;
      button = checkWordBtn;
      enable = enableWordCheck;
      break;
    }
    case "shape": {
      curr = currShape;
      button = checkShapeBtn;
      enable = enableShapeCheck;
      break;
    }
    case "corner": {
      curr = currCorner;
      button = checkCornerBtn;
      enable = enableCornerCheck;
      break;
    }
    case "sound": {
      curr = currSound;
      button = checkSoundBtn;
      enable = enableSoundCheck;
      break;
    }
    case "color": {
      curr = currColor;
      button = checkColorBtn;
      enable = enableColorCheck;
      break;
    }
  }
  
  if (!curr || !enable || !button) {
    return;
  }

  console.log(stimulus, curr, button, enable);
  
  switch (stimulus) {
    case "walls": {
      enableWallsCheck = false;
      if (curr.isMatching) {
        rightWalls++;
        button.classList.add("right");
      } else {
        wrongWalls++;
        button.classList.add("wrong");
      }
      break;
    }
    case "camera": {
      enableCameraCheck = false;
      if (curr.isMatching) {
        rightCamera++;
        button.classList.add("right");
      } else {
        wrongCamera++;
        button.classList.add("wrong");
      }
      break;
    }
    case "face": {
      enableFaceCheck = false;
      if (curr.isMatching) {
        rightFace++;
        button.classList.add("right");
      } else {
        wrongFace++;
        button.classList.add("wrong");
      }
      break;
    }
    case "position": {
      enablePositionCheck = false;
      if (curr.isMatching) {
        rightPosition++;
        button.classList.add("right");
      } else {
        wrongPosition++;
        button.classList.add("wrong");
      }
      break;
    }
    case "word": {
      enableWordCheck = false;
      if (curr.isMatching) {
        rightWord++;
        button.classList.add("right");
      } else {
        wrongWord++;
        button.classList.add("wrong");
      }
      break;
    }
    case "shape": {
      enableShapeCheck = false;
      if (curr.isMatching) {
        rightShape++;
        button.classList.add("right");
      } else {
        wrongShape++;
        button.classList.add("wrong");
      }
      break;
    }
    case "corner": {
      enableCornerCheck = false;
      if (curr.isMatching) {
        rightCorner++;
        button.classList.add("right");
      } else {
        wrongCorner++;
        button.classList.add("wrong");
      }
      break;
    }
    case "sound": {
      enableSoundCheck = false;
      if (curr.isMatching) {
        rightSound++;
        button.classList.add("right");
      } else {
        wrongSound++;
        button.classList.add("wrong");
      }
      break;
    }
    case "color": {
      enableColorCheck = false;
      if (curr.isMatching) {
        rightColor++;
        button.classList.add("right");
      } else {
        wrongColor++;
        button.classList.add("wrong");
      }
      break;
    }
  }
}

// Function to calculate accuracy based on correct, missed, and wrong responses
function calculateAccuracy(correct, missed, wrong) {
  const total = correct + missed + wrong;
  if (total === 0) return 0;
  return correct / total;
}

// Initialize application after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize DOM references
  initDOM();
  
  // Set up event listeners
  const dimensionRadios = document.querySelectorAll("input[name='dimension']");
  if (dimensionRadios.length) {
    dimensionRadios.forEach(el => {
      el.addEventListener("click", function(evt) {
        const dim = evt.target.value;
        toggleStats(dim);
      });
    });
  }

  const senseButtons = ["walls", "camera", "face", "position", "word", "shape", "corner", "sound", "color"];
  senseButtons.forEach(sense => {
    const button = document.querySelector(".check-" + sense);
    if (button) {
      button.addEventListener("click", () => checkHandler(sense));
      button.addEventListener("touchstart", () => checkHandler(sense));
    }
  });

  document.addEventListener("keypress", evt => {
    const match = Object.entries(keyBindings).find(([stim, key]) => key === evt.key);
    if (match) {
      checkHandler(match[0].toLowerCase());
    }
  });

  document.addEventListener("keydown", evt => {
    if (evt.key === "Escape") {
      document.querySelectorAll("dialog").forEach(d => d.close());
      closeOptions();
      stop();
    }
  });

  // Add event listener for numStimuliSelectInput
  if (numStimuliSelectInput) {
    numStimuliSelectInput.addEventListener("change", numStimuliSelectInputHandler);
  }

  // Initialize the application
  loadBindings();
  loadSettings();
  loadHistory();
});  let avgNLevel = 0;
  let minNLevel = 10;
  let maxNLevel = 0;
  let right = 0;
  let missed = 0;
  let wrong = 0;
  let totalAccuracy = 0;
  let pointsCount = 0;
  
  // Initialize stimuli totals
  let stimuliTotals = {
    walls: { right: 0, wrong: 0, matching: 0, missed: 0, present: false },
    camera: { right: 0, wrong: 0, matching: 0, missed: 0, present: false },
    face: { right: 0, wrong: 0, matching: 0, missed: 0, present: false },
    position: { right: 0, wrong: 0, matching: 0, missed: 0, present: false },
    word: { right: 0, wrong: 0, matching: 0, missed: 0, present: false },
    shape: { right: 0, wrong: 0, matching: 0, missed: 0, present: false },
    corner: { right: 0, wrong: 0, matching: 0, missed: 0, present: false },
    sound: { right: 0, wrong: 0, matching: 0, missed: 0, present: false },
    color: { right: 0, wrong: 0, matching: 0, missed: 0, present: false }
  };
  
  // For tracking historical data for the chart
  let chartData = {
    labels: [],
    datasets: []
  };
  
  // Create empty datasets for the chart (we'll populate them if the stimulus was used)
  Object.keys(stimuliTotals).forEach(key => {
    chartData.datasets.push({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      data: [],
      borderColor: stimuliChartColors[key],
      backgroundColor: stimuliChartColors[key] + '33', // Add alpha for fill
      fill: false,
      tension: 0.3
    });
  });
  
  const entries = Object.entries(_history);
  
  // Sort entries by date
  entries.sort((a, b) => new Date(a[0]) - new Date(b[0]));
  
  // Process entries for stats and chart data
  for (const [date, points] of entries) {
    let _avgNLevel = 0;
    let _minNLevel = 10;
    let _maxNLevel = 0;
    
    // For the chart, we need a formatted date label
    const dateObj = new Date(date);
    const dateLabel = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    chartData.labels.push(dateLabel);
    
    // Create temporary storage for accuracy values on this date
    const dateAccuracies = {};
    
    for (const point of points) {
      _avgNLevel += point.nLevel;
      _minNLevel = Math.min(_minNLevel, point.nLevel);
      _maxNLevel = Math.max(_maxNLevel, point.nLevel);
      minNLevel = Math.min(minNLevel, _minNLevel);
      maxNLevel = Math.max(maxNLevel, _maxNLevel);
      right += point.right;
      missed += point.missed;
      wrong += point.wrong;
      pointsCount++;
      
      // If point has accuracy, use it, otherwise calculate it
      if (point.accuracy !== undefined) {
        totalAccuracy += point.accuracy;
      } else {
        totalAccuracy += calculateAccuracy(point.right, point.missed, point.wrong);
      }
      
      // Aggregate individual stimuli accuracy data if it exists
      if (point.stimuliData) {
        Object.entries(point.stimuliData).forEach(([key, data]) => {
          if (data.enabled) {
            stimuliTotals[key].present = true;
            stimuliTotals[key].right += data.right || 0;
            stimuliTotals[key].wrong += data.wrong || 0;
            stimuliTotals[key].matching += data.matching || 0;
            // Calculate missed for this stimulus
            const missed = (data.matching || 0) - (data.right || 0);
            stimuliTotals[key].missed += missed;
            
            // Calculate accuracy for the chart
            const accuracy = data.matching > 0 ? data.right / data.matching : 0;
            if (!dateAccuracies[key]) dateAccuracies[key] = [];
            dateAccuracies[key].push(accuracy);
          }
        });
      }
    }
    
    // Calculate average accuracy for each stimulus on this date
    Object.entries(dateAccuracies).forEach(([key, accuracies]) => {
      if (accuracies.length > 0) {
        const avgAccuracy = accuracies.reduce((sum, val) => sum + val, 0) / accuracies.length;
        // Find the dataset for this stimulus type
        const datasetIndex = chartData.datasets.findIndex(dataset => 
          dataset.label.toLowerCase() === key.toLowerCase());
        if (datasetIndex !== -1) {
          chartData.datasets[datasetIndex].data.push(avgAccuracy * 100); // Convert to percentage
        }
      }
    });
    
    // Add null values for any stimulus not present on this date (for chart continuity)
    chartData.datasets.forEach(dataset => {
      const key = dataset.label.toLowerCase();
      if (!dateAccuracies[key]) {
        dataset.data.push(null);
      }
    });
    
    _avgNLevel = _avgNLevel / points.length;
    avgNLevel += _avgNLevel;
    if (bars) {
      bars.appendChild(getBar(toOneDecimal(_avgNLevel)));
    }
  }
  avgNLevel = avgNLevel / (entries.length || 1); // Avoid division by zero
  
  const minElement = document.querySelector("#sc-min");
  const avgElement = document.querySelector("#sc-avg");
  const maxElement = document.querySelector("#sc-max");
  const rightElement = document.querySelector("#sc-right");
  const missedElement = document.querySelector("#sc-missed");
  const wrongElement = document.querySelector("#sc-wrong");
  
  if (avgElement) avgElement.innerHTML = toOneDecimal(avgNLevel) || "-";
  if (minElement) minElement.innerHTML = (minNLevel === 10) ? "-" : minNLevel;
  if (maxElement) maxElement.innerHTML = maxNLevel || "-";
  if (rightElement) rightElement.innerHTML = right || "-";
  if (missedElement) missedElement.innerHTML = missed || "-";
  if (wrongElement) wrongElement.innerHTML = wrong || "-";
  
  // Update accuracy in the stats dialog
  const accuracyElement = document.querySelector("#sc-accuracy");
  if (accuracyElement && pointsCount > 0) {
    const avgAccuracy = totalAccuracy / pointsCount;
    accuracyElement.innerHTML = (avgAccuracy * 100).toFixed(0) + "%";
  }
  
  // Update individual stimuli accuracy display
  updateStimuliAccuracyDisplay(stimuliTotals);
  
  // Create the chart if there's data to display
  createStimuliChart(chartData);
  
  // Store the last displayed dimension
  localStorage.setItem("last-dim", dim);
}

// Function to create the stimuli accuracy chart
function createStimuliChart(chartData) {
  // Safely attempt to create the chart
  try {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js is not available');
      return;
    }
    
    // Get the canvas context
    const canvas = document.getElementById('stimuli-chart');
    if (!canvas) {
      console.warn('Chart canvas element not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Could not get canvas context');
      return;
    }
    
    // Destroy previous chart if it exists
    if (stimuliChart) {
      stimuliChart.destroy();
    }
    
    // Filter out datasets with no data
    const filteredDatasets = chartData.datasets.filter(dataset => 
      dataset.data.some(value => value !== null)
    );
    
    // Only create chart if we have labels and data
    if (chartData.labels.length === 0 || filteredDatasets.length === 0) {
      console.log('No data available for chart');
      return;
    }
    
    // Create the new chart
    stimuliChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: filteredDatasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Accuracy (%)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'rgba(255, 255, 255, 0.7)',
              boxWidth: 15,
              usePointStyle: true
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        }
      }
    });
    
  } catch (error) {
    console.error('Error creating chart:', error);
  }
}

// Function to update the stimuli accuracy display with detailed stats
function updateStimuliAccuracyDisplay(totals) {
  // Hide all items first
  document.querySelectorAll('.stimuli-accuracy-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // For each stimulus type, calculate and display accuracy if present
  Object.entries(totals).forEach(([key, data]) => {
    const itemElement = document.getElementById(`${key}-accuracy-item`);
    const valueElement = document.getElementById(`${key}-accuracy`);
    const rightCountElement = document.getElementById(`${key}-right-count`);
    const missedCountElement = document.getElementById(`${key}-missed-count`);
    const wrongCountElement = document.getElementById(`${key}-wrong-count`);
    
    if (data.present && itemElement && valueElement) {
      // Calculate accuracy
      const total = data.matching;
      const accuracy = total > 0 ? (data.right / total) * 100 : 0;
      
      // Update accuracy display
      valueElement.textContent = accuracy.toFixed(0) + "%";
      
      // Update detailed counts
      if (rightCountElement) rightCountElement.textContent = data.right;
      if (missedCountElement) missedCountElement.textContent = data.missed;
      if (wrongCountElement) wrongCountElement.textContent = data.wrong;
      
      // Show this item
      itemElement.classList.add('active');
    }
  });
}

function toOneDecimal(n) {
  return Math.floor(n * 10) / 10;
}

function random(iterable) {
  return iterable[
    Math.floor(
      Math.random() * iterable.length
    )
  ];
}

// Function to add demo data for visualization purposes
function addDemoHistoryData() {
  const today = new Date().toLocaleDateString("sv");
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("sv");
  const threeDaysAgo = new Date(Date.now() - 3 * 86400000).toLocaleDateString("sv");
  const weekAgo = new Date(Date.now() - 7 * 86400000).toLocaleDateString("sv");
  
  // Add demo data for 3D over multiple days
  history[3][weekAgo] = [{
    nLevel: 2,
    right: 15,
    missed: 7,
    wrong: 2,
    accuracy: 0.63,
    outcome: 1,
    stimuliData: {
      walls: {
        enabled: true,
        right: 4,
        wrong: 1,
        matching: 8
      },
      camera: {
        enabled: true,
        right: 5,
        wrong: 0,
        matching: 8
      },
      face: {
        enabled: true,
        right: 6,
        wrong: 1,
        matching: 9
      },
      position: {
        enabled: false
      },
      word: {
        enabled: false
      },
      shape: {
        enabled: false
      },
      corner: {
        enabled: false
      },
      sound: {
        enabled: false
      },
      color: {
        enabled: false
      }
    }
  }];
  
  history[3][threeDaysAgo] = [{
    nLevel: 2,
    right: 16,
    missed: 6,
    wrong: 2,
    accuracy: 0.67,
    outcome: 1,
    stimuliData: {
      walls: {
        enabled: true,
        right: 5,
        wrong: 1,
        matching: 8
      },
      camera: {
        enabled: true,
        right: 6,
        wrong: 0,
        matching: 8
      },
      face: {
        enabled: true,
        right: 5,
        wrong: 1,
        matching: 9
      },
      position: {
        enabled: false
      },
      word: {
        enabled: false
      },
      shape: {
        enabled: false
      },
      corner: {
        enabled: false
      },
      sound: {
        enabled: false
      },
      color: {
        enabled: false
      }
    }
  }];
  
  history[3][yesterday] = [{
    nLevel: 3,
    right: 18,
    missed: 5,
    wrong: 3,
    accuracy: 0.69,
    outcome: 0,
    stimuliData: {
      walls: {
        enabled: true,
        right: 6,
        wrong: 1,
        matching: 8
      },
      camera: {
        enabled: true,
        right: 7,
        wrong: 1,
        matching: 9
      },
      face: {
        enabled: true,
        right: 5,
        wrong: 1,
        matching: 9
      },
      position: {
        enabled: false
      },
      word: {
        enabled: false
      },
      shape: {
        enabled: false
      },
      corner: {
        enabled: false
      },
      sound: {
        enabled: false
      },
      color: {
        enabled: false
      }
    }
  }];
  
  history[3][today] = [{
    nLevel: 3,
    right: 20,
    missed: 4,
    wrong: 2,
    accuracy: 0.77,
    outcome: 1,
    stimuliData: {
      walls: {
        enabled: true,
        right: 7,
        wrong: 0,
        matching: 8
      },
      camera: {
        enabled: true,
        right: 7,
        wrong: 1,
        matching: 9
      },
      face: {
        enabled: true,
        right: 6,
        wrong: 1,
        matching: 9
      },
      position: {
        enabled: false
      },
      word: {
        enabled: false
      },
      shape: {
        enabled: false
      },
      corner: {
        enabled: false
      },
      sound: {
        enabled: false
      },
      color: {
        enabled: false
      }
    }
  }];
  
  // Add demo data for 4D
  history[4][threeDaysAgo] = [{
    nLevel: 1,
    right: 22,
    missed: 8,
    wrong: 3,
    accuracy: 0.67,
    outcome: 1,
    stimuliData: {
      walls: {
        enabled: true,
        right: 6,
        wrong: 1,
        matching: 8
      },
      camera: {
        enabled: true,
        right: 5,
        wrong: 1,
        matching: 8
      },
      face: {
        enabled: true,
        right: 5,
        wrong: 0,
        matching: 8
      },
      position: {
        enabled: true,
        right: 6,
        wrong: 1,
        matching: 8
      },
      word: {
        enabled: false
      },
      shape: {
        enabled: false
      },
      corner: {
        enabled: false
      },
      sound: {
        enabled: false
      },
      color: {
        enabled: false
      }
    }
  }];
  
  history[4][yesterday] = [{
    nLevel: 2,
    right: 24,
    missed: 6,
    wrong: 2,
    accuracy: 0.75,
    outcome: 0,
    stimuliData: {
      walls: {
        enabled: true,
        right: 7,
        wrong: 0,
        matching: 8
      },
      camera: {
        enabled: true,
        right: 6,
        wrong: 1,
        matching: 8
      },
      face: {
        enabled: true,
        right: 5,
        wrong: 1,
        matching: 8
      },
      position: {
        enabled: true,
        right: 6,
        wrong: 0,
        matching: 8
      },
      word: {
        enabled: false
      },
      shape: {
        enabled: false
      },
      corner: {
        enabled: false
      },
      sound: {
        enabled: false
      },
      color: {
        enabled: false
      }
    }
  }];
  
  history[4][today] = [{
    nLevel: 2,
    right: 26,
    missed: 4,
    wrong: 2,
    accuracy: 0.81,
    outcome: 1,
    stimuliData: {
      walls: {
        enabled: true,
        right: 7,
        wrong: 0,
        matching: 8
      },
      camera: {
        enabled: true,
        right: 7,
        wrong: 1,
        matching: 8
      },
      face: {
        enabled: true,
        right: 6,
        wrong: 0,
        matching: 8
      },
      position: {
        enabled: true,
        right: 6,
        wrong: 1,
        matching: 8
      },
      word: {
        enabled: false
      },
      shape: {
        enabled: false
      },
      corner: {
        enabled: false
      },
      sound: {
        enabled: false
      },
      color: {
        enabled: false
      }
    }
  }];
  
  // Add demo data for 5D
  history[5][yesterday] = [{
    nLevel: 1,
    right: 20,
    missed: 12,
    wrong: 8,
    accuracy: 0.5,
    outcome: 0,
    stimuliData: {
      walls: {
        enabled: true,
        right: 4,
        wrong: 2,
        matching: 8
      },
      camera: {
        enabled: true,
        right: 4,
        wrong: 1,
        matching: 8
      },
      face: {
        enabled: true,
        right: 4,
        wrong: 2,
        matching: 8
      },
      position: {
        enabled: true,
        right: 4,
        wrong: 1,
        matching: 8
      },
      word: {
        enabled: true,
        right: 4,
        wrong: 2,
        matching: 8
      },
      shape: {
        enabled: false
      },
      corner: {
        enabled: false
      },
      sound: {
        enabled: false
      },
      color: {
        enabled: false
      }
    }
  }];
  
  history[5][today] = [{
    nLevel: 1,
    right: 25,
    missed: 10,
    wrong: 5,
    accuracy: 0.625,
    outcome: 1,
    stimuliData: {
      walls: {
        enabled: true,
        right: 5,
        wrong: 1,
        matching: 8
      },
      camera: {
        enabled: true,
        right: 6,
        wrong: 1,
        matching: 8
      },
      face: {
        enabled: true,
        right: 4,
        wrong: 1,
        matching: 8
      },
      position: {
        enabled: true,
        right: 5,
        wrong: 1,
        matching: 8
      },
      word: {
        enabled: true,
        right: 5,
        wrong: 1,
        matching: 8
      },
      shape: {
        enabled: false
      },
      corner: {
        enabled: false
      },
      sound: {
        enabled: false
      },
      color: {
        enabled: false
      }
    }
  }];
  
  saveHistory(); // Save the demo data
}

// Create the blocks
function createBlocks(symbols, n) {
  // I don't know how many matching stimuli will be generated in the end
  // But I'm sure they are more than stimuli
  let blocks = Array(
    targetNumOfStimuli * (n + 2) + targetNumOfStimuli
  ).fill(null);
  // Place stimuli
  for (let i = 0; i < targetNumOfStimuli; i++) {
    // Pick a letter
    let symbol = random(symbols);
    // Pick a spot
    let rnd = Math.floor(Math.random() * (blocks.length - n));
    while (blocks[rnd] || blocks[rnd - n] || blocks[rnd + n]) {
      rnd = Math.floor(Math.random() * (blocks.length - n - 1));
    }
    // Put the signal
    blocks[rnd] = {
      isMatching: undefined, // I'll have to figure out if it's matching
      symbol: symbol
    };
    blocks[rnd + n] = {
      isMatching: true,
      symbol: symbol
    };
    matchingStimuli++;
  }
  // Place noise
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] && blocks[i].isMatching) {
      continue;
    }
    let prev = blocks[i - n];
    let next = blocks[i + n];
    if (blocks[i] && blocks[i].isMatching === undefined) {
      if (prev && prev.symbol === blocks[i].symbol) {
        blocks[i].isMatching = true;
        matchingStimuli++;
      } else {
        blocks[i].isMatching = false;
      }
      continue;
    }
    // Pick noise
    let noise = random(symbols);
    // Place noise
    if (prev && prev.symbol === noise) {
      blocks[i] = {
        isMatching: true,
        symbol: noise
      };
      matchingStimuli++;
    } else {
      blocks[i] = {
        isMatching: false,
        symbol: noise
      };
    }
    if (next && next.symbol === noise) {
      next.isMatching = true;
      matchingStimuli++;
    }
  }
  console.log("Matching stimuli", matchingStimuli);
  return blocks;
}

function resetPoints() {
  matchingStimuli = 0;
  
  // Reset counters for individual stimuli
  matchingWalls = 0;
  matchingCamera = 0;
  matchingFace = 0;
  matchingPosition = 0;
  matchingWord = 0;
  matchingShape = 0;
  matchingCorner = 0;
  matchingSound = 0;
  matchingColor = 0;
  
  rightWalls = 0;
  rightCamera = 0;
  rightFace = 0;
  rightPosition = 0;
  
  rightWord = 0;
  rightShape = 0;
  rightCorner = 0;
  rightSound = 0;
  rightColor = 0;
  
  wrongWalls = 0;
  wrongCamera = 0;
  wrongFace = 0;
  wrongPosition = 0;
  
  wrongWord = 0;
  wrongShape = 0;
  wrongCorner = 0;
  wrongSound = 0;
  wrongColor = 0;
  
  if (cube && innerCube) {
    move(cube, initialCubePosition);
    move(innerCube, initialInnerCubePosition);
  }
  
  rotateCamera(-40, -45);
  
  if (floors) {
    floors.forEach(floor =>
      setFloorBackground(
        floor,
        sceneDimmer,
        tileAHexColor,
        tileBHexColor
      )
    );
  }
}

function resetBlock() {
  enableWallsCheck = true;
  enableCameraCheck = true;
  enableFaceCheck = true;
  enablePositionCheck = true;
  
  enableWordCheck = true;
  enableShapeCheck = true;
  enableCornerCheck = true;
  enableSoundCheck = true;
  enableColorCheck = true;
  
  currWalls = null;
  currCamera = null;
  currFace = null;
  currPosition = null;
  
  currWord = null;
  currShape = null;
  currCorner = null;
  currSound = null;
  currColor = null;
  
  if (checkWallsBtn) checkWallsBtn.classList.remove("right", "wrong");
  if (checkCameraBtn) checkCameraBtn.classList.remove("right", "wrong");
  if (checkFaceBtn) checkFaceBtn.classList.remove("right", "wrong");
  if (checkPositionBtn) checkPositionBtn.classList.remove("right", "wrong");
  
  if (checkWordBtn) checkWordBtn.classList.remove("right", "wrong");
  if (checkShapeBtn) checkShapeBtn.classList.remove("right", "wrong");
  if (checkCornerBtn) checkCornerBtn.classList.remove("right", "wrong");
  if (checkSoundBtn) checkSoundBtn.classList.remove("right", "wrong");
  if (checkColorBtn) checkColorBtn.classList.remove("right", "wrong");
}

function resetIntervals() {
  intervals.forEach(interval => 
    clearInterval(interval)
  );
}

function rotateCamera(cx, cy) {
  if (scene && shape) {
    scene.style.transform = `rotateX(${cx}deg) rotateY(${cy}deg)`;
    shape.style.transform = `translate(-50%, -50%) rotateY(${-cy}deg) rotateX(${-cx}deg)`;
  }
}

function move(el, currPosString) {
  if (el) {
    el.style.transform = `translate3d(${currPosString})`;
  }
}

function wow(htmlElement, cssClass, delay) {
  if (htmlElement) {
    htmlElement.classList.add(cssClass);
    setTimeout(() => 
      htmlElement.classList.remove(cssClass)
    , delay);
  }
}

function speak(text) {
  if (!window.speechSynthesis) {
    console.warn('Speech synthesis not available');
    return null;
  }
  
  try {
    let utter = new SpeechSynthesisUtterance();
    utter.lang = 'en-US';
    utter.text = text;
    speechSynthesis.speak(utter);
    return utter;
  } catch (e) {
    console.error('Error using speech synthesis:', e);
    return null;
  }
}

function writeWord(word) {
  if (wallWords) {
    wallWords.forEach(wall => {
      wall.innerText = word;
      wow(wall, "text-white", baseDelay - 300);
    });
  }
}

// Function to randomly select a variable number of stimuli
function selectRandomStimuli(numStimuli = 2) {
  // Define all available stimuli types
  const stimuliTypes = [
    { name: "walls", handler: wallsEnableTrigHandler },
    { name: "camera", handler: cameraEnableTrigHandler },
    { name: "face", handler: faceEnableTrigHandler },
    { name: "position", handler: positionEnableTrigHandler },
    { name: "word", handler: wordEnableTrigHandler },
    { name: "shape", handler: shapeEnableTrigHandler },
    { name: "corner", handler: cornerEnableTrigHandler },
    { name: "sound", handler: soundEnableTrigHandler },
    { name: "color", handler: colorEnableTrigHandler }
  ];
  
  // Validate numStimuli - ensure it's between 1 and the maximum available
  numStimuli = Math.min(Math.max(numStimuli, 1), stimuliTypes.length);
  
  // First, disable all stimuli
  stimuliTypes.forEach(stimulus => {
    stimulus.handler(null, false);
  });
  
  // Handle the special case for shape and corner dependency
  let cornerSelected = false;
  let shapeSelected = false;
  
  // Randomly select numStimuli different stimuli
  const selectedIndices = [];
  while (selectedIndices.length < numStimuli) {
    const randomIndex = Math.floor(Math.random() * stimuliTypes.length);
    
    // Skip if already selected
    if (selectedIndices.includes(randomIndex)) {
      continue;
    }
    
    const selectedStimulus = stimuliTypes[randomIndex];
    
    // Special case for shape - it depends on corner being enabled
    if (selectedStimulus.name === "shape") {
      if (!cornerSelected) {
        // If corner is not yet selected, we need to make sure it gets selected
        if (selectedIndices.length >= numStimuli - 1) {
          // If we only have one spot left, skip shape for now
          continue;
        }
        shapeSelected = true;
      }
    }
    
    // Track if corner is selected
    if (selectedStimulus.name === "corner") {
      cornerSelected = true;
    }
    
    // Add this stimulus to our selection
    selectedIndices.push(randomIndex);
  }
  
  // If we selected shape but not corner, we need to ensure corner is selected
  if (shapeSelected && !cornerSelected) {
    // Find corner index
    const cornerIndex = stimuliTypes.findIndex(stimulus => stimulus.name === "corner");
    
    // Replace the lastconst moves = [
  "-3.5em, 0, -2.5em", "-.5em, 0, -2.5em", "2.5em, 0, -2.5em",
  "-3.5em, 0, .5em", "-.5em, 0, .5em", "2.5em, 0, .5em",
  "-3.5em, 0, 3.5em", "-.5em, 0, 3.5em", "2.5em, 0, 3.5em",
  
  "-3.5em, -3em, -2.5em", "-.5em, -3em, -2.5em", "2.5em, -3em, -2.5em",
  "-3.5em, -3em, .5em", "2.5em, -3em, .5em",
  "-3.5em, -3em, 3.5em", "-.5em, -3em, 3.5em", "2.5em, -3em, 3.5em",
  
  "-3.5em, -6em, -2.5em", "-.5em, -6em, -2.5em", "2.5em, -6em, -2.5em",
  "-3.5em, -6em, .5em", "-.5em, -6em, .5em", "2.5em, -6em, .5em",
  "-3.5em, -6em, 3.5em", "-.5em, -6em, 3.5em", "2.5em, -6em, 3.5em"
];

const wordsList = [
  "forest",
  "desert",
  "island",
  "jungle",
  "road",
  "city",
  "river",
  "park",
  "sea",
  "fog",
  "rain",
  "snow"
];
const shapeClasses = ["triangle", "square", "circle"];
const initialInnerCubePosition = ".5em, .5em, 0";
const cornersList = [
  "2px, 2px, calc(.5em - 2px)",
  "2px, 2px, calc(-.5em + 2px)",
  "calc(1em - 2px), 2px, calc(-.5em + 2px)",
  "calc(1em - 2px), 2px, calc(.5em - 2px)",
  
  "0, calc(1em - 2px), calc(.5em - 2px)",
  "0, calc(1em - 2px), calc(-.5em + 2px)",
  "calc(1em - 2px), calc(1em - 2px), calc(-.5em + 2px)",
  "calc(1em - 2px), calc(1em - 2px), calc(.5em - 2px)"
];
const letters = "abflqy";
const colorClasses = [
  "col-a", "col-b", "col-c", "col-d", "col-e", "col-f"
];

// Color-blind safe colors for chart
const stimuliChartColors = {
  walls: '#4363d8',    // blue
  camera: '#3cb44b',   // green
  face: '#e6194B',     // red
  position: '#ffe119', // yellow
  word: '#f58231',     // orange
  shape: '#911eb4',    // purple
  corner: '#42d4f4',   // cyan
  sound: '#f032e6',    // magenta
  color: '#bfef45'     // lime
};

// Default settings
const defVal_wallsEnabled = true;
const defVal_cameraEnabled = true;
const defVal_faceEnabled = true;
const defVal_positionEnabled = true;
const defVal_wordEnabled = true;
const defVal_shapeEnabled = true;
const defVal_cornerEnabled = true;
const defVal_soundEnabled = true;
const defVal_colorEnabled = true;
const defVal_randomizeEnabled = false; // Default value for randomize stimuli toggle
const defVal_tileAHexColor = "#111";
const defVal_tileBHexColor = "#888";
const defVal_nLevel = 1;
const defVal_sceneDimmer = 0.5;
const defVal_zoom = 0.7;
const defVal_perspective = 15;
const defVal_targetNumOfStimuli = 5;
const defVal_baseDelay = 5000;
const defVal_maxAllowedMistakes = 3;
const defVal_prevLevelThreshold = 0.5;
const defVal_nextLevelThreshold = 0.8;
const defVal_numStimuliSelect = 2;

// Editable settings
let wallsEnabled = defVal_wallsEnabled;
let cameraEnabled = defVal_cameraEnabled;
let faceEnabled = defVal_faceEnabled;
let positionEnabled = defVal_positionEnabled;
let wordEnabled = defVal_wordEnabled;
let shapeEnabled = defVal_shapeEnabled;
let cornerEnabled = defVal_cornerEnabled;
let soundEnabled = defVal_soundEnabled;
let colorEnabled = defVal_colorEnabled;
let randomizeEnabled = defVal_randomizeEnabled; // Added randomize stimuli setting
let tileAHexColor = defVal_tileAHexColor;
let tileBHexColor = defVal_tileBHexColor;
let nLevel = defVal_nLevel;
let sceneDimmer = defVal_sceneDimmer;
let zoom = defVal_zoom;
let perspective = defVal_perspective;
let targetNumOfStimuli = defVal_targetNumOfStimuli;
let baseDelay = defVal_baseDelay;
let maxAllowedMistakes = defVal_maxAllowedMistakes;
let prevLevelThreshold = defVal_prevLevelThreshold;
let nextLevelThreshold = defVal_nextLevelThreshold;
let numStimuliSelect = defVal_numStimuliSelect;

// Game states
let matchingStimuli = 0;
let stimuliCount = 0;
let intervals = [];

let isRunning = false;

let enableWallsCheck = true;
let enableCameraCheck = true;
let enableFaceCheck = true;
let enablePositionCheck = true;

let enableWordCheck = true;
let enableShapeCheck = true;
let enableCornerCheck = true;
let enableSoundCheck = true;
let enableColorCheck = true;

let currWalls;
let currCamera;
let currFace;
let currPosition;

let currWord;
let currShape;
let currCorner;
let currSound;
let currColor;

let rightWalls = 0;
let rightCamera = 0;
let rightFace = 0;
let rightPosition = 0;

let rightWord = 0;
let rightShape = 0;
let rightCorner = 0;
let rightSound = 0;
let rightColor = 0;

let wrongWalls = 0;
let wrongCamera = 0;
let wrongFace = 0;
let wrongPosition = 0;

let wrongWord = 0;
let wrongShape = 0;
let wrongCorner = 0;
let wrongSound = 0;
let wrongColor = 0;

// Matching stimuli counts (for tracking each type separately)
let matchingWalls = 0;
let matchingCamera = 0;
let matchingFace = 0;
let matchingPosition = 0;
let matchingWord = 0;
let matchingShape = 0;
let matchingCorner = 0;
let matchingSound = 0;
let matchingColor = 0;

// Handler function for randomize stimuli toggle
function randomizeEnableTrigHandler(evt, defVal) {
  if (!randomizeEnableTrig) return; // Safety check
  
  if (defVal != null) {
    randomizeEnableTrig.checked = defVal;
    randomizeEnabled = defVal;
  } else {
    randomizeEnabled = !randomizeEnabled;
    saveSettings();
  }
}

// Handler functions for enabling/disabling stimuli
function wallsEnableTrigHandler(evt, defVal) {
  if (!wallsEnableTrig || !checkWallsBtn) return; // Safety check
  
  if (defVal != null) {
    wallsEnableTrig.checked = defVal;
    wallsEnabled = defVal;
  } else {
    wallsEnabled = !wallsEnabled;
    saveSettings();
  }

  if (!wallsEnabled) {
    checkWallsBtn.style.display = "none";
  } else {
    checkWallsBtn.style.display = "inline-block";
  }

  checkWallsBtn.style.animationDelay = "0s";
}

function cameraEnableTrigHandler(evt, defVal) {
  if (!cameraEnableTrig || !checkCameraBtn) return; // Safety check
  
  if (defVal != null) {
    cameraEnableTrig.checked = defVal;
    cameraEnabled = defVal;
  } else {
    cameraEnabled = !cameraEnabled;
    saveSettings();
  }

  if (!cameraEnabled) {
    checkCameraBtn.style.display = "none";
  } else {
    checkCameraBtn.style.display = "inline-block";
  }

  checkCameraBtn.style.animationDelay = "0s";
}

function faceEnableTrigHandler(evt, defVal) {
  if (!faceEnableTrig || !checkFaceBtn) return; // Safety check
  
  if (defVal != null) {
    faceEnableTrig.checked = defVal;
    faceEnabled = defVal;
  } else {
    faceEnabled = !faceEnabled;
    saveSettings();
  }

  if (!faceEnabled) {
    checkFaceBtn.style.display = "none";
  } else {
    checkFaceBtn.style.display = "inline-block";
  }

  checkFaceBtn.style.animationDelay = "0s";
}

function positionEnableTrigHandler(evt, defVal) {
  if (!positionEnableTrig || !checkPositionBtn) return; // Safety check
  
  if (defVal != null) {
    positionEnableTrig.checked = defVal;
    positionEnabled = defVal;
  } else {
    positionEnabled = !positionEnabled;
    saveSettings();
  }

  if (!positionEnabled) {
    checkPositionBtn.style.display = "none";
  } else {
    checkPositionBtn.style.display = "inline-block";
  }

  checkPositionBtn.style.animationDelay = "0s";
}

function wordEnableTrigHandler(evt, defVal) {
  if (!wordEnableTrig || !checkWordBtn) return; // Safety check
  
  if (defVal != null) {
    wordEnableTrig.checked = defVal;
    wordEnabled = defVal;
  } else {
    wordEnabled = !wordEnabled;
    saveSettings();
  }

  if (!wordEnabled) {
    checkWordBtn.style.display = "none";
  } else {
    checkWordBtn.style.display = "inline-block";
  }
  
  checkWordBtn.style.animationDelay = "0s";
}

function shapeEnableTrigHandler(evt, defVal) {
  if (!shapeEnableTrig || !checkShapeBtn) return; // Safety check
  
  if (defVal != null) {
    shapeEnableTrig.checked = defVal;
    shapeEnabled = defVal;
  } else {
    shapeEnabled = !shapeEnabled;
    saveSettings();
  }

  if (!shapeEnabled) {
    checkShapeBtn.style.display = "none";
  } else {
    checkShapeBtn.style.display = "inline-block";
  }

  checkShapeBtn.style.animationDelay = "0s";
}

function cornerEnableTrigHandler(evt, defVal) {
  if (!cornerEnableTrig || !checkCornerBtn || !innerCube) return; // Safety check
  
  if (defVal != null) {
    cornerEnableTrig.checked = defVal;
    cornerEnabled = defVal;
  } else {
    cornerEnabled = !cornerEnabled;
    saveSettings();
  }
  
  if (!cornerEnabled) {
    shapeEnableTrigHandler(null, false);
    if (shapeEnableTrig) shapeEnableTrig.disabled = true;
    
    innerCube.style.display = "none";
    checkCornerBtn.style.display = "none";
    checkShapeBtn.style.display = "none";
  } else {
    if (shapeEnableTrig) shapeEnableTrig.disabled = false;
    
    innerCube.style.display = "block";
    checkCornerBtn.style.display = "inline-block";
  }
  
  if (innerFaceEls) {
    innerFaceEls.forEach(face => face.style.animationDelay = "0s");
  }
  
  checkCornerBtn.style.animationDelay = "0s";
}

function soundEnableTrigHandler(evt, defVal) {
  if (!soundEnableTrig || !checkSoundBtn) return; // Safety check
  
  if (defVal != null) {
    soundEnableTrig.checked = defVal;
    soundEnabled = defVal;
  } else {
    soundEnabled = !soundEnabled;
    saveSettings();
  }

  if (!soundEnabled) {
    checkSoundBtn.style.display = "none";
  } else {
    checkSoundBtn.style.display = "inline-block";
  }

  checkSoundBtn.style.animationDelay = "0s";
}

function colorEnableTrigHandler(evt, defVal) {
  if (!colorEnableTrig || !checkColorBtn) return; // Safety check
  
  if (defVal != null) {
    colorEnableTrig.checked = defVal;
    colorEnabled = defVal;
  } else {
    colorEnabled = !colorEnabled;
    saveSettings();
  }

  if (!colorEnabled) {
    checkColorBtn.style.display = "none";
  } else {
    checkColorBtn.style.display = "inline-block";
  }

  checkColorBtn.style.animationDelay = "0s"
}

// Handler functions for input fields
function nLevelInputHandler(evt, defVal) {
  if (!nLevelInput || !nBackDisplay) return; // Safety check
  
  if (defVal != null) {
    nLevelInput.value = defVal;
    nLevel = defVal;
  } else {
    nLevel = Math.min(Math.max(+nLevelInput.value, 1), 9);
    saveSettings();
  }

  if (+nLevelInput.value < 1 || +nLevelInput.value > 9) {
    nLevelInput.classList.add("input-incorrect");
  } else {
    nLevelInput.classList.remove("input-incorrect");
    nBackDisplay.innerHTML = nLevel;
  }
}

function sceneDimmerInputHandler(evt, defVal) {
  if (!sceneDimmerInput || !floors) return; // Safety check
  
  if (defVal) {
    sceneDimmerInput.value = defVal;
    sceneDimmer = defVal;
  } else {
    sceneDimmer = +sceneDimmerInput.value;
    saveSettings();
  }

  floors.forEach(floor =>
    setFloorBackground(
      floor,
      sceneDimmer,
      tileAHexColor,
      tileBHexColor
    )
  );
}

function zoomInputHandler(evt, defVal) {
  if (!zoomInput || !sceneWrapper) return; // Safety check
  
  if (defVal) {
    zoomInput.value = defVal;
    zoom = defVal;
  } else {
    zoom = +zoomInput.value;
    saveSettings();
  }
  sceneWrapper.style.transform = `scale(${zoom})`;
}

function perspectiveInputHandler(evt, defVal) {
  if (!perspectiveInput || !sceneWrapper) return; // Safety check
  
  if (defVal) {
    perspectiveInput.value = defVal;
    perspective = defVal;
  } else {
    perspective = +perspectiveInput.value;
    saveSettings();
  }
  sceneWrapper.style.perspective = `${perspective}em`;
}

function targetStimuliInputHandler(evt, defVal) {
  if (!targetStimuliInput) return; // Safety check
  
  if (defVal) {
    targetStimuliInput.value = defVal;
    targetNumOfStimuli = defVal;
  } else {
    targetNumOfStimuli = Math.min(Math.max(+targetStimuliInput.value, 1), 30);
    saveSettings();
  }

  if (+targetStimuliInput.value < 1 || +targetStimuliInput.value > 30) {
    targetStimuliInput.classList.add("input-incorrect");
  } else {
    targetStimuliInput.classList.remove("input-incorrect");
  }
}

function baseDelayInputHandler(evt, defVal) {
  if (!baseDelayInput) return; // Safety check
  
  if (defVal != null) {
    baseDelayInput.value = defVal;
    baseDelay = defVal;
  } else {
    baseDelay = Math.min(Math.max(+baseDelayInput.value, 2000), 20000);
    saveSettings();
  }

  if (+baseDelayInput.value < 2000 || +baseDelayInput.value > 20000) {
    baseDelayInput.classList.add("input-incorrect");
  } else {
    baseDelayInput.classList.remove("input-incorrect");
  }
}

function maxAllowedMistakesInputHandler(evt, defVal) {
  if (!maxAllowedMistakesInput) return; // Safety check
  
  if (defVal != null) {
    maxAllowedMistakesInput.value = defVal;
    maxAllowedMistakes = defVal;
  } else {
    maxAllowedMistakes = Math.min(Math.max(+maxAllowedMistakesInput.value, 0), 30);
    saveSettings();
  }

  if (+maxAllowedMistakesInput.value < 0 || +maxAllowedMistakesInput.value > 30) {
    maxAllowedMistakesInput.classList.add("input-incorrect");
  } else {
    maxAllowedMistakesInput.classList.remove("input-incorrect");
  }
}

function numStimuliSelectInputHandler(evt, defVal) {
  if (!numStimuliSelectInput) return; // Safety check
  
  if (defVal != null) {
    numStimuliSelectInput.value = defVal;
    numStimuliSelect = defVal;
  } else {
    numStimuliSelect = Math.min(Math.max(+numStimuliSelectInput.value, 1), 9);
    saveSettings();
  }

  if (+numStimuliSelectInput.value < 1 || +numStimuliSelectInput.value > 9) {
    numStimuliSelectInput.classList.add("input-incorrect");
  } else {
    numStimuliSelectInput.classList.remove("input-incorrect");
  }
}

function previousLevelThresholdInputHandler(evt, defVal) {
  if (!previousLevelThresholdInput) return; // Safety check
  
  if (defVal != null) {
    previousLevelThresholdInput.value = defVal * 100;
    prevLevelThreshold = defVal;
  } else {
    prevLevelThreshold = +previousLevelThresholdInput.value / 100;
    saveSettings();
  }
}

function nextLevelThresholdInputHandler(evt, defVal) {
  if (!nextLevelThresholdInput) return; // Safety check
  
  if (defVal != null) {
    nextLevelThresholdInput.value = defVal * 100;
    nextLevelThreshold = defVal;
  } else {
    nextLevelThreshold = +nextLevelThresholdInput.value / 100;  
    saveSettings();
  }
}

// Utility functions
function setFloorBackground(floor, dimPercent, tileAHexColor, tileBHexColor) {
  if (!floor) return; // Safety check
  
  if (dimPercent > 1) {
    dimPercent = 1;
  }
  let hexSymbols = "0123456789abcdef";
  let hexBrightness = hexSymbols[
    Math.floor(dimPercent * (hexSymbols.length - 1))
  ];
  if (floor.classList.contains("floor-bottom")) {
    floor.style.backgroundImage = `linear-gradient(
  #000${hexBrightness},
  #000${hexBrightness}
),
radial-gradient(
  at 0px 0px,
  #0000,
  #0000 15%,
  20%,
  #000
),
repeating-conic-gradient(
  ${tileAHexColor} 0deg,
  ${tileAHexColor} 90deg,
  ${tileBHexColor} 90deg,
  ${tileBHexColor} 180deg
)`;
  } else if (floor.classList.contains("floor-left")) {
    floor.style.backgroundImage = `linear-gradient(
  #000${hexBrightness},
  #000${hexBrightness}
),
radial-gradient(
  at 54em 53.5em,
  #0000,
  #0000 15%,
  20%,
  #000
),
repeating-conic-gradient(
  ${tileAHexColor} 0deg,
  ${tileAHexColor} 90deg,
  ${tileBHexColor} 90deg,
  ${tileBHexColor} 180deg
)`;
  } else {
    floor.style.backgroundImage = `linear-gradient(
  #000${hexBrightness},
  #000${hexBrightness}
),
radial-gradient(
  at 0 53.5em,
  #0000,
  #0000 15%,
  20%,
  #000
),
repeating-conic-gradient(
  ${tileBHexColor} 0deg,
  ${tileBHexColor} 90deg,
  ${tileAHexColor} 90deg,
  ${tileAHexColor} 180deg
)`;
  }
}

function resetStats() {
  const confirmed = confirm("Are you sure you want to reset all statistics?\nThis operation is irreversible.");
  if (!confirmed) {
    return;
  }

  // Reset history to a fresh empty state
  history = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {}
  };
  
  // Save the reset history to localStorage before reloading
  saveHistory();
  
  // Reload the page to apply changes
  location.reload();
}

function resetOptions() {
  const confirmed = confirm("Are you sure you want to reset all settings?\nThis operation is irreversible.");
  if (!confirmed) {
    return;
  }

  wallsEnabled = defVal_wallsEnabled;
  cameraEnabled = defVal_cameraEnabled;
  faceEnabled = defVal_faceEnabled;
  positionEnabled = defVal_positionEnabled;
  wordEnabled = defVal_wordEnabled;
  shapeEnabled = defVal_shapeEnabled;
  cornerEnabled = defVal_cornerEnabled;
  soundEnabled = defVal_soundEnabled;
  colorEnabled = defVal_colorEnabled;
  randomizeEnabled = defVal_randomizeEnabled; // Added randomize stimuli default
  tileAHexColor = defVal_tileAHexColor;
  tileBHexColor = defVal_tileBHexColor;
  nLevel = defVal_nLevel;
  sceneDimmer = defVal_sceneDimmer;
  zoom = defVal_zoom;
  perspective = defVal_perspective;
  targetNumOfStimuli = defVal_targetNumOfStimuli;
  baseDelay = defVal_baseDelay;
  maxAllowedMistakes = defVal_maxAllowedMistakes;
  prevLevelThreshold = defVal_prevLevelThreshold;
  nextLevelThreshold = defVal_nextLevelThreshold;
  numStimuliSelect = defVal_numStimuliSelect;

  saveSettings();
  location.reload();
}

function resetBindings() {
  const confirmed = confirm("Are you sure you want to reset all bindings?\nThis operation is irreversible.");
  if (!confirmed) {
    return;
  }

  for (const [ stim, key ] of Object.entries(keyBindingsDefault)) {
    const bindingElement = document.querySelector(`[id^='binding-${stim}']`);
    if (bindingElement) {
      bindingElement.value = key;
    }
  }
  saveBindings();
}

function reloadBindKeys() {
  for (let [ stim, key ] of Object.entries(keyBindings)) {
    const bindKeyElement = document.querySelector(`.bind-key-${stim}`);
    if (bindKeyElement) {
      bindKeyElement.innerHTML = `(${key})`;
    }
  }
}

function saveBindings() {
  const bindings = [...document.querySelectorAll("[id^='binding-']")];
  if (!bindings.length || !bindDialogContent) return; // Safety check
  
  for (let binding of bindings) {
    const stim = binding.getAttribute("id").replace("binding-", "");
    const key = binding.value.toLowerCase()[0];
    binding.value = key; // Ensure just one char on save
    if (stim && key) {
      keyBindings[stim] = key;
    } else {
      alert("All buttons need a binding in order to continue.");
    }
  }
  localStorage.setItem(LS_BINDINGS_KEY, JSON.stringify(keyBindings));
  bindDialogContent.parentElement.close();
  reloadBindKeys();
}

function loadBindings() {
  const _keyBindings = JSON.parse(localStorage.getItem(LS_BINDINGS_KEY));
  if (_keyBindings) {
    let validConf = true;
    for (const binding of Object.keys(_keyBindings)) {
      if (!Object.keys(keyBindingsDefault).includes(binding)) {
        validConf = false;
      }
    }
    keyBindings = validConf ? _keyBindings : deepCopy(keyBindingsDefault);
  }
  reloadBindKeys();
}

function saveHistory() {
  localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(history));
}

function loadHistory() {
  const _history = JSON.parse(localStorage.getItem(LS_HISTORY_KEY));
  if (_history) {
    history = _history;
  } else {
    // Add some demo data for display purposes if no history exists
    addDemoHistoryData();
  }
}

function saveSettings() {
  const settings = {
    wallsEnabled,
    cameraEnabled,
    faceEnabled,
    positionEnabled,
    wordEnabled,
    shapeEnabled,
    cornerEnabled,
    soundEnabled,
    colorEnabled,
    randomizeEnabled, // Added randomize stimuli setting
    //
    nLevel,
    sceneDimmer,
    zoom,
    perspective,
    targetNumOfStimuli,
    baseDelay,
    maxAllowedMistakes,
    prevLevelThreshold,
    nextLevelThreshold,
    numStimuliSelect
  };
  localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings));
  return settings;
}

function loadSettings() {
  let settings = JSON.parse(localStorage.getItem(LS_SETTINGS_KEY));
  if (!settings) {
    settings = saveSettings();
  }

  wallsEnableTrigHandler(null, settings.wallsEnabled);
  cameraEnableTrigHandler(null, settings.cameraEnabled);
  faceEnableTrigHandler(null, settings.faceEnabled);
  positionEnableTrigHandler(null, settings.positionEnabled);
  wordEnableTrigHandler(null, settings.wordEnabled);
  shapeEnableTrigHandler(null, settings.shapeEnabled);
  cornerEnableTrigHandler(null, settings.cornerEnabled);
  soundEnableTrigHandler(null, settings.soundEnabled);
  colorEnableTrigHandler(null, settings.colorEnabled);
  randomizeEnableTrigHandler(null, settings.randomizeEnabled || defVal_randomizeEnabled); // Added randomize stimuli setting
  //
  nLevelInputHandler(null, settings.nLevel);
  sceneDimmerInputHandler(null, settings.sceneDimmer);
  zoomInputHandler(null, settings.zoom);
  perspectiveInputHandler(null, settings.perspective);
  targetStimuliInputHandler(null, settings.targetNumOfStimuli);
  baseDelayInputHandler(null, settings.baseDelay);
  maxAllowedMistakesInputHandler(null, settings.maxAllowedMistakes);
  previousLevelThresholdInputHandler(null, settings.prevLevelThreshold);
  nextLevelThresholdInputHandler(null, settings.nextLevelThreshold);
  numStimuliSelectInputHandler(null, settings.numStimuliSelect);
}

function openBindings() {
  if (!bindDialogContent) return; // Safety check
  
  bindDialogContent.parentElement.show();
  for (const [stim, key] of Object.entries(keyBindings)) {
    const bindingElement = document.querySelector("#binding-" + stim);
    if (bindingElement) {
      bindingElement.value = key;
    }
  }
}

function toggleOptions() {
  const settingsOpen = document.querySelector("#settings-open");
  if (settingsOpen) {
    settingsOpen.checked = !settingsOpen.checked;
  }
}

function closeOptions() {
  const settingsOpen = document.querySelector("#settings-open");
  if (settingsOpen) {
    settingsOpen.checked = false;
  }
}

function getBar(n) {
  const html = `<div class="bar-chart-bar" style="height: ${n*2}rem;"><div>${n}</div></div>`;
  const wrap = document.createElement("DIV");
  wrap.innerHTML = html;
  return wrap.firstChild;
}

// Updated function to display individual stimuli accuracy with chart
function toggleStats(_dim) {
  if (!statsDialogContent) return; // Safety check
  
  if (!_dim && statsDialogContent.parentElement.hasAttribute("open")) {
    statsDialogContent.parentElement.close();
    return;
  }

  statsDialogContent.parentElement.show();
  const dim = _dim || localStorage.getItem("last-dim") || 1;
  const radios = [ ...document.querySelectorAll("input[name='dimension']") ];
  if (radios.length > 0 && dim >= 1 && dim <= radios.length) {
    radios[dim - 1].checked = true;
  }
  
  const _history = history[dim];
  const bars = document.querySelector(".bar-chart-bars");
  if (bars) {
    bars.innerHTML = "";
  }
  
  let avgNLevel = 0;
  let min// Fixed main.js file for the 3D Hyper N-Back application

function deepCopy(anything) {
  return JSON.parse(JSON.stringify(anything));
}

// Key bindings for different stimuli and actions
let keyBindings = {
  "Walls": "a",
  "Camera": "s",
  "Face": "d",
  "Position": "f",
  "Word": "g",
  "Shape": "h",
  "Corner": "j",
  "Sound": "k",
  "Color": "l",
  "Play": "q",
  "Stop": "p",
  "Options": "w",
  "Stats": "o"
};
const keyBindingsDefault = deepCopy(keyBindings);

// History storage for different dimension counts
let history = {
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {},
  7: {},
  8: {},
  9: {}
};
const historyDefault = deepCopy(history);

// LocalStorage keys
const LS_SETTINGS_KEY = "hyper-n-back";
const LS_HISTORY_KEY = "hyper-history";
const LS_BINDINGS_KEY = "hyper-bindings";

// Variable to track chart instance
let stimuliChart = null;

// DOM elements - we'll check if they exist before using them
let sceneWrapper, scene, floors, wallColors, wallWords, cube, faceEls;
let innerCube, innerFaceEls, shape;
let checkWallsBtn, checkCameraBtn, checkFaceBtn, checkPositionBtn;
let checkWordBtn, checkShapeBtn, checkCornerBtn, checkSoundBtn, checkColorBtn;
let nBackDisplay, recapDialogContent, statsDialogContent, bindDialogContent;
let nLevelInput, sceneDimmerInput, zoomInput, perspectiveInput, targetStimuliInput;
let baseDelayInput, maxAllowedMistakesInput, previousLevelThresholdInput;
let nextLevelThresholdInput, numStimuliSelectInput;
let wallsEnableTrig, cameraEnableTrig, faceEnableTrig, positionEnableTrig;
let wordEnableTrig, shapeEnableTrig, cornerEnableTrig, soundEnableTrig;
let colorEnableTrig, randomizeEnableTrig;

// DOM initialization function (to be called after DOMContentLoaded)
function initDOM() {
  sceneWrapper = document.querySelector(".scene-wrapper");
  scene = document.querySelector(".scene");

  floors = [...document.querySelectorAll(".floor")];
  wallColors = [...document.querySelectorAll('[class^="wall"][class$="color"]')];
  wallWords = [...document.querySelectorAll('[class^="wall"][class$="word"]')];

  cube = document.querySelector(".cube");
  faceEls = [...document.querySelectorAll(".cube > .face")];

  innerCube = document.querySelector(".inner-cube");
  innerFaceEls = [...document.querySelectorAll(".inner-cube > .face")];
  shape = document.querySelector(".shape");

  checkWallsBtn = document.querySelector(".check-walls");
  checkCameraBtn = document.querySelector(".check-camera");
  checkFaceBtn = document.querySelector(".check-face");
  checkPositionBtn = document.querySelector(".check-position");

  checkWordBtn = document.querySelector(".check-word");
  checkShapeBtn = document.querySelector(".check-shape");
  checkCornerBtn = document.querySelector(".check-corner");
  checkSoundBtn = document.querySelector(".check-sound");
  checkColorBtn = document.querySelector(".check-color");

  nBackDisplay = document.querySelector("#n-back-display");
  recapDialogContent = document.querySelector("#recap-dialog .dialog-content");
  statsDialogContent = document.querySelector("#stats-dialog .dialog-content");
  bindDialogContent = document.querySelector("#bind-dialog .dialog-content");

  nLevelInput = document.querySelector("#n-level");
  sceneDimmerInput = document.querySelector("#scene-dimmer");
  zoomInput = document.querySelector("#zoom");
  perspectiveInput = document.querySelector("#perspective");
  targetStimuliInput = document.querySelector("#targetStimuli");
  baseDelayInput = document.querySelector("#baseDelay");
  maxAllowedMistakesInput = document.querySelector("#maxAllowedMistakes");
  previousLevelThresholdInput = document.querySelector("#previousLevelThreshold");
  nextLevelThresholdInput = document.querySelector("#nextLevelThreshold");
  numStimuliSelectInput = document.querySelector("#numStimuliSelect");

  const toggleTriggers = [...document.querySelectorAll(".toggle-trigger")];
  wallsEnableTrig = toggleTriggers[0];
  cameraEnableTrig = toggleTriggers[1];
  faceEnableTrig = toggleTriggers[2];
  positionEnableTrig = toggleTriggers[3];
  wordEnableTrig = toggleTriggers[4];
  shapeEnableTrig = toggleTriggers[5];
  cornerEnableTrig = toggleTriggers[6];
  soundEnableTrig = toggleTriggers[7];
  colorEnableTrig = toggleTriggers[8];
  randomizeEnableTrig = document.querySelector("#enable-randomize");
}

// Game settings
const wallColorsList = [
  "#00b894",
  "#0984e3",
  "#6c5ce7",
  "#fecb22",
  "#d63031",
  "#a92276"
];
const points = [
  "-60&0", "-60&-45", "-60&-90",
  "-20&0", "-20&-45", "-20&-90"
];
const numbers = "123456";
const initialCubePosition = "-.5em, -3em, .5em";
const moves = [
  "-3.5em, 0, -2.5em", "-.5em, 0, -2.5em", "2.5em, 0, -2.5em",
  "-3.5

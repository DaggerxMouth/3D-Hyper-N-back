// Fixed main.js file for the 3D Hyper N-Back application

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

// DOM elements
const sceneWrapper = document.querySelector(".scene-wrapper");
const scene = document.querySelector(".scene");

const floors = [...document.querySelectorAll(".floor")];
const wallColors = [...document.querySelectorAll('[class^="wall"][class$="color"]')];
const wallWords = [...document.querySelectorAll('[class^="wall"][class$="word"]')];

const cube = document.querySelector(".cube");
const faceEls = [...document.querySelectorAll(".cube > .face")];

const innerCube = document.querySelector(".inner-cube");
const innerFaceEls = [...document.querySelectorAll(".inner-cube > .face")];
const shape = document.querySelector(".shape");

const checkWallsBtn = document.querySelector(".check-walls");
const checkCameraBtn = document.querySelector(".check-camera");
const checkFaceBtn = document.querySelector(".check-face");
const checkPositionBtn = document.querySelector(".check-position");

const checkWordBtn = document.querySelector(".check-word");
const checkShapeBtn = document.querySelector(".check-shape");
const checkCornerBtn = document.querySelector(".check-corner");
const checkSoundBtn = document.querySelector(".check-sound");
const checkColorBtn = document.querySelector(".check-color");

const nBackDisplay = document.querySelector("#n-back-display");
const recapDialogContent = document.querySelector("#recap-dialog .dialog-content");
const statsDialogContent = document.querySelector("#stats-dialog .dialog-content");
const bindDialogContent = document.querySelector("#bind-dialog .dialog-content");

const nLevelInput = document.querySelector("#n-level");
const sceneDimmerInput = document.querySelector("#scene-dimmer");
const zoomInput = document.querySelector("#zoom");
const perspectiveInput = document.querySelector("#perspective");
const targetStimuliInput = document.querySelector("#targetStimuli");
const baseDelayInput = document.querySelector("#baseDelay");
const maxAllowedMistakesInput = document.querySelector("#maxAllowedMistakes");
const previousLevelThresholdInput = document.querySelector("#previousLevelThreshold");
const nextLevelThresholdInput = document.querySelector("#nextLevelThreshold");
const numStimuliSelectInput = document.querySelector("#numStimuliSelect");

const [
  wallsEnableTrig,
  cameraEnableTrig,
  faceEnableTrig,
  positionEnableTrig,
  wordEnableTrig,
  shapeEnableTrig,
  cornerEnableTrig,
  soundEnableTrig,
  colorEnableTrig,
  randomizeEnableTrig
] = [...document.querySelectorAll(".toggle-trigger")];

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
const defVal_nLevel = 2;
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

// Signal detection metrics for d'-prime calculation
let sessionMetrics = {
  hits: 0,
  misses: 0, 
  falseAlarms: 0,
  correctRejections: 0,
  dPrime: 0,
  responseBias: 0,
  microLevel: 0.00,
  n1LureEncounters: 0,
  n1LureCorrectRejections: 0,
  n1LureFalseAlarms: 0,
  n1LureResistance: 0,
  nPlusLureEncounters: 0,
  nPlusLureCorrectRejections: 0,
  nPlusLureFalseAlarms: 0,
  nPlusLureResistance: 0
};

// Session history for baseline calculation
let sessionHistory = []; // Store last 20 sessions for baseline calculation

// Current micro-level (N.DD format)
let currentMicroLevel = 2.00;

// Store micro-levels for different stimulus configurations
let microLevelsByConfig = {
  2: 2.00,  // Dual n-back
  3: 2.00,  // Triple n-back
  4: 2.00,  // Quad n-back
  5: 2.00,  // etc...
  6: 2.00,
  7: 2.00,
  8: 2.00,
  9: 2.00
};

// Session histories by configuration
let sessionHistoriesByConfig = {
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: []
};

// Functions for signal detection calculations
function calculateDPrime(hits, misses, falseAlarms, correctRejections) {
  const hitRate = hits / (hits + misses);
  const faRate = falseAlarms / (falseAlarms + correctRejections);
  
  // Handle edge cases (avoid 0% and 100%)
  const adjustedHitRate = Math.max(0.01, Math.min(0.99, hitRate));
  const adjustedFARate = Math.max(0.01, Math.min(0.99, faRate));
  
  // Z-score conversion (inverse normal distribution)
  const zHit = gaussianInverse(adjustedHitRate);
  const zFA = gaussianInverse(adjustedFARate);
  
  return zHit - zFA;
}

function calculateResponseBias(hits, misses, falseAlarms, correctRejections) {
  const hitRate = hits / (hits + misses);
  const faRate = falseAlarms / (falseAlarms + correctRejections);
  
  const adjustedHitRate = Math.max(0.01, Math.min(0.99, hitRate));
  const adjustedFARate = Math.max(0.01, Math.min(0.99, faRate));
  
  const zHit = gaussianInverse(adjustedHitRate);
  const zFA = gaussianInverse(adjustedFARate);
  
  return -0.5 * (zHit + zFA);
}

// Z-score approximation function
function gaussianInverse(p) {
  // Simplified approximation for the inverse normal distribution
  if (p < 0.5) {
    return -Math.sqrt(-2 * Math.log(p));
  } else {
    return Math.sqrt(-2 * Math.log(1 - p));
  }
}

// Calculate baseline performance from session history
function calculateBaseline(sessionHistory) {
  if (!sessionHistory || sessionHistory.length === 0) {
    // Return default values if no history
    return { 
      avgDPrime: 0.5, 
      stdDPrime: 0.1,
      n1LureResistance: 0.5
    };
  }
  
  // Extract d-prime values
  const dPrimes = sessionHistory.map(s => s.dPrime).filter(d => !isNaN(d));
  
  // Extract lure resistance values, if any
  const lureResistances = sessionHistory
    .map(s => s.n1LureResistance)
    .filter(r => r !== undefined && !isNaN(r));
    
  // Calculate average d-prime
  const avgDPrime = dPrimes.length > 0 
    ? dPrimes.reduce((a, b) => a + b, 0) / dPrimes.length 
    : 0.5;
    
  // Calculate standard deviation of d-prime
  const stdDPrime = dPrimes.length > 0 
    ? Math.sqrt(
        dPrimes.map(x => Math.pow(x - avgDPrime, 2))
              .reduce((a, b) => a + b, 0) / dPrimes.length
      )
    : 0.1;
    
  // Calculate average lure resistance
  const avgLureResistance = lureResistances.length > 0
    ? lureResistances.reduce((a, b) => a + b, 0) / lureResistances.length
    : 0.5;
    
  return {
    avgDPrime,
    stdDPrime,
    n1LureResistance: avgLureResistance
  };
}

// Function to check if user should advance in micro-level
function checkMicroLevelAdvancement(sessionMetrics, sessionHistory) {
  // Get personal baseline
  const baseline = calculateBaseline(sessionHistory);
  
  // Calculate thresholds based on current level and personal baseline
  const dPrimeThreshold = Math.max(0.5, baseline.avgDPrime);
  const lureResistanceThreshold = Math.max(0.5, baseline.n1LureResistance);
  
  // Calculate raw accuracy
const totalTrials = sessionMetrics.hits + sessionMetrics.misses + 
                   sessionMetrics.falseAlarms + sessionMetrics.correctRejections;
const correctResponses = sessionMetrics.hits + sessionMetrics.correctRejections;
const accuracy = totalTrials > 0 ? correctResponses / totalTrials : 0;

// Criteria for advancement
const goodDPrime = sessionMetrics.dPrime > dPrimeThreshold;
const goodLureResistance = sessionMetrics.n1LureResistance >= lureResistanceThreshold;
const lowBias = Math.abs(sessionMetrics.responseBias) < 0.5; // Not too biased toward yes or no
const goodAccuracy = accuracy >= 0.90; // Minimum 90% accuracy required
  
  // Get current level components
  const { nLevel, microProgress } = getMicroLevelComponents(currentMicroLevel);
  
  // Advancement size (0.01 to 0.05 based on performance)
  const baseIncrement = 0.01;
  const maxIncrement = 0.05;
  const performanceRatio = Math.min(1, (sessionMetrics.dPrime - dPrimeThreshold) / 1.0);
  const increment = baseIncrement + (performanceRatio * (maxIncrement - baseIncrement));
  
  // Determine new micro-level
let newMicroLevel = currentMicroLevel;

if (goodDPrime && lowBias && goodAccuracy) {
  // Advance micro-level
  newMicroLevel = Math.min(9.99, currentMicroLevel + increment);
  console.log(`Advancing micro-level by +${increment.toFixed(2)} (d'=${sessionMetrics.dPrime.toFixed(2)}, acc=${(accuracy * 100).toFixed(0)}%)`);
} else if (!goodAccuracy) {
  // No advancement if accuracy too low
  console.log(`No advancement: accuracy ${(accuracy * 100).toFixed(0)}% below 90% threshold`);
} else if (sessionMetrics.dPrime < dPrimeThreshold * 0.7) {
  // Regression in micro-level for poor performance
  const decrement = 0.05;
  newMicroLevel = Math.max(2.0, currentMicroLevel - decrement);
  console.log(`Decreasing micro-level by -${decrement.toFixed(2)} (poor d-prime: ${sessionMetrics.dPrime.toFixed(2)})`);
}
  
  // Integer level transitions
  if (Math.floor(newMicroLevel) > nLevel) {
    console.log(`LEVEL UP! ${nLevel} -> ${Math.floor(newMicroLevel)}`);
  } else if (Math.floor(newMicroLevel) < nLevel) {
    console.log(`LEVEL DOWN! ${nLevel} -> ${Math.floor(newMicroLevel)}`);
  }
  
  return newMicroLevel;
}

// Function to get micro-level components
function getMicroLevelComponents(microLevel) {
  const nLevel = Math.floor(microLevel);
  const microProgress = microLevel - nLevel; // 0.00 to 0.99
  return { nLevel, microProgress };
}

// Function to get speed target based on micro-level and base delay
function getSpeedTarget(microLevel) {
  const { nLevel, microProgress } = getMicroLevelComponents(microLevel);
  
  // Within each N-level, speed scales from 100% to 50% of baseDelay
const levelStartSpeed = baseDelay;  // e.g., 5000ms at x.00
const levelEndSpeed = baseDelay * 0.5;  // e.g., 2500ms at x.99
  
  // Speed decreases as decimal increases (0.00 to 0.99)
  const speedRange = levelStartSpeed - levelEndSpeed;
  const target = levelStartSpeed - (speedRange * microProgress);
  
  return Math.round(target);
}

// Function to format micro-level for display
function formatMicroLevel(microLevel) {
  return microLevel.toFixed(2); // Always show 2 decimal places
}

// Function to count currently active stimuli
function getActiveStimuliCount() {
  let count = 0;
  if (wallsEnabled) count++;
  if (cameraEnabled) count++;
  if (faceEnabled) count++;
  if (positionEnabled) count++;
  if (wordEnabled) count++;
  if (shapeEnabled) count++;
  if (cornerEnabled) count++;
  if (soundEnabled) count++;
  if (colorEnabled) count++;
  return count;
}

// Function to get current configuration key
function getCurrentConfigKey() {
  return getActiveStimuliCount();
}

// Handler function for randomize stimuli toggle
function randomizeEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    randomizeEnableTrig.checked = defVal;
    randomizeEnabled = defVal;
  } else {
    randomizeEnabled = !randomizeEnabled;
    saveSettings();
  }
}

// Function to update micro-level when configuration changes
function updateMicroLevelForConfig() {
  const configKey = getCurrentConfigKey();
  
  // Save current micro-level for previous config
  const prevConfigKey = Object.keys(microLevelsByConfig).find(key => 
    microLevelsByConfig[key] === currentMicroLevel
  ) || configKey;
  
  if (prevConfigKey) {
    microLevelsByConfig[prevConfigKey] = currentMicroLevel;
  }
  
  // Load micro-level for new config
  currentMicroLevel = microLevelsByConfig[configKey] || 2.00;
  nLevel = Math.floor(currentMicroLevel);
  
  // Update displays
  nLevelInput.value = formatMicroLevel(currentMicroLevel);
  nBackDisplay.innerHTML = formatMicroLevel(currentMicroLevel);
  
  const speedDisplay = document.querySelector("#speed-display");
  if (speedDisplay) {
    speedDisplay.innerHTML = getSpeedTarget(currentMicroLevel);
  }
  // Update config display
const configDisplay = document.querySelector("#config-display");
if (configDisplay) {
  const activeCount = getCurrentConfigKey();
  configDisplay.innerHTML = activeCount + "D";
}
}



// Handler functions for enabling/disabling stimuli
function wallsEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    wallsEnableTrig.checked = defVal;
    wallsEnabled = defVal;
  } else {
    wallsEnabled = !wallsEnabled;
    saveSettings();
updateMicroLevelForConfig();
  }

  if (!wallsEnabled) {
    checkWallsBtn.style.display = "none";
  } else {
    checkWallsBtn.style.display = "inline-block";
  }

  checkWallsBtn.style.animationDelay = "0s";
}

function cameraEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    cameraEnableTrig.checked = defVal;
    cameraEnabled = defVal;
  } else {
    cameraEnabled = !cameraEnabled;
    saveSettings();
updateMicroLevelForConfig();
  }

  if (!cameraEnabled) {
    checkCameraBtn.style.display = "none";
  } else {
    checkCameraBtn.style.display = "inline-block";
  }

  checkCameraBtn.style.animationDelay = "0s";
}

function faceEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    faceEnableTrig.checked = defVal;
    faceEnabled = defVal;
  } else {
    faceEnabled = !faceEnabled;
    saveSettings();
updateMicroLevelForConfig();
  }

  if (!faceEnabled) {
    checkFaceBtn.style.display = "none";
  } else {
    checkFaceBtn.style.display = "inline-block";
  }

  checkFaceBtn.style.animationDelay = "0s";
}

function positionEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    positionEnableTrig.checked = defVal;
    positionEnabled = defVal;
  } else {
    positionEnabled = !positionEnabled;
    saveSettings();
updateMicroLevelForConfig();
  }

  if (!positionEnabled) {
    checkPositionBtn.style.display = "none";
  } else {
    checkPositionBtn.style.display = "inline-block";
  }

  checkPositionBtn.style.animationDelay = "0s";
}

function wordEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    wordEnableTrig.checked = defVal;
    wordEnabled = defVal;
  } else {
    wordEnabled = !wordEnabled;
    saveSettings();
updateMicroLevelForConfig();
  }

  if (!wordEnabled) {
    checkWordBtn.style.display = "none";
  } else {
    checkWordBtn.style.display = "inline-block";
  }
  
  checkWordBtn.style.animationDelay = "0s";
}

function shapeEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    shapeEnableTrig.checked = defVal;
    shapeEnabled = defVal;
  } else {
    shapeEnabled = !shapeEnabled;
    saveSettings();
updateMicroLevelForConfig();
  }

  if (!shapeEnabled) {
    checkShapeBtn.style.display = "none";
  } else {
    checkShapeBtn.style.display = "inline-block";
  }

  checkShapeBtn.style.animationDelay = "0s";
}

function cornerEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    cornerEnableTrig.checked = defVal;
    cornerEnabled = defVal;
  } else {
    cornerEnabled = !cornerEnabled;
    saveSettings();
updateMicroLevelForConfig();
  }
  
  if (!cornerEnabled) {
    shapeEnableTrigHandler(null, false);
    shapeEnableTrig.disabled = true;
    
    innerCube.style.display = "none";
    checkCornerBtn.style.display = "none";
    checkShapeBtn.style.display = "none";
  } else {
    shapeEnableTrig.disabled = false;
    
    innerCube.style.display = "block";
    checkCornerBtn.style.display = "inline-block";
  }
  
  innerFaceEls.forEach(face => face.style.animationDelay = "0s"),
  checkCornerBtn.style.animationDelay = "0s";
}

function soundEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    soundEnableTrig.checked = defVal;
    soundEnabled = defVal;
  } else {
    soundEnabled = !soundEnabled;
    saveSettings();
updateMicroLevelForConfig();
  }

  if (!soundEnabled) {
    checkSoundBtn.style.display = "none";
  } else {
    checkSoundBtn.style.display = "inline-block";
  }

  checkSoundBtn.style.animationDelay = "0s";
}

function colorEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    colorEnableTrig.checked = defVal;
    colorEnabled = defVal;
  } else {
    colorEnabled = !colorEnabled;
    saveSettings();
updateMicroLevelForConfig();
  }

  if (!colorEnabled) {
    checkColorBtn.style.display = "none";
  } else {
    checkColorBtn.style.display = "inline-block";
  }

  checkColorBtn.style.animationDelay = "0s"
}

function nLevelInputHandler(evt, defVal) {
  if (defVal != null) {
    // For backward compatibility, if an integer is passed
    if (Number.isInteger(defVal)) {
      currentMicroLevel = defVal * 1.0;
      nLevelInput.value = defVal;
    } else {
      currentMicroLevel = defVal;
      nLevelInput.value = formatMicroLevel(defVal);
    }
    // Set the traditional nLevel to the integer part
    nLevel = Math.floor(currentMicroLevel);
  } else {
    // Parse the input value as a float
    const inputValue = parseFloat(nLevelInput.value);
    
    // Validate the input
if (isNaN(inputValue) || inputValue < 2 || inputValue > 9.99) {
  nLevelInput.classList.add("input-incorrect");
  return; // Don't update if invalid
} else {
  nLevelInput.classList.remove("input-incorrect");
}

// Update the micro-level and standard nLevel
currentMicroLevel = Math.min(Math.max(inputValue, 2), 9.99);
    nLevel = Math.floor(currentMicroLevel);
    saveSettings();
  }

  // Always update the display to show the micro-level format
  nBackDisplay.innerHTML = formatMicroLevel(currentMicroLevel);
  // Update speed display
const speedDisplay = document.querySelector("#speed-display");
if (speedDisplay) {
  speedDisplay.innerHTML = getSpeedTarget(currentMicroLevel);
}
}

function sceneDimmerInputHandler(evt, defVal) {
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
  if (defVal != null) {
    baseDelayInput.value = defVal;
    baseDelay = defVal;
  } else {
    baseDelay = Math.min(Math.max(+baseDelayInput.value, 2000), 20000);
    saveSettings();
    // Update speed display with new base delay
    const speedDisplay = document.querySelector("#speed-display");
    if (speedDisplay) {
      speedDisplay.innerHTML = getSpeedTarget(currentMicroLevel);
    }
  }

  if (+baseDelayInput.value < 2000 || +baseDelayInput.value > 20000) {
    baseDelayInput.classList.add("input-incorrect");
  } else {
    baseDelayInput.classList.remove("input-incorrect");
  }
}

function maxAllowedMistakesInputHandler(evt, defVal) {
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


function previousLevelThresholdInputHandler(evt, defVal) {
  if (defVal != null) {
    previousLevelThresholdInput.value = defVal * 100;
    prevLevelThreshold = defVal;
  } else {
    prevLevelThreshold = +previousLevelThresholdInput.value / 100;
    saveSettings();
  }
}

function nextLevelThresholdInputHandler(evt, defVal) {
  if (defVal != null) {
    nextLevelThresholdInput.value = defVal * 100;
    nextLevelThreshold = defVal;
  } else {
    nextLevelThreshold = +nextLevelThresholdInput.value / 100;  
    saveSettings();
  }
}

function numStimuliSelectInputHandler(evt, defVal) {
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

// Function to set the active number of stimuli based on dimension count
function setActiveStimuli(dimensionCount) {
  // Disable all stimuli first
  wallsEnableTrigHandler(null, false);
  cameraEnableTrigHandler(null, false);
  faceEnableTrigHandler(null, false);
  positionEnableTrigHandler(null, false);
  wordEnableTrigHandler(null, false);
  shapeEnableTrigHandler(null, false);
  cornerEnableTrigHandler(null, false);
  soundEnableTrigHandler(null, false);
  colorEnableTrigHandler(null, false);
  
  // Enable stimuli based on dimension count
  switch(dimensionCount) {
    case 9:
      colorEnableTrigHandler(null, true);
      // Fall through to enable all previous stimuli too
    case 8:
      soundEnableTrigHandler(null, true);
    case 7:
      cornerEnableTrigHandler(null, true);
    case 6:
      shapeEnableTrigHandler(null, true);
    case 5:
      wordEnableTrigHandler(null, true);
    case 4:
      positionEnableTrigHandler(null, true);
    case 3:
      faceEnableTrigHandler(null, true);
    case 2:
      cameraEnableTrigHandler(null, true);
    case 1:
      wallsEnableTrigHandler(null, true);
      break;
    default:
      // Default to 2 stimuli
      wallsEnableTrigHandler(null, true);
      cameraEnableTrigHandler(null, true);
  }
}

// Utility functions
function setFloorBackground(floor, dimPercent, tileAHexColor, tileBHexColor) {
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
    document.querySelector(`[id^='binding-${stim}']`).value = key;
  }
  saveBindings();
}

function reloadBindKeys() {
  for (let [ stim, key ] of Object.entries(keyBindings)) {
    document.querySelector(`.bind-key-${stim}`).innerHTML = `(${key})`;
  }
}

function saveBindings() {
  const bindings = [...document.querySelectorAll("[id^='binding-']")];
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
  // Create a backup of current history before saving
  const backupKey = LS_HISTORY_KEY + "_backup";
  const currentHistory = localStorage.getItem(LS_HISTORY_KEY);
  if (currentHistory) {
    localStorage.setItem(backupKey, currentHistory);
  }
  
  // Ensure we're not saving null or undefined
  if (history) {
    localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(history));
  } else {
    console.error("Attempted to save undefined history");
    // Restore from backup if history is undefined
    const backup = localStorage.getItem(backupKey);
    if (backup) {
      history = JSON.parse(backup);
      localStorage.setItem(LS_HISTORY_KEY, backup);
    } else {
      // Reset to empty history structure
      history = {
        1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}
      };
      localStorage.setItem(LS_HISTORY_KEY, JSON.stringify(history));
    }
  }
}

function loadHistory() {
  const _history = JSON.parse(localStorage.getItem(LS_HISTORY_KEY));
  if (_history) {
    // Use deep copy to avoid reference issues
    history = deepCopy(_history);
    
    // Ensure all dimension levels exist in the history
    for (let i = 1; i <= 9; i++) {
      if (!history[i]) {
        history[i] = {};
      }
    }
  } else {
    // Add some demo data for display purposes if no history exists
    addDemoHistoryData();
  }
  console.log("Loaded history:", history);
}

// Function to add demo data for visualization purposes
function addDemoHistoryData() {
  const today = new Date().toLocaleDateString("sv");
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString("sv");
  
  // Add demo data for 3D
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
  
  // Add demo data for 4D
  history[4][today] = [{
    nLevel: 2,
    right: 24,
    missed: 6,
    wrong: 2,
    accuracy: 0.75,
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
  
  // Add demo data for 5D
  history[5][today] = [{
    nLevel: 2,
    right: 25,
    missed: 10,
    wrong: 5,
    accuracy: 0.625,
    outcome: 0,
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
    randomizeEnabled, 
    nLevel,
    currentMicroLevel,
    microLevelsByConfig,  // Save all config levels
    sessionHistoriesByConfig,  // Save all session histories
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
  
  // Restore multi-config data if available
  if (settings.microLevelsByConfig) {
    microLevelsByConfig = settings.microLevelsByConfig;
  }
  if (settings.sessionHistoriesByConfig) {
    sessionHistoriesByConfig = settings.sessionHistoriesByConfig;
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
  randomizeEnableTrigHandler(null, settings.randomizeEnabled || defVal_randomizeEnabled);
  
  // Load micro-level if available, otherwise use nLevel
if (settings.currentMicroLevel !== undefined) {
  // Upgrade level 1 saves to level 2
  const upgradeLevel = settings.currentMicroLevel < 2 ? 2.0 : settings.currentMicroLevel;
  nLevelInputHandler(null, upgradeLevel);
} else {
  // Upgrade level 1 saves to level 2
  const upgradeLevel = (settings.nLevel < 2) ? 2 : settings.nLevel;
  nLevelInputHandler(null, upgradeLevel);
}
  
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
  bindDialogContent.parentElement.show();
  for (const [stim, key] of Object.entries(keyBindings)) {
    document.querySelector("#binding-" + stim).value = key;
  }
}

function toggleOptions() {
  const settingsOpen = document.querySelector("#settings-open");
  settingsOpen.checked = !settingsOpen.checked;
}

function closeOptions() {
  document.querySelector("#settings-open").checked = false;
}

function getBar(n) {
  // Parse the value to ensure it's a number
  const numValue = parseFloat(n);
  const displayValue = isNaN(numValue) ? n : numValue.toFixed(2);
  const height = isNaN(numValue) ? 2 : numValue * 2;
  
  const html = `<div class="bar-chart-bar" style="height: ${height}rem;"><div>${displayValue}</div></div>`;
  const wrap = document.createElement("DIV");
  wrap.innerHTML = html;
  return wrap.firstChild;
}

function toggleStats(_dim) {
  // If no dimension specified and dialog is already open, close it
  if (!_dim && statsDialogContent.parentElement.hasAttribute("open")) {
    statsDialogContent.parentElement.close();
    return;
  }

  // Open the stats dialog
  statsDialogContent.parentElement.show();
  
  // Get the dimension to display (from parameter, localStorage, or default to 1)
  const dim = _dim || localStorage.getItem("last-dim") || 1;
  const radios = [...document.querySelectorAll("input[name='dimension']")];
  
  // Ensure dim is within range and update radio button
  const validDim = Math.min(Math.max(1, dim), 9);
  radios[validDim - 1].checked = true;

  // Update radio buttons to show which configs have data
radios.forEach((radio, index) => {
  const dimension = index + 1;
  const hasHistory = history[dimension] && Object.keys(history[dimension]).length > 0;
  const hasConfig = microLevelsByConfig[dimension] && microLevelsByConfig[dimension] > 2.00;
  
  const label = radio.parentElement.querySelector('div');
  if (label) {
    // Reset styles
    label.style.fontWeight = 'normal';
    label.style.opacity = '1';
    
    // Highlight configs with data
    if (hasHistory || hasConfig) {
      label.style.fontWeight = 'bold';
    } else {
      label.style.opacity = '0.5';
    }
    
    // Mark current active config
    if (dimension === getCurrentConfigKey()) {
      label.style.textDecoration = 'underline';
    } else {
      label.style.textDecoration = 'none';
    }
  }
});
  
  // Get history for the selected dimension
const _history = history[validDim];
const bars = document.querySelector(".bar-chart-bars");
bars.innerHTML = "";


  
  // Initialize stats variables
  let avgNLevel = 0;
  let minNLevel = 10;
  let maxNLevel = 0;
  let right = 0;
  let missed = 0;
  let wrong = 0;
  let totalAccuracy = 0;
  let pointsCount = 0;
  

  
  // Initialize stimuli totals
  let stimuliTotals = {
    walls: { right: 0, wrong: 0, matching: 0, present: false },
    camera: { right: 0, wrong: 0, matching: 0, present: false },
    face: { right: 0, wrong: 0, matching: 0, present: false },
    position: { right: 0, wrong: 0, matching: 0, present: false },
    word: { right: 0, wrong: 0, matching: 0, present: false },
    shape: { right: 0, wrong: 0, matching: 0, present: false },
    corner: { right: 0, wrong: 0, matching: 0, present: false },
    sound: { right: 0, wrong: 0, matching: 0, present: false },
    color: { right: 0, wrong: 0, matching: 0, present: false }
  };

  // Initialize speed tracking
    let speedProgression = {
      minSpeed: 10000,
      maxSpeed: 0,
      avgSpeed: 0,
      speedCount: 0,
      speedImprovement: 0
    };
  
  // Check if the history exists and has entries
const entries = _history ? Object.entries(_history) : [];

// Show message if no data for this configuration
if (entries.length === 0) {
  const noDataMsg = document.createElement('div');
  noDataMsg.style = "text-align: center; font-size: 1.5rem; margin: 2rem; opacity: 0.7;";
  noDataMsg.innerHTML = `No data yet for ${validDim}D configuration.<br>Play some sessions to see stats!`;
  bars.appendChild(noDataMsg);
}

// Process history entries if they exist
if (entries.length > 0) {
    for (const [date, points] of entries) {
      if (!Array.isArray(points) || points.length === 0) continue;
      
      let _avgNLevel = 0;
      let _minNLevel = 10;
      let _maxNLevel = 0;
      
      // Process each data point in this date
      for (const point of points) {
        // Calculate n-level stats
        _avgNLevel += point.nLevel || 0;
        _minNLevel = Math.min(_minNLevel, point.nLevel || 10);
        _maxNLevel = Math.max(_maxNLevel, point.nLevel || 0);
        minNLevel = Math.min(minNLevel, _minNLevel);
        maxNLevel = Math.max(maxNLevel, _maxNLevel);
        
        // Accumulate totals
        right += point.right || 0;
        missed += point.missed || 0;
        wrong += point.wrong || 0;
        pointsCount++;
        
        // Calculate accuracy
        if (point.accuracy !== undefined) {
          totalAccuracy += point.accuracy;
        } else {
          totalAccuracy += calculateAccuracy(point.right || 0, point.missed || 0, point.wrong || 0);
        }
        
        
        
        // Aggregate individual stimuli accuracy data if it exists
        if (point.stimuliData) {
          Object.entries(point.stimuliData).forEach(([key, data]) => {
            if (data && data.enabled) {
              stimuliTotals[key].present = true;
              stimuliTotals[key].right += data.right || 0;
              stimuliTotals[key].wrong += data.wrong || 0;
              stimuliTotals[key].matching += data.matching || 0;
            }
          });
        }
      }
      
// Create bar chart for this date's history data
if (points.length > 0) {
  _avgNLevel = _avgNLevel / points.length;
  avgNLevel += _avgNLevel;
  
  // Calculate average micro-level for this date
  let _avgMicroLevel = 0;
  let microCount = 0;
  for (const point of points) {
    if (point.microLevel !== undefined) {
      _avgMicroLevel += point.microLevel;
      microCount++;
    }
  }

  // Track speed progression
if (point.speedTarget !== undefined) {
  speedProgression.minSpeed = Math.min(speedProgression.minSpeed, point.speedTarget);
  speedProgression.maxSpeed = Math.max(speedProgression.maxSpeed, point.speedTarget);
  speedProgression.avgSpeed += point.speedTarget;
  speedProgression.speedCount++;
}
  
  // Create bar element showing N-level
const displayLevel = microCount > 0 ? (_avgMicroLevel / microCount).toFixed(2) : toOneDecimal(_avgNLevel);
const barElement = getBar(displayLevel);

// Add speed info to tooltip if available
let speedInfo = "";
if (points[0] && points[0].speedTarget) {
  speedInfo = `\nSpeed: ${points[0].speedTarget}ms`;
}

barElement.title = `Date: ${date}\nμ-Level: ${displayLevel}${speedInfo}`;
  
  bars.appendChild(barElement);
}
    }
    
    // Calculate overall average n-level
    if (entries.length > 0) {
      avgNLevel = avgNLevel / entries.length;
    }
  }
  
  // Update the stats display
  document.querySelector("#sc-avg").innerHTML = entries.length > 0 ? toOneDecimal(avgNLevel) : "-";
  document.querySelector("#sc-min").innerHTML = (minNLevel === 10) ? "-" : minNLevel;
  document.querySelector("#sc-max").innerHTML = maxNLevel || "-";
  // Show micro-level for the selected configuration
const selectedConfigLevel = microLevelsByConfig[validDim] || 2.00;
document.querySelector("#sc-micro-level").innerHTML = formatMicroLevel(selectedConfigLevel);
  // Display current speed target
const currentSpeedElement = document.createElement('div');
currentSpeedElement.style = "text-align: center; font-size: 1rem; margin-top: 0.5rem; opacity: 0.8;";
currentSpeedElement.innerHTML = `Current Speed: ${getSpeedTarget(currentMicroLevel)}ms`;

const microLevelCard = document.querySelector("#sc-micro-level").parentElement;
if (microLevelCard && !microLevelCard.querySelector('.speed-info')) {
  currentSpeedElement.className = 'speed-info';
  microLevelCard.appendChild(currentSpeedElement);
}
  document.querySelector("#sc-right").innerHTML = right || "-";
  document.querySelector("#sc-missed").innerHTML = missed || "-";
  document.querySelector("#sc-wrong").innerHTML = wrong || "-";
  
  // Update accuracy in the stats dialog
  const accuracyElement = document.querySelector("#sc-accuracy");
  if (accuracyElement) {
    if (pointsCount > 0) {
      const avgAccuracy = totalAccuracy / pointsCount;
      accuracyElement.innerHTML = (avgAccuracy * 100).toFixed(0) + "%";
    } else {
      accuracyElement.innerHTML = "-%";
    }
  }

  
  // Update individual stimuli accuracy display
  updateStimuliAccuracyDisplay(stimuliTotals);
  // Store the last displayed dimension
localStorage.setItem("last-dim", validDim);

  // Update speed range display
const speedRangeStart = document.querySelector("#speed-range-start");
const speedRangeEnd = document.querySelector("#speed-range-end");

if (speedRangeStart) {
  speedRangeStart.innerHTML = baseDelay + "ms";
}
if (speedRangeEnd) {
  speedRangeEnd.innerHTML = Math.round(baseDelay * 0.5) + "ms";
}

// Also add d-prime average to stats if available
let totalDPrime = 0;
let dPrimeCount = 0;
let totalBias = 0;
let biasCount = 0;
let totalLureResistance = 0;
let lureResistanceCount = 0;

for (const [date, points] of entries) {
  if (!Array.isArray(points) || points.length === 0) continue;
  
  for (const point of points) {
    if (point.dPrime !== undefined && !isNaN(point.dPrime)) {
      totalDPrime += point.dPrime;
      dPrimeCount++;
    }
    if (point.responseBias !== undefined && !isNaN(point.responseBias)) {
      totalBias += point.responseBias;
      biasCount++;
    }
    if (point.n1LureResistance !== undefined && !isNaN(point.n1LureResistance)) {
      totalLureResistance += point.n1LureResistance;
      lureResistanceCount++;
    }
  }
}

// Update average d'prime
const dPrimeElement = document.querySelector("#sc-dprime");
if (dPrimeElement) {
  if (dPrimeCount > 0) {
    dPrimeElement.innerHTML = (totalDPrime / dPrimeCount).toFixed(2);
  } else {
    dPrimeElement.innerHTML = "-";
  }
}

// Update signal detection metrics section
const avgDPrimeElement = document.querySelector("#sc-avg-dprime");
if (avgDPrimeElement) {
  avgDPrimeElement.innerHTML = dPrimeCount > 0 ? (totalDPrime / dPrimeCount).toFixed(2) : "-";
}

const avgBiasElement = document.querySelector("#sc-avg-bias");
if (avgBiasElement) {
  avgBiasElement.innerHTML = biasCount > 0 ? (totalBias / biasCount).toFixed(2) : "-";
}

const avgLureElement = document.querySelector("#sc-avg-lure");
if (avgLureElement) {
  avgLureElement.innerHTML = lureResistanceCount > 0 ? 
    ((totalLureResistance / lureResistanceCount) * 100).toFixed(0) + "%" : "-";
}
}

// Calculate and display baseline metrics
const configHistory = sessionHistoriesByConfig[validDim] || [];
const baseline = calculateBaseline(configHistory);

const baselineDPrimeElement = document.querySelector("#sc-baseline-dprime");
if (baselineDPrimeElement) {
  baselineDPrimeElement.innerHTML = baseline.avgDPrime.toFixed(2);
}

const baselineLureElement = document.querySelector("#sc-baseline-lure");
if (baselineLureElement) {
  baselineLureElement.innerHTML = (baseline.n1LureResistance * 100).toFixed(0) + "%";
}

// Update speed statistics
const minSpeedElement = document.querySelector("#sc-min-speed");
const avgSpeedElement = document.querySelector("#sc-avg-speed");
const maxSpeedElement = document.querySelector("#sc-max-speed");

if (speedProgression.speedCount > 0) {
  if (minSpeedElement) {
    minSpeedElement.innerHTML = speedProgression.minSpeed + "ms";
  }
  if (avgSpeedElement) {
    avgSpeedElement.innerHTML = Math.round(speedProgression.avgSpeed / speedProgression.speedCount) + "ms";
  }
  if (maxSpeedElement) {
    maxSpeedElement.innerHTML = speedProgression.maxSpeed + "ms";
  }
} else {
  if (minSpeedElement) minSpeedElement.innerHTML = "-";
  if (avgSpeedElement) avgSpeedElement.innerHTML = "-";
  if (maxSpeedElement) maxSpeedElement.innerHTML = "-";
}

function updateStimuliAccuracyDisplay(totals) {
  // Hide all items first
  document.querySelectorAll('.stimuli-accuracy-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // For each stimulus type, calculate and display accuracy if present
  Object.entries(totals).forEach(([key, data]) => {
    const itemElement = document.getElementById(`${key}-accuracy-item`);
    const valueElement = document.getElementById(`${key}-accuracy`);
    
    if (itemElement && valueElement) {
      if (data.present && data.matching > 0) {
        // Calculate accuracy
        const accuracy = calculateAccuracy(data.right, data.matching - data.right, data.wrong) * 100;
        
        // Update display
        valueElement.textContent = accuracy.toFixed(0) + "%";
        itemElement.classList.add('active');
      } else {
        valueElement.textContent = "-%";
        // Only show if this stimulus was ever used
        if (data.present) {
          itemElement.classList.add('active');
        }
      }
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

// Create blocks with fixed match density
function createBlocksWithFixedDensity(symbols, n, matchDensity = 0.25) {
  // Calculate total trials needed based on target matches and desired density
  const targetMatches = targetNumOfStimuli;
  const totalTrials = Math.ceil(targetMatches / matchDensity);
  
  // Initialize blocks array
  let blocks = Array(totalTrials).fill(null);
  let placedMatches = 0;
  
  // First phase: place target matches with n-back spacing
  while (placedMatches < targetMatches) {
    // Find a position that can have a match (must be at least n positions from the end)
    let rnd = Math.floor(Math.random() * (blocks.length - n));
    
    // Ensure both positions are available
    if (!blocks[rnd] && !blocks[rnd + n]) {
      // Select a random symbol
      const symbol = random(symbols);
      
      // Place the first occurrence (not a match)
      blocks[rnd] = {
        isMatching: false,
        symbol: symbol
      };
      
      // Place the second occurrence (is a match, n positions later)
      blocks[rnd + n] = {
        isMatching: true,
        symbol: symbol
      };
      
      placedMatches++;
    }
  }
  
  // Second phase: fill remaining positions with non-matching stimuli
  for (let i = 0; i < blocks.length; i++) {
    if (!blocks[i]) {
      let symbol = random(symbols);
      
      // Ensure we don't accidentally create matches
      if (i >= n && blocks[i - n]) {
        // Avoid creating n-back matches
        while (blocks[i - n].symbol === symbol) {
          symbol = random(symbols);
        }
      }
      
      if (i + n < blocks.length && blocks[i + n]) {
        // Avoid creating forward matches that would make a future position match
        while (blocks[i + n].symbol === symbol) {
          symbol = random(symbols);
        }
      }
      
      blocks[i] = {
        isMatching: false,
        symbol: symbol
      };
    }
  }
  
  // Calculate actual match density for logging
  const actualMatches = blocks.filter(b => b.isMatching).length;
  const actualDensity = actualMatches / blocks.length;
  console.log(`Created blocks with ${actualMatches} matches out of ${blocks.length} trials (${(actualDensity * 100).toFixed(1)}%)`);
  
  return blocks;
}

// Function to place both N-1 and N+1 lures in the stimulus sequence
function placeLures(blocks, n, lureFrequency = 0.10) {
  // Split the lure frequency between N-1 and N+1 lures (more weight to N-1)
  const n1LureFreq = lureFrequency * 0.80; // 80% of lures are N-1 
  const nPlusLureFreq = lureFrequency * 0.20; // 20% of lures are N+1
  
  // Calculate how many lures of each type to place
  const numN1Lures = Math.floor(blocks.length * n1LureFreq);
  const numNPlusLures = Math.floor(blocks.length * nPlusLureFreq);
  
  console.log(`Planning to place ${numN1Lures} N-1 lures and ${numNPlusLures} N+1 lures`);
  
  // First place N-1 lures (higher priority)
  let placedN1Lures = 0;
  let attempts = 0;
  const maxAttempts = blocks.length * 2; // Prevent infinite loops
  
  while (placedN1Lures < numN1Lures && attempts < maxAttempts) {
    attempts++;
    
    // Find a position that can have an N-1 lure (must be at least 1 position from start)
    let rnd = Math.floor(Math.random() * (blocks.length - 1)) + 1;
    
    // Skip if this position already has something special
    if (!blocks[rnd] || blocks[rnd].isLure || blocks[rnd].isMatching) {
      continue;
    }
    
    // Get the symbol from the previous position (N-1)
    const prevSymbol = blocks[rnd - 1] ? blocks[rnd - 1].symbol : null;
    
    // Only place lure if there's a valid previous symbol
    if (prevSymbol) {
      // Place the N-1 lure
      blocks[rnd] = {
        isMatching: false, // It's NOT a match but looks like it should be
        isLure: true,      // Mark as a lure
        lureType: 'n-1',   // Specify the lure type
        symbol: prevSymbol  // Use the symbol from n-1 position
      };
      
      placedN1Lures++;
    }
  }
  
  // Now place N+1 lures
  let placedNPlusLures = 0;
  attempts = 0;
  
  while (placedNPlusLures < numNPlusLures && attempts < maxAttempts) {
    attempts++;
    
    // Find a position that can have an N+1 lure (must not be too close to end)
    let rnd = Math.floor(Math.random() * (blocks.length - 2));
    
    // Skip if this position already has something special
    if (!blocks[rnd] || blocks[rnd].isLure || blocks[rnd].isMatching || !blocks[rnd + 1]) {
      continue;
    }
    
    // Get the symbol from the next position (N+1)
    const nextSymbol = blocks[rnd + 1].symbol;
    
    // Place the N+1 lure
    blocks[rnd] = {
      isMatching: false, // It's NOT a match but looks like it should be
      isLure: true,      // Mark as a lure
      lureType: 'n+1',   // Specify the lure type
      symbol: nextSymbol  // Use the symbol from n+1 position
    };
    
    placedNPlusLures++;
  }
  
  console.log(`Placed ${placedN1Lures} N-1 lures and ${placedNPlusLures} N+1 lures (total ${placedN1Lures + placedNPlusLures} lures)`);
  
  return blocks;
}

// Function to create blocks with both fixed density and lures
function createBlocksWithLures(symbols, n, matchDensity = 0.23, lureFrequency = 0.10) {
  // First create blocks with fixed match density
  let blocks = createBlocksWithFixedDensity(symbols, n, matchDensity);
  
  // Then add systematic lures
  blocks = placeLures(blocks, n, lureFrequency);
  
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
  
  move(cube, initialCubePosition);
  move(innerCube, initialInnerCubePosition);
  rotateCamera(-40, -45);
  floors.forEach(floor =>
    setFloorBackground(
      floor,
      sceneDimmer,
      tileAHexColor,
      tileBHexColor
    )
  );
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
  
  checkWallsBtn.classList.remove("right", "wrong");
  checkCameraBtn.classList.remove("right", "wrong");
  checkFaceBtn.classList.remove("right", "wrong");
  checkPositionBtn.classList.remove("right", "wrong");
  
  checkWordBtn.classList.remove("right", "wrong");
  checkShapeBtn.classList.remove("right", "wrong");
  checkCornerBtn.classList.remove("right", "wrong");
  checkSoundBtn.classList.remove("right", "wrong");
  checkColorBtn.classList.remove("right", "wrong");
}

// Track misses and correct rejections at the end of each stimulus presentation
function trackMissedStimuli() {
  // Check for misses (matching stimuli that weren't responded to)
  if (currWalls && currWalls.isMatching && enableWallsCheck) {
    sessionMetrics.misses++;
  } else if (currWalls && !currWalls.isMatching && enableWallsCheck) {
    // Correct rejection: non-matching stimulus correctly ignored
    sessionMetrics.correctRejections++;
    
    // Track lure correct rejections
    if (currWalls.isLure) {
      if (currWalls.lureType === 'n-1') {
        sessionMetrics.n1LureEncounters = sessionMetrics.n1LureEncounters || 0;
        sessionMetrics.n1LureCorrectRejections = sessionMetrics.n1LureCorrectRejections || 0;
        
        sessionMetrics.n1LureEncounters++;
        sessionMetrics.n1LureCorrectRejections++;
      } else if (currWalls.lureType === 'n+1') {
        sessionMetrics.nPlusLureEncounters = sessionMetrics.nPlusLureEncounters || 0;
        sessionMetrics.nPlusLureCorrectRejections = sessionMetrics.nPlusLureCorrectRejections || 0;
        
        sessionMetrics.nPlusLureEncounters++;
        sessionMetrics.nPlusLureCorrectRejections++;
      }
    }
  }
  
  // Camera stimulus
  if (currCamera && currCamera.isMatching && enableCameraCheck) {
    sessionMetrics.misses++;
  } else if (currCamera && !currCamera.isMatching && enableCameraCheck) {
    sessionMetrics.correctRejections++;
    if (currCamera.isLure) {
      if (currCamera.lureType === 'n-1') {
        sessionMetrics.n1LureEncounters = sessionMetrics.n1LureEncounters || 0;
        sessionMetrics.n1LureCorrectRejections = sessionMetrics.n1LureCorrectRejections || 0;
        
        sessionMetrics.n1LureEncounters++;
        sessionMetrics.n1LureCorrectRejections++;
      } else if (currCamera.lureType === 'n+1') {
        sessionMetrics.nPlusLureEncounters = sessionMetrics.nPlusLureEncounters || 0;
        sessionMetrics.nPlusLureCorrectRejections = sessionMetrics.nPlusLureCorrectRejections || 0;
        
        sessionMetrics.nPlusLureEncounters++;
        sessionMetrics.nPlusLureCorrectRejections++;
      }
    }
  }
  
  // Face stimulus
  if (currFace && currFace.isMatching && enableFaceCheck) {
    sessionMetrics.misses++;
  } else if (currFace && !currFace.isMatching && enableFaceCheck) {
    sessionMetrics.correctRejections++;
    if (currFace.isLure) {
      if (currFace.lureType === 'n-1') {
        sessionMetrics.n1LureEncounters = sessionMetrics.n1LureEncounters || 0;
        sessionMetrics.n1LureCorrectRejections = sessionMetrics.n1LureCorrectRejections || 0;
        
        sessionMetrics.n1LureEncounters++;
        sessionMetrics.n1LureCorrectRejections++;
      } else if (currFace.lureType === 'n+1') {
        sessionMetrics.nPlusLureEncounters = sessionMetrics.nPlusLureEncounters || 0;
        sessionMetrics.nPlusLureCorrectRejections = sessionMetrics.nPlusLureCorrectRejections || 0;
        
        sessionMetrics.nPlusLureEncounters++;
        sessionMetrics.nPlusLureCorrectRejections++;
      }
    }
  }
  
  // Position stimulus
  if (currPosition && currPosition.isMatching && enablePositionCheck) {
    sessionMetrics.misses++;
  } else if (currPosition && !currPosition.isMatching && enablePositionCheck) {
    sessionMetrics.correctRejections++;
    if (currPosition.isLure) {
      if (currPosition.lureType === 'n-1') {
        sessionMetrics.n1LureEncounters = sessionMetrics.n1LureEncounters || 0;
        sessionMetrics.n1LureCorrectRejections = sessionMetrics.n1LureCorrectRejections || 0;
        
        sessionMetrics.n1LureEncounters++;
        sessionMetrics.n1LureCorrectRejections++;
      } else if (currPosition.lureType === 'n+1') {
        sessionMetrics.nPlusLureEncounters = sessionMetrics.nPlusLureEncounters || 0;
        sessionMetrics.nPlusLureCorrectRejections = sessionMetrics.nPlusLureCorrectRejections || 0;
        
        sessionMetrics.nPlusLureEncounters++;
        sessionMetrics.nPlusLureCorrectRejections++;
      }
    }
  }
  
  // Word stimulus
  if (currWord && currWord.isMatching && enableWordCheck) {
    sessionMetrics.misses++;
  } else if (currWord && !currWord.isMatching && enableWordCheck) {
    sessionMetrics.correctRejections++;
    if (currWord.isLure) {
      if (currWord.lureType === 'n-1') {
        sessionMetrics.n1LureEncounters = sessionMetrics.n1LureEncounters || 0;
        sessionMetrics.n1LureCorrectRejections = sessionMetrics.n1LureCorrectRejections || 0;
        
        sessionMetrics.n1LureEncounters++;
        sessionMetrics.n1LureCorrectRejections++;
      } else if (currWord.lureType === 'n+1') {
        sessionMetrics.nPlusLureEncounters = sessionMetrics.nPlusLureEncounters || 0;
        sessionMetrics.nPlusLureCorrectRejections = sessionMetrics.nPlusLureCorrectRejections || 0;
        
        sessionMetrics.nPlusLureEncounters++;
        sessionMetrics.nPlusLureCorrectRejections++;
      }
    }
  }
  
  // Shape stimulus
  if (currShape && currShape.isMatching && enableShapeCheck) {
    sessionMetrics.misses++;
  } else if (currShape && !currShape.isMatching && enableShapeCheck) {
    sessionMetrics.correctRejections++;
    if (currShape.isLure) {
      if (currShape.lureType === 'n-1') {
        sessionMetrics.n1LureEncounters = sessionMetrics.n1LureEncounters || 0;
        sessionMetrics.n1LureCorrectRejections = sessionMetrics.n1LureCorrectRejections || 0;
        
        sessionMetrics.n1LureEncounters++;
        sessionMetrics.n1LureCorrectRejections++;
      } else if (currShape.lureType === 'n+1') {
        sessionMetrics.nPlusLureEncounters = sessionMetrics.nPlusLureEncounters || 0;
        sessionMetrics.nPlusLureCorrectRejections = sessionMetrics.nPlusLureCorrectRejections || 0;
        
        sessionMetrics.nPlusLureEncounters++;
        sessionMetrics.nPlusLureCorrectRejections++;
      }
    }
  }
  
  // Corner stimulus
  if (currCorner && currCorner.isMatching && enableCornerCheck) {
    sessionMetrics.misses++;
  } else if (currCorner && !currCorner.isMatching && enableCornerCheck) {
    sessionMetrics.correctRejections++;
    if (currCorner.isLure) {
      if (currCorner.lureType === 'n-1') {
        sessionMetrics.n1LureEncounters = sessionMetrics.n1LureEncounters || 0;
        sessionMetrics.n1LureCorrectRejections = sessionMetrics.n1LureCorrectRejections || 0;
        
        sessionMetrics.n1LureEncounters++;
        sessionMetrics.n1LureCorrectRejections++;
      } else if (currCorner.lureType === 'n+1') {
        sessionMetrics.nPlusLureEncounters = sessionMetrics.nPlusLureEncounters || 0;
        sessionMetrics.nPlusLureCorrectRejections = sessionMetrics.nPlusLureCorrectRejections || 0;
        
        sessionMetrics.nPlusLureEncounters++;
        sessionMetrics.nPlusLureCorrectRejections++;
      }
    }
  }
  
  // Sound stimulus
  if (currSound && currSound.isMatching && enableSoundCheck) {
    sessionMetrics.misses++;
  } else if (currSound && !currSound.isMatching && enableSoundCheck) {
    sessionMetrics.correctRejections++;
    if (currSound.isLure) {
      if (currSound.lureType === 'n-1') {
        sessionMetrics.n1LureEncounters = sessionMetrics.n1LureEncounters || 0;
        sessionMetrics.n1LureCorrectRejections = sessionMetrics.n1LureCorrectRejections || 0;
        
        sessionMetrics.n1LureEncounters++;
        sessionMetrics.n1LureCorrectRejections++;
      } else if (currSound.lureType === 'n+1') {
        sessionMetrics.nPlusLureEncounters = sessionMetrics.nPlusLureEncounters || 0;
        sessionMetrics.nPlusLureCorrectRejections = sessionMetrics.nPlusLureCorrectRejections || 0;
        
        sessionMetrics.nPlusLureEncounters++;
        sessionMetrics.nPlusLureCorrectRejections++;
      }
    }
  }
  
  // Color stimulus
  if (currColor && currColor.isMatching && enableColorCheck) {
    sessionMetrics.misses++;
  } else if (currColor && !currColor.isMatching && enableColorCheck) {
    sessionMetrics.correctRejections++;
    if (currColor.isLure) {
      if (currColor.lureType === 'n-1') {
        sessionMetrics.n1LureEncounters = sessionMetrics.n1LureEncounters || 0;
        sessionMetrics.n1LureCorrectRejections = sessionMetrics.n1LureCorrectRejections || 0;
        
        sessionMetrics.n1LureEncounters++;
        sessionMetrics.n1LureCorrectRejections++;
      } else if (currColor.lureType === 'n+1') {
        sessionMetrics.nPlusLureEncounters = sessionMetrics.nPlusLureEncounters || 0;
        sessionMetrics.nPlusLureCorrectRejections = sessionMetrics.nPlusLureCorrectRejections || 0;
        
        sessionMetrics.nPlusLureEncounters++;
        sessionMetrics.nPlusLureCorrectRejections++;
      }
    }
  }
}

function resetIntervals() {
  intervals.forEach(interval => 
    clearInterval(interval)
  );
}

function rotateCamera(cx, cy) {
  scene.style.transform = `rotateX(${cx}deg) rotateY(${cy}deg)`;
  shape.style.transform = `translate(-50%, -50%) rotateY(${-cy}deg) rotateX(${-cx}deg)`;
}

function move(el, currPosString) {
  el.style.transform = `translate3d(${currPosString})`;
}

function wow(htmlElement, cssClass, delay) {
  htmlElement.classList.add(cssClass);
  setTimeout(() => 
    htmlElement.classList.remove(cssClass)
  , delay);
}

function speak(text) {
  let utter = new SpeechSynthesisUtterance();
  utter.lang = 'en-US';
  utter.text = text;
  speechSynthesis.speak(utter);
  return utter;
}

function writeWord(word) {
  wallWords.forEach(wall => {
    wall.innerText = word;
    wow(wall, "text-white", baseDelay - 300);
  });
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
    if (selectedStimulus.name === "corner") {
      shapeEnableTrig.disabled = false;
    }
  });
  
  console.log("Randomly selected stimuli:", 
    selectedIndices.map(index => stimuliTypes[index].name));
}

function getGameCycle(n) {
  // Calculate lure frequency based on micro-level progress
  const { nLevel, microProgress } = getMicroLevelComponents(currentMicroLevel);
  
  // Scale lure frequency based on micro-level progress (10% at .00, up to 25% at .50, stays at 25% after)
  const baseLureFreq = 0.05;
  const maxLureFreq = 0.25;
  // Cap progress at 0.5 so lures max out at x.50
  const cappedProgress = Math.min(microProgress, 0.5);
  const lureFrequency = baseLureFreq + (cappedProgress * 2 * (maxLureFreq - baseLureFreq));
  
  console.log(`Current micro-level: ${formatMicroLevel(currentMicroLevel)}, Lure frequency: ${(lureFrequency * 100).toFixed(1)}%`);
  
  let walls;
  if (wallsEnabled) {
    walls = createBlocksWithLures(wallColorsList, n, 0.25, lureFrequency);
    matchingWalls = walls.filter(block => block && block.isMatching).length;
  }
  let cameras;
  if (cameraEnabled) {
    cameras = createBlocksWithLures(points, n, 0.25, lureFrequency);
    matchingCamera = cameras.filter(block => block && block.isMatching).length;
  }
  let faces;
  if (faceEnabled) {
    faces = createBlocksWithLures(numbers, n, 0.25, lureFrequency);
    matchingFace = faces.filter(block => block && block.isMatching).length;
  }
  let positions;
  if (positionEnabled) {
    positions = createBlocksWithLures(moves, n, 0.25, lureFrequency);
    matchingPosition = positions.filter(block => block && block.isMatching).length;
  }
  
  let words;
  if (wordEnabled) {
    words = createBlocksWithLures(wordsList, n, 0.25, lureFrequency);
    matchingWord = words.filter(block => block && block.isMatching).length;
  }
  let shapes;
  if (shapeEnabled) {
    shapes = createBlocksWithLures(shapeClasses, n, 0.25, lureFrequency);
    matchingShape = shapes.filter(block => block && block.isMatching).length;
  }
  let corners;
  if (cornerEnabled) {
    corners = createBlocksWithLures(cornersList, n, 0.25, lureFrequency);
    matchingCorner = corners.filter(block => block && block.isMatching).length;
  }
  let sounds;
  if (soundEnabled) {
    sounds = createBlocksWithLures(letters, n, 0.25, lureFrequency);
    matchingSound = sounds.filter(block => block && block.isMatching).length;
  }
  let colors;
  if (colorEnabled) {
    colors = createBlocksWithLures(colorClasses, n, 0.25, lureFrequency);
    matchingColor = colors.filter(block => block && block.isMatching).length;
  }
  
  console.log(
    walls, cameras, faces, positions, words, shapes, corners, sounds, colors
  );
  
  let i = 0;
  return function() {
  // Add this line right at the beginning of the function
  if (currWalls || currCamera || currFace || currPosition || currWord || currShape || currCorner || currSound || currColor) {
    trackMissedStimuli(); // Track any missed stimuli from the previous presentation
  }
  
  resetBlock();
    
    if (!isRunning) {
      return;
    }
    
    let length = targetNumOfStimuli * (n + 2) + targetNumOfStimuli;
    let dimensions = 0;
    
    // End game
    if (i > length - 1) {
      let correctStimuli = 0;
      let mistakes = 0;
      
      // Calculate dimensions and correct stimuli count
      if (wallsEnabled) {
        dimensions++;
        correctStimuli += rightWalls;
        mistakes += wrongWalls;
      }
      if (cameraEnabled) {
        dimensions++;
        correctStimuli += rightCamera;
        mistakes += wrongCamera;
      }
      if (faceEnabled) {
        dimensions++;
        correctStimuli += rightFace;
        mistakes += wrongFace;
      }
      if (positionEnabled) {
        dimensions++;
        correctStimuli += rightPosition;
        mistakes += wrongPosition;
      }
      if (wordEnabled) {
        dimensions++;
        correctStimuli += rightWord;
        mistakes += wrongWord;
      }
      if (cornerEnabled) {
        dimensions++;
        correctStimuli += rightCorner;
        mistakes += wrongCorner;
        if (shapeEnabled) {
          dimensions++;
          correctStimuli += rightShape;
          mistakes += wrongShape;
        }
      }
      if (soundEnabled) {
        dimensions++;
        correctStimuli += rightSound;
        mistakes += wrongSound;
      }
      if (colorEnabled) {
        dimensions++;
        correctStimuli += rightColor;
        mistakes += wrongColor;
      }
      
      // Calculate missed signals (stimuli that should have been identified but weren't)
      const missed = matchingStimuli - correctStimuli;
      
      console.log("matchingStimuli", matchingStimuli);
      console.log("correctStimuli", correctStimuli);
      console.log("missed", missed);
      console.log("mistakes", mistakes);
      console.log("dimensions", dimensions);
      
      // Calculate accuracy
      const accuracy = calculateAccuracy(correctStimuli, missed, mistakes);
      // Calculate percentage for level up/down decisions
      const percentage = accuracy;
      
      console.log("Accuracy:", (accuracy * 100).toFixed(2) + "%");
      console.log("Percentage:", (percentage * 100).toFixed(2) + "%");
      
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
      
      // Important: Stop the game *after* we've collected all the data
      // but before updating the UI
      resetIntervals();
      isRunning = false;
      
      document.querySelector(".stop").classList.add("active");
      document.querySelector(".play").classList.remove("active");


      // Update the recap dialog
      const resDim = document.querySelector("#res-dim");
      const resRight = document.querySelector("#sc-res-right");
      const resMissed = document.querySelector("#sc-res-missed");
      const resWrong = document.querySelector("#sc-res-wrong");
      const lvlRes = document.querySelectorAll("[class^='lvl-res']");
      [...lvlRes].forEach(el => el.style.display = "none");

      // Update speed information in recap
      const speedTargetElement = document.querySelector("#sc-res-speed-target");
      const speedChangeElement = document.querySelector("#sc-res-speed-change");
      
      if (speedTargetElement) {
        const currentSpeed = getSpeedTarget(currentMicroLevel);
        const previousSpeed = getSpeedTarget(historyPoint.microLevel);
        
        speedTargetElement.innerHTML = currentSpeed + "ms";
        
        // Show speed change if level changed
        if (newLevel !== originalLevel) {
          const newSpeed = getSpeedTarget(newMicroLevel);
          const speedDiff = previousSpeed - newSpeed;
          
          if (speedDiff > 0) {
            speedChangeElement.innerHTML = ` (${speedDiff}ms faster!)`;
            speedChangeElement.style.color = "#4CAF50";
          } else if (speedDiff < 0) {
            speedChangeElement.innerHTML = ` (${Math.abs(speedDiff)}ms slower)`;
            speedChangeElement.style.color = "#FF9800";
          }
        } else {
          speedChangeElement.innerHTML = "";
        }
      }

      resDim.innerHTML = getCurrentConfigKey() + "D";
      resRight.innerHTML = correctStimuli;
      resMissed.innerHTML = missed;
      resWrong.innerHTML = mistakes;
      
      // Update accuracy in the recap dialog if the element exists
const accuracyElement = document.querySelector("#sc-res-accuracy");
if (accuracyElement) {
  accuracyElement.innerHTML = (accuracy * 100).toFixed(0) + "%";
}

// Add d'-prime display to the recap dialog
const recapDiv = document.createElement('div');
recapDiv.style = "text-align: center; font-size: 1.5rem; margin-top: 1rem; margin-bottom: 1rem;";
recapDiv.innerHTML = `d'-Prime: <span>${sessionMetrics.dPrime.toFixed(2)}</span>`;
accuracyElement.parentNode.insertAdjacentElement('afterend', recapDiv);

// Add lure resistance display if lures were encountered
if (sessionMetrics.n1LureEncounters && sessionMetrics.n1LureEncounters > 0) {
  const lureResistanceDiv = document.createElement('div');
  lureResistanceDiv.style = "text-align: center; font-size: 1.5rem; margin-bottom: 1rem;";
  lureResistanceDiv.innerHTML = `Lure Resistance: <span>${(sessionMetrics.n1LureResistance * 100).toFixed(0)}%</span>`;
  recapDiv.insertAdjacentElement('afterend', lureResistanceDiv);
}




// Calculate new micro-level based on d-prime and lure resistance
const configHistory = sessionHistoriesByConfig[currentConfig] || [];
const newMicroLevel = checkMicroLevelAdvancement(sessionMetrics, configHistory);

// Check if there's a change in integer level for UI display
const originalLevel = nLevel;
const newLevel = Math.floor(newMicroLevel);
const levelChanged = newLevel !== originalLevel;

// Update micro-level
currentMicroLevel = newMicroLevel;

     const historyPoint = {
  nLevel,
  microLevel: currentMicroLevel,  // Store micro-level
  right: correctStimuli,
  missed,
  wrong: mistakes,
  accuracy: accuracy,
  // Signal detection metrics
  dPrime: 0,  // Will be set after calculation
  responseBias: 0,  // Will be set after calculation
  n1LureResistance: 0,  // Will be set if lures present
  // Lure metrics
  n1LureEncounters: sessionMetrics.n1LureEncounters || 0,
  n1LureCorrectRejections: sessionMetrics.n1LureCorrectRejections || 0,
  n1LureFalseAlarms: sessionMetrics.n1LureFalseAlarms || 0,
  // Overall result
  outcome: 0,  // -1 for level down, 0 for stay, 1 for level up
  stimuliData: stimuliData,
  // Speed information
  speedTarget: getSpeedTarget(currentMicroLevel),
  baseDelay: baseDelay
};

// Save the updated history point with d-prime info
historyPoint.dPrime = sessionMetrics.dPrime;
historyPoint.microLevel = newMicroLevel;
historyPoint.outcome = newLevel > originalLevel ? 1 : (newLevel < originalLevel ? -1 : 0);

      localStorage.setItem("last-dim", dimensions);
      

      if (levelChanged) {
  if (newLevel > originalLevel) {
    // Level up
    document.querySelector(".lvl-res-move").style.display = "block";
    document.querySelector(".lvl-before").innerHTML = originalLevel;
    document.querySelector(".lvl-after").innerHTML = newLevel;
    // Update nLevel for game state
    nLevelInputHandler(null, newMicroLevel);
// Restart game with new speed if currently running
if (isRunning) {
  resetIntervals();
  intervals.push(
    setInterval(getGameCycle(nLevel), getSpeedTarget(newMicroLevel))
  );
}
  } else if (newLevel < originalLevel) {
    // Level down
    document.querySelector(".lvl-res-move").style.display = "block";
    document.querySelector(".lvl-before").innerHTML = originalLevel;
    document.querySelector(".lvl-after").innerHTML = newLevel;
    // Update nLevel for game state
    nLevelInputHandler(null, newMicroLevel);
// Restart game with new speed if currently running
if (isRunning) {
  resetIntervals();
  intervals.push(
    setInterval(getGameCycle(nLevel), getSpeedTarget(newMicroLevel))
  );
}
  }
} else {
  // Level stays the same (micro-level may have changed)
  document.querySelector(".lvl-res-stay").style.display = "block";
  document.querySelector(".lvl-stays").innerHTML = originalLevel;
  
  // Show reason if accuracy blocked advancement
  if (!goodAccuracy && goodDPrime) {
    const accuracyMsg = document.createElement('div');
    accuracyMsg.style = "text-align: center; font-size: 1.2rem; margin-top: 1rem; color: #FF9800;";
    accuracyMsg.innerHTML = `Advancement blocked: ${(accuracy * 100).toFixed(0)}% accuracy (need 90%)`;
    document.querySelector(".lvl-res-stay").appendChild(accuracyMsg);
  }
  
  // Update nLevel for game state (to reflect micro-level changes)
  nLevelInputHandler(null, newMicroLevel);
}

// Restart game with new speed if currently running (applies to all cases)
if (isRunning) {
  resetIntervals();
  intervals.push(
    setInterval(getGameCycle(nLevel), getSpeedTarget(newMicroLevel))
  );
}
      
      // Save history and show results
      const datestamp = new Date().toLocaleDateString("sv");
      history[dimensions][datestamp] = history[dimensions][datestamp] || [];
      history[dimensions][datestamp].push(historyPoint);
      console.log("history", history);
      
      saveSettings();
      saveHistory();



      // Calculate d'-prime and response bias
sessionMetrics.dPrime = calculateDPrime(
  sessionMetrics.hits, 
  sessionMetrics.misses, 
  sessionMetrics.falseAlarms, 
  sessionMetrics.correctRejections
);

sessionMetrics.responseBias = calculateResponseBias(
  sessionMetrics.hits, 
  sessionMetrics.misses, 
  sessionMetrics.falseAlarms, 
  sessionMetrics.correctRejections
);

// Calculate lure resistances if there were any lures
if (sessionMetrics.n1LureEncounters && sessionMetrics.n1LureEncounters > 0) {
  sessionMetrics.n1LureResistance = sessionMetrics.n1LureCorrectRejections / sessionMetrics.n1LureEncounters;
} else {
  sessionMetrics.n1LureResistance = 1.0; // Default if no lures encountered
}

if (sessionMetrics.nPlusLureEncounters && sessionMetrics.nPlusLureEncounters > 0) {
  sessionMetrics.nPlusLureResistance = sessionMetrics.nPlusLureCorrectRejections / sessionMetrics.nPlusLureEncounters;
} else {
  sessionMetrics.nPlusLureResistance = 1.0; // Default if no lures encountered
}

// Show lure resistance section if any lures were encountered
totalLureEncounters = (sessionMetrics.n1LureEncounters || 0) + (sessionMetrics.nPlusLureEncounters || 0);
if (totalLureEncounters > 0) {
  sessionMetrics.totalLureResistance = 
    ((sessionMetrics.n1LureResistance * (sessionMetrics.n1LureEncounters || 0)) + 
     (sessionMetrics.nPlusLureResistance * (sessionMetrics.nPlusLureEncounters || 0))) / totalLureEncounters;
} else {
  sessionMetrics.totalLureResistance = 1.0;
}
// Update excellence dashboard
const dPrimeTarget = 2.0; // Target is d' > 2.0
const lureResistanceTarget = 0.85; // Target is 85% resistance
const accuracyTarget = 0.90; // Target is 90% accuracy

// Calculate progress percentages
const accuracyProgress = Math.min(100, Math.max(0, (accuracy / accuracyTarget) * 100));
const dPrimeProgress = Math.min(100, Math.max(0, (sessionMetrics.dPrime / dPrimeTarget) * 100));
const lureResistanceProgress = sessionMetrics.totalLureResistance ? 
  Math.min(100, Math.max(0, (sessionMetrics.totalLureResistance / lureResistanceTarget) * 100)) : 0;

// Update accuracy progress display
document.getElementById('accuracy-progress-value').textContent = `${Math.round(accuracyProgress)}%`;
document.getElementById('accuracy-progress-bar').style.width = `${accuracyProgress}%`;

// Calculate overall excellence (weighted average)
let overallProgress = 0;
let weightSum = 0;
// Add accuracy to overall score (weight: 2 - high importance)
overallProgress += accuracyProgress * 2;
weightSum += 2;
// Add d-prime to overall score (weight: 2)
overallProgress += dPrimeProgress * 2;
weightSum += 2;

// Add lure resistance to overall score if applicable (weight: 1)
if (sessionMetrics.n1LureResistance) {
  overallProgress += lureResistanceProgress;
  weightSum += 1;
  
  // Show lure progress section
  document.getElementById('lure-progress-container').style.display = 'block';
  document.getElementById('lure-progress-value').textContent = `${Math.round(lureResistanceProgress)}%`;
  document.getElementById('lure-progress-bar').style.width = `${lureResistanceProgress}%`;
} else {
  document.getElementById('lure-progress-container').style.display = 'none';
}

// Calculate final overall progress
const finalOverallProgress = overallProgress / weightSum;

// Update excellence progress displays
document.getElementById('dprime-progress-value').textContent = `${Math.round(dPrimeProgress)}%`;
document.getElementById('overall-progress-value').textContent = `${Math.round(finalOverallProgress)}%`;
document.getElementById('dprime-progress-bar').style.width = `${dPrimeProgress}%`;
document.getElementById('overall-progress-bar').style.width = `${finalOverallProgress}%`;

// Add excellence metrics to historyPoint
historyPoint.excellenceMetrics = {
  dPrimeProgress: dPrimeProgress / 100,
  lureResistanceProgress: lureResistanceProgress / 100,
  overallProgress: finalOverallProgress / 100
};

console.log("Session Metrics:", sessionMetrics);

// Add d'-prime to history point
historyPoint.dPrime = sessionMetrics.dPrime;
historyPoint.responseBias = sessionMetrics.responseBias;
historyPoint.n1LureResistance = sessionMetrics.n1LureResistance;

// Store session in config-specific history (limited to last 20)
if (!sessionHistoriesByConfig[currentConfig]) {
  sessionHistoriesByConfig[currentConfig] = [];
}

// Add accuracy to session metrics
sessionMetrics.accuracy = accuracy;

sessionHistoriesByConfig[currentConfig].push({
  ...sessionMetrics, 
  nLevel: nLevel, 
  microLevel: currentMicroLevel, 
  date: new Date(),
  accuracy: accuracy
});

if (sessionHistoriesByConfig[currentConfig].length > 20) {
  sessionHistoriesByConfig[currentConfig].shift(); // Remove oldest session if more than 20
}


      // Update the recap dialog with d-prime and micro-level information
document.querySelector(".lvl-before").innerHTML = formatMicroLevel(historyPoint.microLevel);
document.querySelector(".lvl-after").innerHTML = formatMicroLevel(newMicroLevel);
document.querySelector(".lvl-stays").innerHTML = formatMicroLevel(newMicroLevel);

// Update signal detection metrics in the recap dialog
document.getElementById("sc-res-dprime").textContent = sessionMetrics.dPrime.toFixed(2);
document.getElementById("sc-res-bias").textContent = sessionMetrics.responseBias.toFixed(2);

// Show lure resistance section if any lures were encountered
const totalLureEncounters = (sessionMetrics.n1LureEncounters || 0) + (sessionMetrics.nPlusLureEncounters || 0);
if (totalLureEncounters > 0) {
  document.getElementById("lure-resistance-section").style.display = "block";
  
  // Display combined lure resistance
  document.getElementById("sc-res-lure-resistance").textContent = 
    `${(sessionMetrics.totalLureResistance * 100).toFixed(0)}%`;
  
  // Display total lure count
  document.getElementById("sc-res-lure-count").textContent = totalLureEncounters;
  
  // Optional: Add detailed breakdown if you want
  const lureDetailsElement = document.getElementById("sc-res-lure-details");
  if (lureDetailsElement) {
    lureDetailsElement.textContent = 
      `N-1: ${(sessionMetrics.n1LureResistance * 100).toFixed(0)}% (${sessionMetrics.n1LureEncounters || 0}), ` +
      `N+1: ${(sessionMetrics.nPlusLureResistance * 100).toFixed(0)}% (${sessionMetrics.nPlusLureEncounters || 0})`;
  }
} else {
  document.getElementById("lure-resistance-section").style.display = "none";
}

// Remove the previously added dynamic elements if they exist
const oldDPrimeElement = document.querySelector(".dynamic-dprime-element");
if (oldDPrimeElement) {
  oldDPrimeElement.remove();
}
const oldLureElement = document.querySelector(".dynamic-lure-element");
if (oldLureElement) {
  oldLureElement.remove();
}
      // Show the recap dialog
      recapDialogContent.parentElement.show();
      
      // Reset game state for next round
      resetPoints();
      resetBlock();

      
      return;
    }
    
    // Count stimulus
    stimuliCount++;
    
    // Animating stimuli
    if (wallsEnabled) {
      currWalls = walls[i];
      floors.forEach(floor =>
        setFloorBackground(
          floor,
          sceneDimmer,
          tileAHexColor,
          currWalls.symbol
        )
      );
    }
    if (cameraEnabled) {
      currCamera = cameras[i];
      let [cx, cy] = currCamera.symbol.split("&");
      rotateCamera(cx, cy);
    }
    if (faceEnabled) {
      currFace = faces[i];
      if (colorEnabled) {
        currColor = colors[i];
        wow(faceEls[currFace.symbol - 1], currColor.symbol, baseDelay - 500);
      } else {
        wow(faceEls[currFace.symbol - 1], "col-a", baseDelay - 500);
      }
    } else if (colorEnabled) {
      currColor = colors[i];
      wow(faceEls[0], currColor.symbol, baseDelay - 500);
    }
    if (positionEnabled) {
      currPosition = positions[i];
      move(cube, currPosition.symbol);
    }
    
    if (wordEnabled) {
      currWord = words[i];
      writeWord(currWord.symbol);
    }
    if (cornerEnabled) {
      currCorner = corners[i];
      move(innerCube, currCorner.symbol);
      
      if (shapeEnabled) {
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

// Update micro-level for the new random configuration
if (randomizeEnabled) {
  updateMicroLevelForConfig();
}

// Reset game state before starting
resetPoints();
resetBlock();
resetIntervals();
  
  isRunning = true;

// Get current configuration
const currentConfig = getCurrentConfigKey();
const sessionHistory = sessionHistoriesByConfig[currentConfig] || [];
  
  // Reset session metrics
  sessionMetrics = {
    hits: 0,
    misses: 0, 
    falseAlarms: 0,
    correctRejections: 0,
    dPrime: 0,
    responseBias: 0,
    microLevel: currentMicroLevel,
    n1LureEncounters: 0,
    n1LureCorrectRejections: 0,
    n1LureFalseAlarms: 0,
    n1LureResistance: 0,
    nPlusLureEncounters: 0,
    nPlusLureCorrectRejections: 0,
    nPlusLureFalseAlarms: 0,
    nPlusLureResistance: 0,
    postLureTrials: [],
    postLurePerformance: 0,
    // New speed tracking
    responseTimes: [],
    meanRT: 0,
    medianRT: 0,
    hitRT: 0,
    correctRejectionRT: 0,
    speedScore: 0,
    rtImprovement: 0
  };
  
  speak("Start.");
  document.querySelector(".stop").classList.remove("active");
  document.querySelector(".play").classList.add("active");


  intervals.push(
  setInterval(getGameCycle(nLevel), getSpeedTarget(currentMicroLevel))
);
}

function stop() {
  if (!isRunning) {
    return;
  }
  
// Reset game UI and timers
resetPoints();
resetBlock();
resetIntervals();

// Stop the game
isRunning = false;

speak("Stop.");
document.querySelector(".stop").classList.add("active");
document.querySelector(".play").classList.remove("active");
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
  
  if (!curr || !enable) {
    return;
  }

  console.log(stimulus, curr, button, enable);
  
 // Update signal detection metrics based on response
if (curr.isMatching) {
  // Hit: User correctly identified a match
  sessionMetrics.hits++;
} else {
  // False Alarm: User incorrectly claimed a match
  sessionMetrics.falseAlarms++;
  
  // Check if this was a lure (for interference measurement)
  if (curr.isLure) {
    if (curr.lureType === 'n-1') {
      // Initialize counters if needed
      sessionMetrics.n1LureEncounters = sessionMetrics.n1LureEncounters || 0;
      sessionMetrics.n1LureFalseAlarms = sessionMetrics.n1LureFalseAlarms || 0;
      
      // Track N-1 lure response (fell for the lure)
      sessionMetrics.n1LureEncounters++;
      sessionMetrics.n1LureFalseAlarms++;
      
      console.log("User fell for N-1 lure", stimulus);
    } else if (curr.lureType === 'n+1') {
      // Initialize counters if needed
      sessionMetrics.nPlusLureEncounters = sessionMetrics.nPlusLureEncounters || 0;
      sessionMetrics.nPlusLureFalseAlarms = sessionMetrics.nPlusLureFalseAlarms || 0;
      
      // Track N+1 lure response (fell for the lure)
      sessionMetrics.nPlusLureEncounters++;
      sessionMetrics.nPlusLureFalseAlarms++;
      
      console.log("User fell for N+1 lure", stimulus);
    }
  }
}
  
  // Original stimulus-specific handling
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

// Set up event listeners
[ ...document.querySelectorAll("input[name='dimension'") ].forEach(el => {
  el.addEventListener("click", function(evt) {
      const dim = evt.target.value;
      toggleStats(dim);
  });
});

["walls", "camera", "face", "position", "word", "shape", "corner", "sound", "color"]
  .forEach(sense => {
    document.querySelector(".check-" + sense)
      .addEventListener(
        "click",
        () => checkHandler(sense)
      );
    document.querySelector(".check-" + sense)
      .addEventListener(
        "touchstart",
        () => checkHandler(sense)
      );
  });

document.addEventListener("keypress", evt => {
  const match = Object.entries(keyBindings).find(([stim, key]) => key === evt.key);
  if (match) {
    checkHandler(match[0].toLowerCase());
  }
});

document.addEventListener("keydown", evt  => {
  if (evt.key === "Escape") {
    document.querySelectorAll("dialog").forEach(d => d.close());
    closeOptions();
    stop();
  }
});

// Add event listener for numStimuliSelectInput
numStimuliSelectInput.addEventListener("change", numStimuliSelectInputHandler);

// Initialize the application
loadBindings();
loadSettings();
loadHistory();
// Initialize speed display
const speedDisplay = document.querySelector("#speed-display");
if (speedDisplay) {
  speedDisplay.innerHTML = getSpeedTarget(currentMicroLevel);
}
// Initialize config display
const configDisplay = document.querySelector("#config-display");
if (configDisplay) {
  const activeCount = getCurrentConfigKey();
  configDisplay.innerHTML = activeCount + "D";
}

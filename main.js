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
// Algo constants
const defVal_enableAdaptiveN = false;
const defVal_enableAdaptiveD = false;
const defVal_masteryLevel = 4;
const defVal_challengeLevel = 5;
const defVal_masteryDimensions = 8;
const defVal_challengeDimensions = 9;
const defVal_isFirstChallengeAttempt = true;
const defVal_challengeAttemptCount = 0;
// Algo tracking
const defVal_masterySuccessStreak = 0;
const defVal_masteryFailureStreak = 0;
const defVal_challengeSuccessStreak = 0;
const defVal_challengeFailureStreak = 0;


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

// Add these variables to track streaks separately for mastery and challenge levels
let masterySuccessStreak = 0;
let masteryFailureStreak = 0;
let challengeSuccessStreak = 0;
let challengeFailureStreak = 0;

let enableAdaptiveN = false; // Toggle for adaptive n-level progression
let enableAdaptiveD = false; // Toggle for adaptive D-level (dimensional) progression

// Difficulty tracking
let masteryLevel = 4; // Current mastery n-back level
let challengeLevel = 5; // Current challenge n-back level
let masteryDimensions = 8; // Current mastery stimuli count
let challengeDimensions = 9; // Current challenge stimuli count
let currentLevel = "mastery"; // Current active level (mastery or challenge)

// Performance tracking
let consecutiveCorrect = 0;
let consecutiveIncorrect = 0;
let accuracyThresholdUpper = 0.90; // 90% accuracy to level up
let accuracyThresholdLower = 0.75; // 75% accuracy to level down
let sessionResponses = []; // Store correct/incorrect responses for the session
let isFirstChallengeAttempt = true;
let challengeAttemptCount = 0;

// Game states
let matchingStimuli = 0;
let stimuliCount = 0;
let intervals = [];

let currentDifficulty = 0;
let highestDifficulty = 0;
let difficultyHistory = [];

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
  if (defVal != null) {
    randomizeEnableTrig.checked = defVal;
    randomizeEnabled = defVal;
  } else {
    randomizeEnabled = !randomizeEnabled;
    saveSettings();
  }
}

// Handler for Adaptive N-Level toggle
function adaptiveNEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    document.getElementById("enable-adaptive-n").checked = defVal;
    enableAdaptiveN = defVal;
  } else {
    enableAdaptiveN = !enableAdaptiveN;
    saveSettings();
  }
  
  // Disable adaptive D if adaptive N is enabled (they're mutually exclusive)
  if (enableAdaptiveN) {
    adaptiveDEnableTrigHandler(null, false);
    document.getElementById("enable-adaptive-d").disabled = true;
  } else {
    document.getElementById("enable-adaptive-d").disabled = false;
  }
}

// Handler for Adaptive D-Level toggle
function adaptiveDEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    document.getElementById("enable-adaptive-d").checked = defVal;
    enableAdaptiveD = defVal;
  } else {
    enableAdaptiveD = !enableAdaptiveD;
    saveSettings();
  }
  
  // Disable adaptive N if adaptive D is enabled (they're mutually exclusive)
  if (enableAdaptiveD) {
    adaptiveNEnableTrigHandler(null, false);
    document.getElementById("enable-adaptive-n").disabled = true;
  } else {
    document.getElementById("enable-adaptive-n").disabled = false;
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

// Add this function to initialize adaptive progression UI
function initializeAutoProgressionUI() {
  // Update display of adaptive levels if either adaptive mode is enabled
  if (enableAdaptiveN || enableAdaptiveD) {
    const adaptiveLevelDisplay = document.getElementById('adaptive-level-display');
    if (adaptiveLevelDisplay) {
      adaptiveLevelDisplay.style.display = 'block';
      
      // Update the displayed values
      document.getElementById('current-level-type').textContent = 
        currentLevel === "mastery" ? "Mastery" : "Challenge";
      document.getElementById('current-level-value').textContent = 
        enableAdaptiveN ? 
          (currentLevel === "mastery" ? masteryLevel : challengeLevel) : 
          (currentLevel === "mastery" ? masteryDimensions : challengeDimensions);
      document.getElementById('current-targets').textContent = targetNumOfStimuli;
      document.getElementById('current-delay').textContent = baseDelay;
    }
  }
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
    enableAdaptiveN,
    enableAdaptiveD,
    masteryLevel,
    challengeLevel,
    masteryDimensions,
    challengeDimensions,
    currentLevel,
    isFirstChallengeAttempt,
    challengeAttemptCount,
    numStimuliSelect,
    // algo metrics
    masterySuccessStreak,
    masteryFailureStreak,
    challengeSuccessStreak,
    challengeFailureStreak,
    currentDifficulty,
    highestDifficulty,
    difficultyHistory
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
  adaptiveNEnableTrigHandler(null, settings.enableAdaptiveN || defVal_enableAdaptiveN);
  adaptiveDEnableTrigHandler(null, settings.enableAdaptiveD || defVal_enableAdaptiveD);

  // Load adaptive progression settings if they exist
  masteryLevel = settings.masteryLevel || defVal_masteryLevel;
  challengeLevel = settings.challengeLevel || defVal_challengeLevel;
  masteryDimensions = settings.masteryDimensions || defVal_masteryDimensions;
  challengeDimensions = settings.challengeDimensions || defVal_challengeDimensions;
  currentLevel = settings.currentLevel || "mastery";
  isFirstChallengeAttempt = settings.isFirstChallengeAttempt !== undefined ? settings.isFirstChallengeAttempt : defVal_isFirstChallengeAttempt;
  challengeAttemptCount = settings.challengeAttemptCount || defVal_challengeAttemptCount;
  // In the loadSettings function, add:
  masterySuccessStreak = settings.masterySuccessStreak || defVal_masterySuccessStreak;
  masteryFailureStreak = settings.masteryFailureStreak || defVal_masteryFailureStreak;
  challengeSuccessStreak = settings.challengeSuccessStreak || defVal_challengeSuccessStreak;
  challengeFailureStreak = settings.challengeFailureStreak || defVal_challengeFailureStreak;
  currentDifficulty = settings.currentDifficulty || 0;
  highestDifficulty = settings.highestDifficulty || 0;
  difficultyHistory = settings.difficultyHistory || [];
  
  // Set the current n-level based on the adaptive progression settings
  if (enableAdaptiveN) {
    nLevelInputHandler(null, currentLevel === "mastery" ? masteryLevel : challengeLevel);
  } else if (enableAdaptiveD) {
    // Set stimuli count based on current level
    const dimensionCount = currentLevel === "mastery" ? masteryDimensions : challengeDimensions;
    setActiveStimuli(dimensionCount);
  }
  
  // Initialize adaptive progression UI
  initializeAutoProgressionUI();
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
  const html = `<div class="bar-chart-bar" style="height: ${n*2}rem;"><div>${n}</div></div>`;
  const wrap = document.createElement("DIV");
  wrap.innerHTML = html;
  return wrap.firstChild;
}

function toggleStats(_dim) {
  if (!_dim && statsDialogContent.parentElement.hasAttribute("open")) {
    statsDialogContent.parentElement.close();
    return;
  }

  statsDialogContent.parentElement.show();
  const dim = _dim || localStorage.getItem("last-dim") || 1;
  const radios = [...document.querySelectorAll("input[name='dimension']")];
  
  // Ensure dim is within range
  const validDim = Math.min(Math.max(1, dim), 9);
  radios[validDim - 1].checked = true;
  
  const _history = history[validDim];
  const bars = document.querySelector(".bar-chart-bars");
  bars.innerHTML = "";
  
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
  
  // Check if the history exists and has entries
  const entries = _history ? Object.entries(_history) : [];
  
  if (entries.length > 0) {
    for (const [date, points] of entries) {
      if (!Array.isArray(points) || points.length === 0) continue;
      
      let _avgNLevel = 0;
      let _minNLevel = 10;
      let _maxNLevel = 0;
      
      for (const point of points) {
        _avgNLevel += point.nLevel || 0;
        _minNLevel = Math.min(_minNLevel, point.nLevel || 10);
        _maxNLevel = Math.max(_maxNLevel, point.nLevel || 0);
        minNLevel = Math.min(minNLevel, _minNLevel);
        maxNLevel = Math.max(maxNLevel, _maxNLevel);
        right += point.right || 0;
        missed += point.missed || 0;
        wrong += point.wrong || 0;
        pointsCount++;
        
        // If point has accuracy, use it, otherwise calculate it
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
      
      if (points.length > 0) {
        _avgNLevel = _avgNLevel / points.length;
        avgNLevel += _avgNLevel;
        bars.appendChild(getBar(toOneDecimal(_avgNLevel)));
      }
    }
    
    if (entries.length > 0) {
      avgNLevel = avgNLevel / entries.length;
    }
  }
  
  // Update the stats display
  document.querySelector("#sc-avg").innerHTML = entries.length > 0 ? toOneDecimal(avgNLevel) : "-";
  document.querySelector("#sc-min").innerHTML = (minNLevel === 10) ? "-" : minNLevel;
  document.querySelector("#sc-max").innerHTML = maxNLevel || "-";
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

  // Create difficulty metrics section
let difficultySection = document.querySelector('.difficulty-metrics-section');
if (!difficultySection) {
  difficultySection = document.createElement('div');
  difficultySection.className = 'stimuli-accuracy-section difficulty-metrics-section';
  difficultySection.innerHTML = `
    <h3>Difficulty Metrics</h3>
    <div class="stats-cards" style="font-size: 1rem; margin: 1rem 0;">
      <div class="stats-card">
        <div class="stats-card-title">Average</div>
        <div id="sc-avg-difficulty" class="stats-card-value">-</div>
      </div>
      <div class="stats-card">
        <div class="stats-card-title">Highest</div>
        <div id="sc-max-difficulty" class="stats-card-value">-</div>
      </div>
    </div>
  `;
  
  // Add to dialog after the bar chart
  const barChartSection = document.querySelector('.bar-chart-wrap');
  barChartSection.parentNode.insertBefore(difficultySection, barChartSection.nextSibling);
}

// Calculate difficulty metrics
let totalDifficulty = 0;
let maxDifficulty = 0;
let pointsWithDifficulty = 0;

for (const [date, points] of entries) {
  if (!Array.isArray(points) || points.length === 0) continue;
  
  for (const point of points) {
    if (point.difficulty) {
      totalDifficulty += point.difficulty;
      maxDifficulty = Math.max(maxDifficulty, point.difficulty);
      pointsWithDifficulty++;
    }
  }
}

// Update difficulty metrics display
const avgDifficultyEl = document.getElementById('sc-avg-difficulty');
const maxDifficultyEl = document.getElementById('sc-max-difficulty');

if (pointsWithDifficulty > 0) {
  avgDifficultyEl.textContent = (totalDifficulty / pointsWithDifficulty).toFixed(1);
  maxDifficultyEl.textContent = maxDifficulty.toFixed(1);
} else {
  avgDifficultyEl.textContent = "-";
  maxDifficultyEl.textContent = "-";
}

  // Update adaptive progress display if applicable
  if (typeof updateAdaptiveProgressDisplay === 'function') {
    updateAdaptiveProgressDisplay();
  }
  
  // Store the last displayed dimension
  localStorage.setItem("last-dim", validDim);
  
  // If adaptive mode is enabled, show the adaptive progress
  if (enableAdaptiveN || enableAdaptiveD) {
    if (typeof displayAdaptiveContent === 'function') {
      displayAdaptiveContent();
    }
  }
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

// Function to update the adaptive progression display in the stats dialog
function updateAdaptiveProgressDisplay() {
  // Remove existing adaptive section if it exists
  const existingSection = document.getElementById('adaptive-progress-section');
  if (existingSection) {
    existingSection.remove();
  }
  
  // If adaptive progression isn't enabled, don't add the section
  if (!enableAdaptiveN && !enableAdaptiveD) {
    return;
  }
  
  // Get the stats container
  const statsContainer = document.querySelector('#stats-dialog .dialog-content');
  
  // Create the adaptive section
  const adaptiveSection = document.createElement('div');
  adaptiveSection.id = 'adaptive-progress-section';
  adaptiveSection.className = 'stimuli-accuracy-section'; // Use existing section styling
  
  // Create the section header
  const heading = document.createElement('h3');
  heading.textContent = 'Adaptive Progression';
  adaptiveSection.appendChild(heading);
  
  // Create mode selector tabs using the existing radio-dimensions style
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'radio-dimensions';
  
  const nTab = document.createElement('label');
  nTab.className = 'radio-dimension';
  nTab.innerHTML = `
    <input type="radio" name="adaptive-mode" value="adaptive-n" ${enableAdaptiveN ? 'checked' : ''} hidden>
    <div>N-Level</div>
  `;
  
  const dTab = document.createElement('label');
  dTab.className = 'radio-dimension';
  dTab.innerHTML = `
    <input type="radio" name="adaptive-mode" value="adaptive-d" ${enableAdaptiveD ? 'checked' : ''} hidden>
    <div>D-Level</div>
  `;
  
  tabsContainer.appendChild(nTab);
  tabsContainer.appendChild(dTab);
  adaptiveSection.appendChild(tabsContainer);
  
  // Create content container for adaptive progression info
  const contentContainer = document.createElement('div');
  contentContainer.id = 'adaptive-content-container';
  contentContainer.className = 'adaptive-content';
  adaptiveSection.appendChild(contentContainer);
  
  // Add the section to the stats dialog
  statsContainer.appendChild(adaptiveSection);
  
  // Set up event listeners for the tabs
  const radioButtons = adaptiveSection.querySelectorAll('input[name="adaptive-mode"]');
  radioButtons.forEach(radio => {
    radio.addEventListener('change', (event) => {
      displayAdaptiveContent(event.target.value);
    });
  });
  
  // Display initial content based on which mode is active
  const activeMode = enableAdaptiveN ? 'adaptive-n' : 'adaptive-d';
  displayAdaptiveContent(activeMode);
}


// Function to display specific adaptive content based on mode
function displayAdaptiveContent(mode, container) {
  if (!container) return;
  
  // Clear previous content
  container.innerHTML = '';
  
  // Create a styled container for the adaptive info that matches existing UI
  const infoContainer = document.createElement('div');
  infoContainer.style.padding = '0.5rem';
  infoContainer.style.textAlign = 'center';
  infoContainer.style.fontSize = '1rem';
  
  if (mode === 'adaptive-n') {
    // Display N-Level progression info
    infoContainer.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <strong>Current Level:</strong> ${currentLevel === "mastery" ? "Mastery" : "Challenge"}
      </div>
      <div class="stats-cards" style="font-size: 1rem; margin: 1rem 0;">
        <div class="stats-card">
          <div class="stats-card-title">Mastery N</div>
          <div class="stats-card-value">${masteryLevel}</div>
        </div>
        <div class="stats-card">
          <div class="stats-card-title">Challenge N</div>
          <div class="stats-card-value">${challengeLevel}</div>
        </div>
      </div>
      <div style="margin-top: 1rem;">
        <div><strong>Success Streak:</strong> ${currentLevel === "mastery" ? masterySuccessStreak : challengeSuccessStreak}</div>
        <div><strong>Mistake Streak:</strong> ${currentLevel === "mastery" ? masteryFailureStreak : challengeFailureStreak}</div>
        <div><strong>Delay:</strong> ${baseDelay}ms</div>
        <div><strong>Target Stimuli:</strong> ${targetNumOfStimuli}</div>
      </div>
    `;
  } else {
    // Display D-Level progression info
    infoContainer.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <strong>Current Level:</strong> ${currentLevel === "mastery" ? "Mastery" : "Challenge"}
      </div>
      <div class="stats-cards" style="font-size: 1rem; margin: 1rem 0;">
        <div class="stats-card">
          <div class="stats-card-title">Mastery D</div>
          <div class="stats-card-value">${masteryDimensions}</div>
        </div>
        <div class="stats-card">
          <div class="stats-card-title">Challenge D</div>
          <div class="stats-card-value">${challengeDimensions}</div>
        </div>
      </div>
      <div style="margin-top: 1rem;">
        <div><strong>Success Streak:</strong> ${currentLevel === "mastery" ? masterySuccessStreak : challengeSuccessStreak}</div>
        <div><strong>Mistake Streak:</strong> ${currentLevel === "mastery" ? masteryFailureStreak : challengeFailureStreak}</div>
        <div><strong>Delay:</strong> ${baseDelay}ms</div>
        <div><strong>Target Stimuli:</strong> ${targetNumOfStimuli}</div>
      </div>
    `;
  }
  
  container.appendChild(infoContainer);
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

      resDim.innerHTML = dimensions + "D";
      resRight.innerHTML = correctStimuli;
      resMissed.innerHTML = missed;
      resWrong.innerHTML = mistakes;
      
      // Update accuracy in the recap dialog if the element exists
      const accuracyElement = document.querySelector("#sc-res-accuracy");
      if (accuracyElement) {
        accuracyElement.innerHTML = (accuracy * 100).toFixed(0) + "%";
      }
      // Calculate difficulty score for the session
currentDifficulty = calculateDifficultyScore(nLevel, targetNumOfStimuli, baseDelay);

// Check if we already have a difficulty element
let difficultyElement = document.getElementById("sc-res-difficulty");
if (!difficultyElement) {
  // Create a new difficulty display element
  const accuracyContainer = accuracyElement.parentElement;
  
  // Create a wrapper for the difficulty score
  const difficultyWrapper = document.createElement("div");
  difficultyWrapper.style.textAlign = "center";
  difficultyWrapper.style.fontSize = "1.5rem";
  difficultyWrapper.style.marginTop = "1rem";
  difficultyWrapper.style.marginBottom = "1rem";
  
  // Add the content
  difficultyWrapper.innerHTML = `
    Difficulty: <span id="sc-res-difficulty">${currentDifficulty.toFixed(1)}</span>
  `;
  
  // Insert after accuracy
  accuracyContainer.parentNode.insertBefore(difficultyWrapper, accuracyContainer.nextSibling);
} else {
  // Update existing element
  difficultyElement.textContent = currentDifficulty.toFixed(1);
}

// Update highest difficulty if current is higher
if (currentDifficulty > highestDifficulty) {
  highestDifficulty = currentDifficulty;
}

// Log all decision factors for debugging
console.log("Level decision values:", {
  accuracy,
  nextLevelThreshold,
  prevLevelThreshold,
  mistakes,
  maxAllowedMistakes
});

const levelUpCond = (accuracy >= nextLevelThreshold) && (mistakes <= maxAllowedMistakes) && nLevel < 9;
const levelDownCond = ((accuracy < prevLevelThreshold) || (mistakes > maxAllowedMistakes)) && nLevel > 1;

console.log("Level conditions:", {
  levelUpCond,
  levelDownCond
});

      localStorage.setItem("last-dim", dimensions);
      // Calculate difficulty score
const sessionDifficulty = calculateDifficultyScore(nLevel, targetNumOfStimuli, baseDelay);

// Create history point with difficulty data
const historyPoint = {
  nLevel,
  right: correctStimuli,
  missed,
  wrong: mistakes,
  accuracy: accuracy,
  outcome: 0,
  stimuliData: stimuliData,
  // Add difficulty information
  difficulty: sessionDifficulty,
  difficultyParams: {
    nLevel: nLevel,
    matches: targetNumOfStimuli,
    delay: baseDelay
  }
};

      // In getGameCycle function, find the levelUpCond/levelDownCond code block and replace it with this:
      if (levelUpCond) {
        historyPoint.outcome = 1;
        // Store original level before updating
        const originalLevel = nLevel;
        // Update the level
        nLevelInputHandler(null, originalLevel + 1);
        document.querySelector(".lvl-res-move").style.display = "block";
        document.querySelector(".lvl-before").innerHTML = originalLevel;
        document.querySelector(".lvl-after").innerHTML = originalLevel + 1;
      } else if (levelDownCond) {
        historyPoint.outcome = -1;
        // Store original level before updating
        const originalLevel = nLevel;
        // Update the level
        nLevelInputHandler(null, originalLevel - 1);
        document.querySelector(".lvl-res-move").style.display = "block";
        document.querySelector(".lvl-before").innerHTML = originalLevel;
        document.querySelector(".lvl-after").innerHTML = originalLevel - 1;
      } else {
        document.querySelector(".lvl-res-stay").style.display = "block";
        document.querySelector(".lvl-stays").innerHTML = nLevel;
      }
      
      // Save history and show results
      const datestamp = new Date().toLocaleDateString("sv");
      history[dimensions][datestamp] = history[dimensions][datestamp] || [];
      history[dimensions][datestamp].push(historyPoint);
      console.log("history", history);
      
      saveSettings();
      saveHistory();
      
      // Show the recap dialog
      recapDialogContent.parentElement.show();
      
      // Reset game state for next round
      resetPoints();
      resetBlock();

      // Evaluate session for adaptive progression
evaluateSession();
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
    
    // Check if randomize is enabled, if so select random stimuli
    if (randomizeEnabled) {
      selectRandomStimuli(numStimuliSelect);
    }
    
    // Reset game state before starting
    resetPoints();
    resetBlock();
    resetIntervals();
    
    isRunning = true;
    
    speak("Start.");
    document.querySelector(".stop").classList.remove("active");
    document.querySelector(".play").classList.add("active");
  
    try {
      updateDifficultyDisplay();
    } catch (e) {
      console.error("Error updating difficulty display:", e);
    }
  
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
  document.querySelector(".stop").classList.add("active");
  document.querySelector(".play").classList.remove("active");

  const difficultyDisplay = document.getElementById('difficulty-display');
  if (difficultyDisplay) {
    difficultyDisplay.textContent = '';
  }
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
  
  switch (stimulus) {
    case "walls": {
      enableWallsCheck = false;
      if (curr.isMatching) {
        rightWalls++;
        button.classList.add("right");
         recordResponse(true);
      } else {
        wrongWalls++;
        button.classList.add("wrong");
        recordResponse(false);
      }
      break;
    }
    case "camera": {
      enableCameraCheck = false;
      if (curr.isMatching) {
        rightCamera++;
        button.classList.add("right");
         recordResponse(true);
      } else {
        wrongCamera++;
        button.classList.add("wrong");
        recordResponse(false);
      }
      break;
    }
    case "face": {
      enableFaceCheck = false;
      if (curr.isMatching) {
        rightFace++;
        button.classList.add("right");
         recordResponse(true);
      } else {
        wrongFace++;
        button.classList.add("wrong");
        recordResponse(false);
      }
      break;
    }
    case "position": {
      enablePositionCheck = false;
      if (curr.isMatching) {
        rightPosition++;
        button.classList.add("right");
         recordResponse(true);
      } else {
        wrongPosition++;
        button.classList.add("wrong");
        recordResponse(false);
      }
      break;
    }
    case "word": {
      enableWordCheck = false;
      if (curr.isMatching) {
        rightWord++;
        button.classList.add("right");
         recordResponse(true);
      } else {
        wrongWord++;
        button.classList.add("wrong");
        recordResponse(false);
      }
      break;
    }
    case "shape": {
      enableShapeCheck = false;
      if (curr.isMatching) {
        rightShape++;
        button.classList.add("right");
         recordResponse(true);
      } else {
        wrongShape++;
        button.classList.add("wrong");
        recordResponse(false);
      }
      break;
    }
    case "corner": {
      enableCornerCheck = false;
      if (curr.isMatching) {
        rightCorner++;
        button.classList.add("right");
         recordResponse(true);
      } else {
        wrongCorner++;
        button.classList.add("wrong");
        recordResponse(false);
      }
      break;
    }
    case "sound": {
      enableSoundCheck = false;
      if (curr.isMatching) {
        rightSound++;
        button.classList.add("right");
         recordResponse(true);
      } else {
        wrongSound++;
        button.classList.add("wrong");
        recordResponse(false);
      }
      break;
    }
    case "color": {
      enableColorCheck = false;
      if (curr.isMatching) {
        rightColor++;
        button.classList.add("right");
         recordResponse(true);
      } else {
        wrongColor++;
        button.classList.add("wrong");
        recordResponse(false);
      }
      break;
    }
  }
}

function recordResponse(isCorrect) {
  if (!enableAdaptiveN && !enableAdaptiveD) return;
  
  sessionResponses.push(isCorrect);
  
  // Apply adaptive difficulty changes
  updateDifficulty();
  
  // Save updated streak values
  saveSettings();
}

function addLevelChangeHistory(changeDescription) {
  let levelChanges = JSON.parse(localStorage.getItem('levelChangeHistory') || '[]');
  
  levelChanges.push({
    timestamp: new Date().toISOString(),
    description: changeDescription,
    currentLevel,
    masteryLevel,
    challengeLevel,
    masteryDimensions,
    challengeDimensions,
    baseDelay,
    targetNumOfStimuli
  });
  
  // Keep only the most recent 50 changes
  if (levelChanges.length > 50) {
    levelChanges = levelChanges.slice(-50);
  }
  
  localStorage.setItem('levelChangeHistory', JSON.stringify(levelChanges));
}

// Update difficulty based on consecutive responses using optimal parameter selection
function updateDifficulty() {
  // Skip if auto-progression not enabled
  if (!enableAdaptiveN && !enableAdaptiveD) return;
  
  // Get current difficulty score
  const currentScore = calculateDifficultyScore(nLevel, targetNumOfStimuli, baseDelay);
  
  // Skip micro-adjustments if we already made changes recently
  // This prevents too-frequent adjustments
  if (sessionResponses.length < 3) return;
  
  // Calculate recent performance (last 5 responses)
  const recentResponses = sessionResponses.slice(-5);
  const recentCorrect = recentResponses.filter(r => r).length;
  const recentAccuracy = recentResponses.length > 0 ? recentCorrect / recentResponses.length : 0;
  
  // Calculate target difficulty adjustment
  let targetDifficulty = currentScore;
  
  // Handle consecutive correct responses - increase difficulty
  if (consecutiveCorrect >= 3) {
    // Calculate adjustment factor (larger for longer streaks)
    const adjustmentFactor = 1 + (Math.min(consecutiveCorrect - 2, 5) * 0.05);
    
    // Calculate target difficulty with smoother progression
    targetDifficulty = currentScore * adjustmentFactor;
    
    console.log(`Consecutive correct (${consecutiveCorrect}): Increasing difficulty to ${targetDifficulty.toFixed(1)}`);
    
    // Find optimal parameters to reach target difficulty
    const optimalParams = findOptimalParameters(targetDifficulty, {
      // Prefer adjusting delay first, then matches
      // Keep N level consistent during a session
      minN: nLevel,
      maxN: nLevel
    });
    
    // Apply the adjustments
    if (optimalParams.delay !== baseDelay) {
      baseDelay = optimalParams.delay;
      baseDelayInputHandler(null, baseDelay);
    }
    
    if (optimalParams.matches !== targetNumOfStimuli) {
      targetNumOfStimuli = optimalParams.matches;
      targetStimuliInputHandler(null, targetNumOfStimuli);
    }
  }
  
  // Handle consecutive incorrect responses - decrease difficulty
  if (consecutiveIncorrect >= 2) {
    // More aggressive adjustment for incorrect responses
    const adjustmentFactor = 1 - (Math.min(consecutiveIncorrect, 4) * 0.1);
    
    // Calculate target difficulty
    targetDifficulty = currentScore * adjustmentFactor;
    
    console.log(`Consecutive incorrect (${consecutiveIncorrect}): Decreasing difficulty to ${targetDifficulty.toFixed(1)}`);
    
    // Find optimal parameters to reach target difficulty
    const optimalParams = findOptimalParameters(targetDifficulty, {
      // Prefer adjusting delay first, then matches
      // Keep N level consistent during a session
      minN: nLevel,
      maxN: nLevel
    });
    
    // Apply the adjustments
    if (optimalParams.delay !== baseDelay) {
      baseDelay = optimalParams.delay;
      baseDelayInputHandler(null, baseDelay);
    }
    
    if (optimalParams.matches !== targetNumOfStimuli) {
      targetNumOfStimuli = optimalParams.matches;
      targetStimuliInputHandler(null, targetNumOfStimuli);
    }
  }
  
  // Track the new difficulty score
  currentDifficulty = calculateDifficultyScore(nLevel, targetNumOfStimuli, baseDelay);
  updateDifficultyDisplay();
}

/**
 * Calculates a difficulty score based on n-back level, match count, and delay
 * 
 * Difficulty = (N^1.4) × [1 + ln(Matches) × 1.5] × [(6000/delay)^0.8]
 * 
 * @param {number} nLevel - Current n-back level
 * @param {number} matches - Number of target matches
 * @param {number} delay - Delay between stimuli in milliseconds
 * @return {number} - Calculated difficulty score
 */
function calculateDifficultyScore(nLevel, matches, delay) {
  // Ensure inputs are valid numbers and at least 1
  nLevel = Math.max(1, nLevel);
  matches = Math.max(1, matches);
  delay = Math.max(1, delay);
  
  // Calculate each component of the formula
  const nFactor = Math.pow(nLevel, 1.4);
  const matchFactor = 1 + (Math.log(matches) * 1.5);
  const speedFactor = Math.pow(6000 / delay, 0.8);
  
  // Calculate total difficulty
  const difficulty = nFactor * matchFactor * speedFactor;
  
  // Round to 2 decimal places for readability
  return Math.round(difficulty * 100) / 100;
}

/**
 * Updates the difficulty display during gameplay
 */
function updateDifficultyDisplay() {
    try {
      // Calculate current difficulty
      const currentScore = calculateDifficultyScore(nLevel, targetNumOfStimuli, baseDelay);
      
      // Check if difficulty display exists, create if not
      let difficultyDisplay = document.getElementById('difficulty-display');
      if (!difficultyDisplay) {
        // Create the difficulty display element
        const nBackElement = document.querySelector('.n-back');
        if (!nBackElement) {
          console.error("Cannot find n-back element");
          return;
        }
        
        difficultyDisplay = document.createElement('div');
        difficultyDisplay.id = 'difficulty-display';
        difficultyDisplay.style.position = 'absolute';
        difficultyDisplay.style.top = '2.5em';
        difficultyDisplay.style.color = '#ffff';
        difficultyDisplay.style.transform = 'translateZ(1em)';
        difficultyDisplay.style.fontSize = '0.8em';
        difficultyDisplay.style.opacity = '0.8';
        
        // Insert after n-back display
        nBackElement.parentNode.insertBefore(difficultyDisplay, nBackElement.nextSibling);
      }
      
      // Update the display
      difficultyDisplay.textContent = `Difficulty: ${currentScore.toFixed(1)}`;
      
      // Update the global tracking variable
      currentDifficulty = currentScore;
    } catch (e) {
      console.error("Error in updateDifficultyDisplay:", e);
    }
  }

function evaluateSession() {
  if (!enableAdaptiveN && !enableAdaptiveD) return;
  
  // Calculate accuracy for the entire round
  const correctResponses = sessionResponses.filter(r => r).length;
  const accuracy = sessionResponses.length > 0 ? correctResponses / sessionResponses.length : 0;
  
  console.log("Session accuracy:", accuracy, "Responses:", sessionResponses.length);
  
  // Calculate current difficulty score
  currentDifficulty = calculateDifficultyScore(nLevel, targetNumOfStimuli, baseDelay);
  
  // Update highest difficulty if current is higher
  if (currentDifficulty > highestDifficulty) {
    highestDifficulty = currentDifficulty;
  }
  
  // Add to difficulty history (keep last 10 sessions)
  difficultyHistory.push({
    timestamp: Date.now(),
    difficulty: currentDifficulty,
    accuracy: accuracy
  });
  
  if (difficultyHistory.length > 10) {
    difficultyHistory.shift(); // Remove oldest entry
  }
  
  console.log("Current difficulty:", currentDifficulty, "Highest:", highestDifficulty);
  
  // Determine if the round was a success or failure based on accuracy
  const isSuccessful = accuracy >= 0.75; // 75% threshold for success
  
  // Update the streaks based on the entire round's performance
  if (currentLevel === "mastery") {
    if (isSuccessful) {
      masterySuccessStreak++;
      masteryFailureStreak = 0;
    } else {
      masteryFailureStreak++;
      masterySuccessStreak = 0;
    }
  } else { // Challenge level
    if (isSuccessful) {
      challengeSuccessStreak++;
      challengeFailureStreak = 0;
    } else {
      challengeFailureStreak++;
      challengeSuccessStreak = 0;
    }
  }
  
  // Set the overall consecutive counters
  consecutiveCorrect = currentLevel === "mastery" ? masterySuccessStreak : challengeSuccessStreak;
  consecutiveIncorrect = currentLevel === "mastery" ? masteryFailureStreak : challengeFailureStreak;
  
  // Reset session responses for next round
  sessionResponses = [];
  
  // Continue with adaptive progression
  if (enableAdaptiveN) {
    evaluateAdaptiveNSession(accuracy);
  } else if (enableAdaptiveD) {
    evaluateAdaptiveDSession(accuracy);
  }
  
  // Save updated settings
  saveSettings();
  
  // Update the UI
  initializeAutoProgressionUI();
}

/**
 * Calculates optimal delay time to achieve target difficulty
 * @param {number} nLevel - Current n-back level
 * @param {number} matches - Target number of matches
 * @return {number} - Optimal delay in milliseconds
 */
function calculateOptimalDelay(nLevel, matches) {
  // Target difficulty based on n-level
  let targetDifficulty;
  
  if (nLevel <= 2) {
    targetDifficulty = 4; // Easier targets for beginners
  } else if (nLevel <= 4) {
    targetDifficulty = 7; // Medium difficulty
  } else {
    targetDifficulty = 10; // Harder difficulty for higher levels
  }
  
  // Work backward from the difficulty formula to solve for delay
  // Difficulty = (N^1.4) × [1 + ln(Matches) × 1.5] × [(6000/delay)^0.8]
  const nFactor = Math.pow(nLevel, 1.4);
  const matchFactor = 1 + (Math.log(matches) * 1.5);
  
  // Solve for speedFactor
  const speedFactor = targetDifficulty / (nFactor * matchFactor);
  
  // Solve for delay
  // speedFactor = (6000/delay)^0.8
  // (speedFactor)^(1/0.8) = 6000/delay
  // delay = 6000 / (speedFactor)^(1/0.8)
  const delay = 6000 / Math.pow(speedFactor, 1/0.8);
  
  // Constrain to reasonable limits
  return Math.min(8000, Math.max(2500, Math.round(delay)));
}

/**
 * Finds optimal parameter combination to achieve a target difficulty
 * @param {number} targetDifficulty - The desired difficulty score to achieve
 * @param {Object} constraints - Constraints on parameter values
 * @return {Object} - Optimal parameter combination
 */
function findOptimalParameters(targetDifficulty, constraints = {}) {
  // Default constraints
  const defaults = {
    minN: 1,
    maxN: 9,
    minMatches: 1,
    maxMatches: 5,
    minDelay: 2500,
    maxDelay: 8000,
    currentN: nLevel,
    currentMatches: targetNumOfStimuli,
    currentDelay: baseDelay
  };
  
  // Merge provided constraints with defaults
  const options = { ...defaults, ...constraints };
  
  // Start with current values
  let bestParams = {
    n: options.currentN,
    matches: options.currentMatches,
    delay: options.currentDelay
  };
  
  // Calculate current difficulty
  let currentDiff = calculateDifficultyScore(
    bestParams.n, 
    bestParams.matches, 
    bestParams.delay
  );
  
  // Score how close we are to target
  let bestScore = Math.abs(targetDifficulty - currentDiff);
  
  console.log(`Target difficulty: ${targetDifficulty}, Current: ${currentDiff} (Score: ${bestScore})`);
  
  // Try adjusting delay first (least disruptive)
  for (let delay = options.minDelay; delay <= options.maxDelay; delay += 500) {
    const diff = calculateDifficultyScore(bestParams.n, bestParams.matches, delay);
    const score = Math.abs(targetDifficulty - diff);
    
    if (score < bestScore) {
      bestScore = score;
      bestParams.delay = delay;
      currentDiff = diff;
    }
  }
  
  // If we're still not close enough, try adjusting matches
  if (bestScore > 0.5) {
    for (let matches = options.minMatches; matches <= options.maxMatches; matches++) {
      const diff = calculateDifficultyScore(bestParams.n, matches, bestParams.delay);
      const score = Math.abs(targetDifficulty - diff);
      
      if (score < bestScore) {
        bestScore = score;
        bestParams.matches = matches;
        currentDiff = diff;
      }
    }
  }
  
  // If we're still not close enough, try adjusting N-level (most disruptive)
  if (bestScore > 0.5) {
    // Avoid changing N-level too drastically
    const nRange = 2;
    const minN = Math.max(options.minN, options.currentN - nRange);
    const maxN = Math.min(options.maxN, options.currentN + nRange);
    
    for (let n = minN; n <= maxN; n++) {
      const diff = calculateDifficultyScore(n, bestParams.matches, bestParams.delay);
      const score = Math.abs(targetDifficulty - diff);
      
      if (score < bestScore) {
        bestScore = score;
        bestParams.n = n;
        currentDiff = diff;
      }
    }
  }
  
  console.log(`Found optimal parameters: N=${bestParams.n}, Matches=${bestParams.matches}, Delay=${bestParams.delay} → Difficulty: ${currentDiff}`);
  
  return bestParams;
}

function evaluateAdaptiveNSession(accuracy) {
  const isChallenge = currentLevel === "challenge";
  
  // Calculate target difficulties for current levels
  const masteryTargetDifficulty = Math.max(5, calculateDifficultyScore(masteryLevel, targetNumOfStimuli, baseDelay));
  const challengeTargetDifficulty = Math.max(8, calculateDifficultyScore(challengeLevel, targetNumOfStimuli, baseDelay));
  
  console.log(`Current level: ${currentLevel}, Mastery target: ${masteryTargetDifficulty.toFixed(1)}, Challenge target: ${challengeTargetDifficulty.toFixed(1)}`);
  
  if (isChallenge) {
    // Check for challenge failure
    if (challengeFailureStreak >= 3 || accuracy < 0.5) {
      // Move back to mastery with optimized parameters
      currentLevel = "mastery";
      
      // Find optimal parameters for 90% of mastery difficulty 
      // (make it slightly easier than the full mastery level)
      const targetDifficulty = masteryTargetDifficulty * 0.9;
      const optimalParams = findOptimalParameters(targetDifficulty, {
        currentN: masteryLevel,
        maxN: masteryLevel // Don't increase N when dropping back
      });
      
      // Apply the optimal parameters
      nLevelInputHandler(null, optimalParams.n);
      targetStimuliInputHandler(null, optimalParams.matches);
      baseDelayInputHandler(null, optimalParams.delay);
      
      // Record the level change
      addLevelChangeHistory(`Challenge → Mastery (Difficulty: ${currentDifficulty.toFixed(1)} → ${targetDifficulty.toFixed(1)})`);
      
      // Reset streaks
      challengeSuccessStreak = 0;
      challengeFailureStreak = 0;
      masterySuccessStreak = 0;
      masteryFailureStreak = 0;
    } 
    // Check for mastering challenge
    else if (challengeSuccessStreak >= 3 && accuracy >= 0.8) {
      // Challenge becomes new mastery, create new challenge
      masteryLevel = challengeLevel;
      challengeLevel = masteryLevel + 1;
      
      // Find optimal parameters for the new mastery level
      const targetDifficulty = calculateDifficultyScore(masteryLevel, 2, 4000); // Balanced difficulty
      const optimalParams = findOptimalParameters(targetDifficulty, {
        currentN: masteryLevel,
        minN: masteryLevel, // Keep at least the mastery level
        maxN: masteryLevel // Don't exceed mastery level
      });
      
      // Apply the optimal parameters
      nLevelInputHandler(null, optimalParams.n);
      targetStimuliInputHandler(null, optimalParams.matches);
      baseDelayInputHandler(null, optimalParams.delay);
      
      // Record the level change
      addLevelChangeHistory(`Mastery Level increased to ${masteryLevel} (Difficulty: ${targetDifficulty.toFixed(1)})`);
      
      // Reset streaks
      challengeSuccessStreak = 0;
      challengeFailureStreak = 0;
      masterySuccessStreak = 0;
      masteryFailureStreak = 0;
    }
  } else { // At mastery level
    // Check for ready to challenge
    if (masterySuccessStreak >= 3 && accuracy >= 0.8) {
      // Move up to challenge
      currentLevel = "challenge";
      
      // Find optimal parameters for the challenge level
      const targetDifficulty = calculateDifficultyScore(challengeLevel, 1, 5000); // Start with manageable difficulty
      const optimalParams = findOptimalParameters(targetDifficulty, {
        currentN: challengeLevel,
        minN: challengeLevel, // Keep at least the challenge level
        maxN: challengeLevel  // Don't exceed challenge level
      });
      
      // Apply the optimal parameters
      nLevelInputHandler(null, optimalParams.n);
      targetStimuliInputHandler(null, optimalParams.matches);
      baseDelayInputHandler(null, optimalParams.delay);
      
      // Record the level change
      addLevelChangeHistory(`Mastery → Challenge (Difficulty: ${currentDifficulty.toFixed(1)} → ${targetDifficulty.toFixed(1)})`);
      
      // Reset streaks
      masterySuccessStreak = 0;
      masteryFailureStreak = 0;
      challengeSuccessStreak = 0;
      challengeFailureStreak = 0;
    }
  }
}

function evaluateAdaptiveDSession(accuracy) {
  const isChallenge = currentLevel === "challenge";
  
  // Calculate base difficulty targets based on dimensions
  // Higher dimension counts should have higher difficulty
  const baseMasteryDifficulty = masteryDimensions * 0.8; 
  const baseChallengeDifficulty = challengeDimensions * 0.8;
  
  // Calculate current difficulties
  const masteryDifficulty = Math.max(baseMasteryDifficulty, calculateDifficultyScore(nLevel, targetNumOfStimuli, baseDelay));
  const challengeDifficulty = Math.max(baseChallengeDifficulty, calculateDifficultyScore(nLevel, targetNumOfStimuli, baseDelay));
  
  console.log(`D-Level - Current level: ${currentLevel}, Mastery target: ${masteryDifficulty.toFixed(1)}, Challenge target: ${challengeDifficulty.toFixed(1)}`);
  
  if (isChallenge) {
    // Check for challenge failure
    if (challengeFailureStreak >= 3 || accuracy < 0.5) {
      // Move back to mastery with optimized parameters
      currentLevel = "mastery";
      
      // Find optimal parameters for 90% of mastery difficulty
      const targetDifficulty = masteryDifficulty * 0.9;
      const optimalParams = findOptimalParameters(targetDifficulty, {
        // Keep N-level constrained, we're adapting dimensions instead
        currentN: nLevel,
        minN: nLevel,
        maxN: nLevel
      });
      
      // Apply optimal parameters
      targetStimuliInputHandler(null, optimalParams.matches);
      baseDelayInputHandler(null, optimalParams.delay);
      
      // Record the level change
      addLevelChangeHistory(`Challenge → Mastery (Difficulty: ${currentDifficulty.toFixed(1)} → ${targetDifficulty.toFixed(1)})`);
      
      // Reset streaks
      challengeSuccessStreak = 0;
      challengeFailureStreak = 0;
      masterySuccessStreak = 0;
      masteryFailureStreak = 0;
      
      // Set active stimuli for mastery dimensions
      setActiveStimuli(masteryDimensions);
    } 
    // Check for mastering challenge
    else if (challengeSuccessStreak >= 3 && accuracy >= 0.8) {
      // Challenge becomes new mastery, create new challenge
      masteryDimensions = challengeDimensions;
      challengeDimensions = Math.min(9, masteryDimensions + 1);
      
      // Find optimal parameters for the new difficulty
      const targetDifficulty = challengeDifficulty * 0.9; // Start slightly easier
      const optimalParams = findOptimalParameters(targetDifficulty, {
        // Keep N-level constrained, we're adapting dimensions
        currentN: nLevel,
        minN: nLevel,
        maxN: nLevel
      });
      
      // Apply optimal parameters
      targetStimuliInputHandler(null, optimalParams.matches);
      baseDelayInputHandler(null, optimalParams.delay);
      
      // Record the level change
      addLevelChangeHistory(`Mastery Dimensions increased to ${masteryDimensions} (Difficulty: ${targetDifficulty.toFixed(1)})`);
      
      // Reset streaks
      challengeSuccessStreak = 0;
      challengeFailureStreak = 0;
      masterySuccessStreak = 0;
      masteryFailureStreak = 0;
      
      // Set active stimuli for mastery dimensions
      setActiveStimuli(masteryDimensions);
    }
  } else { // At mastery level
    // Check for ready to challenge
    if (masterySuccessStreak >= 3 && accuracy >= 0.8) {
      // Move up to challenge
      currentLevel = "challenge";
      
      // Find optimal parameters for the challenge level
      const targetDifficulty = challengeDifficulty * 0.9; // Start slightly easier
      const optimalParams = findOptimalParameters(targetDifficulty, {
        // Keep N-level constrained, we're adapting dimensions
        currentN: nLevel,
        minN: nLevel,
        maxN: nLevel
      });
      
      // Apply optimal parameters
      targetStimuliInputHandler(null, optimalParams.matches);
      baseDelayInputHandler(null, optimalParams.delay);
      
      // Record the level change
      addLevelChangeHistory(`Mastery → Challenge (Difficulty: ${currentDifficulty.toFixed(1)} → ${targetDifficulty.toFixed(1)})`);
      
      // Reset streaks
      masterySuccessStreak = 0;
      masteryFailureStreak = 0;
      challengeSuccessStreak = 0;
      challengeFailureStreak = 0;
      
      // Set active stimuli for challenge dimensions
      setActiveStimuli(challengeDimensions);
    }
  }
}

// Function to display specific adaptive content based on mode
function displayAdaptiveContent(mode, providedContainer) {
    // Use provided container if available, otherwise get from DOM
    const container = providedContainer || document.getElementById('adaptive-content-container');
    
    // If no container found, exit early
    if (!container) {
      console.log("Adaptive content container not found");
      return;
    }
    
    // Determine which mode to display if none specified
    if (!mode) {
      mode = enableAdaptiveN ? 'adaptive-n' : 'adaptive-d';
    }
    
    // Clear previous content
    container.innerHTML = '';
  
  // Add difficulty score display
  const difficultyDiv = document.createElement('div');
  difficultyDiv.className = 'current-mode';
  difficultyDiv.style.marginBottom = '1rem';
  difficultyDiv.innerHTML = `
    <div class="current-mode-label">Difficulty Score</div>
    <div class="current-mode-value">${currentDifficulty.toFixed(1)}</div>
    <div style="font-size: 0.8rem; opacity: 0.8; margin-top: 0.5rem;">
      Highest: ${highestDifficulty.toFixed(1)}
    </div>
  `;
  container.appendChild(difficultyDiv);
  
  // Current mode display
  const currentModeDiv = document.createElement('div');
  currentModeDiv.className = 'current-mode';
  currentModeDiv.innerHTML = `
    <div class="current-mode-label">Current Mode</div>
    <div class="current-mode-value">${currentLevel === "mastery" ? "Mastery" : "Challenge"}</div>
  `;
  container.appendChild(currentModeDiv);
  
  // Create stats cards for levels
  const statsCards = document.createElement('div');
  statsCards.className = 'stats-cards';
  
  if (mode === 'adaptive-n') {
    // Display N-Level progression info
    statsCards.innerHTML = `
      <div class="stats-card">
        <div class="stats-card-title">Mastery N</div>
        <div class="stats-card-value">${masteryLevel}</div>
      </div>
      <div class="stats-card">
        <div class="stats-card-title">Challenge N</div>
        <div class="stats-card-value">${challengeLevel}</div>
      </div>
    `;
  } else {
    // Display D-Level progression info
    statsCards.innerHTML = `
      <div class="stats-card">
        <div class="stats-card-title">Mastery D</div>
        <div class="stats-card-value">${masteryDimensions}</div>
      </div>
      <div class="stats-card">
        <div class="stats-card-title">Challenge D</div>
        <div class="stats-card-value">${challengeDimensions}</div>
      </div>
    `;
  }
  
  container.appendChild(statsCards);
  
  // Create performance metrics
  const performanceDiv = document.createElement('div');
  performanceDiv.className = 'adaptive-performance';
  
  performanceDiv.innerHTML = `
    <div class="adaptive-metrics">
      <div class="adaptive-metric">
        <span class="adaptive-metric-label">Success Streak</span>
        <span class="adaptive-metric-value success-value">${currentLevel === "mastery" ? masterySuccessStreak : challengeSuccessStreak}</span>
      </div>
      <div class="adaptive-metric">
        <span class="adaptive-metric-label">Mistake Streak</span>
        <span class="adaptive-metric-value mistake-value">${currentLevel === "mastery" ? masteryFailureStreak : challengeFailureStreak}</span>
      </div>
    </div>
    <div class="adaptive-metrics">
      <div class="adaptive-metric">
        <span class="adaptive-metric-label">Delay</span>
        <span class="adaptive-metric-value">${baseDelay}ms</span>
      </div>
      <div class="adaptive-metric">
        <span class="adaptive-metric-label">Target Stimuli</span>
        <span class="adaptive-metric-value">${targetNumOfStimuli}</span>
      </div>
    </div>
  `;
  
  container.appendChild(performanceDiv);
}

// Helper function for retrieving latest values
function getLastValueForLevel(levelChanges, levelType) {
  // Find the last change that contains values for the specified level type
  for (let i = levelChanges.length - 1; i >= 0; i--) {
    const change = levelChanges[i];
    if (change.currentLevel === levelType) {
      return {
        baseDelay: change.baseDelay,
        targetNumOfStimuli: change.targetNumOfStimuli
      };
    }
  }
  return null;
}

// Function to display N-Level adaptive content
function displayAdaptiveNContent(container, levelChanges) {
  const infoContainer = document.createElement('div');
  infoContainer.style.padding = '0.5rem';
  infoContainer.style.textAlign = 'center';
  infoContainer.style.fontSize = '1rem';
  
  infoContainer.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <strong>Current Level:</strong> ${currentLevel === "mastery" ? "Mastery" : "Challenge"}
    </div>
    <div class="stats-cards" style="font-size: 1rem; margin: 1rem 0;">
      <div class="stats-card">
        <div class="stats-card-title">Mastery N</div>
        <div class="stats-card-value">${masteryLevel}</div>
      </div>
      <div class="stats-card">
        <div class="stats-card-title">Challenge N</div>
        <div class="stats-card-value">${challengeLevel}</div>
      </div>
    </div>
    <div style="margin-top: 1rem;">
      <div><strong>Success Streak:</strong> ${currentLevel === "mastery" ? masterySuccessStreak : challengeSuccessStreak}</div>
      <div><strong>Mistake Streak:</strong> ${currentLevel === "mastery" ? masteryFailureStreak : challengeFailureStreak}</div>
      <div><strong>Delay:</strong> ${baseDelay}ms</div>
      <div><strong>Target Stimuli:</strong> ${targetNumOfStimuli}</div>
    </div>
  `;
  
  container.appendChild(infoContainer);
}

// Function to display D-Level adaptive content
function displayAdaptiveDContent(container, levelChanges) {
  const infoContainer = document.createElement('div');
  infoContainer.style.padding = '0.5rem';
  infoContainer.style.textAlign = 'center';
  infoContainer.style.fontSize = '1rem';
  
  infoContainer.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <strong>Current Level:</strong> ${currentLevel === "mastery" ? "Mastery" : "Challenge"}
    </div>
    <div class="stats-cards" style="font-size: 1rem; margin: 1rem 0;">
      <div class="stats-card">
        <div class="stats-card-title">Mastery D</div>
        <div class="stats-card-value">${masteryDimensions}</div>
      </div>
      <div class="stats-card">
        <div class="stats-card-title">Challenge D</div>
        <div class="stats-card-value">${challengeDimensions}</div>
      </div>
    </div>
    <div style="margin-top: 1rem;">
      <div><strong>Success Streak:</strong> ${currentLevel === "mastery" ? masterySuccessStreak : challengeSuccessStreak}</div>
      <div><strong>Mistake Streak:</strong> ${currentLevel === "mastery" ? masteryFailureStreak : challengeFailureStreak}</div>
      <div><strong>Delay:</strong> ${baseDelay}ms</div>
      <div><strong>Target Stimuli:</strong> ${targetNumOfStimuli}</div>
    </div>
  `;
  
  container.appendChild(infoContainer);
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

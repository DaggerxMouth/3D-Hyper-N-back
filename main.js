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
  document.querySelector(".stop").classList.remove("active");
  document.querySelector(".play").classList.add("active");

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
loadHistory();// Fixed main.js file for the 3D Hyper N-Back application

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

// Updated function to display individual stimuli accuracy
function toggleStats(_dim) {
  if (!_dim && statsDialogContent.parentElement.hasAttribute("open")) {
    statsDialogContent.parentElement.close();
    return;
  }

  statsDialogContent.parentElement.show();
  const dim = _dim || localStorage.getItem("last-dim") || 1;
  const radios = [ ...document.querySelectorAll("input[name='dimension']") ];
  radios[dim - 1].checked = true;
  const _history = history[dim];
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
  
  // Initialize datasets for each stimulus type with color-blind safe colors
  const stimuliColors = {
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
  
  // Create empty datasets for the chart (we'll populate them if the stimulus was used)
  Object.keys(stimuliTotals).forEach(key => {
    chartData.datasets.push({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      data: [],
      borderColor: stimuliColors[key],
      backgroundColor: stimuliColors[key] + '33', // Add alpha for fill
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
    bars.appendChild(getBar(toOneDecimal(_avgNLevel)));
  }
  avgNLevel = avgNLevel / entries.length;
  document.querySelector("#sc-avg").innerHTML = toOneDecimal(avgNLevel) || "-";
  document.querySelector("#sc-min").innerHTML = (minNLevel === 10) ? "-" : minNLevel;
  document.querySelector("#sc-max").innerHTML = maxNLevel || "-";
  document.querySelector("#sc-right").innerHTML = right || "-";
  document.querySelector("#sc-missed").innerHTML = missed || "-";
  document.querySelector("#sc-wrong").innerHTML = wrong || "-";
  
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
let stimuliChart = null; // Variable to track chart instance

function createStimuliChart(chartData) {
  // Get the canvas context
  const canvas = document.getElementById('stimuli-chart');
  const ctx = canvas.getContext('2d');
  
  // Destroy previous chart if it exists
  if (stimuliChart) {
    stimuliChart.destroy();
  }
  
  // Filter out datasets with no data
  const filteredDatasets = chartData.datasets.filter(dataset => 
    dataset.data.some(value => value !== null)
  );
  
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
      camera: {d: true,
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
        enable

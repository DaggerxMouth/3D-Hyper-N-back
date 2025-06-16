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
  "Rotation": "r",
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
const checkRotationBtn = document.querySelector(".check-rotation");

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
  rotationEnableTrig,
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

const rotations = [
  "0, 0, 0", "45, 0, 0", "90, 0, 0", "135, 0, 0",
  "0, 45, 0", "0, 90, 0", "0, 135, 0", "0, 180, 0",
  "0, 0, 45", "0, 0, 90", "0, 0, 135", "0, 0, 180",
  "45, 45, 0", "90, 90, 0", "45, 0, 45", "0, 45, 45",
  "90, 45, 90", "135, 90, 45", "180, 0, 90", "45, 135, 180",
  "270, 180, 90", "315, 225, 45", "180, 270, 135", "225, 315, 270"
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
const defVal_rotationEnabled = false;
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
let rotationEnabled = defVal_rotationEnabled;
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
let enableRotationCheck = true;

let currWalls;
let currCamera;
let currFace;
let currPosition;

let currWord;
let currShape;
let currCorner;
let currSound;
let currColor;
let currRotation;

let rightWalls = 0;
let rightCamera = 0;
let rightFace = 0;
let rightPosition = 0;

let rightWord = 0;
let rightShape = 0;
let rightCorner = 0;
let rightSound = 0;
let rightColor = 0;
let rightRotation = 0;

let wrongWalls = 0;
let wrongCamera = 0;
let wrongFace = 0;
let wrongPosition = 0;

let wrongWord = 0;
let wrongShape = 0;
let wrongCorner = 0;
let wrongSound = 0;
let wrongColor = 0;
let wrongRotation = 0;

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
let matchingRotation = 0;

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
  nPlusLureResistance: 0,
  totalLureResistance: 0,
  accuracy: 0,
  postLureTrials: [],
  postLurePerformance: 0,
  responseTimes: [],
  meanRT: 0,
  medianRT: 0,
  hitRT: 0,
  correctRejectionRT: 0,
  speedScore: 0,
  rtImprovement: 0
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

// Track accuracy attempts for integer level transitions
let accuracyAttemptsByConfig = {
  2: { attempts: [], requiredSuccesses: 3, windowSize: 5 },
  3: { attempts: [], requiredSuccesses: 3, windowSize: 5 },
  4: { attempts: [], requiredSuccesses: 3, windowSize: 5 },
  5: { attempts: [], requiredSuccesses: 3, windowSize: 5 },
  6: { attempts: [], requiredSuccesses: 3, windowSize: 5 },
  7: { attempts: [], requiredSuccesses: 3, windowSize: 5 },
  8: { attempts: [], requiredSuccesses: 3, windowSize: 5 },
  9: { attempts: [], requiredSuccesses: 3, windowSize: 5 }
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

// Phase transition accuracy tracking
let phaseAccuracyAttemptsByConfig = {
  2: { phase1to2: [], phase2to3: [], requiredSuccesses: 3, windowSize: 5 },
  3: { phase1to2: [], phase2to3: [], requiredSuccesses: 3, windowSize: 5 },
  4: { phase1to2: [], phase2to3: [], requiredSuccesses: 3, windowSize: 5 },
  5: { phase1to2: [], phase2to3: [], requiredSuccesses: 3, windowSize: 5 },
  6: { phase1to2: [], phase2to3: [], requiredSuccesses: 3, windowSize: 5 },
  7: { phase1to2: [], phase2to3: [], requiredSuccesses: 3, windowSize: 5 },
  8: { phase1to2: [], phase2to3: [], requiredSuccesses: 3, windowSize: 5 },
  9: { phase1to2: [], phase2to3: [], requiredSuccesses: 3, windowSize: 5 }
};

function calculateDPrime(hits, misses, falseAlarms, correctRejections) {
  console.log(`calculateDPrime inputs: hits=${hits}, misses=${misses}, FA=${falseAlarms}, CR=${correctRejections}`);
  
  const n = hits + misses;
  const m = falseAlarms + correctRejections;
  
  // Use log-linear correction for small samples
  const hitRate = (hits + 0.5) / (n + 1);
  const faRate = (falseAlarms + 0.5) / (m + 1);
  
  // Z-score conversion (inverse normal distribution)
  const zHit = gaussianInverse(hitRate);
  const zFA = gaussianInverse(faRate);
  
  const dPrime = zHit - zFA;
  console.log(`d'prime calculation: hitRate=${hitRate.toFixed(3)}, faRate=${faRate.toFixed(3)}, zHit=${zHit.toFixed(3)}, zFA=${zFA.toFixed(3)}, d'=${dPrime.toFixed(3)}`);
  
  return dPrime;
}

function calculateResponseBias(hits, misses, falseAlarms, correctRejections) {
  const n = hits + misses;
  const m = falseAlarms + correctRejections;
  
  // Use log-linear correction for small samples
  const hitRate = (hits + 0.5) / (n + 1);
  const faRate = (falseAlarms + 0.5) / (m + 1);
  
  const zHit = gaussianInverse(hitRate);
  const zFA = gaussianInverse(faRate);
  
  // Calculate c (criterion) - negative values = liberal, positive = conservative
  const c = -0.5 * (zHit + zFA);
  
  console.log(`Bias calculation: hits=${hits}/${n}, FA=${falseAlarms}/${m}, c=${c.toFixed(3)}`);
  
  return c;
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
  
  // Use personal baseline but cap at 2.0 (excellent performance)
  const dPrimeThreshold = Math.max(0.5, baseline.avgDPrime);
  const lureResistanceThreshold = Math.max(0.5, baseline.n1LureResistance);
  
  // Calculate raw accuracy (matches only, no credit for correct rejections)
  const totalMatches = sessionMetrics.hits + sessionMetrics.misses + sessionMetrics.falseAlarms;
  const correctResponses = sessionMetrics.hits;
  const accuracy = totalMatches > 0 ? correctResponses / totalMatches : 0;

  // Criteria for advancement
  const matchAccuracy = sessionMetrics.hits / Math.max(1, sessionMetrics.hits + sessionMetrics.misses + sessionMetrics.falseAlarms);
  const goodAccuracy = matchAccuracy >= 0.9; // 90% accuracy minimum for any progress
  const goodLureResistance = sessionMetrics.n1LureResistance >= lureResistanceThreshold;
  console.log(`Advancement criteria: accuracy=${(matchAccuracy * 100).toFixed(1)}%, goodAccuracy=${goodAccuracy}`);
  
  // Get current level components
  const { nLevel, microProgress } = getMicroLevelComponents(currentMicroLevel);
  
  // Advancement size (0.01 to 0.05 based on accuracy)
  const baseIncrement = 0.01;
  const maxIncrement = 0.05;
  // Use matchAccuracy that was already calculated above
  const performanceRatio = Math.min(1, Math.max(0, (matchAccuracy - 0.5) / 0.4)); // Scale from 50% to 90%
  const increment = baseIncrement + (performanceRatio * (maxIncrement - baseIncrement));
  const roundedIncrement = Math.round(increment * 100) / 100;
  
  // Determine new micro-level
  let newMicroLevel = currentMicroLevel;
  console.log("=== START checkMicroLevelAdvancement ===");
  console.log(`Initial newMicroLevel: ${newMicroLevel}`);

  // Check for regression first
  let isRegressing = false;
  if (matchAccuracy < 0.75) {
    // Regression in micro-level for poor performance (below 75% accuracy)
    const decrement = 0.05;
    newMicroLevel = Math.round((currentMicroLevel - decrement) * 100) / 100;
    newMicroLevel = Math.max(2.0, newMicroLevel);
    console.log(`Decreasing micro-level by -${decrement.toFixed(2)} (accuracy below 75%: ${(matchAccuracy * 100).toFixed(1)}%)`);
    isRegressing = true;
    console.log(`Returning newMicroLevel: ${newMicroLevel} (was ${currentMicroLevel})`);
    
    // Check if regression dropped us below a phase boundary - reset attempts if so
    const oldProgress = currentMicroLevel - Math.floor(currentMicroLevel);
    const newProgress = newMicroLevel - Math.floor(newMicroLevel);
    
    const wasAtPhase1Boundary = oldProgress >= 0.33;
    const wasAtPhase2Boundary = oldProgress >= 0.66;
    const droppedBelowPhase1 = wasAtPhase1Boundary && newProgress < 0.33;
    const droppedBelowPhase2 = wasAtPhase2Boundary && newProgress < 0.66;
    
    if (droppedBelowPhase1 || droppedBelowPhase2) {
      const configKey = getCurrentConfigKey();
      const phaseData = phaseAccuracyAttemptsByConfig[configKey];
      
      if (droppedBelowPhase1) {
        phaseData.phase1to2 = [];
        console.log("Reset phase 1→2 attempts due to regression below .33");
      }
      if (droppedBelowPhase2) {
        phaseData.phase2to3 = [];
        console.log("Reset phase 2→3 attempts due to regression below .66");
      }
    }
    return newMicroLevel;

  } else if (matchAccuracy >= 0.75 && matchAccuracy < 0.90) {
    // Record failed phase transition attempt if at boundary
    const atPhaseBoundary = Math.abs(microProgress - 0.33) < 0.001 || Math.abs(microProgress - 0.66) < 0.001;
    if (atPhaseBoundary) {
      const configKey = getCurrentConfigKey();
      const phaseData = phaseAccuracyAttemptsByConfig[configKey];
      const currentPhase = microProgress < 0.34 ? 1 : (microProgress < 0.67 ? 2 : 3);
      const transitionKey = currentPhase === 1 ? 'phase1to2' : 'phase2to3';
      
      // Record failed attempt
      phaseData[transitionKey].push(false);
      if (phaseData[transitionKey].length > phaseData.windowSize) {
        phaseData[transitionKey] = phaseData[transitionKey].slice(-phaseData.windowSize);
      }
    }
    // Stay at current level
    newMicroLevel = currentMicroLevel;
    console.log(`Maintaining current level (accuracy ${(matchAccuracy * 100).toFixed(1)}% - need 90% for progress)`);

  } else if (goodAccuracy) {
    // Calculate potential new level (only if not already regressing)
    let potentialNewLevel = Math.round((currentMicroLevel + roundedIncrement) * 100) / 100;
    
      // Check if this would cross a phase boundary
      const currentPhase = microProgress < 0.34 ? 1 : (microProgress < 0.67 ? 2 : 3);
      const newProgress = potentialNewLevel - Math.floor(potentialNewLevel);
      const potentialPhase = newProgress < 0.34 ? 1 : (newProgress < 0.67 ? 2 : 3);
    
      // If crossing phase boundary, cap at current phase maximum
      if (potentialPhase > currentPhase) {
        if (currentPhase === 1) {
          potentialNewLevel = Math.round((Math.floor(currentMicroLevel) + 0.33) * 100) / 100;
        } else if (currentPhase === 2) {
          potentialNewLevel = Math.round((Math.floor(currentMicroLevel) + 0.66) * 100) / 100;
        }
      }
      
      potentialNewLevel = Math.min(9.99, potentialNewLevel);

      // Get current phase and potential new phase
      // Fixed phase boundaries: Phase 1: 0.00-0.33, Phase 2: 0.34-0.66, Phase 3: 0.67-0.99
      // Variables currentPhase, newProgress, and potentialPhase already declared above
      
      // Check if we're at a phase boundary and should record attempts  
      const atPhaseBoundary = (currentPhase === 1 && Math.abs(microProgress - 0.33) < 0.001) || 
                 (currentPhase === 2 && Math.abs(microProgress - 0.66) < 0.001);

      // Check if we're at integer boundary (0.99)
      const atIntegerBoundary = (currentPhase === 3 && microProgress >= 0.99);

      if (atPhaseBoundary || (potentialPhase > currentPhase && !atIntegerBoundary)) {
        // Phase transitions require 90% accuracy for 3 out of 5 sessions
        const configKey = getCurrentConfigKey();
        const phaseData = phaseAccuracyAttemptsByConfig[configKey];

        // Determine which phase transition this is
        const transitionKey = currentPhase === 1 ? 'phase1to2' : 'phase2to3';

        // Calculate proper accuracy for phase transitions (matches only)
        const matchAccuracy = sessionMetrics.hits / Math.max(1, sessionMetrics.hits + sessionMetrics.misses + sessionMetrics.falseAlarms);

        // Record this attempt
        phaseData[transitionKey].push(matchAccuracy >= 0.90);
        
        // Keep only the most recent attempts within window size
        if (phaseData[transitionKey].length > phaseData.windowSize) {
          phaseData[transitionKey] = phaseData[transitionKey].slice(-phaseData.windowSize);
        }
        
        // Count successful attempts (90%+ accuracy) in the window
        const successCount = phaseData[transitionKey].filter(a => a).length;
        
        // Need at least 5 attempts AND 3+ successes to advance
        const totalAttempts = phaseData[transitionKey].length;
        if (totalAttempts >= 5 && successCount >= phaseData.requiredSuccesses) {
          newMicroLevel = potentialNewLevel;
          console.log(`PHASE UP! ${successCount}/${phaseData.requiredSuccesses} in ${totalAttempts} attempts`);
          // Reset attempts after phase transition
          phaseData[transitionKey] = [];
        } else {
          // Allow progress up to phase boundary
          const phaseCap = currentPhase === 1 ? 0.33 : (currentPhase === 2 ? 0.66 : 0.99);
          const maxAllowedLevel = Math.round((Math.floor(currentMicroLevel) + phaseCap) * 100) / 100;
          
          // Progress within phase but don't exceed boundary
          newMicroLevel = Math.min(potentialNewLevel, maxAllowedLevel);
          
          // Only log as blocked if we actually hit the cap
          if (potentialNewLevel > maxAllowedLevel) {
            console.log(`Phase transition blocked: ${successCount}/${phaseData.requiredSuccesses} successful attempts (${totalAttempts} total, need ${5 - totalAttempts} more sessions)`);
          } else {
            console.log(`Progress within phase: +${(newMicroLevel - currentMicroLevel).toFixed(2)}`);
          }
          console.log(`Phase transition blocked: ${successCount}/${phaseData.requiredSuccesses} successful attempts (${totalAttempts} total, need ${5 - totalAttempts} more sessions)`);
        }
      } else {
        // Within same integer level - no accuracy requirement
        newMicroLevel = potentialNewLevel;
        console.log(`Micro-progress: +${increment.toFixed(2)} (d'=${sessionMetrics.dPrime.toFixed(2)})`);
      }
      
      // If phase transition was blocked, skip all other advancement logic
      if (newMicroLevel === currentMicroLevel) {
        // Do nothing more - stay at current level
      } else {
        // Check if this would cross an integer boundary
        if (Math.floor(potentialNewLevel) > Math.floor(currentMicroLevel)) {
          // Integer level transition - check accuracy attempts
          const configKey = getCurrentConfigKey();
          const attemptData = accuracyAttemptsByConfig[configKey];
          
          // Calculate proper accuracy for integer transitions (matches only)
          const matchAccuracy = sessionMetrics.hits / Math.max(1, sessionMetrics.hits + sessionMetrics.misses + sessionMetrics.falseAlarms);
          
          // Record this attempt
          attemptData.attempts.push(matchAccuracy >= 0.90);
          
          // Keep only the most recent attempts within window size
          if (attemptData.attempts.length > attemptData.windowSize) {
            attemptData.attempts = attemptData.attempts.slice(-attemptData.windowSize);
          }
          
          // Count successful attempts (90%+ accuracy) in the window
          const successCount = attemptData.attempts.filter(a => a).length;
          
          // Check if we have enough successful attempts
          if (successCount >= attemptData.requiredSuccesses) {
            newMicroLevel = potentialNewLevel;
            console.log(`LEVEL UP! ${successCount}/${attemptData.requiredSuccesses} successful attempts in last ${attemptData.windowSize} sessions`);
            // Reset attempts after level up
            attemptData.attempts = [];
          } else {
            // Cap at .99 of current level
            newMicroLevel = Math.floor(currentMicroLevel) + 0.99;
            console.log(`Integer transition blocked: ${successCount}/${attemptData.requiredSuccesses} successful attempts (${(matchAccuracy * 100).toFixed(0)}% this session)`);
          }
        } else {
          // Within same integer level - check if this is also within same phase
          // currentPhase and potentialPhase already calculated above
          
          if (currentPhase === potentialPhase) {
            // Same phase - allow normal progress
            newMicroLevel = potentialNewLevel;
            console.log(`Micro-progress: +${increment.toFixed(2)} (d'=${sessionMetrics.dPrime.toFixed(2)})`);
          }
          // If phase would change, newMicroLevel remains unchanged from phase transition block
      }
    }
    } else {
    // Accuracy between 75-89% - maintain current level with no progress
    newMicroLevel = currentMicroLevel;
    console.log(`Maintaining current level (accuracy ${(matchAccuracy * 100).toFixed(1)}% - need 90% for progress)`);
}
  
  // Integer level transitions
  if (Math.floor(newMicroLevel) > nLevel) {
    console.log(`LEVEL UP! ${nLevel} -> ${Math.floor(newMicroLevel)}`);
  } else if (Math.floor(newMicroLevel) < nLevel) {
    console.log(`LEVEL DOWN! ${nLevel} -> ${Math.floor(newMicroLevel)}`);
  }
  
  console.log("=== END checkMicroLevelAdvancement ===");
  console.log(`About to return: ${newMicroLevel}`);
  return newMicroLevel;
}

// Function to get micro-level components
function getMicroLevelComponents(microLevel) {
  const nLevel = Math.floor(microLevel);
  const microProgress = microLevel - nLevel; // 0.00 to 0.99
  return { nLevel, microProgress };
}

function getSpeedTarget(microLevel) {
  const { nLevel, microProgress } = getMicroLevelComponents(microLevel);
  
  // Determine which phase we're in and calculate relative progress within that phase
  let phaseProgress;
  // Round to avoid floating-point issues
  const roundedProgress = Math.round(microProgress * 100) / 100;
  
  if (roundedProgress < 0.34) {
    // Phase 1: 0-33 levels
    phaseProgress = roundedProgress / 0.33;
  } else if (roundedProgress < 0.67) {
    // Phase 2: 34-66 levels
    phaseProgress = (roundedProgress - 0.34) / 0.32;
    // Phase 2: 34-66 levels
    phaseProgress = (microProgress - 0.34) / 0.32;
  } else {
    // Phase 3: 67-99 levels
    phaseProgress = (microProgress - 0.67) / 0.32;
  }
  
  // All phases go from baseDelay (5000ms) to 3000ms
  const levelStartSpeed = baseDelay;
  const levelEndSpeed = 3000;
  
  // Calculate speed based on phase progress
  const speedRange = levelStartSpeed - levelEndSpeed;
  const target = levelStartSpeed - (speedRange * phaseProgress);
  
  console.log(`Speed calc: phase=${phaseProgress.toFixed(2)}, target=${target}, returning=${Math.round(target)}`);
  return Math.round(target);
}

function formatMicroLevel(microLevel) {
  if (microLevel === undefined || microLevel === null || isNaN(microLevel)) {
    return "2.00"; // Default to 2.00 if undefined
  }
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
  if (rotationEnabled) count++;
  return count;
}

// Function to get current configuration key
function getCurrentConfigKey() {
  const count = getActiveStimuliCount();
  // Ensure we always return a valid config key (minimum 2)
  if (count < 2) {
    console.warn(`Invalid stimulus count ${count}, defaulting to 2`);
    return 2;
  }
  return count;
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
  // Ensure currentMicroLevel is valid
  if (currentMicroLevel === undefined || currentMicroLevel === null || isNaN(currentMicroLevel)) {
    console.error("Invalid currentMicroLevel detected, resetting to 2.00");
    currentMicroLevel = 2.00;
  }
  const configKey = getCurrentConfigKey();
  
  // Don't save here - micro-levels are saved when they change during game end
  // Just load the stored value for the new config
  
  // Load micro-level for new config
  // Validate the stored micro-level before using it
  const storedLevel = microLevelsByConfig[configKey];
  if (storedLevel === undefined || storedLevel === null || isNaN(storedLevel) || storedLevel < 2 || storedLevel > 9.99) {
    console.warn(`Invalid stored micro-level ${storedLevel} for config ${configKey}, using 2.00`);
    currentMicroLevel = 2.00;
    microLevelsByConfig[configKey] = 2.00;
  } else {
    currentMicroLevel = storedLevel;
  }
  console.log(`Loaded micro-level ${currentMicroLevel} from config ${configKey}`);
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

function rotationEnableTrigHandler(evt, defVal) {
  if (defVal != null) {
    rotationEnableTrig.checked = defVal;
    rotationEnabled = defVal;
  } else {
    // Check if enabling rotation would create 10D (prevent this)
    const currentCount = getActiveStimuliCount();
    if (!rotationEnabled && currentCount >= 9) {
      alert("Maximum 9 stimuli allowed. Disable another stimulus first.");
      return;
    }
    
    rotationEnabled = !rotationEnabled;
    saveSettings();
    updateMicroLevelForConfig();
  }

  if (!rotationEnabled) {
    checkRotationBtn.style.display = "none";
  } else {
    checkRotationBtn.style.display = "inline-block";
  }

  checkRotationBtn.style.animationDelay = "0s";
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
    let inputValue = parseFloat(nLevelInput.value);
    
    // If parsing failed, use current value
    if (isNaN(inputValue)) {
      inputValue = currentMicroLevel;
      nLevelInput.value = formatMicroLevel(currentMicroLevel);
    }
    
    // Validate the input
    if (inputValue < 2 || inputValue > 9.99) {
      nLevelInput.classList.add("input-incorrect");
      // Clamp the value but don't return
      inputValue = Math.min(Math.max(inputValue, 2), 9.99);
    } else {
      nLevelInput.classList.remove("input-incorrect");
    }

    // Update the micro-level and standard nLevel
    currentMicroLevel = inputValue;
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
    let inputValue = parseInt(targetStimuliInput.value);
    
    // If parsing failed, use current value
    if (isNaN(inputValue)) {
      inputValue = targetNumOfStimuli;
      targetStimuliInput.value = targetNumOfStimuli;
    }
    
    // Clamp to valid range
    targetNumOfStimuli = Math.min(Math.max(inputValue, 1), 30);
    
    // Update the input field to show the clamped value
    if (targetNumOfStimuli !== inputValue) {
      targetStimuliInput.value = targetNumOfStimuli;
    }
    
    saveSettings();
  }

  if (targetNumOfStimuli < 1 || targetNumOfStimuli > 30) {
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
    let inputValue = parseInt(baseDelayInput.value);
    
    // If parsing failed, use current value
    if (isNaN(inputValue)) {
      inputValue = baseDelay;
      baseDelayInput.value = baseDelay;
    }
    
    // Clamp to valid range
    baseDelay = Math.min(Math.max(inputValue, 2000), 20000);
    
    // Update the input field to show the clamped value
    if (baseDelay !== inputValue) {
      baseDelayInput.value = baseDelay;
    }
    
    saveSettings();
    // Update speed display with new base delay
    const speedDisplay = document.querySelector("#speed-display");
    if (speedDisplay) {
      speedDisplay.innerHTML = getSpeedTarget(currentMicroLevel);
    }
  }

  if (baseDelay < 2000 || baseDelay > 20000) {
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
    let inputValue = parseInt(maxAllowedMistakesInput.value);
    
    // If parsing failed, use current value
    if (isNaN(inputValue)) {
      inputValue = maxAllowedMistakes;
      maxAllowedMistakesInput.value = maxAllowedMistakes;
    }
    
    // Clamp to valid range
    maxAllowedMistakes = Math.min(Math.max(inputValue, 0), 30);
    
    // Update the input field to show the clamped value
    if (maxAllowedMistakes !== inputValue) {
      maxAllowedMistakesInput.value = maxAllowedMistakes;
    }
    
    saveSettings();
  }

  if (maxAllowedMistakes < 0 || maxAllowedMistakes > 30) {
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
    let inputValue = parseInt(numStimuliSelectInput.value);
    
    // If parsing failed, use current value
    if (isNaN(inputValue)) {
      inputValue = numStimuliSelect;
      numStimuliSelectInput.value = numStimuliSelect;
    }
    
    // Clamp to valid range
    numStimuliSelect = Math.min(Math.max(inputValue, 1), 9);
    
    // Update the input field to show the clamped value
    if (numStimuliSelect !== inputValue) {
      numStimuliSelectInput.value = numStimuliSelect;
    }
    
    saveSettings();
  }

  if (numStimuliSelect < 1 || numStimuliSelect > 9) {
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
  rotationEnableTrigHandler(null, false);
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
  let allValid = true;
  
  for (let binding of bindings) {
    const stim = binding.getAttribute("id").replace("binding-", "");
    const key = binding.value.toLowerCase()[0];
    binding.value = key; // Ensure just one char on save
    if (stim && key) {
      keyBindings[stim] = key;
    } else {
      allValid = false;
    }
  }
  
  if (!allValid) {
    alert("All buttons need a binding in order to continue.");
    return;
  }
  
  try {
    localStorage.setItem(LS_BINDINGS_KEY, JSON.stringify(keyBindings));
    bindDialogContent.parentElement.close();
    reloadBindKeys();
  } catch (e) {
    console.error("Failed to save bindings:", e);
    alert("Failed to save key bindings. They will be reset on next reload.");
  }
}

function loadBindings() {
  let _keyBindings;
  try {
    _keyBindings = JSON.parse(localStorage.getItem(LS_BINDINGS_KEY));
  } catch (e) {
    console.error("Failed to parse key bindings from localStorage:", e);
    _keyBindings = null;
  }
  
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
  try {
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
  } catch (e) {
    console.error("Failed to save history:", e);
    // Ensure history object exists even if save failed
    if (!history) {
      history = {
        1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}
      };
    }
  }
}

function loadHistory() {
  let _history;
  try {
    _history = JSON.parse(localStorage.getItem(LS_HISTORY_KEY));
  } catch (e) {
    console.error("Failed to parse history from localStorage:", e);
    _history = null;
  }
  
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
    rotationEnabled,
    wordEnabled,
    shapeEnabled,
    cornerEnabled,
    soundEnabled,
    colorEnabled,
    randomizeEnabled, 
    nLevel,
    currentMicroLevel,
    microLevelsByConfig,  // Save all config levels
    phaseAccuracyAttemptsByConfig,  // Save phase transition attempts
    sessionHistoriesByConfig,  // Save all session histories
    accuracyAttemptsByConfig,  // Save accuracy attempts tracking
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
  try {
    localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings:", e);
  }
  return settings;
}

function loadSettings() {
  let settings = JSON.parse(localStorage.getItem(LS_SETTINGS_KEY));
  if (!settings) {
    settings = saveSettings();
  }
  
  // Restore multi-config data if available
  if (settings.microLevelsByConfig) {
  // Validate each config's micro-level
  for (let config = 1; config <= 9; config++) {
    const storedLevel = settings.microLevelsByConfig[config];
    if (storedLevel === undefined || storedLevel === null || isNaN(storedLevel) || storedLevel < 2 || storedLevel > 9.99) {
      console.warn(`Invalid micro-level ${storedLevel} for config ${config}, resetting to 2.00`);
      microLevelsByConfig[config] = 2.00;
    } else {
      microLevelsByConfig[config] = storedLevel;
    }
  }
} else {
  // Initialize all configs to 2.00 if not in storage
  for (let config = 1; config <= 9; config++) {
    microLevelsByConfig[config] = 2.00;
  }
}
  if (settings.sessionHistoriesByConfig) {
    sessionHistoriesByConfig = settings.sessionHistoriesByConfig;
  }
  if (settings.accuracyAttemptsByConfig) {
    accuracyAttemptsByConfig = settings.accuracyAttemptsByConfig;
  }
  if (settings.phaseAccuracyAttemptsByConfig) {
  // Validate each config's phase data
  for (let config = 2; config <= 9; config++) {
    if (!settings.phaseAccuracyAttemptsByConfig[config] || 
        !Array.isArray(settings.phaseAccuracyAttemptsByConfig[config].phase1to2) ||
        !Array.isArray(settings.phaseAccuracyAttemptsByConfig[config].phase2to3)) {
      console.warn(`Invalid phase data for config ${config}, resetting`);
      phaseAccuracyAttemptsByConfig[config] = {
        phase1to2: [],
        phase2to3: [],
        requiredSuccesses: 3,
        windowSize: 5
      };
    } else {
      phaseAccuracyAttemptsByConfig[config] = settings.phaseAccuracyAttemptsByConfig[config];
    }
  }
}

  wallsEnableTrigHandler(null, settings.wallsEnabled);
  cameraEnableTrigHandler(null, settings.cameraEnabled);
  faceEnableTrigHandler(null, settings.faceEnabled);
  positionEnableTrigHandler(null, settings.positionEnabled);
  rotationEnableTrigHandler(null, settings.rotationEnabled || defVal_rotationEnabled);
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

function prepareStimuliChartData(dimension, period) {
  // ... all the code that prepares the chart data ...
  return {
    labels: filteredDates,
    datasets: datasets
  };
}

// Initialize Chart.js instance for performance graphs
let performanceChart = null;
let stimuliAccuracyChart = null;

function toggleStats(_dim) {
  // Function to update the performance chart
  function updatePerformanceChart(dimension, period) {
    const ctx = document.getElementById('performance-chart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (performanceChart) {
      performanceChart.destroy();
    }
    
    // Get active metrics from checkboxes
    const activeMetrics = [];
    document.querySelectorAll('.metric-toggle:checked').forEach(checkbox => {
      activeMetrics.push(checkbox.dataset.metric);
    });
    
    // Get data for the selected dimension and period
    // Check if there's any data for this dimension
    const _history = history[dimension] || {};
    if (Object.keys(_history).length === 0) {
      // No data for this dimension - destroy chart and show message
      if (performanceChart) {
        performanceChart.destroy();
        performanceChart = null;
      }
      const ctx = document.getElementById('performance-chart');
      ctx.style.display = 'none';
      
      // Show no data message if not already present
      if (!ctx.parentElement.querySelector('.no-data-msg')) {
        const noDataMsg = document.createElement('div');
        noDataMsg.className = 'no-data-msg';
        noDataMsg.style = "text-align: center; font-size: 1.5rem; margin: 2rem; opacity: 0.7;";
        noDataMsg.innerHTML = `No performance data yet for ${dimension}D configuration.<br>Play some sessions to see charts!`;
        ctx.parentElement.appendChild(noDataMsg);
      }
      return;
    } else {
      // Remove no data message if it exists
      const noDataMsg = ctx.parentElement.querySelector('.no-data-msg');
      if (noDataMsg) noDataMsg.remove();
      ctx.style.display = 'block';
    }
    const chartData = prepareChartData(dimension, period, activeMetrics);
    
    // Chart configuration
    const config = {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#fff',
              font: {
                family: 'Nova Square'
              }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
              family: 'Nova Square'
            },
            bodyFont: {
              family: 'Nova Square'
            },
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                const value = context.parsed.y;
                const metricType = context.dataset.label.toLowerCase();
                
                // Format as percentage for these metrics
                if (['right', 'missed', 'wrong', 'lure'].includes(metricType)) {
                  label += value.toFixed(1) + '%';
                } else {
                  // For d-prime, baseline, and bias - show as regular numbers
                  label += value.toFixed(2);
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#fff',
              font: {
                family: 'Nova Square'
              }
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#fff',
              font: {
                family: 'Nova Square'
              },
              callback: function(value) {
                return value.toFixed(0);
              }
            }
          }
        }
      }
    };
    
    // Create new chart
    performanceChart = new Chart(ctx, config);
  }
  
  // Function to prepare chart data based on dimension, period, and metrics
  function prepareChartData(dimension, period, activeMetrics) {
    const _history = history[dimension] || {};
    const dates = Object.keys(_history).sort();
    
    // Filter dates based on period
    const now = new Date();
    const filteredDates = dates.filter(date => {
      const d = new Date(date);
      switch(period) {
        case 'day':
          return (now - d) <= 86400000; // 1 day
        case 'week':
          return (now - d) <= 604800000; // 7 days
        case 'month':
          return (now - d) <= 2592000000; // 30 days
        case 'all':
        default:
          return true;
      }
    });
    
    // Prepare datasets for each active metric
    const datasets = [];
    const metricColors = {
      right: 'rgb(75, 192, 192)',
      missed: 'rgb(255, 206, 86)',
      wrong: 'rgb(255, 99, 132)',
      dprime: 'rgb(54, 162, 235)',
      baseline: 'rgb(153, 102, 255)',
      bias: 'rgb(255, 159, 64)',
      lure: 'rgb(75, 192, 192)'
    };
    
    activeMetrics.forEach(metric => {
      const data = filteredDates.map(date => {
        const dayData = _history[date];
        if (!dayData || !dayData.length) return null;
        
        // Average values for the day
        let sum = 0;
        let count = 0;
        
        dayData.forEach(point => {
          switch(metric) {
            case 'right': {
              const rightCount = point.right || 0;
              const total = (point.right || 0) + (point.missed || 0) + (point.wrong || 0);
              if (total > 0) {
                const percentage = (rightCount / total) * 100;
                sum += percentage;
                count++;
              }
              break;
            }
            case 'missed': {
              const missedCount = point.missed || 0;
              const total = (point.right || 0) + (point.missed || 0) + (point.wrong || 0);
              if (total > 0) {
                const percentage = (missedCount / total) * 100;
                sum += percentage;
                count++;
              }
              break;
            }
            case 'wrong': {
              const wrongCount = point.wrong || 0;
              const total = (point.right || 0) + (point.missed || 0) + (point.wrong || 0);
              if (total > 0) {
                const percentage = (wrongCount / total) * 100;
                sum += percentage;
                count++;
              }
              break;
            }
            case 'dprime':
              if (point.dPrime !== undefined) {
                sum += point.dPrime;
                count++;
              }
              break;
            case 'bias':
              if (point.responseBias !== undefined) {
                sum += Math.abs(point.responseBias);
                count++;
              }
              break;
            case 'lure':
              if (point.n1LureResistance !== undefined) {
                sum += point.n1LureResistance * 100;
                count++;
              }
              break;
            case 'baseline':
              // Calculate baseline d-prime for this configuration
              const configKey = dimension;
              const configHistory = sessionHistoriesByConfig[configKey] || [];
              
              if (configHistory.length >= 3) {
                const baseline = calculateBaseline(configHistory);
                // Only add once per day, not per session
                if (count === 0) {
                  sum = baseline.avgDPrime;
                  count = 1;
                }
              }
              break;
          }
        });
        
        return count > 0 ? sum / count : null;
      });
      
      console.log(`Adding dataset for ${metric}:`, data.filter(d => d !== null));
      if (metric === 'baseline') {
        console.log('Baseline values:', data);
      }
      
      datasets.push({
        label: metric.charAt(0).toUpperCase() + metric.slice(1),
        data: data,
        borderColor: metricColors[metric],
        backgroundColor: metricColors[metric] + '33',
        tension: 0.1
      });
    });
    
    return {
      labels: filteredDates,
      datasets: datasets
    };
  }

  // If no dimension specified and dialog is already open, close it
  if (!_dim && statsDialogContent.parentElement.hasAttribute("open")) {
    statsDialogContent.parentElement.close();
    return;
  }

  // Open the stats dialog
  statsDialogContent.parentElement.show();

  // Add event listeners for time period buttons
  document.querySelectorAll('.period-btn').forEach(btn => {
    // Remove existing event listener by using a named function
    if (btn._clickHandler) {
      btn.removeEventListener('click', btn._clickHandler);
    }
    
    // Create and store the new handler
    btn._clickHandler = function() {
      // Remove active class from all buttons
      document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      // Update chart with new period
      const period = this.dataset.period;
      const currentDim = parseInt(document.querySelector('input[name="dimension"]:checked').value);
      updatePerformanceChart(currentDim, period);
      updateStimuliAccuracyChart(currentDim, period);
    };
    
    btn.addEventListener('click', btn._clickHandler);
  });
  
  // Add event listeners for metric toggles
  document.querySelectorAll('.metric-toggle').forEach(checkbox => {
    // Remove any existing listeners first
    const newCheckbox = checkbox.cloneNode(true);
    checkbox.parentNode.replaceChild(newCheckbox, checkbox);
    
    newCheckbox.addEventListener('change', function() {
      // Update chart when metrics are toggled
      const activePeriod = document.querySelector('.period-btn.active').dataset.period;
      const currentDim = parseInt(document.querySelector('input[name="dimension"]:checked').value);
      updatePerformanceChart(currentDim, activePeriod);
    });
  });

  // Function to prepare stimuli accuracy chart data
  function prepareStimuliChartData(dimension, period) {
    const _history = history[dimension] || {};
    const dates = Object.keys(_history).sort();
    
    // Filter dates based on period
    const now = new Date();
    const filteredDates = dates.filter(date => {
      const d = new Date(date);
      switch(period) {
        case 'day':
          return (now - d) <= 86400000;
        case 'week':
          return (now - d) <= 604800000;
        case 'month':
          return (now - d) <= 2592000000;
        case 'all':
        default:
          return true;
      }
    });
    
    // Stimuli types and colors
    const stimuliTypes = ['walls', 'camera', 'face', 'position', 'word', 'shape', 'corner', 'sound', 'color'];
    const stimuliColors = {
      walls: '#FF6384',
      camera: '#36A2EB',
      face: '#FFCE56',
      position: '#4BC0C0',
      word: '#9966FF',
      shape: '#FF9F40',
      corner: '#FF6384',
      sound: '#C9CBCF',
      color: '#4BC0C0'
    };
    
    // Prepare datasets for each stimulus type
    const datasets = [];
    
    stimuliTypes.forEach(stimulus => {
      const data = filteredDates.map(date => {
        const dayData = _history[date];
        if (!dayData || !dayData.length) return null;
        
        let totalRight = 0;
        let totalMatching = 0;
        
        dayData.forEach(point => {
          if (point.stimuliData && point.stimuliData[stimulus]) {
            const stimData = point.stimuliData[stimulus];
            if (stimData.enabled && stimData.matching > 0) {
              totalRight += stimData.right || 0;
              totalMatching += stimData.matching || 0;
            }
          }
        });
        
        return totalMatching > 0 ? (totalRight / totalMatching) * 100 : null;
      });
      
      // Only add dataset if there's at least one non-null value
      if (data.some(v => v !== null)) {
        datasets.push({
          label: stimulus.charAt(0).toUpperCase() + stimulus.slice(1),
          data: data,
          borderColor: stimuliColors[stimulus],
          backgroundColor: stimuliColors[stimulus] + '33',
          tension: 0.1
        });
      }
    });
    
    return {
      labels: filteredDates,
      datasets: datasets
    };
  }
  
  // Function to update stimuli accuracy chart
  function updateStimuliAccuracyChart(dimension, period) {
    const ctx = document.getElementById('stimuli-accuracy-chart');
    if (!ctx) return;

    // Check if there's any data for this dimension
    const _history = history[dimension] || {};
    if (Object.keys(_history).length === 0) {
      // No data for this dimension - destroy chart and show message
      if (stimuliAccuracyChart) {
        stimuliAccuracyChart.destroy();
        stimuliAccuracyChart = null;
      }
      ctx.style.display = 'none';
      
      // Show no data message if not already present
      if (!ctx.parentElement.querySelector('.no-data-msg-stimuli')) {
        const noDataMsg = document.createElement('div');
        noDataMsg.className = 'no-data-msg-stimuli';
        noDataMsg.style = "text-align: center; font-size: 1.25rem; margin: 2rem; opacity: 0.7;";
        noDataMsg.innerHTML = `No stimuli data yet for ${dimension}D configuration.`;
        ctx.parentElement.appendChild(noDataMsg);
      }
      return;
    } else {
      // Remove no data message if it exists
      const noDataMsg = ctx.parentElement.querySelector('.no-data-msg-stimuli');
      if (noDataMsg) noDataMsg.remove();
      ctx.style.display = 'block';
    }
    
    // Destroy existing chart if it exists
    if (stimuliAccuracyChart) {
      stimuliAccuracyChart.destroy();
    }
    
    // Get data for the selected dimension and period
    const chartData = prepareStimuliChartData(dimension, period);
    
    // Chart configuration
    const config = {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#fff',
              font: {
                family: 'Nova Square',
                size: 10
              }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
              family: 'Nova Square'
            },
            bodyFont: {
              family: 'Nova Square'
            },
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                const value = context.parsed.y;
                const metricType = context.dataset.label.toLowerCase();
                
                // Format as percentage for these metrics
                if (['right', 'missed', 'wrong', 'lure'].includes(metricType)) {
                  label += value.toFixed(1) + '%';
                } else {
                  // For d-prime, baseline, and bias - show as regular numbers
                  label += value.toFixed(2);
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#fff',
              font: {
                family: 'Nova Square',
                size: 10
              }
            }
          },
          y: {
            min: 0,
            max: 100,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#fff',
              font: {
                family: 'Nova Square',
                size: 10
              },
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    };
    
    // Create new chart
    stimuliAccuracyChart = new Chart(ctx, config);
  }
    
  // Initialize chart with default settings
  setTimeout(() => {
    updatePerformanceChart(validDim, 'week');
    updateStimuliAccuracyChart(validDim, 'week');
  }, 100);
  
  // Get the dimension to display (from parameter, localStorage, or default to 1)
  const dim = _dim || localStorage.getItem("last-dim") || 1;
  const radios = [...document.querySelectorAll("input[name='dimension']")];
  const validDim = Math.min(Math.max(1, dim), 9);
  
  // Ensure dim is within range and update radio button
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
    color: { right: 0, wrong: 0, matching: 0, present: false },
    rotation: { right: 0, wrong: 0, matching: 0, present: false }
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

  // Update performance chart when dimension changes
  if (performanceChart || document.getElementById('performance-chart')) {
    const activePeriod = document.querySelector('.period-btn.active')?.dataset.period || 'week';
    updatePerformanceChart(validDim, activePeriod);
    updateStimuliAccuracyChart(validDim, activePeriod);
  }

  // Process history entries if they exist
  let roundsPlayed = 0;
  if (entries.length > 0) {
    for (const [date, points] of entries) {
      if (!Array.isArray(points) || points.length === 0) continue;
      
      let _avgNLevel = 0;
      let _minNLevel = 10;
      let _maxNLevel = 0;
      
      // Process each data point in this date
      for (const point of points) {
        roundsPlayed++;
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
        
        // Create bar element showing N-level
        const displayLevel = microCount > 0 ? (_avgMicroLevel / microCount).toFixed(2) : toOneDecimal(_avgNLevel);
        const barElement = getBar(displayLevel);

        // Add speed info to tooltip if available
        let speedInfo = "";
        if (points[0] && points[0].speedTarget) {
          speedInfo = `\nSpeed: ${points[0].speedTarget}ms`;
        }

        // Calculate daily stats for this date
        let dailyRounds = points.length;
        let dailyLures = 0;
        let dailyN1Lures = 0;
        let dailyNPlusLures = 0;
        let dailyLureResisted = 0;

        for (const point of points) {
          if (point.n1LureEncounters) {
            dailyN1Lures += point.n1LureEncounters;
            dailyLures += point.n1LureEncounters;
            dailyLureResisted += point.n1LureCorrectRejections || 0;
          }
          if (point.nPlusLureEncounters) {
            dailyNPlusLures += point.nPlusLureEncounters;
            dailyLures += point.nPlusLureEncounters;
            dailyLureResisted += point.nPlusLureCorrectRejections || 0;
          }
        }

        let lureInfo = dailyLures > 0 ? 
          `\nLures: ${dailyLureResisted}/${dailyLures} (${((dailyLureResisted/dailyLures)*100).toFixed(0)}%)` +
          `\nN-1: ${dailyN1Lures}, N+1: ${dailyNPlusLures}` : "";

        barElement.title = `Date: ${date}\nRounds: ${dailyRounds}\nμ-Level: ${displayLevel}${speedInfo}${lureInfo}`;
        
        console.log("Tooltip content:", barElement.title);
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
  console.log(`Stats debug - validDim: ${validDim}, microLevelsByConfig:`, microLevelsByConfig);
  const selectedConfigLevel = microLevelsByConfig[validDim] || 2.00;
  console.log(`Selected config ${validDim} micro-level: ${selectedConfigLevel}`);
  document.querySelector("#sc-micro-level").innerHTML = formatMicroLevel(selectedConfigLevel);

  // Update current speed display to match the selected config
  const currentSpeedDisplay = document.querySelector("#current-speed-display");
  if (currentSpeedDisplay) {
    currentSpeedDisplay.innerHTML = getSpeedTarget(selectedConfigLevel) + "ms";
  }
  
  // Update level progress indicator
  const progressIndicator = document.querySelector("#level-progress-indicator");
  if (progressIndicator) {
    const attemptData = accuracyAttemptsByConfig[validDim];
    const recentAttempts = attemptData.attempts.slice(-attemptData.windowSize);
    const successCount = recentAttempts.filter(a => a).length;
    
    if (attemptData.attempts.length > 0) {
      progressIndicator.innerHTML = `Progress: ${successCount}/${attemptData.requiredSuccesses} (Need ${attemptData.requiredSuccesses - successCount} more)`;
      progressIndicator.style.color = successCount >= attemptData.requiredSuccesses ? '#4CAF50' : '#FFF';
    } else {
      progressIndicator.innerHTML = 'No attempts yet';
      progressIndicator.style.color = '#888';
    }
  }
  
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
  
  // Update stimuli accuracy display with populated data
  updateStimuliAccuracyDisplay(stimuliTotals);

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

  // Update speed range display
  const speedRangeStart = document.querySelector("#speed-range-start");
  const speedRangeEnd = document.querySelector("#speed-range-end");

  if (speedRangeStart) {
    speedRangeStart.innerHTML = baseDelay + "ms";
  }
  if (speedRangeEnd) {
      // Show the actual minimum speed (3000ms or 50% of baseDelay, whichever is higher)
      const minSpeed = Math.max(3000, Math.round(baseDelay * 0.5));
      speedRangeEnd.innerHTML = minSpeed + "ms";
  }

  // Update current speed indicator on stats page
  const speedIndicator = document.querySelector("#speed-indicator");
  if (speedIndicator) {
    console.log(`Stats speed debug - selectedConfigLevel: ${selectedConfigLevel}, speed: ${getSpeedTarget(selectedConfigLevel)}ms`);
    speedIndicator.innerHTML = getSpeedTarget(selectedConfigLevel) + "ms";
  }

  // Also add d-prime average to stats if available
  let totalDPrime = 0;
  let dPrimeCount = 0;
  let totalBias = 0;
  let biasCount = 0;
  let totalLureResistance = 0;
  let totalLureEncountersDaily = 0;
  let totalLureResistedDaily = 0;
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
      
      // Track daily lure encounters and resistance (outside the if block above)
      if (point.n1LureEncounters !== undefined) {
        totalLureEncountersDaily += point.n1LureEncounters || 0;
        totalLureResistedDaily += point.n1LureCorrectRejections || 0;
      }
      if (point.nPlusLureEncounters !== undefined) {
        totalLureEncountersDaily += point.nPlusLureEncounters || 0;
        totalLureResistedDaily += point.nPlusLureCorrectRejections || 0;
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
    const avgDPrime = dPrimeCount > 0 ? (totalDPrime / dPrimeCount) : 0;
    const dPrimeDescriptor = 
      avgDPrime >= 3.0 ? "Excellent" :
      avgDPrime >= 2.0 ? "Great" :
      avgDPrime >= 1.0 ? "Good" :
      avgDPrime >= 0.5 ? "Fair" : "Poor";
    avgDPrimeElement.innerHTML = dPrimeCount > 0 ? 
      `${avgDPrime.toFixed(2)} (${dPrimeDescriptor})` : "-";
  }

  const avgBiasElement = document.querySelector("#sc-avg-bias");
  if (avgBiasElement) {
    const avgBias = biasCount > 0 ? (totalBias / biasCount) : 0;
    const biasDescriptor = 
      Math.abs(avgBias) <= 0.2 ? "Neutral" :
      avgBias < -0.5 ? "Very Conservative" :
      avgBias < 0 ? "Conservative" :
      avgBias > 0.5 ? "Very Liberal" : "Liberal";
    avgBiasElement.innerHTML = biasCount > 0 ? 
      `${avgBias.toFixed(2)} (${biasDescriptor})` : "-";
  }

  const avgLureElement = document.querySelector("#sc-avg-lure");
  if (avgLureElement) {
    const avgLureResistance = lureResistanceCount > 0 ? 
      (totalLureResistance / lureResistanceCount) : 0;
    const lureDescriptor = 
      avgLureResistance >= 0.95 ? "Excellent" :
      avgLureResistance >= 0.85 ? "Great" :
      avgLureResistance >= 0.70 ? "Good" :
      avgLureResistance >= 0.50 ? "Fair" : "Poor";
    avgLureElement.innerHTML = lureResistanceCount > 0 ? 
      `${(avgLureResistance * 100).toFixed(0)}% (${lureDescriptor})` : "-";
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
  // Scale trials based on n-level: n * target matches
  const totalTrials = n * targetMatches;
  
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
      let attempts = 0;
      const maxAttempts = symbols.length * 2;
      
      // Ensure we don't accidentally create matches
      let safe = false;
      while (!safe && attempts < maxAttempts) {
        safe = true;
        
        // Check n positions back
        if (i >= n && blocks[i - n] && blocks[i - n].symbol === symbol) {
          safe = false;
        }
        
        // Check n positions forward
        if (i + n < blocks.length && blocks[i + n] && blocks[i + n].symbol === symbol) {
          safe = false;
        }
        
        if (!safe) {
          symbol = random(symbols);
          attempts++;
        }
      }
      // If we couldn't find a safe symbol after many attempts, log warning
      if (!safe) {
        console.warn(`Could not find safe symbol for position ${i}, using ${symbol} anyway`);
      }

      // Check if this placement actually creates a match
      const createsMatch = (i >= n && blocks[i - n] && blocks[i - n].symbol === symbol);

      blocks[i] = {
        isMatching: createsMatch,
        symbol: symbol
      };

      // Update match count if we created an unintended match
      if (createsMatch) {
        console.warn(`Unintended match created at position ${i}`);
      }
      
      // ALSO check if this creates a forward match
      if (!createsMatch && i + n < blocks.length && blocks[i + n] && blocks[i + n].symbol === symbol) {
        blocks[i + n].isMatching = true; // Mark the future position as matching
        console.warn(`Forward match created at position ${i + n}`);
      }
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
    let rnd = Math.floor(Math.random() * (blocks.length - n)) + n;

    // Skip if this position is already a match or empty
    if (!blocks[rnd] || blocks[rnd].isMatching) {
      continue;
    }
    
    // Get the symbol from the previous position (N-1)
    const prevSymbol = blocks[rnd - 1] ? blocks[rnd - 1].symbol : null;
    
    // Only place lure if there's a valid previous symbol
    if (prevSymbol) {
      // Place the N-1 lure
      // Check if this would be a legitimate n-back match
      const legitimateMatch = (rnd >= n && blocks[rnd - n] && blocks[rnd - n].symbol === prevSymbol);

      // Check if placing this lure would create a forward match
      const wouldCreateForwardMatch = (rnd + n < blocks.length && blocks[rnd + n] && blocks[rnd + n].symbol === prevSymbol);

      // Only create a lure if it's NOT already a real match AND won't create a forward match
      if (!legitimateMatch && !wouldCreateForwardMatch) {
        blocks[rnd] = {
          isMatching: false,
          isLure: true,
          lureType: 'n-1',
          symbol: prevSymbol
        };
        
        placedN1Lures++;
      }
    }
  }
  
  // Now place N+1 lures
  let placedNPlusLures = 0;
  attempts = 0;
  
  while (placedNPlusLures < numNPlusLures && attempts < maxAttempts) {
    attempts++;
    
    // Find a position that can have an N+1 lure (must not be too close to end)
    let rnd = Math.floor(Math.random() * (blocks.length - 2));
    
    // Skip if this position is already a match or empty
    if (!blocks[rnd] || blocks[rnd].isMatching) {
      continue;
    }
    
    // Get the symbol from the next position (N+1)
    const nextSymbol = blocks[rnd + 1].symbol;
    
    // Check if this would be a legitimate n-back match
    const legitimateMatch = (rnd >= n && blocks[rnd - n] && blocks[rnd - n].symbol === nextSymbol);

    // Check if placing this lure would create a forward match
    const wouldCreateForwardMatch = (rnd + n < blocks.length && blocks[rnd + n] && blocks[rnd + n].symbol === nextSymbol);

    // Only create a lure if it's NOT already a real match AND won't create a forward match
    if (!legitimateMatch && !wouldCreateForwardMatch) {
      blocks[rnd] = {
        isMatching: false,
        isLure: true,
        lureType: 'n+1',
        symbol: nextSymbol
      };
      
      placedNPlusLures++;
    }
  }
  console.log(`Placed ${placedN1Lures} N-1 lures and ${placedNPlusLures} N+1 lures (total ${placedN1Lures + placedNPlusLures} lures)`);
  
  return blocks;
}

function createBlocksWithLures(symbols, n, matchDensity = 0.23, lureFrequency = 0.10) {
  // First create blocks with fixed match density
  let blocks = createBlocksWithFixedDensity(symbols, n, matchDensity);
  
  // Then add systematic lures
  blocks = placeLures(blocks, n, lureFrequency);
  
  // Validate and log final block composition
  const matches = blocks.filter(b => b && b.isMatching).length;
  const lures = blocks.filter(b => b && b.isLure).length;
  const total = blocks.length;
  
  console.log(`Block validation: ${matches} matches, ${lures} lures, ${total} total (${((matches/total)*100).toFixed(1)}% match rate)`);
  
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
  
  resetCubeTransform(cube);
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
  enableRotationCheck = true;
  
  currWalls = null;
  currCamera = null;
  currFace = null;
  currPosition = null;
  
  currWord = null;
  currShape = null;
  currCorner = null;
  currSound = null;
  currColor = null;
  currRotation = null;
  
  checkWallsBtn.classList.remove("right", "wrong");
  checkCameraBtn.classList.remove("right", "wrong");
  checkFaceBtn.classList.remove("right", "wrong");
  checkPositionBtn.classList.remove("right", "wrong");
  
  checkWordBtn.classList.remove("right", "wrong");
  checkShapeBtn.classList.remove("right", "wrong");
  checkCornerBtn.classList.remove("right", "wrong");
  checkSoundBtn.classList.remove("right", "wrong");
  checkColorBtn.classList.remove("right", "wrong");
  checkRotationBtn.classList.remove("right", "wrong");
  
  // Clear all visual stimuli
  // Clear shape
  const shape = document.querySelector(".shape");
  if (shape) {
    shape.classList.remove("triangle", "square", "circle");
  }
  
  // Clear face colors
  faceEls.forEach(face => {
    face.classList.remove("col-a", "col-b", "col-c", "col-d", "col-e", "col-f");
  });
  
  // Clear word displays
  wallWords.forEach(wall => {
    wall.innerText = "";
    wall.classList.remove("text-white");
  });

  // Ensure position is maintained when rotation is active
  if (!positionEnabled) {
    currentCubePosition = initialCubePosition;
  }
  // Reset cube and inner cube positions
  // Reset cube transform but preserve rotation if rotation stimulus is active
  if (rotationEnabled && currRotation) {
    // Reset position but keep the current rotation
    currentCubePosition = initialCubePosition;
    updateCubeTransform(cube);
  } else {
    // Full reset
    resetCubeTransform(cube);
  }
  move(innerCube, initialInnerCubePosition);
  
  // Reset camera rotation
  rotateCamera(-40, -45);
  
  // Reset floor backgrounds to default
  floors.forEach(floor =>
    setFloorBackground(
      floor,
      sceneDimmer,
      tileAHexColor,
      tileBHexColor
    )
  );
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

// Rotation stimulus
if (currRotation && currRotation.isMatching && enableRotationCheck) {
  sessionMetrics.misses++;
} else if (currRotation && !currRotation.isMatching && enableRotationCheck) {
  sessionMetrics.correctRejections++;
  if (currRotation.isLure) {
    if (currRotation.lureType === 'n-1') {
      sessionMetrics.n1LureEncounters = sessionMetrics.n1LureEncounters || 0;
      sessionMetrics.n1LureCorrectRejections = sessionMetrics.n1LureCorrectRejections || 0;
      
      sessionMetrics.n1LureEncounters++;
      sessionMetrics.n1LureCorrectRejections++;
    } else if (currRotation.lureType === 'n+1') {
      sessionMetrics.nPlusLureEncounters = sessionMetrics.nPlusLureEncounters || 0;
      sessionMetrics.nPlusLureCorrectRejections = sessionMetrics.nPlusLureCorrectRejections || 0;
      
      sessionMetrics.nPlusLureEncounters++;
      sessionMetrics.nPlusLureCorrectRejections++;
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

// Current cube state
let currentCubePosition = initialCubePosition;
let currentCubeRotation = "0, 0, 0";

function move(el, currPosString) {
  // Only update currentCubePosition if it's the main cube
  if (el === cube) {
    currentCubePosition = currPosString;
    updateCubeTransform(el);
  } else {
    // For inner cube, just apply the transform directly
    el.style.transform = `translate3d(${currPosString})`;
  }
}

function rotateCube(el, rotationString) {
  currentCubeRotation = rotationString;
  updateCubeTransform(el);
}

function updateCubeTransform(el) {
  const [x, y, z] = currentCubeRotation.split(", ");
  el.style.transform = `translate3d(${currentCubePosition}) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
}

function rotateCube(el, rotationString) {
  currentCubeRotation = rotationString;
  console.log("rotateCube - position:", currentCubePosition, "rotation:", currentCubeRotation);
  updateCubeTransform(el);
}

function resetCubeTransform(el) {
  currentCubePosition = initialCubePosition;
  currentCubeRotation = "0, 0, 0";
  console.log("resetCubeTransform - position:", currentCubePosition);
  updateCubeTransform(el);
}

function wow(htmlElement, cssClass, delay) {
  htmlElement.classList.add(cssClass);
  setTimeout(() => 
    htmlElement.classList.remove(cssClass)
  , delay);
}

function speak(text) {
  try {
    // Check if speech synthesis is available
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      return null;
    }
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    let utter = new SpeechSynthesisUtterance();
    utter.lang = 'en-US';
    utter.text = text;
    utter.volume = 1.0;
    utter.rate = 1.0;
    utter.pitch = 1.0;
    
    // Add error handling
    utter.onerror = function(event) {
      console.error('Speech synthesis error:', event);
    };
    
    speechSynthesis.speak(utter);
    return utter;
  } catch (e) {
    console.error('Failed to speak:', e);
    return null;
  }
}

function writeWord(word) {
  wallWords.forEach(wall => {
    wall.innerText = word;
    wow(wall, "text-white", getSpeedTarget(currentMicroLevel) - 500);
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
    // { name: "rotation", handler: rotationEnableTrigHandler }, // Excluded from randomization
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
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loop
  
  while (selectedIndices.length < numStimuli && attempts < maxAttempts) {
    attempts++;
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
  // Adjust target matches based on micro-level progress
  const { nLevel, microProgress } = getMicroLevelComponents(currentMicroLevel);
  // Round microProgress to 2 decimal places to avoid floating point issues
  const roundedProgress = Math.round(microProgress * 100) / 100;
  
  if (roundedProgress < 0.34) {
    targetNumOfStimuli = 2;
  } else if (roundedProgress < 0.67) {
    targetNumOfStimuli = 3;
  } else {
    targetNumOfStimuli = 4;
  }
  console.log(`Micro-progress: ${roundedProgress.toFixed(2)}, Target matches: ${targetNumOfStimuli}`);
  
  // Reset total matching count at the start
  matchingStimuli = 0;
  // Calculate lure frequency based on micro-level progress
  
  // Scale lure frequency based on micro-level progress with three phases
  const baseLureFreq = 0.05;
  const maxLureFreq = 0.40;

  // Determine which phase we're in and calculate relative progress within that phase
  let phaseProgress;
  const roundedMicroProgress = Math.round(microProgress * 100) / 100;
  
  if (roundedMicroProgress < 0.34) {
    // Phase 1: 0-33 levels
    phaseProgress = roundedMicroProgress / 0.33;
  } else if (roundedMicroProgress < 0.67) {
    // Phase 2: 34-66 levels
    phaseProgress = (roundedMicroProgress - 0.34) / 0.32;
  } else {
    // Phase 3: 67-99 levels
    phaseProgress = (roundedMicroProgress - 0.67) / 0.32;
  }

  // Scale lure frequency within the current phase
  const lureFrequency = baseLureFreq + (phaseProgress * (maxLureFreq - baseLureFreq));

  console.log(`Current micro-level: ${formatMicroLevel(currentMicroLevel)}, Phase progress: ${(phaseProgress * 100).toFixed(0)}%, Lure frequency: ${(lureFrequency * 100).toFixed(1)}%`);
  
  let walls;
  if (wallsEnabled) {
    walls = createBlocksWithLures(wallColorsList, n, 0.25, lureFrequency);
    matchingWalls = walls.filter(block => block && block.isMatching).length;
    matchingStimuli += matchingWalls;
  }
  let cameras;
  if (cameraEnabled) {
    cameras = createBlocksWithLures(points, n, 0.25, lureFrequency);
    matchingCamera = cameras.filter(block => block && block.isMatching).length;
    matchingStimuli += matchingCamera;
  }
  let faces;
  if (faceEnabled) {
    faces = createBlocksWithLures(numbers, n, 0.25, lureFrequency);
    matchingFace = faces.filter(block => block && block.isMatching).length;
    matchingStimuli += matchingFace;
  }
  let positions;
  if (positionEnabled) {
    positions = createBlocksWithLures(moves, n, 0.25, lureFrequency);
    matchingPosition = positions.filter(block => block && block.isMatching).length;
    matchingStimuli += matchingPosition;
  }
  
  let words;
  if (wordEnabled) {
    words = createBlocksWithLures(wordsList, n, 0.25, lureFrequency);
    matchingWord = words.filter(block => block && block.isMatching).length;
    matchingStimuli += matchingWord;
  }
  let shapes;
  if (shapeEnabled) {
    shapes = createBlocksWithLures(shapeClasses, n, 0.25, lureFrequency);
    matchingShape = shapes.filter(block => block && block.isMatching).length;
    matchingStimuli += matchingShape;
  }
  let corners;
  if (cornerEnabled) {
    corners = createBlocksWithLures(cornersList, n, 0.25, lureFrequency);
    matchingCorner = corners.filter(block => block && block.isMatching).length;
    matchingStimuli += matchingCorner;
  }
  let sounds;
  if (soundEnabled) {
    sounds = createBlocksWithLures(letters, n, 0.25, lureFrequency);
    matchingSound = sounds.filter(block => block && block.isMatching).length;
    matchingStimuli += matchingSound;
  }
  let colors;
  if (colorEnabled) {
    colors = createBlocksWithLures(colorClasses, n, 0.25, lureFrequency);
    matchingColor = colors.filter(block => block && block.isMatching).length;
    matchingStimuli += matchingColor;
  }
  let rotations_blocks;
  if (rotationEnabled) {
    rotations_blocks = createBlocksWithLures(rotations, n, 0.25, lureFrequency);
    matchingRotation = rotations_blocks.filter(block => block && block.isMatching).length;
    matchingStimuli += matchingRotation;
  }
  
  console.log(
    walls, cameras, faces, positions, words, shapes, corners, sounds, colors
  );
  if (shapes) {
    console.log("Shape blocks:", shapes.map((s, i) => `${i}: ${s ? s.symbol : 'null'}`));
  }
  if (corners) {
    console.log("Corner blocks:", corners.map((c, i) => `${i}: ${c ? c.symbol : 'null'}`));
  }

  // Log individual stimulus match counts
  console.log("Match breakdown:");
  if (wallsEnabled) console.log("- Walls matches:", matchingWalls);
  if (cameraEnabled) console.log("- Camera matches:", matchingCamera);
  if (faceEnabled) console.log("- Face matches:", matchingFace);
  if (positionEnabled) console.log("- Position matches:", matchingPosition);
  if (wordEnabled) console.log("- Word matches:", matchingWord);
  if (shapeEnabled) console.log("- Shape matches:", matchingShape);
  if (cornerEnabled) console.log("- Corner matches:", matchingCorner);
  if (soundEnabled) console.log("- Sound matches:", matchingSound);
  if (colorEnabled) console.log("- Color matches:", matchingColor);
  if (rotationEnabled) console.log("- Rotation matches:", matchingRotation);
  console.log("Total matchingStimuli:", matchingStimuli);

  let i = 0;
  return function() {
    // Track missed stimuli from previous presentation, but not on first iteration
    if (i > 0 && (currWalls || currCamera || currFace || currPosition || currWord || currShape || currCorner || currSound || currColor)) {
      trackMissedStimuli(); // Track any missed stimuli from the previous presentation
    }
    
    resetBlock();
      
    if (!isRunning) {
      return;
    }
    
    // Calculate the actual length based on enabled stimuli
    let actualLengths = [];
    if (wallsEnabled && walls) actualLengths.push(walls.length);
    if (cameraEnabled && cameras) actualLengths.push(cameras.length);
    if (faceEnabled && faces) actualLengths.push(faces.length);
    if (positionEnabled && positions) actualLengths.push(positions.length);
    if (wordEnabled && words) actualLengths.push(words.length);
    if (shapeEnabled && shapes) actualLengths.push(shapes.length);
    if (cornerEnabled && corners) actualLengths.push(corners.length);
    if (soundEnabled && sounds) actualLengths.push(sounds.length);
    if (colorEnabled && colors) actualLengths.push(colors.length);

    let length = actualLengths.length > 0 ? Math.max(...actualLengths) : targetNumOfStimuli * (n + 2) + targetNumOfStimuli;
    console.log("Game length:", length, "Actual lengths:", actualLengths);
    let dimensions = 0;
    
    // End game
    if (i > length - 1) {
      // Get config key early for use throughout game end
      const configKey = getCurrentConfigKey();
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
      if (rotationEnabled) {
        dimensions++;
        correctStimuli += rightRotation;
        mistakes += wrongRotation;
      }
      
      // Calculate missed signals (stimuli that should have been identified but weren't)
      const missed = matchingStimuli - correctStimuli;
      
      console.log("matchingStimuli", matchingStimuli);
      console.log("correctStimuli", correctStimuli);
      console.log("missed", missed);
      console.log("mistakes", mistakes);
      console.log("dimensions", dimensions);
      
      // Calculate accuracy
      const totalTrials = correctStimuli + missed + mistakes;
      const accuracy = totalTrials > 0 ? correctStimuli / totalTrials : 0;
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
        },
        rotation: {
          enabled: rotationEnabled,
          right: rightRotation,
          wrong: wrongRotation,
          matching: matchingRotation
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

      // Speed information will be updated after historyPoint is created

      resDim.innerHTML = getCurrentConfigKey() + "D";
      resRight.innerHTML = correctStimuli;
      resMissed.innerHTML = missed;
      resWrong.innerHTML = mistakes;

      // Define level variables early for scope access
      let oldMicroLevel = currentMicroLevel;
      let originalLevel = nLevel;
      let newLevel;
      let newMicroLevel;
      let levelChanged;
      
      // Update accuracy in the recap dialog if the element exists
      const accuracyElement = document.querySelector("#sc-res-accuracy");
      if (accuracyElement) {
        accuracyElement.innerHTML = (accuracy * 100).toFixed(0) + "%";
      }

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

      // Calculate new micro-level based on d-prime and lure resistance
      const configHistory = sessionHistoriesByConfig[getCurrentConfigKey()] || [];
      newMicroLevel = checkMicroLevelAdvancement(sessionMetrics, configHistory);
      console.log(`checkMicroLevelAdvancement returned: ${newMicroLevel}`);

      // Update current micro-level immediately for consistency
      currentMicroLevel = newMicroLevel;
      // Save settings immediately after micro-level change
      saveSettings();

      // Check if there's a change in integer level for UI display
      newLevel = Math.floor(newMicroLevel);
      levelChanged = newLevel !== originalLevel;

      // Update micro-level immediately 
      microLevelsByConfig[configKey] = newMicroLevel;
      currentMicroLevel = newMicroLevel;
      // Don't reassign nLevel here - it will be updated by nLevelInputHandler
      
      // Update all displays
      nLevelInput.value = formatMicroLevel(newMicroLevel);
      nBackDisplay.innerHTML = formatMicroLevel(newMicroLevel);
      const speedDisplay = document.querySelector("#speed-display");
      if (speedDisplay) {
        speedDisplay.innerHTML = getSpeedTarget(newMicroLevel);
      }
      console.log(`Updated config ${configKey} to micro-level ${newMicroLevel}`);
      // Save to config BEFORE updating the handler
      microLevelsByConfig[configKey] = newMicroLevel;
      console.log(`Saved micro-level ${newMicroLevel} to config ${configKey} BEFORE handler update`);
      currentMicroLevel = newMicroLevel;
      // nLevel will be updated globally when needed
      // Now update displays
      nLevelInput.value = formatMicroLevel(newMicroLevel);
      nBackDisplay.innerHTML = formatMicroLevel(newMicroLevel);
      if (speedDisplay) {
        speedDisplay.innerHTML = getSpeedTarget(newMicroLevel);
      }

      // Check for phase transitions and reset baseline
      const oldPhase = oldMicroLevel - Math.floor(oldMicroLevel);
      const newPhase = newMicroLevel - Math.floor(newMicroLevel);

      // Detect phase transitions
      const wasPhase1 = oldPhase < 0.34;
      const wasPhase2 = oldPhase >= 0.34 && oldPhase < 0.67;
      const wasPhase3 = oldPhase >= 0.67;

      const isPhase1 = newPhase < 0.34;
      const isPhase2 = newPhase >= 0.34 && newPhase < 0.67;
      const isPhase3 = newPhase >= 0.67;

      // Only check for phase changes if level actually increased
      if (newMicroLevel > oldMicroLevel) {
        const phaseChanged = (wasPhase1 && !isPhase1) || (wasPhase2 && !isPhase2) || (wasPhase3 && !isPhase3);
        const crossedInteger = Math.floor(oldMicroLevel) !== Math.floor(newMicroLevel);

        if (phaseChanged || crossedInteger) {
          console.log(`Phase transition detected! Resetting baseline for config ${getCurrentConfigKey()}`);
          // Reset session history for current configuration
          sessionHistoriesByConfig[getCurrentConfigKey()] = [];
          // Reset accuracy attempts for current configuration
          accuracyAttemptsByConfig[getCurrentConfigKey()].attempts = [];
        }
      }

      const historyPoint = {
        nLevel,
        microLevel: currentMicroLevel,  // Store micro-level
        right: correctStimuli,
        missed,
        wrong: mistakes,
        accuracy: accuracy,
        matchingStimuli: matchingStimuli,
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

      // Now update speed information in recap dialog
      const speedTargetElement = document.querySelector("#sc-res-speed-target");
      const speedChangeElement = document.querySelector("#sc-res-speed-change");
      
      if (speedTargetElement && speedChangeElement) {
        const currentSpeed = getSpeedTarget(currentMicroLevel);
        const previousSpeed = getSpeedTarget(oldMicroLevel);

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

      try {
        localStorage.setItem("last-dim", dimensions);
      } catch (e) {
        console.error("Failed to save dimension to localStorage:", e);
      }

      if (levelChanged) {
        if (newLevel > originalLevel) {
          // Level up
          document.querySelector(".lvl-res-move").style.display = "block";
          document.querySelector(".lvl-before").innerHTML = originalLevel;
          document.querySelector(".lvl-after").innerHTML = newLevel;
          // Update nLevel for game state
          nLevelInputHandler(null, newMicroLevel);

        } else if (newLevel < originalLevel) {
          // Level down
          document.querySelector(".lvl-res-move").style.display = "block";
          document.querySelector(".lvl-before").innerHTML = originalLevel;
          document.querySelector(".lvl-after").innerHTML = newLevel;
          // Update nLevel for game state
          nLevelInputHandler(null, newMicroLevel);

        }
      } else {
        // Level stays the same (micro-level may have changed)
        document.querySelector(".lvl-res-stay").style.display = "block";
        // Show accuracy attempts progress
        const configKey = getCurrentConfigKey();
        const attemptData = accuracyAttemptsByConfig[configKey];
        const recentAttempts = attemptData.attempts.slice(-attemptData.windowSize);
        const successCount = recentAttempts.filter(a => a).length;

        // Remove any existing progress messages first
        const existingProgress = document.querySelector('.attempts-progress');
        if (existingProgress) existingProgress.remove();
        // Create progress indicator
        const progressMsg = document.createElement('div');
        progressMsg.className = 'attempts-progress';
        progressMsg.style = "text-align: center; font-size: 1.2rem; margin-top: 1rem; color: #4CAF50;";

        // Add visual representation of attempts
        const attemptsVisual = document.createElement('div');
        attemptsVisual.style = "display: flex; justify-content: center; gap: 0.5rem; margin-top: 0.5rem;";

        // Check if we're at or near a phase boundary
        const microProgress = currentMicroLevel - Math.floor(currentMicroLevel);
        const currentPhase = microProgress < 0.34 ? 1 : (microProgress < 0.67 ? 2 : 3);
        const nearPhase1Boundary = currentPhase === 1 && microProgress >= 0.30;
        const nearPhase2Boundary = currentPhase === 2 && microProgress >= 0.63;
        
        // Show phase transition progress if at or near boundary
        if (nearPhase1Boundary || nearPhase2Boundary) {
          const phaseData = phaseAccuracyAttemptsByConfig[configKey];
          const transitionKey = currentPhase === 1 ? 'phase1to2' : 'phase2to3';
          const phaseAttempts = phaseData[transitionKey];
          const phaseSuccessCount = phaseAttempts.filter(a => a).length;
          
          progressMsg.innerHTML = `Phase ${currentPhase}→${currentPhase + 1} Progress: ${phaseSuccessCount}/${phaseData.requiredSuccesses} successful attempts`;
          
          // Add phase attempt dots
          for (let i = 0; i < phaseData.windowSize; i++) {
            const attempt = phaseAttempts[i];
            const dot = document.createElement('span');
            dot.style = `width: 20px; height: 20px; border-radius: 50%; display: inline-block; 
                         background: ${attempt === true ? '#4CAF50' : attempt === false ? '#FF5252' : '#555'};`;
            attemptsVisual.appendChild(dot);
          }
          
          // Add distance to phase boundary indicator
          const distanceToPhase = currentPhase === 1 ? 
            (0.33 - microProgress).toFixed(2) : 
            (0.66 - microProgress).toFixed(2);
          const distanceMsg = document.createElement('div');
          distanceMsg.style = "font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;";
          distanceMsg.innerHTML = `Distance to phase boundary: ${distanceToPhase}`;
          progressMsg.appendChild(distanceMsg);
        } else {
          // Show integer level progress
          progressMsg.innerHTML = `Level Progress: ${successCount}/${attemptData.requiredSuccesses} successful attempts`;
          
          for (let i = 0; i < attemptData.windowSize; i++) {
            const attempt = recentAttempts[i];
            const dot = document.createElement('span');
            dot.style = `width: 20px; height: 20px; border-radius: 50%; display: inline-block; 
                         background: ${attempt === true ? '#4CAF50' : attempt === false ? '#FF5252' : '#555'};`;
            attemptsVisual.appendChild(dot);
          }
        }
        
        progressMsg.appendChild(attemptsVisual);
        document.querySelector(".lvl-res-stay").appendChild(progressMsg);
        document.querySelector(".lvl-stays").innerHTML = originalLevel;

        // Calculate accuracy criteria for display
        const totalTrials = sessionMetrics.hits + sessionMetrics.misses + 
                           sessionMetrics.falseAlarms + sessionMetrics.correctRejections;
        const correctResponses = sessionMetrics.hits + sessionMetrics.correctRejections;
        const sessionAccuracy = totalTrials > 0 ? correctResponses / totalTrials : 0;
        const goodAccuracy = sessionAccuracy >= 0.90;
        const goodDPrime = sessionMetrics.dPrime > 0.5;
        
        if (!goodAccuracy && goodDPrime) {
          // Remove any existing accuracy message first
          const existingMsg = document.querySelector(".accuracy-blocked-msg");
          
          if (existingMsg) {
            existingMsg.remove();
          }
          
          const accuracyMsg = document.createElement('div');
          accuracyMsg.className = 'accuracy-blocked-msg';
          accuracyMsg.style = "text-align: center; font-size: 1.2rem; margin-top: 1rem; color: #FF9800;";
          accuracyMsg.innerHTML = `Advancement blocked: ${(accuracy * 100).toFixed(0)}% accuracy (need 90%)`;
          document.querySelector(".lvl-res-stay").appendChild(accuracyMsg);
        }
        
        // Update nLevel for game state (to reflect micro-level changes)
        nLevelInputHandler(null, newMicroLevel);
      }

      // Restart game with new speed if currently running
      if (isRunning) {
        resetIntervals();
        const newSpeed = getSpeedTarget(newMicroLevel);
        console.log(`Restarting game with new speed: ${newSpeed}ms for level ${formatMicroLevel(newMicroLevel)}`);
        intervals.push(
          setInterval(getGameCycle(nLevel), newSpeed)
        );
      }
      
      // Save history and show results
      const datestamp = new Date().toLocaleDateString("sv");
      history[configKey][datestamp] = history[configKey][datestamp] || [];
      history[configKey][datestamp].push(historyPoint);
      console.log("history", history);
      
      saveSettings();
      saveHistory();

      // Calculate lure resistances if there were any lures
      if (sessionMetrics.n1LureEncounters && sessionMetrics.n1LureEncounters > 0) {
        sessionMetrics.n1LureResistance = (sessionMetrics.n1LureCorrectRejections || 0) / sessionMetrics.n1LureEncounters;
      } else {
        sessionMetrics.n1LureResistance = 1.0; // Default if no lures encountered
      }

      if (sessionMetrics.nPlusLureEncounters && sessionMetrics.nPlusLureEncounters > 0) {
        sessionMetrics.nPlusLureResistance = (sessionMetrics.nPlusLureCorrectRejections || 0) / sessionMetrics.nPlusLureEncounters;
      } else {
        sessionMetrics.nPlusLureResistance = 1.0; // Default if no lures encountered
      }

      // Show lure resistance section if any lures were encountered
      const totalLureEncounters = (sessionMetrics.n1LureEncounters || 0) + (sessionMetrics.nPlusLureEncounters || 0);
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
      const currentConfigKey = getCurrentConfigKey();
      if (!sessionHistoriesByConfig[currentConfigKey]) {
        sessionHistoriesByConfig[currentConfigKey] = [];
      }

      // Add accuracy to session metrics
      sessionMetrics.accuracy = accuracy;

      console.log(`Adding session to config ${currentConfigKey} with dPrime=${sessionMetrics.dPrime}`);

      sessionHistoriesByConfig[currentConfigKey].push({
        ...sessionMetrics, 
        nLevel: nLevel, 
        microLevel: currentMicroLevel, 
        date: new Date(),
        accuracy: accuracy
      });

      if (sessionHistoriesByConfig[currentConfigKey].length > 20) {
        sessionHistoriesByConfig[currentConfigKey].shift(); // Remove oldest session if more than 20
      }

      // Update the recap dialog with d-prime and micro-level information
      document.querySelector(".lvl-before").innerHTML = formatMicroLevel(historyPoint.microLevel);
      document.querySelector(".lvl-after").innerHTML = formatMicroLevel(newMicroLevel);
      document.querySelector(".lvl-stays").innerHTML = formatMicroLevel(newMicroLevel);

      // Update signal detection metrics in the recap dialog
      document.getElementById("sc-res-dprime").textContent = sessionMetrics.dPrime.toFixed(2);
      document.getElementById("sc-res-bias").textContent = sessionMetrics.responseBias.toFixed(2);

      // Show lure resistance section if any lures were encountered
      const totalLureEncounters2 = (sessionMetrics.n1LureEncounters || 0) + (sessionMetrics.nPlusLureEncounters || 0);
      if (totalLureEncounters2 > 0) {
        document.getElementById("lure-resistance-section").style.display = "block";
        
        // Display combined lure resistance
        document.getElementById("sc-res-lure-resistance").textContent = 
          `${(sessionMetrics.totalLureResistance * 100).toFixed(0)}%`;
        
        // Display total lure count
        document.getElementById("sc-res-lure-count").textContent = totalLureEncounters2;
        
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
      
      // Clean up any old progress messages before showing new results
      const oldAccuracyMsg = document.querySelector(".accuracy-blocked-msg");
      if (oldAccuracyMsg) {
        oldAccuracyMsg.remove();
      }
      const oldProgressMsg = document.querySelector('.attempts-progress');
      if (oldProgressMsg) {
        oldProgressMsg.remove();
      }

      // Show the recap dialog
      recapDialogContent.parentElement.show();
      
      // Reset game state for next round
      // If game was running, restart with new speed
      if (isRunning) {
        resetIntervals();
        const newSpeed = getSpeedTarget(newMicroLevel);
        console.log(`Level changed to ${formatMicroLevel(newMicroLevel)}, new speed: ${newSpeed}ms`);
        intervals.push(
          setInterval(getGameCycle(Math.floor(newMicroLevel)), newSpeed)
        );
      }
      resetPoints();
      resetBlock();
      
      return;
    }
    
    // Count stimulus
    stimuliCount++;
    
    // Animating stimuli
    if (wallsEnabled && walls && walls[i]) {
      currWalls = walls[i];
      if (currWalls && currWalls.symbol) {
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
    if (cameraEnabled && cameras && cameras[i]) {
      currCamera = cameras[i];
      if (currCamera && currCamera.symbol) {
        let [cx, cy] = currCamera.symbol.split("&");
        if (cx !== undefined && cy !== undefined) {
          rotateCamera(cx, cy);
        }
      }
    }

    if (faceEnabled && faces && faces[i]) {
      currFace = faces[i];
      const faceIndex = parseInt(currFace.symbol) - 1;
      if (!isNaN(faceIndex) && faceIndex >= 0 && faceIndex < faceEls.length) {
        if (colorEnabled && colors && colors[i]) {
          currColor = colors[i];
          wow(faceEls[faceIndex], currColor.symbol, getSpeedTarget(currentMicroLevel) - 500);
        } else {
          wow(faceEls[faceIndex], "col-a", getSpeedTarget(currentMicroLevel) - 500);
        }
      }
    } else if (colorEnabled && colors && colors[i]) {
      currColor = colors[i];
      wow(faceEls[0], currColor.symbol, getSpeedTarget(currentMicroLevel) - 500);
    }

    if (positionEnabled && positions && positions[i]) {
      currPosition = positions[i];
      if (currPosition && currPosition.symbol) {
        move(cube, currPosition.symbol);
      }
    }

    if (rotationEnabled && rotations_blocks && rotations_blocks[i]) {
      currRotation = rotations_blocks[i];
      if (currRotation && currRotation.symbol) {
        rotateCube(cube, currRotation.symbol);
        wow(cube, "rotation-active", getSpeedTarget(currentMicroLevel) - 500);
      }
    }

    if (wordEnabled && words && words[i]) {
      currWord = words[i];
      if (currWord && currWord.symbol) {
        writeWord(currWord.symbol);
      }
    }

    if (cornerEnabled && corners && corners[i]) {
      currCorner = corners[i];
      if (currCorner && currCorner.symbol) {
        move(innerCube, currCorner.symbol);
      }
      
      if (shapeEnabled && shapes && shapes[i]) {
        currShape = shapes[i];
        if (currShape && currShape.symbol) {
          // Remove all shape classes first
          shape.classList.remove("triangle", "square", "circle");
          // Add the new shape class
          shape.classList.add(currShape.symbol);
          // Apply the wow animation
          wow(shape, "shape-active", getSpeedTarget(currentMicroLevel) - 500);
        }
      }
    }

    if (soundEnabled && sounds && sounds[i]) {
      currSound = sounds[i];
      if (currSound && currSound.symbol) {
        speak(currSound.symbol);
      }
    }
    
    // Increase block index
    i++;
  };
}

let isTransitioning = false;

function play() {
  if (isRunning || isTransitioning) {
    return;
  }
  isTransitioning = true;

  document.querySelectorAll("dialog").forEach(d => d.close());
  closeOptions();

  // Update micro-level for the new random configuration
  if (randomizeEnabled) {
    // Save current micro-level before switching configurations
    const currentConfig = getCurrentConfigKey();
    microLevelsByConfig[currentConfig] = currentMicroLevel;
    
    // Now select random stimuli and update
    selectRandomStimuli(numStimuliSelect);
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
  
  isTransitioning = false;
}

function stop() {
  if (!isRunning || isTransitioning) {
    return;
  }
  isTransitioning = true;
  
  // Stop the game first to prevent new intervals from being created
  isRunning = false;
  
  // Cancel any ongoing speech
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
  
  // Reset game UI and timers
  resetPoints();
  resetBlock();
  resetIntervals();
  
  // Clear intervals array after resetting
  intervals = [];
  
  // Announce stop after cancelling previous speech
  setTimeout(() => {
    speak("Stop.");
  }, 100);
  
  document.querySelector(".stop").classList.add("active");
  document.querySelector(".play").classList.remove("active");
  
  isTransitioning = false;
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
    case "rotation": {
      curr = currRotation;
      button = checkRotationBtn;
      enable = enableRotationCheck;
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
    case "rotation": {
      enableRotationCheck = false;
      if (curr.isMatching) {
        rightRotation++;
        button.classList.add("right");
      } else {
        wrongRotation++;
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

function calculateAccuracy(correct, missed, wrong) {
  const total = correct + missed + wrong;
  if (total === 0) return 0;
  // Note: This doesn't include correct rejections since they're not passed to this function
  // For true accuracy including CR, use the inline calculation in the game end section
  return correct / total;
}

// Set up event listeners
[ ...document.querySelectorAll("input[name='dimension']") ].forEach(el => {
  el.addEventListener("click", function(evt) {
    // Save current config's micro-level before switching views
    const currentConfig = getCurrentConfigKey();
    if (currentMicroLevel !== undefined && !isNaN(currentMicroLevel)) {
      microLevelsByConfig[currentConfig] = currentMicroLevel;
    }
    const dim = evt.target.value;
    toggleStats(dim);
  });
});

["walls", "camera", "face", "position", "rotation", "word", "shape", "corner", "sound", "color"]
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

// Set up dialog close button event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Recap dialog close button
  const recapCloseBtn = document.querySelector('#recap-dialog .close-button');
  if (recapCloseBtn) {
    recapCloseBtn.addEventListener('click', function() {
      document.querySelector('#recap-dialog').close();
    });
  }
  
  // Stats dialog close button
  const statsCloseBtn = document.querySelector('#stats-dialog .close-button');
  if (statsCloseBtn) {
    statsCloseBtn.addEventListener('click', function() {
      document.querySelector('#stats-dialog').close();
    });
  }
  
  // Bind dialog close button
  const bindCloseBtn = document.querySelector('#bind-dialog .close-button');
  if (bindCloseBtn) {
    bindCloseBtn.addEventListener('click', function() {
      document.querySelector('#bind-dialog').close();
    });
  }
});

// Global error handler for debugging
window.addEventListener('error', function(event) {
  console.error('Global error caught:', {
    message: event.message,
    filename: event.filename,
    line: event.lineno,
    column: event.colno,
    error: event.error
  });
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
});

// Initialize the application
loadBindings();
loadSettings();
loadHistory();
  
// Initialize speed display
const speedDisplay = document.querySelector("#speed-display");
if (speedDisplay) {
  speedDisplay.innerHTML = getSpeedTarget(currentMicroLevel);
}

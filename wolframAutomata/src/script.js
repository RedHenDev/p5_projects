// Cellular Automata

// Notes on The Coding Train 7.1+ The Nature of Code
// 7.2 https://www.youtube.com/watch?v=W1zKu3fDQR8

// Grid of cells.
// Cell - state
// Cell - neighbourhood.

// cell state @ t = f (neightbourhood states t-1).

// Wolfram elementary CA. One-dimensional.

// Rule set. For each possible neighbourhood
// configuration, we could decide a new state outcome.
// This set of outcomes is called the 'rule set'.

// Simplest possible set of states = 0 or 1.

// Simplest possible neighbourhood = 3 adjacent cells.

// What do I do with edges? We could ignore them.
// We could do a wrap-around...
// What else?

p5.disablefriendlyerrors = true;

let running = false;

let timeStamp = 0;
let step = 0;

let button;

let n = 0;

let cells = [];

// Rule 107.
//let ruleSet = [0,1,1,0,1,0,1,1];

// Rule 30.
let ruleSet = [0,0,0,1,1,1,1,0];

let combos = [
    1,1,1,
    1,1,0,
    1,0,1,
    1,0,0,
    0,1,1,
    0,1,0,
    0,0,1,
    0,0,0
];

let fontSize = 0.6;

let monoSynth;

function setup(){
  createCanvas(windowWidth,windowHeight);
  repaintBackground();
  
  // More logical.
  //combos = combos.reverse();
  // Rule 30 becomes rule 120.
  //ruleSet = ruleSet.reverse();
  
  printInstructions();
  
  textSize(fontSize);
  
  setupCells();
  drawCells();
  
  monoSynth = new p5.MonoSynth();
  
  button = createButton("Reset");
  button.mousePressed(resetSystem);
}


function whatRule(_a){
  // Read an array of binary, translate to decimal.
  
  let runningTotal = 0;
  for (let i = 0; i < _a.length; i++){
    if (_a[i] === 1){
    runningTotal += pow(2, _a.length-1-i);
      if (i === _a.length -1) runningTotal += 1;
    }
  }
  return runningTotal;
}


function repaintBackground(){
  background(200,0,200);
}

function resetSystem(){
  repaintBackground();
  printInstructions();
    n = 0;
  emptyCells();
  setupCells();
  drawCells();
  
  
    playDing();
  
}

function iterate(){
   getRule();

  drawCells();
  
  playSynth();
}

function getRule(){
  // Ignore edges.
  
  // So, indices 1-cells.length-2.
  // And checking combos 0-combos.length-1 with 
  // increment of 3?
  
  let newCells = [];
  // Push first, ignored value onto start of array.
  // Just plug in some noise.
  newCells.push(Math.floor(random(0,1)*2));
  
  for (let i = 1; i < cells.length - 1; i++){
    for (let j = 0; j < combos.length; j += 3){
      if (cells[i-1] === combos[j] &&
         cells[i] === combos[j+1] &&
         cells[i+1] === combos[j+2]){
        
        newCells.push(ruleSet[Math.floor(j/3)]);
        break;
      }
    }
  }
  n++;
  // Push last, ignored value onto end. Just noise.
  newCells.push(Math.floor(random(0,1)*2));
  cells = newCells;
  
}

function setupCells(){
  // Use as many cells as can fit accorss screen.
  let nOc = Math.floor(2*width/fontSize*2);
  for (let i = 0; i < nOc; i++){
    cells.push(Math.floor(random() * 2));
  }
}

function mousePressed(){
  
  if (mouseX > width || mouseY > height) return;
  
  // Toggle mode.
  running = !running;
  
 //iterate();
}

function emptyCells(){
  cells = [];
}
let m = 0;
function drawCells(){
  // Here I want to work out how to get the 
  // cells aligned centrally.
  
  // Here are my 'algorithmic questions'.
  // What is the total length?
  // What is half that total?
  // Start at width/2 - half-that-total.
  let tL = fontSize * cells.length;
  let htL = Math.floor(tL * 0.5);
  //let startPos = (width * 0.5) - htL;
  let startPos = (width *2) - htL; // Adjusted - I'm squeezing.
  
  let Ystep = n+22;
  
  for (let i = 0; i < cells.length; i++){
    if (cells[i] === 0) stroke(0,0,220);
    else stroke(220);
   
    text(cells[i], startPos + i * (fontSize),
         Ystep);
    
    // Reached end of canvas?
    if (Ystep > height) {
      repaintBackground();
      playDing();
      n = 0;
    }
  }
}

function printInstructions(){
    textSize(22);
    fill(255);
    stroke(0);
    text("Tap to run / halt : Rule " + whatRule(ruleSet),
         width*0.5 - 72, 18);
    textSize(fontSize);
}

function draw(){
  
  if (running){
    
    printInstructions();
    
  if (millis() - timeStamp >= step){
    timeStamp = millis();
    iterate();
  }
    
  }
}

// *^*^*^*^*^*^*^*^^*^*^*^
// Sound stuff below here.

function playSynth() {
  userStartAudio();

  	let note = random(['A6','B6', 'C6']);
	//let note = random(['A4','B4', 'C4']);
  // note velocity (volume, from 0 to 1)
  let velocity = random(0.1,0.9);
  // time from now (in seconds)
  let time = 0;
  // note duration (in seconds)
  let dur = 1/22;

  monoSynth.play(note, velocity, time, dur);
}

function playDing() {
  userStartAudio();

  //let note = random(['A4','B4', 'C4']);
  let note = 'G5';
  // note velocity (volume, from 0 to 1)
  let velocity = random(0.1,0.2);
  // time from now (in seconds)
  let time = 0;
  // note duration (in seconds)
  let dur = 1/22;

  monoSynth.play(note, velocity, time, dur);
}
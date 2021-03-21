// The thing about human beings is that they
// are eminently programmable -- now, not in
// the sense of someone controlling or
// manipulating someone else etc. Instead, 
// just in the sense that a parrot or a dog
// can barely understand your instructions.

/*
First version, we'll hard-code the set of
m-configurations.

Next, it will be good for the user to be 
able to select and order their own table
of operations etc.
*/

let tape = [];        // Symbols on tape.
let mConfig = 0;      // M-configuration.
let hPosition = 0;    // Head position.

// For animation of machine operation.
let timeStamp = 0;
let speed = 0.01;    // Seconds.

// For audio.
let monoSynth;

// Counter program.
function counter(){
 
  if (mConfig==='Ci'){
    if (S()==0){
      mConfig='Cii';
    } else if (S()==1){
      mConfig='Cii';
    } else if (S()=='_'){
      P(1);
      mConfig='Di';
    }
    return;
  }
  if (mConfig==='Cii'){
      R();
      mConfig='Ci';
      return;
  }
  
  if (mConfig==='Di'){
    if (S()==0){
      mConfig='Eii';
    } else if (S()==1){
      mConfig='Dii';
    } 
    return;
  }
  if (mConfig==='Dii'){
      L();
      mConfig='Di';
      return;
  }
  
  if (mConfig==='Ei'){
      L();
      mConfig='Fiii';
      return;
  }
  if (mConfig==='Eii'){
      L();
      mConfig='Fi';
  }
  
  if (mConfig==='Fi'){
    if (S()==0){
      //R();
      mConfig='Hi';
    } else if (S()==1){
      mConfig='Fii';
    } else if (S()=='_'){
      P(1);
      L();
      mConfig='Fiv';
    }
    return;
  }
  if (mConfig==='Fii'){
      L();
      mConfig='Fi';
      return;
  }
  if (mConfig==='Fiii'){
    if (S()==1){
      E();
      mConfig='Fi';
    } 
    return;
  }
  if (mConfig==='Fiv'){
    if (S()==0){
      mConfig='Ci';
    } else if (S()==1){
      E();
      mConfig='Cii';
    } 
    return;
  }
  
  
  if (mConfig==='Hi'){
    if (S()==0){
      mConfig='Hii';
    } else if (S()==1){
      mConfig='Hii';
    } else if (S()=='_'){
      P(1);
      mConfig='Ji';
    }
    return;
  }
  if (mConfig==='Hii'){
      R();
      mConfig='Hi';
      return;
  }
  
  if (mConfig==='Ji'){
    if (S()==0){
      mConfig='Jii';
    } else if (S()==1){
      mConfig='Jii';
    } else if (S()=='_'){
      P(0);
      mConfig='Ei';
    }
    return;
  }
  if (mConfig==='Jii'){
      R();
      mConfig='Ji';
      return;
  }
  
  
}


// OK - hard-coded m-configuration operations.
function program(){
  
 if (mConfig===0){
      P(0);
      R();
      R();
      mConfig = 1;
 }
     else if (mConfig===1){
      P(1);
      R();
      R();
      mConfig = 0;
    }
   
}

// Basic machine operations.
// _-_-_-_-_-_-_-_-
// Move head right.
function R(){
  // If we are out of tape, add a new blank square.
  if (tape.length===hPosition+1)
    tape.push('_');
  // Now we can increment head position.
  hPosition++;
}
// Move head left.
function L(){
  if (hPosition===0) return;
  hPosition--;
}
// Print symbol.
function P(x){
  tape[hPosition] = x;
}
// Erase symbol.
function E(){
  tape[hPosition] = '_';
}
// Read symbol.
function S(){
  return tape[hPosition];
}

// Free us from the circle.
function mousePressed(){
  userStartAudio();
  
  //let tempH = hPosition;
  /*
  if (mouseX < width*0.5){
    program();
    return;
  }
  
  //hPosition = tempH;
  
  if (mouseY < height*0.5) {
    if (hPosition>=1)hPosition--;}
  else hPosition++;
  
  */
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  textSize(12);
  stroke(0);
  fill(255);
  
  rectMode(CENTER);
  
  // For audio: create new Sythesizer object.
  monoSynth = new p5.MonoSynth();
  
  // First, populate our tape.
  for (let i = 0; i < 4; i++){
    let blank = '_';
    tape.push(blank);
  }
  
  // For counter program:
  // Initial complete configuration.
  tape[0] = '_';
  tape[1] = 0;
  tape[2] = 0;
  tape[3] = '_';
  hPosition = 2;
  mConfig = 'Hi';
  
  tSquare.setup();
  
  //program();
}

function runProgramAtWhatTimeStepSecs(_secs){
let ms = _secs*1000;
const t0 = float(performance.now());
  if (t0-timeStamp >= ms) {
    timeStamp = float(performance.now());
    //program();
    counter();
    playSound();
  }
}

function playSound(){
  let vel = 0.01;     // Volume/Amplitude.
  // Note.
  let tone = random(['A5','B5','C5','D5','E5']);   
  let dur = 0.4;     // Duration.
  let whenStart = 0; // When to begin (time).
  
  monoSynth.play(tone,vel,whenStart,dur);
}

function draw() {
  background(64);
  
  runProgramAtWhatTimeStepSecs(speed);
  
  // Readout state.
  stroke(255);
  fill(220,0,220);
  rect(42,height*0.6,64,64);
  stroke(0);
  strokeWeight(3);
  fill(255);
  textSize(32);
  text(mConfig + '   @' + hPosition,
       42-16,height*0.6+8);
  //text(tape[hPosition] + '   >' + hPosition,
  //     42-8,height*0.6+8);
  
  for (let i = 0; i < tape.length; i++){
    tSquare.render(i);
  }
  
  
  
}

class tSquare{
  static setup(){
     let step = 32;
     let widthMax = 
         Math.floor((width-32)/(step));
     
     this.step = step; 
    
     this.widthMax = widthMax;
  }
  
  static render(_hPosition){
    if (hPosition!==_hPosition){
     stroke(0);
      strokeWeight(1);
    } else {stroke('#ee00ee');
           strokeWeight(2);}
      
     fill(255);
    
      let xPos = 22+ Math.floor((_hPosition %
                             this.widthMax)) *
          this.step;
      let yPos = 22+
          Math.floor((_hPosition/(this.widthMax))) *
          
          (this.step+4);
    
    noFill();
     rect(xPos,
          yPos,
          this.step,
          this.step);
    
    textSize(12);
    stroke(0);
    fill(255);
     text(tape[_hPosition],
       xPos-this.step/7,
       yPos+this.step/7);
  
     
   }
}
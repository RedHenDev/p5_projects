let logs;

let TS = 42; // Text size.

//let jingle;

let eraser;
// For eraser: prevents plural
// deletions. Now one per sec.
let timeStamp;  
let timeDelay = 400;

let date;
let time;

let nextPump;

let hrInc;

let slider;

function preload(){
  // Use createAudio() instead of loadSound()
  // in order to be able to adjust volume.
  
  // Also, note that html must include
  // p5.sound, and that a user event, such as
  // mousePressed() must be call the 
  // userStartAudio() function to enable sound.
  
  /*
  jingle = createAudio("https://res.cloudinary.com/djox8xzey/video/upload/v1599947674/audio/Jingle_Achievement_00_jvwzsg.mp3");
  jingle.volume(0.1);
  */
  
  // Eraser gif.
  eraser = loadImage("https://res.cloudinary.com/djox8xzey/image/upload/q_28/v1600270013/erase_i5sypa.gif");
}

function setup(){
 let canvas = createCanvas(window.innerWidth*0.9,
                           window.innerHeight*0.9);
  
  let density = displayDensity();
  pixelDensity(density);
  
  logs = [];
  
  if (getItem('myLogs') != null){
  logs = getItem('myLogs');
  
  if (getItem('nextP') != null){
    nextPump = getItem('nextP');
  }
    else nextPump = "";
      
} else nextPump = "";
  
  if (getItem('hrInc') != null){
    hrInc = getItem('hrInc');
  } else hrInc = 4;
  
  textSize(TS);
  noStroke();
  fill(255);
  
  date =
      day()+"/"+month()+"/"+year();
  
  // For eraser delay.
  timeStamp = 0;
  
  slider = createSlider(1,6,hrInc,1);
  slider.position(-1,height-height*0.11);
  slider.size(width);
  slider.changed(changedSlider);
}

function changedSlider(){
  hrInc = slider.value();
  storeItem('hrInc', hrInc);
  calcAndCache();
}

let mouseV;
function touchStarted(){
  mouseV = mouseY;
}

function touchEnded(){
  /*
  if (!userStartAudio())
      userStartAudio();
      */
  
    let deltaV = mouseY - mouseV;
  
 if (deltaV > 20){
   recordLog();
    // Calculate new next pump and cache values.
  calcAndCache();
   //jingle.play();
   return;
 }
  
 /* 
 if (deltaV < -20){
     if (logs.length > 0)
  logs.splice(logs.length-1,1);
 */
  if (millis()-timeStamp >
     timeDelay)
  {
  if (mouseX > width-(width*0.2) && mouseY < height*0.33){
    if (logs.length > 0){
  logs.splice(logs.length-1,1);
    timeStamp = millis();
      // Calculate new next pump and cache values.
  calcAndCache();
    }
  }else return;
  }else return;
  
  if (logs.length === 0) {
    nextPump = "";
    logs = [];
  }
  
}

function draw(){
  paintBackground();
  
  // Bottom grey panel.
  fill(202);
  rect(0,height*0.9,width,height*0.5);
  // Next feed by hour.
  let wh = slider.value();
  fill(200,0,200);
  textSize(12);
  text("+" + wh + " hours",
       width*0.7, height-height*0.04);
  
  printLogs();
  printNextPump();
  drawEraser();
  
  let textP = height/30;
  textSize(textP);
  fill(0);
  text("Swipe down to LOG", textP, height-textP*1.5);
}

function drawEraser(){
  image(eraser, width*0.8,0,width*0.2,width*0.2);
}

function printNextPump(){
  textSize(TS*0.5);
  fill(202*Math.sin(frameCount*0.04));
  
  let message = "Next pump > " + nextPump;
  
 text(message,17,logs.length * (TS * 0.5) + (TS * 2)); 
}

function paintBackground(){
  background(200,0,200);
}

function printLogs(){
  // First we print today's date at top.
  
  noStroke();
  fill(0);
  textSize(TS);
  text(date, 12, TS);
  
  // Now we list the logs.
  
  fill(255);
  textSize(TS*0.5);
  
  let message = 
      " - mooo";
  
 for (let i = 0; i < logs.length; i++){
   text(logs[i] + message + " #" + (i+1),12, i * (TS * 0.5) + (TS * 2));
 }
}

function calcAndCache(){
  if (logs.length < 1) {
    nextPump = "";
    storeItem('nextP', nextPump);
    // Now save logs to Browser's cache.
  storeItem('myLogs', logs);
    return;
  }
  
  // Now save logs to Browser's cache.
  storeItem('myLogs', logs);
  
  // Next pump?
  let n1 = logs[logs.length-1][1];
  let n2 = logs[logs.length-1][2];
  
  let n3 = n1 + n2;
    let hourInc = slider.value();
  let np = int(n3)+ hourInc;
    
  let min = logs[logs.length-1][4] + logs[logs.length-1][5];
   
    // If slipped after midnight etc.
    if (np > 24) { np = np - 24;
           np = np + ":" + min; }
    else if (np < 24) np = np + ":" + min;
    if (np == 24) np = "MIDNIGHT, BABY!";
    
   nextPump = np;
    storeItem('nextP', nextPump);
}

function recordLog(){
  let min = minute();
  if (min < 10) min = "0" + min;
  
  let newRecord = " " + hour() + ":" + min;
  
  logs.push(newRecord);
  
  // Calculate next pump and cache values.
  calcAndCache()
}
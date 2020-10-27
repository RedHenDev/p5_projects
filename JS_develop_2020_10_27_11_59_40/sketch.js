/*

Created around 24th October 2020.

A game engine for simple 2D platformer
games.

Allows users to build completely in
the browser, including easy to
manage media assets. Key principle
is to promote non-fiddly simplicity
from the off. So, it should be
like playing with blocks or lego
to build a world with.

[Legacy comment :)]
So what we want to be able to do
is save an array
of objects (2D platforms) to a json, 
and then load them up again.

*/

// Would like to make these static
// properties of my Platform class,
// but js doesn't seem to allow this,
// even though seems perfectly fine here:
/* 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
*/
// Our array of platforms.
let plats = [];
// Previously selected platform.
// For dealing with selection logic.
let prevSel = 0;
// Let's deal with moving platforms
// with mouse drag.
let canPlace = true;
let amDragging = false;
// So, canPlace will be false if
// at anytime we are hovering over
// a platform.
// What do we want to do about selecting
// something? I don't know.
// Let's get it working and cross that
// bridge when we get to it.
// Difference from mouse location to
// centre of grabbed/dragged object.
// These values will be added to where
// object is being dragged to; so,
// assigned when mousePressed(), and
// used during mouseDragged().
let dmX;
let dmY;
// Playmode toggle.
let playmode = false;
// Input keys during playmode.
let inLEFT = false;
let inRIGHT = false;
let inUP = false;
let inDOWN = false;
let inSPACE = false;
// Our main subject/player index on plats.
let mainSubjectID = -1;
function setup() {
  createCanvas(windowWidth,
               windowHeight- 200);
  
  // To draw rects from centre, not corner.
  rectMode(CENTER);
  
  setupButtons();
}


function findSubject(){
    console.log("Finding subject");
    // We'll iterate over all the plats
    // and find first 'subject' type.
    // this will be the plat controlled
    // by user and who the camera follows.
    for (let i = 0; i < plats.length; i++){
      if (plats[i].name == 'subject'){
        mainSubjectID = i;
        console.log("Main subject:" + i);
        break;
      }
    }
}

// Setup and management of the
// preview object displayed ready
// for placement.
let haveBegunPreview = false;
let whichPlatType = 0;
// This needs to be called in draw.
function previewPlat(){
  
  // If we haven't started edit build yet
  // then initialise a plat and make
  // sure the which-type-next variable
  // is in default mode.
  if (!haveBegunPreview){
    placePlat(width-42, height-32);
    prevSel = -1;
    plats[plats.length-1].selected = false;
    haveBegunPreview = true;
  }
  
}
// To place a new plat object.
function placePlat(whereX,whereY){
  
  if (playmode) return;
  // Create new platform at mouse pos.
  if (!canPlace) return;
  let jo;
  if (whichPlatType===0)
    jo = new Platform(whereX-x,whereY-y);
  else
    jo = new Subject(whereX-x,whereY-y);
  // Push onto plats array.
  plats.push(jo);
  // Now make jo selected
  // platform.
  // Also need to update input box.
  butInput.value(jo.w);
  if (plats[prevSel])
    plats[prevSel].selected = false;
  prevSel = plats.length - 1;
  jo.selected = true;
}




function checkPlayInput(){

    if (keyIsDown(RIGHT_ARROW)){
        inRIGHT = true;
        } else inRIGHT = false;
    if (keyIsDown(LEFT_ARROW)){
        inLEFT = true;
        } else inLEFT = false;
    if (keyIsDown(DOWN_ARROW)){
        inDOWN = true;
        } else inDOWN = false;
    if (keyIsDown(UP_ARROW)){
        inUP = true;
        } else inUP = false;
    //if (keyIsDown(keyCode(32))){
      //  inSPACE = true;
       // } else inSPACE = false; 
}




function draw() {
  background(220);
   
  // If in editmode, green frame around screen.
  if (!playmode){
    noFill();
    strokeWeight(15);
    stroke(0,200,0);
    rect(width*0.5, height*0.5,width,height);
  }else{
   
    // Nothing.
  }
  
  previewPlat();
  
  // Navigate level with arrow keys.
  // To move around level during edit mode.
  // x and y are variables used for this
  // translation.
  if (!playmode)
  translate(x,y);
  if (!playmode)
    checkNavInput();
  else checkPlayInput();
  
  // Translate view around subject.
  // As if camera following.
  //push();
  if (playmode && plats[mainSubjectID]) 
    translate(
      width/2-plats[mainSubjectID].p.x,
      height/2-plats[mainSubjectID].p.y);
  
  // Update plats -- check to see if mouse
  // is hoving over (not needed to playmdode)
  // and render plats.
  let i = 0;
  while (i < plats.length){
    
    // Do hovercheck etc. if in edit mode.
    if (!playmode){
    if(
      plats[i].hoverCheck(
      mouseX-x,
      mouseY-y,1)
      ) { plats[i].mouseOver = true;
         // We are over something,
         // so canPlace should be false.
         canPlace = false;
        }
    else plats[i].mouseOver = false;
    } // End of 'if in edit mode'.
    
    // Draw all objects to screen.
    plats[i].render();
    
    // Subject update.
    if (plats[i].name==='subject' &&
        playmode)
        plats[i].update(i);
    
    i++;
  }
  //pop();
  // Turn off global input -- must make
  // sure user is proving input next update.
  inRIGHT = false;
  inLEFT = false;
  inUP = false;
  inDOWN = false;
}
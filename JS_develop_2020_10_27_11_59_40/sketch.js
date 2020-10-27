/*

Created around 24th October 2020.

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

// May have to make these global
// at some point. Like now.
// This is so that we can set value
// of butInput to currently selected
// platform.
let butSave;
let butLoad;
let butInput;
let butPlay;
function setupButtons(){
  
  // Maybe I should organise this
  // either with an array of positions
  // or something, or as a class?
  
  // Padding positions for buttons.
  let pad = 2;
  // Button width and height.
  let bw = width/8;
  let bh = bw * 0.618;
  
  butInput = createInput('0','number');
  butInput.changed(valChange);
  butInput.position(pad,
                    height+bh*1+pad);
  butInput.size(bw,bh);
  
  function valChange(){
    // Delimits to positive numbers.
    if (this.value() < 0) this.value(0);
    
    // Let's see if we can change width
    // of selected platform.
    // Should do this in a static method.
    let v = this.value();
    Platform.changeWidth(prevSel, 
                         v);
    
    //console.log(this.value());
  }
  
  butSave = createButton("Save");
  butSave.mousePressed(savePlats);
  butSave.position(pad,height+pad);
  butSave.size(bw,bh);
  
  butPlay = createButton("Play toggle");
  butPlay.mousePressed(h=>
          {
            playmode=!playmode;
            findSubject();
						if (plats[prevSel])
							plats[prevSel].selected
							=false;
            prevSel = -1;
          });
  butPlay.position(width-pad-bw,height+pad);
  butPlay.size(bw,bh);
  
  //butLoad = createButton("Load");
  //butLoad.mousePressed(loadPlats);
  butLoad = createFileInput(loadPlats);
  butLoad.position(pad,height + bh*3);
  butLoad.size(bw,bh);
  butLoad.text = 'load';
}

function findSubject(){
  if (playmode){
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


function keyPressed(){
  
  // Toggle playmode with space.
  // if(keyCode===32){
  //   playmode=!playmode;
  // }
  
  // Edit mode.
  if (!playmode){
  // Test for changing object type.
  // I think I want this done via
  // the DOM -- and by all means 
  // incorportate a shortcut key.
  if (key=="s"){
    whichPlatType++;
    if (whichPlatType>1) whichPlatType = 0;
  }
  
  // Don't want unfortunate deletions etc.
  // So -- ignore keys if mouse off canvas.
  if (mouseY > height) return;
  
  // No platforms?
  if (plats.length < 1) return;
  
  // Backspace pressed?
  if (keyCode===BACKSPACE){
    // Does this presently selected
    // exist, and is it selected?
    if (plats[prevSel] &&
        plats[prevSel].selected)
        plats.splice(prevSel,1);
    return;
  }
  } // End of edit mode keys.
  
  
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

// Movement by arrowkeys/wsad.
// Everything is translated relative.
// NB reset when level loaded.
let x = 0;
let y = 0;
function checkNavInput(){
  
  // Space-bar pressed?
  if (keyCode===32){
    // Maybe duplicate?
    // We'll use this to bring user
    // back to 'home start' of level.
    x = 0;
    y = 0;
    return;
  }
  
  // Don't want unfortunate deletions etc.
  // So -- ignore keys if mouse off canvas.
  if (mouseY > height) return;
  
  // This now placed in draw().
  // Perform translation.
  //translate(x,y);
  
  // Shouldn't need this now since
  // we're called this function from
  // keyPressed().
  if (keyIsPressed===false) return;
  
  let speed = 12;
  
  if (key=="w" || keyCode==
     UP_ARROW){
    //spaceVoice.speak("going up");
    y+=speed;
  }
  if (keyCode==DOWN_ARROW){
    //spaceVoice.speak("going down");
    y-=speed;
  }
  if (key=="a" || keyCode==
     LEFT_ARROW){
    x+=speed;
  }
  if (key=="d" || keyCode==
     RIGHT_ARROW){
    x-=speed;
  }
}


function loadPlats(_file){
  // First, just load a JSON from
  // uploaded file.
  // Later, really need 
  // fileChoose etc.
  
  // How can I make sure this loads
  // before moving on? Let's try 
  // a callback.
  
  // Nope, now done with promise,
  // fetch, and arrow functions.
  
  
  // let promise = fetch('plats.json')
  //   .then(response => response.json())
  //   .then(json => loadIt(json))
  //   .catch(error => console.log(error));
  
  // Should probably do this with
  // await and async.
  loadIt(_file.data);
}

function loadIt(_json){
  console.log('Got the json!');
  // First, empty out plats array.
  plats = [];
  let jPlats = _json;
  // Now, build new plat objects
  // with reference to platform
  // arrays stored on json.
  let jojo; // Our new object.
  for (let i = 0; 
       i < jPlats.len; i++){
    
    // What type of object is this?
    if (jPlats.name[i] == 'platform'){
      jojo = new 
      Platform(jPlats.x[i],
               jPlats.y[i]);
      plats.push(jojo);
      // Use static function, which
      // correctly recalculates width info --
      // has to be after pushed to array.
      Platform.changeWidth(i,jPlats.w[i]);
      jojo.h = jPlats.h[i];
      console.log('platform added');
    }
    else if (jPlats.name[i] == 'subject'){
      jojo = new 
      Subject( jPlats.x[i],
               jPlats.y[i]);
      plats.push(jojo);
      // Use static function, which
      // correctly recalculates width info --
      // has to be after pushed to array.
      Subject.changeWidth(i,jPlats.w[i]);
      jojo.h = jPlats.h[i];
      console.log('subject added');
    }
  }
  
  // Reset relative translation.
  x = 0;
  y = 0;
  // Begin in edit mode.
  playmode = false;
  // Begin with default plat type.
  whichPlatType = 0;
  // Done!
  console.log('level loaded!');
}

function savePlats(){
  console.log("saving plats...");
  
  // So, I basically would love to just bang
  // the plats[] array onto a json and go from there?
  let jPlats = {};
  // Platform properties in arrays.
  jPlats.x = [];
  jPlats.y = [];
  jPlats.w = [];
  jPlats.h = [];
  jPlats.name = [];
  // Number of platforms (plats.length) --
  // required for loading with for loop.
  jPlats.len = plats.length;
  for (let i = 0; i < plats.length; i++){
    jPlats.x[i] = plats[i].p.x;
    jPlats.y[i] = plats[i].p.y;
    jPlats.w[i] = plats[i].w;
    jPlats.h[i] = plats[i].h;
    jPlats.name[i] = plats[i].name;
  }
  
  saveJSON(jPlats, 'plats.json');
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

function mouseMoved(){
  if (!amDragging)
  canPlace = true;
}

function mouseDragged(){
  
  if (mouseY > height) return;
  
  // Manage selection.
  if (!amDragging)
  mouseSelect(false);
  
  // Check that mouse is over a 
  // platform before trying anything.
  if (plats[prevSel] &&
      plats[prevSel].mouseOver){}
  else return;
  
  // Move item according to mouse pos.
  // x and y are position offset for
  // navigation while editing level.
  // dmX and dmY are mouse offset.
  if (plats[prevSel]){    
    amDragging = true;
    plats[prevSel].p.x = mouseX-x-dmX;
    plats[prevSel].p.y = mouseY-y-dmY;
  }
}

function mouseSelect(toggle){
  // Select highlighted platform.
  for (let i = 0; i < plats.length; i++){
    if (plats[i].mouseOver){
      
      // ********************************
      // We're over an object, so do not
      // permit creation of new objects.
      canPlace = false;
      
      // Judge where mouse is in relation
      // to selected obj. For dragging
      // without having obj jump to being
      // centred around mouse.
      // OK - I think this needs to happen
      // in mouseSelect. Hmmmm.
      // NB x and y are edit nav offsets.
      dmX = mouseX - plats[i].p.x - x;
      dmY = mouseY - plats[i].p.y - y;
      
      // ********************************
      
      // Toggle or select object.
      if (toggle){
        plats[i].selected =
        !plats[i].selected;
      }
      else { 
        plats[i].selected = true;}
  
      // ? Needs comment.
      if (plats[prevSel] && prevSel !== i){
          plats[prevSel].selected = false;
          }
      
      // Populate input value with width
      // of selected platform.
      // But if nothing now selected,
      // set prevSel to -1.
      if (plats[i].selected){
        prevSel = i;
        butInput.value(plats[i].w);
      } else prevSel = -1;
      
      // Job done -- exit loop & function!
      return;
    }
  }
}

function mousePressed(){
  
  if (mouseY > height) return;
  
  // True argument means selection can
  // toggle obj as selected/not-selected.
  // False selects it no matter what.
  mouseSelect(true);
}

function mouseReleased(){
  
  amDragging = false;
  
  if (mouseY > height) return;
  placePlat(mouseX,mouseY);
  
}


//**************************************
//**************************************

// My platform object.
class Platform{
  
  // Static variables and stuff.
  static changeWidth(id, val){
    //if (id===-1) return;
    
    // Only make change if this
    // platform exists.
    if (plats[id]){
      plats[id].w = val;
      plats[id].calcForCollisions();
    }
  }
  
  
  constructor(_x, _y){
    // Type.
    this.name = 'platform';
    // Position.
    this.p = createVector(_x,_y);
    // Width and height.
    this.w = 42;
    this.h = 42*0.618;  // Phi proportion.
    // Calculations for collisions done
    // now for optimizatinon.
    // NB will need to be redone if
    // platform's dimensions changed.
    // In fact, let's make a function
    // for that now.
    this.wh = this.w*0.5;  // Half width.
    this.hh = this.h*0.5;  // Half height.
    //calcForCollisions();
    
    // Editor states.
    this.mouseOver = false;
    this.selected = false;
  }
  
  calcForCollisions(){
    this.wh = this.w*0.5;  // Half width.
    this.hh = this.h*0.5;  // Half height.
  }
  
  // Is a given point over me?
  // NB r is radius of point,
  // for use with larger objects.
  // For mouse, r is 1.
  hoverCheck(x,y,r){
    if (x + r > this.p.x - this.wh &&
        x - r < this.p.x + this.wh &&
        y + r > this.p.y - this.hh &&
        y - r < this.p.y + this.hh){
      return true;
    } else return false;
        
  }
  
  render(){
    push();
      if (this.mouseOver &&
         !this.selected) {
        fill(246);
        strokeWeight(3);
        stroke(200,0,200);
        
      } else if(this.selected){
        fill(246);
        strokeWeight(3);
        stroke(0,200,0);
        
      } else{
        // Natural appearance.
        fill(246);
        strokeWeight(1);
        stroke(42);
        
      }
      translate(this.p.x, this.p.y);
      rect(0,0, this.w, this.h);
    pop();
  }
} // End of Platform class.

class Subject extends Platform{
   constructor(_x, _y){
     // Super used to call parent class's
     // constructor. Must be used before
     // .this keyword used for new variables.
     super(_x, _y);
     this.name = 'subject';
     this.w = 64*0.618;
     this.h = 64;
     this.calcForCollisions();
     
     // Euler physics properties.
     this.vel = createVector(0,0);
     this.acc = createVector(0,0);
     // Gravity direction and force.
     this.gDir = createVector(0,0.1);
   }
  
  // Gravity...and collisions?
  // Well yes -- our platforms are
  // our main obj with which sprites
  // can interact physically. That is,
  // platforms should be the key
  // building block of collisions and
  // terrain.
  update(selfIndex){
    
    // I'm just hard coding in plats array.
    // But we could pass in an array parameter
    // in future?
    // This checks collisions.
    // Four corners of subject.
    // False means not inside plat.
    let tr = false;
    let tl = false;
    let br = false; 
    let bl = false;
    for (let i = 0; i < plats.length; i++){
      // Don't check against self...
      if (plats[i]===this) continue;
      // Could I use hoverCheck here?
      // Trying a 'four-corner' system.
      // Each corner point of subject
      // queried as to being inside plat.
      tl = plats[i].hoverCheck(
        this.p.x - this.wh,
        this.p.y - this.hh, 1);
      tr = plats[i].hoverCheck(
        this.p.x + this.wh,
        this.p.y - this.hh, 1);
      bl = plats[i].hoverCheck(
        this.p.x - this.wh,
        this.p.y + this.hh, 1);
      br = plats[i].hoverCheck(
        this.p.x + this.wh,
        this.p.y + this.hh, 1);
        
      // At least one point hit, so 
      // break out of loop.
      if (tl || tr || bl || br) break;
    }
    
    // Bottom of subject in body of plat.
    // So, zero out velocity and add
    // upward force.
    let useGrav = true;
    if (bl || br) {
      // Bounce force is a third of current
      // velocity.y, and gravity off.
      let dir = createVector(0,
                -this.vel.y*
                0.33);
      this.p.y -= 0.5; // Extract upward.
      //this.vel.mult(0);
      this.acc.add(dir);
      // Switch off gravity this update.
      useGrav = false;
    }
    // Top of subject in plat.
    // So, zero out velocity and add
    // downward force.
    if (tl || tr) {
      let dir = createVector(0,1);
      this.vel.mult(0);
      this.acc.add(dir);
    }
    
    // Gravity.
    // Switched off if grounded.
    if (useGrav)
      this.acc.add(this.gDir);
    
    // Apply subject locomotion
    // according to global inputs.
    if (playmode){
      let pDir = createVector(0,0);
      let upForce = 2.7 * !useGrav;
      let rightForce = 0.2;
      let leftForce = 0.2;
      let downForce = 0;
      pDir.x += inRIGHT  * rightForce;
      pDir.x += -inLEFT  * leftForce;
      pDir.y += -inUP    * upForce;
      pDir.y += inDOWN   * downForce;
      this.acc.add(pDir);
    }
    
    // Here is the Euler physics system.
    this.vel.add(this.acc);
    this.p.add(this.vel);
    this.acc.mult(0);
    // Friction.
    let tempY = this.vel.y;
    this.vel.mult(0.96);
    this.vel.y = tempY;  // Do not affect y.
  }
    
  render(){
   push();
      if (this.mouseOver &&
         !this.selected) {
        strokeWeight(3);
        stroke(200,0,200);
        fill(0,142,0);
      } else if(this.selected){
        strokeWeight(3);
        stroke(0,200,0);
        fill(0,111,0);
      } else{
        // Natural appearance.
        strokeWeight(1);
        stroke(42);
        fill(0,111,0);
      } 
     
      translate(this.p.x, this.p.y);
      rect(0,0, this.w, this.h);
   
      pop();
    
  }

  
  
}
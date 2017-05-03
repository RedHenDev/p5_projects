p5.disableFriendlyErrors = true;

var slider;
var button;
var angleVar = 1;
var angle = 4;
var autoVAL = 0.042;  
var slideUP = true;
var no_blobs = 14;      // Number of blobs (rainDrops).
var dropsON = false;    // Should rainDrops be showing?      
var extraDrops = 17;   // Total number of drops allowed (max tree angle creates more).
var shiffThanks;
var thisDot;
var treeRecursionDepth = 7; // Default is 17. The lower the more complex a tree.
var berrySize = 22;         // Size of berries on recursion tree. 182 default.

var treeON = true;      // Should we render recursion tree?
                        // NB. high cost to performance on mobile.
var treeButton;

var blobz = [];

var redHen;
var redH;

function preload(){
  redHen = loadImage("RedHenIcon Alpha 512 512.png");
}

function setup() {

  canvas = createCanvas(windowWidth,windowHeight);
  background(0,182,0);
  
  for (var i = 0; i < no_blobs; i++){
      blobz[i] = new blob(0,0,false); 
  }
  
    
    
  slider = createSlider(PI, 5.5, PI, 0.01);
  slider.position((width/2)-100, 100);
  slider.size(200);
  slider.changed(drawScene);
  
  button = createButton('Toggle the THIS DOTS');
  button.position(width- 4- width/5,4);
  button.size(width/5,height/5);
  var colB = color(0,0,255,142);
  button.style('background-color', colB);
  //button.style('font-size', 72);
  button.mouseClicked(toggle_rainDrops);
  
  treeButton = createButton('TREE');
  treeButton.position(width/2-45,4);
  treeButton.size(90,90);
  var colB3 = color(0,255,0,2);
  treeButton.style('background-color', colB3);
  treeButton.mouseClicked(toggle_tree);
    
  angleVbutton = createButton('Reset recursion tree');
  angleVbutton.position(4, 4);
  angleVbutton.size(width/5,height/5);
  textSize(42);
  var colB2 = color(255,0,0,222);
  angleVbutton.style('background-color', colB2);
  angleVbutton.mouseClicked(resetAngle);
  
  setMoveThreshold(0.5);
  //canvas.touchMoved(adjustAngle);
 // canvas.touchStarted(adjustAngle);
  //canvas.touchEnded(adjustAngle);
  
    
    canvas.mouseClicked(AutoSlide);
    //canvas.mouseMoved(AutoSlide);
  
  redH = image(redHen, width/2-42,9,84,84);
 
  Credits();

drawScene();
  
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    slider.position((width/2)-100,100);
    
//button = createButton('Toggle the THIS DOTS');
  button.position(width- 4- width/5,4);
  button.size(width/5,height/5);
  var colB = color(0,0,255,142);
  button.style('background-color', colB);
  //button.mouseClicked(toggle_rainDrops);
  
  //treeButton = createButton('TREE');
  treeButton.position(width/2-45,4);
  treeButton.size(90,90);
  var colB3 = color(0,255,0,2);
  treeButton.style('background-color', colB3);
  //treeButton.mouseClicked(toggle_tree);
    
  //angleVbutton = createButton('Reset recursion tree');
  angleVbutton.position(4, 4);
  angleVbutton.size(width/5,height/5);
  textSize(42);
  var colB2 = color(255,0,0,222);
  angleVbutton.style('background-color', colB2);
  //angleVbutton.mouseClicked(resetAngle);
  
    
    drawScene();
}

function toggle_tree(){
    treeON = !treeON;
    drawScene();
}

function Credits(){
  stroke(0);
  strokeWeight(4);
  fill(255);
  textSize(22);
  textAlign(CENTER);
  text("...this dot",width/2,height-80);
  
  stroke(255);
  strokeWeight(20);
  fill(0);
  textSize(16);
  textStyle(BOLD)
  textAlign(CENTER);
  text("With sincere thanks and love to Daniel Shiffman @shiffman",width/2,height-42);
}

function touchMoved(){
  if (dropsON === false) AutoSlide();
  return false; // To prevent unwanted behaviour when finger dragged.
}

function deviceMoved(){
  adjustAngle();
}

function adjustAngle(){
  //angleVar = random(-10,10);
angleVar+=0.01;
  drawScene();
}

// Called by objects instead without drawScene() to prevent flickering.
function adjustAngleND(){
  //angleVar = random(-10,10);
angleVar+=0.01;
 // drawScene();
}

function resetAngle(){
  angleVar = 1;
  slider.value(PI);
  drawScene();
}

function toggle_rainDrops(){
  dropsON = !dropsON;
  Reposition();
  drawScene();
}

function AutoSlide(){
  // First check whether we want to be sliding up or down.
  if (slider.value() <= PI) slideUP = true;
  if (slider.value() >= 5.4) slideUP = false;
  
   if (slideUP==true)  slider.value(slider.value()+autoVAL);
   else  { 
   slider.value(slider.value()-autoVAL);}
   drawScene();
 }
 
 function AutoSlideND(){
  // First check whether we want to be sliding up or down.
  if (slider.value()<= PI) slideUP = true;
  if (slider.value() >= 5.4) slideUP = false;
  
   if (slideUP==true)  slider.value(slider.value()+autoVAL);
   else  { 
   slider.value(slider.value()-autoVAL);}
   //drawScene();
 }

function twig(lenT){
   
  //stroke(random(0,255),random(0,255),random(0,255));
  stroke(255,255,255,222);
  strokeWeight((lenT/10)+1)
  line(0,0,0,-lenT);
  
    stroke(0, 0, 0);
  fill(255,0,0);
  ellipse(0,-lenT,berrySize/lenT,berrySize/lenT);
 
 if (dropsON && angle > 5.2 && blobz.length < extraDrops) 
  {blobz[blobz.length] = new blob(random(width-200)+100,height/4,true);} // HMMMMMMMMMM!
 
  translate(0, -lenT);
  
  
  angle = slider.value();
 
  
 if (lenT > treeRecursionDepth) {
    
    push();

   rotate(angle*angleVar);
   twig(lenT*0.67);
   pop();
   push();
  
   rotate(-angle);
   twig(lenT*0.67);
   pop();

 }
 
 
  
}

function ReBlob(){
  // Repositions rainDrops at top of canvas.
  
  for (var i = 0; i < blobz.length; i++){
  blobz[i].y = 0;
  drawScene();
  }
  
}

function drawScene(){
  background(0,182,0);
  
    if (treeON){
    push();
  translate(width/2, height-120);
  twig(200);
  pop();
    }
 
    redH = image(redHen, width/2-42,9,84,84);
  Credits();
}

//function mouseMoved(){
//  adjustAngle();
//}

//function touchEnded(){
//  adjustAngle();
//  return false;
//}

//function mousePressed(){
  
//  if (dropsON) ReBlob();
//  else AutoSlide();
//}

function Reposition(){
  if (dropsON) ReBlob();
//  else AutoSlide();
}

function draw() {

  if (dropsON){
       drawScene();
      for (var i = blobz.length-1; i >= 0; i--){
      blobz[i].update();
          blobz[i].checkMouse();
      blobz[i].show();
    }
  }
   
 
}
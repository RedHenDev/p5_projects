// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
var canvas;

var canSpawn = true;

function setup(){
    // Remember to assign value of canvas like this :) -- so mouse/touch interaction can work.
    canvas = createCanvas(windowWidth,windowHeight);
    background(0);
    
    RedHen_2DPhysics.setupMatter(); 
}

function mouseDragged(){
    canSpawn = false;
}

function touchEnded(){
    if (canSpawn && mouseX < width/2)
    RedHen_2DPhysics.newObj("box", mouseX, mouseY, 64, true);
    
    if (canSpawn && mouseX > width/2)
    RedHen_2DPhysics.newObj("circle", mouseX, mouseY, 32, true);
    
    canSpawn = true;
}

function draw(){ 
    background(0);
    
    RedHen_2DPhysics.updateObjs();   
}
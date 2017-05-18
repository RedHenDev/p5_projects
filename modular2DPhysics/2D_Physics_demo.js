// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
var canvas;

function setup(){
    // Remember to assign value of canvas like this :)
    canvas = createCanvas(windowWidth,windowHeight);
    background(0);
    
    RedHen_2DPhysics.setupMatter(); 
}

function mouseDragged(){
    if (frameCount % 4 !== 0) return;
    RedHen_2DPhysics.newObj("box", mouseX, mouseY, 28);   
}

function draw(){ 
    background(0);
    
    RedHen_2DPhysics.updateObjs();   
}
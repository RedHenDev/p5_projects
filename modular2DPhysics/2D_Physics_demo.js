
var blocks = [];

function setup(){
    
    createCanvas(400,400);
    background(0);
    
    RedHen_2DPhysics.setupMatter();
    
    blocks.push(new Box(200,200,20));
    
}

function touchStarted(){
   // if (frameCount % 4 !== 0) return;
    blocks.push(new Box(Math.floor(mouseX)+22, mouseY, 22));   
}

function draw(){
    
    background(0);
    
    for (let i = 0; i < blocks.length; i++){
        blocks[i].render();
    }
    
}
// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
let canvas;

let canSpawn = false;// Not moving obj, so can spawn obj.

let boo;

function setup(){
    // Remember to assign value of canvas like this :)
    canvas = createCanvas(windowWidth,windowHeight);
    background(72);
    
    // Correct for mouse positions.
    mouseX = 0;
    mouseY = 0;
    
    // Set first argument to 'true' to create window bounds automatically. Second argument is for mouse constraint (NB. true == OFF).
    RedHen_2DPhysics.setupMatter(false, true);
    RedHen_2DPhysics.setupCollisions();
        
    makeGround();
    
    // Test. Can we make our first Ghost Object?
    boo = new SpaceBuddha(width/2, height/2, 32);
    RedHen_2DPhysics.lastObjectCreated().OSR = false;
    RedHen_2DPhysics.lastObjectCreated().bod.label = 'boo';
}

function myCollision(event){
    // Ref to all pairs of bodies colliding.
        let pairs = event.pairs;
        // Iterate over the pairs to
        // find the condition you're
        // looking for.
        for (let i = 0; i < pairs.length; i++){
            // The event's pairs will have a 
            // bodyA and bodyB object that
            // we can grab here...
            let bodA = pairs[i].bodyA;
            let bodB = pairs[i].bodyB;
            
            // E.g.
             if (bodB.label === 'boo' &&
                 Math.abs(bodB.velocity.x *             bodB.velocity.y) > 4){
                Matter.Sleeping.set(bodA, 
                !bodA.isSleeping);}
            }   // End of forLoop.
}

// ***** UDPATE LOOP *****
function draw(){ 
    background(0,111,222);
   // printInstructions();
     
    
    //RedHen_2DPhysics.checkInputgGlobalMovement();
    translate(  -boo.myBod.bod.position.x+width/2,
                -boo.myBod.bod.position.y+height/2);
    
    RedHen_2DPhysics.updateObjs();
    boo.control();
    boo.speedLimit();
    boo.render();
   
}

// ***** INPUT and OTHER FUNCTIONS *****

function mouseDragged(){
    canSpawn = false;
}

function touchEnded(){
    if (canSpawn && mouseX < width/2){
        spawnBlock(mouseX, mouseY, 28);
    }
    if (canSpawn && mouseX > width/2){
        spawnBall(mouseX, mouseY, 14);
    }
    
    //canSpawn = true;
}

function spawnBlock(_x,_y,_sz){
    RedHen_2DPhysics.newObj("box", _x, _y, _sz);
    
    RedHen_2DPhysics.lastObjectCreated().fill = 
        color(0,Math.random()*255,0);
    RedHen_2DPhysics.lastObjectCreated().stroke = 
        color(0);
    RedHen_2DPhysics.lastObjectCreated().strokeWeight = 1;
}

function spawnBall(_x,_y,_sz){
    RedHen_2DPhysics.newObj("circle", _x, _y, _sz);
    
    RedHen_2DPhysics.lastObjectCreated().fill = 
        color(0,Math.random()*255,0);
    RedHen_2DPhysics.lastObjectCreated().stroke = 
        color(255);
    RedHen_2DPhysics.lastObjectCreated().strokeWeight = 2;
}

function makeGround(){
        // Ground.
        let mySize = height/4;
        RedHen_2DPhysics.newObj
        ("rectangle",width/2,height-mySize,width*1000,mySize);
        bods[bods.length-1].makeStatic();
        bods[bods.length-1].fill = color(0,255,0);
        bods[bods.length-1].stroke = color(0,200,0);
        bods[bods.length-1].strokeWeight = 4;
        bods[bods.length-1].OSR = false;
        // Invisible edges.
        //RedHen_2DPhysics.newObj ("GhostRectangle",0-10,height/2,20,height);
        //bods[bods.length-1].makeStatic();
        //bods[bods.length-1].OSR = false;
        //RedHen_2DPhysics.newObj ("GhostRectangle",width+
        //10,height/2,20,height);
        //bods[bods.length-1].makeStatic();
        //bods[bods.length-1].OSR = false;
    
    for (let i = 0; i < 42; i++){
        let boxSize = Math.random()*12 + 2;
        
        RedHen_2DPhysics.newObj ('circle', Math.random()*width, Math.random()*height-height/2, boxSize);
       
        RedHen_2DPhysics.lastObjectCreated().
        fill = color(0,Math.random()*255,0);
        RedHen_2DPhysics.lastObjectCreated().
        strokeWeight = 2;
        RedHen_2DPhysics.lastObjectCreated().
        makeSleep(true);
        RedHen_2DPhysics.lastObjectCreated().
        OSR = false;
    }
    
}


function printInstructions(){
    textSize(20); stroke(0); fill(255);
    text("Tap left of screen for blocks, right for balls. Objects can also be moved around :)", 32,32);
    fill(0,200,0);
    text("Arrow keys to control Blinkie; use + or - to change size :D", 32,62);
    fill(0,0,200);
    text("WSAD to move environment; space-bar for zero-gravity; g for usual gravity :O", 32, 92);
}
// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
let canvas;

let canSpawn = false;// Not moving obj, so can spawn obj.

let boo;

let skyTint;

let oldestDroplet = 0;
let droplets = [];

// Array to store each 'ground stalk'.
let gStalk = [];
let gY;
let totalW = 0; // Total width so far.
let maxWid = 33; // 9 is quite good. 14 also.
let minWid = 1; // Legacy...
let ampl;       // Default is height*3.
let res;        // Default is height.

// Testing new terrain generator...
let urizen;

//p5.disableFriendlyErrors = true;

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
        
    setupBoo();
    
    //makeGround(-width);
    //moveGround(boo.oX-width);
    
    // Here we goooooo...
    urizen = new GSterrain(44);
    
    createDigitBalls();
   
    // Test. Can we create an objects pool?
    // This will bypass the problem of the
    // spawning of bodies taking too much time.
    // Before, there was a real lag.
    setupObjectPool();
}

function setupBoo(){
    // Test. Can we make our first Ghost Object?
    boo = new SpaceBuddha(width/2, height/2, 32);
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
            
            // If boo hits another object.
            // Hmmmmm...should create boo first,
            // so that it is always first object
            // in pair, viz. 'boo'.
            // Oh, also must be moving faster
            // than specified velocity.
             if (bodA.label === 'boo' &&
                 bodB.label !== 'boo' &&
                 bodB.label === 'digit' &&
                 Math.abs(bodA.velocity.x) +             Math.abs(bodA.velocity.y) > 9){
                Matter.Sleeping.set(bodB, 
                !bodB.isSleeping);}
            }   // End of forLoop.
}

// ***** UDPATE LOOP *****
function draw(){ 
    
    skyTint = map(  boo.myBod.bod.position.y,
                    height*3, -height*5, 222, 0);
    // Orig tints = (0,111,222);
    background(0,skyTint/2,skyTint);
    
    // See frameCount etc.
    printInstructions();
    
    if (frameCount % 60 === 0 &&
       frameCount < 1024){
        spawnBlock(width, 32, Math.random()*50+50);
         // Give him a little kick ;)
        let force = createVector(-0.03,-0.1);
    RedHen_2DPhysics.lastObjectCreated().
        addForce(force);
    } 
    
    // Generate boo bubbles.
    //if (frameCount % 1 === 0) 
    spawnDroplet (                       boo.myBod.bod.position.x + Math.random()*32-16 +
                 boo.myBod.bod.velocity.x*12,
         boo.myBod.bod.position.y + boo.height);
    
    // Move 'camera' to centre on boo.
    translate(  -boo.myBod.bod.position.x+width/2,
                -boo.myBod.bod.position.y+height/2);
    
    // Work out when to move the infinite terrain.
    // note that previous version of terrain generator
    // use 'width' instead of 'urizen.width'.
    // NB ***0.905*** -- to adjust for Perlin 'shift'.
    boo.trackX = 
                Math.abs(boo.myBod.bod.position.x - boo.oX);
    if (boo.trackX > urizen.width){
        //moveGround(boo.oX-width);
        boo.oX = boo.myBod.bod.position.x;
        urizen.moveTerrain(boo.myBod.bod.velocity.x > 0);
        
    }
    
    RedHen_2DPhysics.updateObjs();
    boo.control();// NB. contains speedlimiter.
    //boo.speedLimit();
    boo.render();
    
    urizen.renderTerrain();
    
   

}


 

// ***** INPUT and OTHER FUNCTIONS *****

function spawnDroplet(_x, _y, _size){
    // First, grab an available droplet.
    // If none available, then just grab...which one?
    if (findSleeping()!=null){
        let i = findSleeping();
        droplets[i].makePosition(_x,_y);
        droplets[i].makeSleep(false);
        return;
    }
    else {
        // Find 'oldest' droplet and grab him :)
        let i = oldestDroplet;
        oldestDroplet++;
        if (oldestDroplet > droplets.length-1){
            oldestDroplet = 0;
        }
        droplets[i].makePosition(_x,_y);
        droplets[i].makeSleep(false);
    }
}


function setupObjectPool(){
    
    let numObjs = 111;
    
    for (let i = 0; i < numObjs; i++){
        spawnBall(-99,-99, Math.random()*8+2);
        // Grab this object.
        droplets[i] = RedHen_2DPhysics.
        lastObjectCreated();
        // Time to sleep.
        RedHen_2DPhysics.lastObjectCreated().
        makeSleep(true);
        //RedHen_2DPhysics.lastObjectCreated().
        //makeMass(10);
        RedHen_2DPhysics.
        lastObjectCreated().bod.restitution = 0.9;
        RedHen_2DPhysics.
        lastObjectCreated().bod.frictionAir = 0.8;
        
    }
}

function findSleeping(){
    
    let morpheus = null;
    
    for (let i = 0; i < droplets.length; i++){
        if(droplets[i].bod.isSleeping){
            morpheus = i;
            break;
        } else morpheus = null;
    }
    
    return morpheus;
}

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
    RedHen_2DPhysics.lastObjectCreated().OSR = false;
}

function spawnBall(_x,_y,_sz){
    RedHen_2DPhysics.newObj("circle", _x, _y, _sz);
    
    RedHen_2DPhysics.lastObjectCreated().OSR = false;
    RedHen_2DPhysics.lastObjectCreated().fill = 
        color(255,Math.random()*100+69);
    RedHen_2DPhysics.lastObjectCreated().stroke = 
        color(255);
    RedHen_2DPhysics.lastObjectCreated().strokeWeight = 2;
}



function makeGround(_originX){
        
    // What we want to do is create is a
    // modular ground. A modular terrain that
    // programmatically generates interesting,
    // beautiful, and unexpected features.
    
    gY = height * 3;    // Y position.
    ampl = height*3;
    res = height;
    
    totalW = 0; // Total width so far.

    noiseSeed(9);
    
    for (let i = 0; totalW < width * 3; i++){
        
        let thisWidth = maxWid;
    
        let xOffset = _originX + totalW + thisWidth/2;
        
        let noiseF = noise(xOffset/res)
        *ampl;
        
        RedHen_2DPhysics.newObj
        ('rectangle', xOffset, 
         gY + noiseF/2 - ampl/2, 
         thisWidth, height*2);
        
        gStalk[i] = RedHen_2DPhysics.lastObjectCreated();
        
        RedHen_2DPhysics.lastObjectCreated().OSR = false;
        //RedHen_2DPhysics.lastObjectCreated().
        //makeAngle(Math.random()*3);
        RedHen_2DPhysics.lastObjectCreated().
        makeStatic();
        RedHen_2DPhysics.lastObjectCreated().
        fill = color(0,149,0);
        RedHen_2DPhysics.lastObjectCreated().
        stroke = //color(0,100);
        RedHen_2DPhysics.lastObjectCreated().
        fill; 
        
        totalW += thisWidth;
    }
}
    
function moveGround(_originX){
    // What we want to do is create a
    // modular ground. A modular terrain that
    // programmatically generates interesting,
    // beautiful, and unexpected features.
    
    let totalW = 0; // Total width so far.
    
    for (let i = 0; i < gStalk.length; i++){
        
        let thisWidth = maxWid;
    
        let xOffset = _originX + totalW + thisWidth/2;
        
        let noiseF = noise(xOffset/res)
        *ampl;
        
        gStalk[i].makePosition(
            xOffset - width/2, 
            gY + noiseF/2 - ampl/2);  
        
        totalW += thisWidth;
    } 
}

function legacyGround(){
    // Ground.
        let mySize = height/4;
        RedHen_2DPhysics.newObj
        ("rectangle",width/2,height-mySize,width*1000,mySize);
        bods[bods.length-1].makeStatic();
        bods[bods.length-1].fill = color(0,255,0);
        bods[bods.length-1].stroke = color(0,200,0);
        bods[bods.length-1].strokeWeight = 4;
        bods[bods.length-1].OSR = false;
}

function createDigitBalls(){
    // Create loads of 'digit' balls in air.
    for (let i = 0; i < 444; i++){
        let oSize = Math.random()*12 + 2;
        
        RedHen_2DPhysics.newObj ('circle', Math.random()*width*3 - width, Math.random()*height*2-height*3, oSize);
       
        RedHen_2DPhysics.lastObjectCreated().
        fill = color(0,Math.random()*255,0);
        RedHen_2DPhysics.lastObjectCreated().
        strokeWeight = 2;
        RedHen_2DPhysics.lastObjectCreated().
        //makeStatic();
        makeSleep(true);
        RedHen_2DPhysics.lastObjectCreated().
        OSR = false;
        RedHen_2DPhysics.lastObjectCreated().bod.
        label = 'digit';
    }
}

function printInstructions(){
    
    textSize(20); stroke(0); fill(255);
    text("Frame = " + frameCount, 32,32);
    
//    textSize(20); stroke(0); fill(255);
//    text("Tap left of screen for blocks, right for balls. Objects can also be moved around :)", 32,32);
//    fill(0,200,0);
//    text("Arrow keys to control Blinkie; use + or - to change size :D", 32,62);
//    fill(0,0,200);
//    text("WSAD to move environment; space-bar for zero-gravity; g for usual gravity :O", 32, 92);
}
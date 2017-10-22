// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
let canvas;

let canSpawn = false;// Not moving obj, so can spawn obj.

let boo;

let skyTint;

let oldestDroplet = 0;
let droplets = [];

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
    
    makeGround(0);
    makeGround(width);
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
             if (bodA.label === 'boo' &&
                 bodB.label !== 'boo' &&
                 bodB.label === 'digit' &&
                 Math.abs(bodA.velocity.x *             bodA.velocity.y) > 0){
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
    // printInstructions();
    
    if (frameCount % 30 === 0) spawnDroplet (                       boo.myBod.bod.position.x + 
            Math.random()*width-width/2,
        boo.myBod.bod.position.y - height/2);
    
    // Move 'camera' to centre on boo.
    translate(  -boo.myBod.bod.position.x+width/2,
                -boo.myBod.bod.position.y+height/2);
    
    RedHen_2DPhysics.updateObjs();
    boo.control();
    boo.speedLimit();
    boo.render();
    
    boo.trackX = boo.myBod.bod.position.x - boo.oX;
    if (boo.trackX > width){
        boo.oX = boo.myBod.bod.position.x;
        makeGround(boo.oX+width/2);
    }
    
        
   
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
    
    let numObjs = 44;
    
    for (let i = 0; i < numObjs; i++){
        spawnBall(-999,-999, Math.random()*12+1);
        // Grab this object.
        droplets[i] = RedHen_2DPhysics.
        lastObjectCreated();
        // Time to sleep.
        RedHen_2DPhysics.lastObjectCreated().
        makeSleep(true);
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
}

function spawnBall(_x,_y,_sz){
    RedHen_2DPhysics.newObj("circle", _x, _y, _sz);
    
    RedHen_2DPhysics.lastObjectCreated().OSR = false;
    RedHen_2DPhysics.lastObjectCreated().fill = 
        color(0,Math.random()*255,0);
    RedHen_2DPhysics.lastObjectCreated().stroke = 
        color(255);
    RedHen_2DPhysics.lastObjectCreated().strokeWeight = 2;
}

function makeGround(_originX){
        
    // What we want to do is create, like,
    // modular ground. A modular terrain that
    // programmatically generates interesting,
    // beautiful, and unexpected features.
    
    let totalW = 0; // Total width so far.
    let maxWid = 9;
    let minWid = 9;
    let gY = height + height/2;    // Y position.

    noiseSeed(9);
    let ampl = height*3;
    let res = height;
    
    for (let i = 0; totalW < width; i++){
        
        let thisWidth = maxWid;
    
        let noiseF = noise((_originX + totalW + thisWidth/2)/res)
        *ampl;
        
        RedHen_2DPhysics.newObj
        ('rectangle', _originX + totalW + thisWidth/2, 
         gY + noiseF/2 - ampl/2, 
         thisWidth, height);
        RedHen_2DPhysics.lastObjectCreated().OSR = false;
        //RedHen_2DPhysics.lastObjectCreated().
        //makeAngle(Math.random()*3);
        RedHen_2DPhysics.lastObjectCreated().
        makeStatic();
        RedHen_2DPhysics.lastObjectCreated().
        fill = color(0,Math.random()*255,0);
        RedHen_2DPhysics.lastObjectCreated().
        stroke = RedHen_2DPhysics.lastObjectCreated().
        fill; 
        
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
    text("Tap left of screen for blocks, right for balls. Objects can also be moved around :)", 32,32);
    fill(0,200,0);
    text("Arrow keys to control Blinkie; use + or - to change size :D", 32,62);
    fill(0,0,200);
    text("WSAD to move environment; space-bar for zero-gravity; g for usual gravity :O", 32, 92);
}
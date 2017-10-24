// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
let canvas;

let canSpawn = false;// Not moving obj, so can spawn obj.

// Our subject.
let boo;

// To organise tint of sky.
let skyTint;

// Testing new terrain generator...
let urizen;

p5.disableFriendlyErrors = true;

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
        
    // Our subject.
    setupBoo();
    
    // Here we goooooo...
    urizen = new GSterrain(51);
    
    // Celestial orbs that can be woken/put to sleep
    // depending on collision speed with boo.
    createDigitBalls();
   
}

function setupBoo(){
    // Test. Can we make our first Ghost Object?
    boo = new SpaceBuddha(Math.round(width/2),
                          Math.round(height/2),
                          22);
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
    
//    if (frameCount % 33 === 0 &&
//       frameCount < 10240){
//        spawnBlock(width, 32, Math.random()*50+9);
//         // Give him a little kick ;)
//        let force = createVector(-0.06,-0.1);
//    RedHen_2DPhysics.lastObjectCreated().
//        addForce(force);
//    } 
    
    // Generate boo bubbles.
    //if (frameCount % 2 === 0) 
//    spawnDroplet (                       
//        boo.myBod.bod.position.x + 
//        Math.random()*boo.width*2 - boo.width,
//        boo.myBod.bod.position.y + boo.height);
    
    boo.spawnBubbles();
    
//    spawnDroplet (                       boo.myBod.bod.position.x + Math.random()*32-16 +
//                 boo.myBod.bod.velocity.x*12,
//         boo.myBod.bod.position.y + boo.height/1.7);
    
   
    
    // Move 'camera' to centre on boo.
    translate(  -boo.myBod.bod.position.x+width/2,
                -boo.myBod.bod.position.y+height/2);
    
    urizen.renderTerrain();
    
    RedHen_2DPhysics.updateObjs();
    boo.control();// NB. contains speedlimiter.
    
    boo.render();
    
    // Work out when to move the infinite terrain.
    // note that previous version of terrain generator
    // use 'width' instead of 'urizen.width'.
    // NB ***0.905*** -- to adjust for Perlin 'shift'.
    boo.trackX = 
                Math.abs(boo.myBod.bod.position.x - boo.oX);
    if (boo.trackX > urizen.width-
        Math.abs(boo.myBod.bod.velocity.x/2)){
        //moveGround(boo.oX-width);
        boo.oX = boo.myBod.bod.position.x;
        urizen.moveTerrain(boo.myBod.bod.velocity.x > 0);
    }
    
}


 

// ***** INPUT and OTHER FUNCTIONS *****
function mouseDragged(){
    canSpawn = false;
}

function touchEnded(){
    
    boo.bubblesON = !boo.bubblesON;
    
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
    RedHen_2DPhysics.lastObjectCreated().strokeWeight = 2;
    RedHen_2DPhysics.lastObjectCreated().OSR = false;
}

function spawnBall(_x,_y,_sz){
    RedHen_2DPhysics.newObj("circle", _x, _y, _sz);
    
    RedHen_2DPhysics.lastObjectCreated().OSR = false;
    RedHen_2DPhysics.lastObjectCreated().fill = 
        color(255,Math.random()*100+69);
    RedHen_2DPhysics.lastObjectCreated().stroke = 
        color(0);
    RedHen_2DPhysics.lastObjectCreated().strokeWeight = 3;
}

function createDigitBalls(){
    // Create loads of 'digit' balls in air.
    for (let i = 0; i < 111; i++){
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
    text("Position = " + 
         Math.round(boo.myBod.bod.position.x), 32,32);
    text("FPS = " + Math.floor(frameRate()), 32,64);
    
    text("Tap/Click to toggle crash bubbles", width/2, 32);
    
}
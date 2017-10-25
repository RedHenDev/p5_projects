// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
let canvas;

// Not moving obj, so can spawn obj.
// See how this is handled in touchEnded() and
// mouseDragged().
let canSpawn = true;
// For swiping.
let mouseX_prev = 0;
let mouseY_prev = 0;

// Our subject.
let boo;

let blinkies = [];

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
    
    // AntBots!
    for (let i = 0; i < 3; i++){
        blinkies.push(new antBot(true,
        Math.random()*width*4-width*2,
        -height,Math.random()*4+0.3,true));
        
        // Bubbly air friction :)
        RedHen_2DPhysics.
        lastObjectCreated().bod.frictionAir = 0.3;
    }
    
    // Here we goooooo...
    // 51 seems OK.
    // Nah, 12 is where it's at.
    urizen = new GSterrain(12);
    
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
    
    // Spit blocks if boo in correct area.
    if (boo.myBod.bod.position.x > -700 &&
        boo.myBod.bod.position.x < 1000)
        spitObjects();
    
    boo.spawnBubbles();
   
    push();
    // Move 'camera' to centre on boo.
    translate(  -boo.myBod.bod.position.x+width/2,
                -boo.myBod.bod.position.y+height/2);
    
    urizen.renderTerrain();
    
    for (let i = 0; i < blinkies.length; i++){
        blinkies[i].brain.
        setWayPoint(boo.myBod.bod.position.x,
                    boo.myBod.bod.position.x)
        blinkies[i].think();
        blinkies[i].render();
    }
    
    RedHen_2DPhysics.updateObjs();
    boo.control();// NB. contains speedlimiter.
    
    boo.render();
    
    // Work out when to move the infinite terrain.
    // note that previous version of terrain generator
    // used 'width' instead of 'urizen.width'.
    boo.trackX = 
                Math.abs(boo.myBod.bod.position.x - boo.oX);
    if (boo.trackX > urizen.width){
        //moveGround(boo.oX-width);
        boo.oX = boo.myBod.bod.position.x;
        
            urizen.moveTerrain(
            boo.myBod.bod.velocity.x > 0,
            boo.myBod.bod.position.x);   
    }
    pop();
    
    // These things, if rendered to canvas,
    // will appear over the top of other things.
    // See frameCount etc.
    printInstructions();
    
}

// ***** INPUT and OTHER FUNCTIONS *****
function mouseDragged(){
    canSpawn = false;
    
    // Swipe controls.
    if (mouseX > mouseX_prev)
        boo.control('RIGHT');
    if (mouseX < mouseX_prev)
        boo.control('LEFT');
    
    if (mouseY > mouseY_prev)
        boo.control('DOWN');
    if (mouseY < mouseY_prev)
        boo.control('UP');
    
    // For swipe controls.
    mouseX_prev = mouseX;
    mouseY_prev = mouseY;
}

function touchEnded(){
    
    if (canSpawn)
    boo.bubblesON = !boo.bubblesON;
    
//    if (canSpawn && mouseX < width/2){
//        spawnBlock(mouseX, mouseY, 28);
//    }
//    if (canSpawn && mouseX > width/2){
//        spawnBall(mouseX, mouseY, 14);
//    }
    
    canSpawn = true;
}

function spawnBlock(_x,_y,_sz){
    RedHen_2DPhysics.newObj("box", _x, _y, _sz);
    
    RedHen_2DPhysics.lastObjectCreated().fill = 
        color(Math.random()*205+50,101);
    RedHen_2DPhysics.lastObjectCreated().stroke = 
        color(255,0,255);
    RedHen_2DPhysics.lastObjectCreated().strokeWeight = 2;
    RedHen_2DPhysics.lastObjectCreated().OSR = true;
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

function spitObjects(){
//        if (frameCount % 33 === 0 &&
//       frameCount < 10240){
    if (frameCount % 5 === 0 && frameCount < 1024){
        spawnBlock(width/2 + 340, height/2+180, Math.random()*3+10);
        RedHen_2DPhysics.lastObjectCreated().OSR = false;
        
        // Lava colour...
        RedHen_2DPhysics.lastObjectCreated().fill = 
        color(Math.random()*205+50,0,0,255);
        RedHen_2DPhysics.lastObjectCreated().stroke = 
        color(255,0,0);
        
        // Give him a little kick ;)
        let force = createVector(
        Math.random()*0.002 - 0.001,-0.01);
        RedHen_2DPhysics.lastObjectCreated().
        addForce(force);
    } 
}

function createDigitBalls(){
    // Create 'digit' balls in air.
    for (let i = 0; i < 12; i++){
        let oSize = Math.random()*12 + 20;
        
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
    
    // TextBox test.
    renderTB(createVector
    ((width/2)+ 30 * Math.cos(radians(frameCount*3)),
     height/4,
     0),
    "Bubble altitude: " + -(Math.round(boo.myBod.bod.position.y) - 900) +
            "m > sea.");
    
    textSize(14); stroke(0); fill(255);
    //text("Swipe or use arrow keys to move.", 32, 32);
    text("Position = " + 
         Math.round(boo.myBod.bod.position.x), 32,32);
    text("FPS = " + Math.floor(frameRate()), 32,64);
    
    text("Tap/Click to toggle crash bubbles", width/2, 32);
    
}
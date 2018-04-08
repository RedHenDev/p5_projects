// Space junk (legacy stuff on the way to the top).



// Legacy setup:
function setup(){
    //makeGround(-width);
    //moveGround(boo.oX-width);
    
    //setupObjectPool();
}

//Legacy draw(){
// Generate boo bubbles.
    //if (frameCount % 2 === 0) 
//    spawnDroplet (                       
//        boo.myBod.bod.position.x + 
//        Math.random()*boo.width*2 - boo.width,
//        boo.myBod.bod.position.y + boo.height);
    
  
    
//    spawnDroplet (                       boo.myBod.bod.position.x + Math.random()*32-16 +
//                 boo.myBod.bod.velocity.x*12,
//         boo.myBod.bod.position.y + boo.height/1.7);

//moveGround(boo.oX-width);
}

let oldestDroplet = 0;
let droplets = [];

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
        lastObjectCreated().bod.restitution = 0.8;
        RedHen_2DPhysics.
        lastObjectCreated().bod.frictionAir = 0.9;
        
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

// TWO, not one, but ***TWO*** ways of
// creating terrain below.

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

function printInstructions(){
    
    textSize(20); stroke(0); fill(255);
    text("Frame = " + frameCount, 32,32);
    text("FPS = " + Math.floor(frameRate()), 32,64);
    
//    textSize(20); stroke(0); fill(255);
//    text("Tap left of screen for blocks, right for balls. Objects can also be moved around :)", 32,32);
//    fill(0,200,0);
//    text("Arrow keys to control Blinkie; use + or - to change size :D", 32,62);
//    fill(0,0,200);
//    text("WSAD to move environment; space-bar for zero-gravity; g for usual gravity :O", 32, 92);
}
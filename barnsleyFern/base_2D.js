 // Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
let canvas;





let canSpawn = true;// Not moving obj, so can spawn obj.

function setup(){
    // Remember to assign value of canvas like this :)
    canvas = createCanvas(windowWidth,windowHeight);
    background(72);
    
    // Set parameter to 'true' to create window bounds automatically.
    // Second argument - true = mouse contraint off (defaults to false).
    RedHen_2DPhysics.setupMatter(true, false);
    
    setupBarnsleyFern();
}


let a = [];
let b = [];
let c = [];
let d = [];
let f = [];

let bX;
let bY;

function setupBarnsleyFern(){
    
    // Origin.
    bX = width;
    bY = height;
    
    a.push(0);
    a.push(0.85);
    a.push(0.2);
    a.push(-0.15);
    
    b.push(0);
    b.push(0.04);
    b.push(-0.26);
    b.push(0.28);
    
    c.push(0);
    c.push(-0.04);
    c.push(0.23);
    c.push(0.26);
    
    d.push(0.16);
    d.push(0.85);
    d.push(0.22);
    d.push(0.24);
    
    f.push(1.6);
    f.push(1.6);
    f.push(1.6);
    f.push(0.44);
}

function placeOb(x, y){
    RedHen_2DPhysics.newObj("circle", x, y, 3);
    RedHen_2DPhysics.lastObjectCreated().
    makeStatic();
}

function barnsleyFern(){
    let wi = 0;
    let whichIndex = 
        Math.random()*
        100;
    if (whichIndex <= 100)  wi = 1;
    if (whichIndex <= 13)   wi = 2;
    if (whichIndex <= 6)    wi = 3;
    if (whichIndex <= 2)    wi = 0;
    
    bX =    (a[wi] * bX) +
            (b[wi] * bY);
    
    bY =    (c[wi] * bX) +
            (d[wi] * bY) +
            f[wi];
    
    if (bX <= 0 || bY <= 0){
        bX = width-Math.random()*10;
        bY = height-Math.random()*10;
        
        for (let aa in a){
            aa+=0.01;
        }
        for (let bb in b){
            bb-=0.01;
        }
        for (let cc in c){
            cc+=0.01;
        }
        for (let dd in d){
            dd-=0.01;
        }
        for (let ff in f){
            ff+=0.01;
        }
      
    }
    
    placeOb(bX, bY);
}

// ***** UDPATE LOOP *****
function draw(){ 
    background(0,111,222);
    
    barnsleyFern();
    
    // Matter body business.
    RedHen_2DPhysics.checkInputgGlobalMovement();
    RedHen_2DPhysics.updateObjs();
}

// ***** INPUT and OTHER FUNCTIONS *****

function mouseDragged(){
    // So that object is not spawned when
    // object picked up etc.
    canSpawn = false;
}
function touchEnded(){
    tapSpawn();
    
    barnsleyFern();
}

function tapSpawn(){
  if (canSpawn && mouseX < width/2){
    RedHen_2DPhysics.newObj("box", mouseX, mouseY, 28);
        RedHen_2DPhysics.lastObjectCreated().fill = color(0,(mouseY/height)*255,0);
    }
    if (canSpawn && mouseX > width/2){
        RedHen_2DPhysics.newObj("circle", mouseX, mouseY, 6);
        RedHen_2DPhysics.lastObjectCreated().fill = color(0,(mouseY/height)*255,0);
    }
    
    canSpawn = true;
}
p5.disableFriendlyErrors = true;    // To help performance.

var xp = 0;
var yp = 0;
var r = 0;
var theta = 0;

var wingBeat = 1;
var closeW = true;      // Begin by closing wings.
var flapping = true;    // Begin by animating flapping wings.

var origin;
var inc;
var rate;

var para;
//var para2;

var sTheta;

var seed;

var freezeB;

var mothCentred = false;

function setup(){
    
    canvas = createCanvas(400,400);
    background(0,122,222);
 
    seed = 221188;
    randomSeed(seed);
    
    displayName();
    
    freezeB = createButton("Freeze moth wings");
    freezeB.position(300,350);
    freezeB.size(100,50);
    freezeB.style("background-color", 'white');
    freezeB.mouseClicked(freezeMoth);       // Callbacks.
    canvas.mouseClicked(newMoth);
    
    drawWing(true);
    drawWing(false);
}

function assignTheta(){
    sTheta = "Theta = " + Math.round(theta);
}

function drawWing(_RightWing){
    
    if (mothCentred)
    origin = createVector(width/2, height/2);
    else
    origin = createVector(mouseX, mouseY);
    
    rate = 0.12;
    inc = rate;
    
    theta = -PI/2;
    r = 142;
    
    randomSeed(seed);
    
    stroke(255);
    strokeWeight(4);
    fill(random(0,255),random(0,255),random(0,255), 100);
 
    beginShape();
    for (var i = -PI/2; i <= PI/2+inc; i+= inc){
        
        
        r = random(10,182);
        
        if (_RightWing){
            theta = i; 
        xp = origin.x + (r * wingBeat) * Math.cos(theta);
        yp = origin.y + r * Math.sin(theta);
        }
        else {
            theta = 2*PI-i;
        xp = origin.x - (r * wingBeat) * Math.cos(theta);
        yp = origin.y - r * Math.sin(theta);
        } 
            
        vertex(xp,yp);
    
    }
    endShape(CLOSE);
    
    
}

function freezeMoth(){
    
    flapping = !flapping;   // Toggle flapping on and off.
}

function newMoth(){
    
    background(0,122,222);
    
    seed++;
    drawWing(true);
    drawWing(false);

    displayName();

}

function displayName(){
   
    fill(255);
    stroke(0);
    strokeWeight(12);
    textSize(42);
    para = text("No. " + (seed-221187), 20,380);
    
    //fill(0,0,0);
    stroke(255);
    strokeWeight(1);
    textSize(22);
    para2 = text("Click/Tap for new BISCUIT MOTH :D", 20, 40);
    
}

function draw(){
    background(0,122,222);
    
    if (mouseY > height/2){
        mothCentred = true;
    } else mothCentred = false;
    
    // dbdbdbdbdbdbdbdbdb
    if (flapping){
        if (closeW) wingBeat-=0.01;
        else wingBeat+=0.02;
    }
    // dbdbdbdbdbdbdbdbdb
    
    if (wingBeat < 0) { wingBeat = 0; closeW = false;}
    if (wingBeat > 1) { wingBeat = 1; closeW = true; }
    
    drawWing(true);
    drawWing(false);

    displayName();
}

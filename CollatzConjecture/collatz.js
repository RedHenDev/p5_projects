// Collatz Conjecture.


var step;
var lStep;
var rStep;
var maxN;
var oN;

var collatzSB;
var collatzB;
var clearB;
var rendmB;

var superMode;
var drawBranches;
var radialMode;

var wC;

var bLen;
var dLen;

var backgroundColour;

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    backgroundColour = color(200,0,200);
    
    // The buttons...
    collatzSB = createButton("Collatz up to n");
    collatzSB.position(12,12);
    collatzSB.size(100,50);
    collatzSB.style("background-color", 'red');
    collatzSB.mouseClicked(callSuperCollatz); // Callback -- super Collatz.
    
    collatzB = createButton("Collatz only n");
    collatzB.position(12,80);
    collatzB.size(100,50);
    collatzB.style("background-color", 'green');
    collatzB.mouseClicked(callCollatz); // Callback -- normal Collatz.
    
    clearB = createButton("Clear");
    clearB.position(12,148);
    clearB.size(100,50);
    clearB.style("background-color", 'cyan');
    clearB.mouseClicked(SetupCollatz); // Callback -- clear canvas.
    
    rendmB = createButton("Tree-graph mode");
    rendmB.position(width-120,80);
    rendmB.size(100,50);
    rendmB.style("background-color", 'gold');
    rendmB.mouseClicked(toggle_RenderMode); // Callback -- toggle render mode.
    
    radB = createButton("Radial mode");
    radB.position(width-120,148);
    radB.size(100,50);
    radB.style("background-color", 'blue');
    radB.mouseClicked(toggle_RadialMode); // Callback -- toggle render mode.
    
    wC = createInput("777");
    wC.position(width-120,12);
    wC.size(80,32);
    wC.changed(callCollatz)
    //collatzB.style("background-color", 'white');
    //collatzB.valueChanged(callCollatz); // Callback.
    
    drawBranches = true;
    radialMode = true;
    
    SetupCollatz();
    
    callSuperCollatz();
}

//function draw() {
//    // Space is pink. It's true.
//    background(200,0,200);
//    
//   
//}

function SetupCollatz(){
    
    background(backgroundColour);
    
    // Redundant here, actually.
    // But nominally satisfying.
    step = 0;
    rStep = 0;
    lStep = 0;
    
    if (radialMode){
    bLen = 2;   // Branch length, vertical.
    dLen = 1.67; // Diagonal (x axis) length.
    } else {
    bLen = 3;   // Branch length, vertical.
    dLen = 2.33; // Diagonal (x axis) length.
    }
    
    wL = 9;     // StrokeWeight left branch.
    wR = 9;     // StrokeWeight right branch.
    superMode = false;  // Did we click sigma n or single n?
    
    
    if (drawBranches)
        rendmB.style("background-color", 'gold');
    else rendmB.style("background-color", 'white');
    
    if (radialMode)
        radB.style("background-color", 'gold');
    else radB.style("background-color", 'white');
    
}

function toggle_RadialMode(){
     radialMode = !radialMode;
    
        if (radialMode)
        radB.style("background-color", 'gold');
    else radB.style("background-color", 'white');
}

function toggle_RenderMode(){
     drawBranches = !drawBranches;
    
        if (drawBranches)
        rendmB.style("background-color", 'gold');
    else rendmB.style("background-color", 'white');
}


function callCollatz(){
    
    // Things will NOT be refreshed, because
    // SetupCollatz() not called. This allows
    // us compare single instanes of n.
    
    var newN = wC.value();
    
    if (drawBranches === false)
    toggle_RenderMode();    // We must be in tree-graph mode.
    
    step = 0;
    rStep = 0;
    lStep = 0;
    
    collatzMe(newN, null);
    
}

function callSuperCollatz(){
    
    // Things will be refreshed, therefore.
    SetupCollatz();
    
    // Get count limit from text input.
    maxN = wC.value();
    
    // Yes -- we are counting all numbers up to and including n.
    superMode = true;
    
    for (let i = 1; i <= maxN; i++){
        step = 0;
        rStep = 0;
        lStep = 0;
        collatzMe(i, i);
    }
    
    // Will remain false for callCollatz, unless using this very function again.
    superMode = false;
}


function collatzMe(_n, _i){
    
    var n = _n;
    
    if (_i != null) oN = _n;    // Original n! Only passed in from SuperCollatz.
    step++;
    maxN = wC.value();
    
    // Only display n if first time through (root n).
    if (step === 1){
    
    // Rectangle to cover previous display of n.
    noStroke();
    fill(backgroundColour);
    rect(0,0,width,100);
        
    // Cite n.    
    strokeWeight(3);
    stroke(255);
    fill(0);
    textSize(42);
    if (superMode)
    text("n = 1 to " + n, width/2,42);
        else
    text("n = " + n, width/2, 42);
    
    // Save neutral matrix.
    push();
    
    // Translate to root origin.
        if (superMode === false)
            translate(width/2, height-42);
        else {
            if (radialMode){
            translate(width/2, (height/2)+20);
            rotate(radians((360/maxN)*n));}
            else{
            let xPos = (((width-40)/maxN)*n)+20;
        translate (xPos, height-42);}
        }
    }
    
    // Is n even?
    if (n % 2 == 0) {
        // Draw branch left.
        // Increment left steps.
        // Divide n by 2.
        // Finally, recursively call this function unless n === 1, in which case return.
         if (drawBranches) drawLeftBranch(n);
        
        n = n/2;
        lStep++;
        
        // Have we found 1?
        if (n !== 1) collatzMe(n, null);  // No? Recursion like there's no tomorrow!
        else { 
              
              if (drawBranches===false) drawDataWhorl(oN);
                pop(); 
            displaySteps(step, rStep, lStep); 
              return};
    }
    else
     {
        // Draw branch right.
        // Increment right steps.
        // Multiply n by 3 and add 1.
        // Finally, recursively call this function unless n === 1, in which case return.
         if (drawBranches) drawRightBranch(n);
        
        n = (n*3)+1;
        rStep++;    // Increment right steps taken.
        
        // Have we found 1?
        if (n !== 1) collatzMe(n, null);  // No? recursion!
        else { 
              
              if (drawBranches===false) drawDataWhorl(oN);
                pop(); 
            displaySteps(step, rStep, lStep);
              return;}
    }
    
    
}

function drawDataWhorl(_n){
    
    // Render an ellipse where distance maps to n, and
    // where radius maps to how many steps taken.
    
    let n = _n;
    
    // Size of ellipse mapped to steps taken.
    // 350, since number of steps greater than
    // this is only for very, very large numbers.
    let sD = 10;
    sD = map(step, 1, 350, 1, height);
    
    // Connecting line.
    strokeWeight(1);
    stroke(0,84);
    line(0,0, 0, -sD + ((lStep/rStep)*10)/2);
    
    // Turquoise bubble.
    translate(0, -sD);
    
    fill(0,255,255,42);
    stroke(0,42);
    strokeWeight(2);
    // Size of ellipse depicts the ratio between right and left steps.
    ellipse(0,0, (lStep/rStep)*10, (lStep/rStep)*10);
    
    // Show n if rSteps is a square number.
    if (Math.sqrt(n) % 2 === 0) {
    fill(255);
    stroke(0);
    strokeWeight(4);
    textSize(24);
      // Spread text by random amounts, so more readable.
    
    translate(0, +sD);
    text(n + '@' + step,0, -Math.random()*(height/2));
        
    }
    
}

function drawLeftBranch(_n){
    var n = _n;
    
        
        strokeWeight(wL);
    let wei = 1;
    wei = map(n, 1, maxN, 24, 1);
     if (superMode === false) wei = 255;
  // I've fiddled with this a little.
        stroke(0,wei*12,0, 22);
    
    let sc = 1;
    if (superMode === false) sc = 3;
    line(0,0,-dLen*sc,-bLen*sc); // Left leaning.
    translate(-dLen*sc,-bLen*sc);  // Translate to end of branch.
    
}

function drawRightBranch(_n){
    var n = _n;
    
        strokeWeight(wR);
    let wei = 1;
    wei = map(n, 1, maxN, 48, 1);
    if (superMode === false) wei = 255;
        stroke(0,0,255, wei);
        
    let sc = 1;
    if (superMode === false) sc = 12;
    line(0,0,dLen*sc,-bLen*sc); // Right leaning.
        translate(dLen*sc,-bLen*sc);  // Translate to end of branch.
    
}

function displaySteps(_steps , _rS, _lS){
    let nOsteps = _steps;
    text(_steps + " steps! (" + _lS + "/" + _rS + ")", width/2, 84)
}
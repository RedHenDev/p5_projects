p5.disableFriendlyErrors = true;    // To help performance.
/*

Use one of the following in HTML in order to improve performance.
The former seems to work best...

<meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width">
    
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
*/


//var goButton;

// The origins of life, so to speak.
// NB we create empty strings here, else
// we might get an 'undefined' problem/error.
var axiom = "";
var theString = "";
var n = 0;  // Iteration number.

// The angle (radians) that we rotate our Turtle.
var angle;
// The length (pixel) that we draw the line with our Turtle.
var lE;
var lEoriginal;
// Our Turtle is called Stewie.
// Alpha used to draw tree.
var Lalpha = 22;
var readyToResetSize = false;   

// Bool; should we print out string with each new iteration?
var displayText = false;
var paraY = 2; // For repositioning printout paragraph.

// This is a simple JS object.
// It contains an 'antecedent' and 'consequent'.
// If we find the 'ant' in the string, then we
// replace with the 'con'.
// NB we use a 'logic' array, and cycle through the
// logic (rules) in order to iterate a new string.
var logic = [];

// Current system = Fractal Plant
//Daniel Shiffman example
 

logic[0] = {
    ant: "F",
    con: "FF+[+F-F-F]-[-F+F+F]"
    //con: "FF"
}
var halfLength = true;

// Lindenmayer systems (parametric L systems).

// Daniel Shiffman example
// axiom : F
// logic [0] : F → FF+[+F-F-F]-[-F+F+F]
// angle : 25
/*
logic[0] = {
    ant: "F",
    con: "FF+[+F-F-F]-[-F+F+F]"
    //con: "FF"
}
var halfLength = true; // lE * 0.5 after each iteration.
*/

// Koch Curve
// axiom : F
// logic [0] : F → F+F−F−F+F
// angle : 90
/*
logic[0] = {
    ant: "F",
    con: "F+F−F−F+F"
    //con: "FF"
}
var halfLength = false; // lE * 0.5 after each iteration.
*/

// Fractal Plant
// axiom  : X
// logic[0,1]  : X → F−[[X]+X]+F[+FX]−X , F → FF
// angle  : 23.9

// Dragon curve!
// variables : X Y
// axiom  : FX
// logic[0,1]  : X → X+YF+, Y → −FX−Y
// angle  : 90°

function setup() {

    canvas = createCanvas(640,640);   
    background(0,111,222);
    
    /*
    goButton = createButton('GO!');
    goButton.size(200,200);
    goButton.position((width/2)-100,(height/2)-100);
    goButton.mouseClicked(fullscreenON);
    // Note this will trigger resizeCanvas() in displaySetup.js.
    */
    
    //iterateB = createButton('iterate now');
    iterateDummyB = createButton("Click image to iterate.");
    createP("6 iterations max.");
    createP("Slider changes transparency.");
    alphaS = createSlider(0,255, 22);
    createP("Slider changes angle.");
    angleS = createSlider(0,360, 25);
    createP("Slider changes branch length.");
    lenS = createSlider(0,100, 50);
    
    alphaS.changed(setAlpha);
    angleS.changed(setAngle);
    lenS.changed(setLen);
    canvas.mouseClicked(iterationManager);
    
    axiom = "F";
    theString = axiom;
    
    //inputNn = createInput("how many iterations?");
    
    textSize(52);
    p = createP("Axiom : " + theString);
    p.position(22,2);
    
    setupNew();
};

function setupNew(){
    
    //iterateB.size(200,200);
    //iterateB.position(width-202,2);
    //iterateB.mouseClicked(iterate);
    
    theString = axiom;
    n = 0;
    
    angle = radians(24);
    lE = 50;
    lEoriginal = lE;
    
    // Here is where we print the string to screen.
    if (displayText){
    p.position(2,paraY);
    paraY += 20;
    }
  
    
    // We call the 'render mechanism' here even though we
    // haven't yet iterated. Therefore, we will only
    // draw the axiom. But it's nice to see this as our
    // origin, our start point.
    Rmechanism();
    createP("n = " + n);
};

function iterationManager(){
    
    //var Nn = inputNn.value();
    
    //if (n > 0) setupNew();
    
  //  for (var i = 0; i < 5; i++){
        if (n < 6)
        iterate();
    else setupNew();
//    }
    
   // Rmechanism();
 
}

function setAlpha(){
    Lalpha = alphaS.value();

        if (readyToResetSize) { if (halfLength)
       { lE *= 2; readyToResetSize = false;} }
    Rmechanism();
};

function setAngle(){
    angle = radians(angleS.value());

        if (readyToResetSize) { if (halfLength)
       { lE *= 2; readyToResetSize = false;}  }
    Rmechanism();
    bli = createP("Angle = " + degrees(angle));
    bli.size(42);
    bli.position(width/2, height/4);
};

function setLen(){
    lE = lenS.value();

        if (readyToResetSize) { 
            if (halfLength)
       { lE *= 2; readyToResetSize = false;} }
    Rmechanism();
};

function togglePrintout(){
    displayText = !displayText;
    
    if (readyToResetSize) { lE *= 2; readyToResetSize = false;}
    
    //if (displayText) printB("Printout ON");
    //else { printB("Printout OFF"); }
    
   // lE = lEoriginal;    // Reset original Turtle line length.
    Rmechanism();
};

function Rmechanism(){
       
    background(0,111,222);
    
    // Translate to bottom middle of screen.
    //resetMatrix();
    translate(width/2, height);     // Middle bottom.
    //translate(width/2, height/2);   // Middle middle.
    
    strokeWeight(4);
    stroke(255,255,255,Lalpha);
    
    // Now to program a Turtle!
    // Loops through string array.
    // Uses each letter as a rendering instruction.
    for (var o = 0; o < theString.length; o++){
        
    var whatChar = theString.charAt(o);
        // The 'consequent' rendering operations.
        if (whatChar === "F"){  
            line(0,0,0,-lE);
            translate(0,-lE);
            //noFill();
            //ellipse(0,0,20,20);
        }
        //if (whatChar === "X"){
        //    angle -= radians(4);
        //}
    
   else if (whatChar === "+"){  
            rotate(angle);
        }
    
    else  if (whatChar === "-"){  
            rotate(-angle);
        }
    
   else if (whatChar === "["){  
            push();
        }
    
    else if (whatChar === "]"){  
            pop();
        }
    }
    
    // Here is where we print the string to screen.
    if (displayText){
    // p.text = "" + theString;
    stroke(0,127);
        p = createP(theString);
        p.position(2,paraY);
        paraY+= 20;
    }
     
};
    
function iterate(){
    
    // NB that string must be created, else we get an 'undefined' error/problem.
    var newString = "";
    
    // Loop through the string (an array).
    for (var i = 0; i < theString.length; i++){
    // Inspect each character and then loop through our array of rules (logic).
        for (var l =0; l < logic.length; l++){
           
            if (theString.charAt(i) === logic[l].ant)
            {newString += logic[l].con; break; } // Only one rule can apply.
            else newString += theString.charAt(i);
        }
    }
    
    // Graduation day.
    theString = newString;
    
    // Render the new string!
    Rmechanism();
     
    // Half length that we Turtle for next time.
   if (halfLength)
       {
    lE *= 0.5;
       }
   // Iterate iteration number.
    n++;
    createP("n = " + n);
    readyToResetSize = true;
    
};

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    
    background(0,111,222);
    Rmechanism();
}

function fullscreenON(){
    // Note this will trigger resizeCanvas() in windowResized.
    fullscreen(canvas);
    goButton.remove();  
    setupNew();
};

function draw() {
   
   // background(0,111,222);
    //renderMechanism();
};
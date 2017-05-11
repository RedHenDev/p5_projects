// TypeCraft 0.1

// Making typing demos beautiful, clean, and simple.

// Longer term aim will be able to type
// animated text, which automatically detects
// punctuation, higlighting it for demonstration
// purposes.

// Distinct, visually interesting, clear.

// ::::::::::::::::::::::::::::::::::::::::::::::::
// Idea log:

// Later -- attractors.
// Library for parsing.
// Creature -- perhaps a Blinkie -- who randomly gets
// involved.
// Load new fonts.
// Minecraft design features?

// ::::::::::::::::::::::::::::::::::::::::::::::::

// For now, a global string variable.
// Later, let's have an object.
var currentString = '';

var BG_COLOUR;

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    BG_COLOUR = color(0,202,101);
}

function draw(){
    background(BG_COLOUR);
    renderText(currentString);
}

function keyTyped(){
    
    currentString += key;
      
}

function keyPressed(){
    if (keyCode == BACKSPACE)
    currentString = currentString.slice(0, -1);
    
}


function renderText(_txt){
    
    fill(0);
    strokeWeight(4);
    stroke(255);
    textSize(64);
    text(_txt, width/5, height/5);
    
}




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

// May 30th.
// Have now got splashes and textbox
// working, but it's hardly ideal.
// It would be cooler to be able to
// position a splash (etc.) precisely
// where a character is being printed.
// So, what we really need is a 
// class of 'char' object that has
// a position.
// These may make deleting a little
// more difficult, but we would then
// be able to do nicer things like
// have text 'fall down' or fade, or
// become attracted to cetain spots.

// ::::::::::::::::::::::::::::::::::::::::::::::::

// For now, a global string variable.
// Later, let's have an object.
var currentString = '';

var BG_COLOUR;          // Background colour.

var deleteTimeBuffer;   // When can we del. again?
var dTimeStamp;         // Delete time-stamp.

var textBox_X;
var textBox_Y;

const fontSize = 64;

var lineAdjust = 0;

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    BG_COLOUR = color(0,202,101);
    
    setDefaults();
}

function draw(){
    background(BG_COLOUR);
    
    updateExplosions();
    
    renderText(currentString);
    
    // Have we pressed backspace?
    deleteCheck();
}

function setDefaults(){
    
    // Time to wait before we can delete char.
    // Measured in milliseconds.
    deleteTimeBuffer = 61;
    
    textSize(64);
    
    // Determine the size of the
    // text box. See last two
    // parameters of the call of
    // text(); function in 
    // RenderText();
    textBox_X = (width-width/10);
    textBox_Y = (height-height/10);
}

function keyTyped(){
    currentString += key;
    
    // Where are we printing char,
    // so that we can place
    // splashes correctly?
//    if (currentString.length > ((width-(width/5))/(fontSize/3)*(lineAdjust+1)))
//        lineAdjust+=fontSize;
    
    //if (key == '.')
//    makeExplosion(width/10+(fontSize/3)*((currentString.length-1)/(lineAdjust+1)),lineAdjust+(height/10+(fontSize/2)), 0);
    
    if (key == '.' ||
        key == ',' ||
        key == '?' ||
        key == '-' ||
        key == '!')
    makeExplosion(
        Math.random()*width,
        Math.random()*height,
        0);
    
}

function deleteCheck(){
    
    if (millis() - dTimeStamp <
        deleteTimeBuffer) return;
    
    dTimeStamp = millis();
    
    if (keyIsDown(BACKSPACE))
    currentString = currentString.slice(0, -1);
}


function renderText(_txt){
    
    fill(200,0,200);
    strokeWeight(4);
    stroke(255);
    
    text(_txt, width/10, height/10, 
        textBox_X, textBox_Y);
    
}




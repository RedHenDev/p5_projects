// Red Hen dev 2017
// 
// This script will take care of window resizing. Also included, but commented out,
// is an example of how to build a button to switch to fullscreen mode.
// NB. fullscreen() cannot be called in setup, but must be included in a user-event
// like a mouse click.
//
// below is an example of how you might create a fullscreen button to begin.
/*

var goButton;

function setup() {

    canvas = createCanvas(windowWidth,windowHeight);   
    background(0,111,222);  // A nice sky blue.
    
    goButton = createButton('GO!');
    goButton.size(200,200);
    goButton.position((width/2)-100,(height/2)-100);
    goButton.mouseClicked(fullscreenON);
};

// Function that you might call with above button.
function fullscreenON(){
    fullscreen(canvas);
    goButton.remove();  
}

*/

// Called automatically, including fullscreen switch.
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}


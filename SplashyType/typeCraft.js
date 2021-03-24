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

const fontSize = 48;

// To keep track of alternating
// white and pink text.
var whiteC = false;

// We could keep these around?
var binnedChars = [];

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    BG_COLOUR = color(0,101,255);
    
    setDefaults();
    
    // Set mouse positions to middle of
    // window for more beautiful attraction
    // behaviour from start.
    mouseX = width/2;
    mouseY = height/2;
    
    RedHen_tChar.newTextField(width/20,height/10, width-(width/5), height-(height/5),fontSize);
}

function draw(){
    background(BG_COLOUR);
    
    rh_textFields[0].blinkCursor();
    
    updateExplosions();
    
    // Draw ghost chars underneath others!
    updateBinned();
    
    rh_textFields[0].printChars();
    rh_textFields[0].updateChars();
    
    // Have we pressed backspace?
    deleteCheck();
}

function updateBinned(){
    for (let i = 0; i < binnedChars.length; i++){
        binnedChars[i].setAttractionPoint(mouseX, mouseY);
        //binnedChars[i].feelAttraction(1);
        binnedChars[i].physicsUpdate();
        binnedChars[i].print();
    }
}

function setDefaults(){
    
    // Time to wait before we can delete char.
    // Measured in milliseconds.
    deleteTimeBuffer = 30;

}

function keyTyped(){
    //currentString += key;
    
    // We need to ignore when
    // user *types* RETURN.
    if (keyCode == 13){ 
        
        if (whiteC) {
            rh_textFields[0].fontFill =
                color(255);
            whiteC = false;
        }
        else {
            rh_textFields[0].fontFill =
                color(200);
            whiteC = true;
        }
    
        rh_textFields[0]. newLine (); 
                       
        return;
                      }
    // Alternate between white and
    // pink fontFill every time
    // space typed.
//    if (key === ' ' || key === '-'){
//        if (whiteC) {
//            rh_textFields[0].fontFill =
//                color(255);
//            whiteC = false;
//        }
//        else {
//            rh_textFields[0].fontFill =
//                color(200);
//            whiteC = true;
//        }
//    }

   if ( key === '.' ||
        key === ',' ||
        key === '?' ||
        key === '-' ||
        key === '!' ||
        key === ":" ||
        key === ";" ||
        key === "'" ||
        key === "(" ||
        key === ")" ||
        key === '"'){
    makeExplosion(
        rh_textFields[0].cursorPos.x,
        rh_textFields[0].cursorPos.y,
        0, 20, color(255,0,255,255));
    rh_textFields[0].changeEmoji(); 
       rh_textFields[0].typeSomething(key);
       rh_textFields[0].tChars[rh_textFields[0].tChars.length-1].fill = color(255,0,255);
       rh_textFields[0].tChars[rh_textFields[0].tChars.length-1].stroke = color(255,0,255);
       rh_textFields[0].tChars[rh_textFields[0].tChars.length-1].strokeWeight = 4;
       
       // Turn on attraction behaviour!
       //rh_textFields[0].tChars[rh_textFields[0].tChars.length-1].beingAttracted = true;
       
   }
    else {
        makeExplosion(
        rh_textFields[0].cursorPos.x,
        rh_textFields[0].cursorPos.y,
        0, 2, color(0,200,255));
        rh_textFields[0].typeSomething(key);
        
    }
       
    // If an 'even character', then let's switch
    // on attracting behaviour.
//    if (rh_textFields[0]. 
//        tChars.length % 2 === 0){
//        rh_textFields[0].tChars[rh_textFields[0].tChars.length-1].beingAttracted = true;
//        rh_textFields[0].tChars[rh_textFields[0].tChars.length-1].setAttractionPoint(mouseX, mouseY);
    //}
}


function deleteCheck(){
    
    // Enough time passed to delete another char?
    if (millis() - dTimeStamp <
        deleteTimeBuffer) return;
    
    if (keyIsDown(BACKSPACE) && rh_textFields[0].tChars.length > 0){
        //currentString = currentString.slice(0, -1);
        dTimeStamp = millis();
      
        
      // Add character to binned chars!
        binnedChars.push(rh_textFields[0].tChars[rh_textFields[0].tChars.length-1]);
        // Switch attraction behaviour on!
        binnedChars[binnedChars.length-1].beingAttracted = true;
        // Ghostify colour!
        binnedChars[binnedChars.length-1].fill = color(255,182);
        binnedChars[binnedChars.length-1].stroke = color(255,42);
        binnedChars[binnedChars.length-1].strokeWeight = 1;
        // Shrink!
        binnedChars[binnedChars.length-1].fontSize = 20;
        
        
        // Delete the actual tChar!
        rh_textFields[0]. deleteSomething ();
        
    }
    
    
}





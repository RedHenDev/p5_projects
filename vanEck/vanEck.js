

// Our sequence array.
let seq;

// Current screen pos to display current number.
let spacing = 0;
let rowSpacing = 0;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0);
    
    resetSequence();
  
    stroke(200,0,200);
    fill(200,0,200);
    text ("move mouse or tap to iterate...", width/2,22);
}

function mouseMoved(){
    background(0);
    incrementSequence();
    displaySequence();
}

function mousePressed(){
    background(0);
    incrementSequence();
    displaySequence();
}

// Empty the array.
function resetSequence(){
    seq = [];
}

function displaySequence(){
    
    // Display current index.
    stroke(200,0,200);
    fill(200,0,200);
    text ("n = " + seq.length, 22, 22);
    
    noStroke();
    
    for (let i = 0; i < seq.length; i++){
        // Green zeroes.
        if (seq[i] === 0) fill(0,222,0);
        else fill(255);
      text(seq[i], calculateSpacing(i),
          rowSpacing);  
    }  
}

function calculateSpacing(i){
    // Let's not slip to index -1.
    // If i = 0, then we're at start position.
    if (i === 0) { i = 1; spacing = 33; rowSpacing = 42;}
    
    // Calc X.
    spacing += 7 * (seq[i-1].toString().length) + 2;
    // Reached end of line? 
    // Calc Y.
    if (spacing > width - 42){ spacing = 42; 
                              rowSpacing += 12;}
    return spacing;
}

function incrementSequence(){
    // Check if we have to instigate sequence.
    // If yes, then set first index to zero.
    if (seq.length === 0){
        seq.push(0);
        return;
    }
    
    // Cycle backwards through array:
    // if we find match to current number,
    // then push count of how many steps it
    // took to find first match (keep track of
    // count as we cycle backwards).
    // Else, if no match, then push zero.
    for (let i = seq.length-2; i >= 0; i--){
        // Does current number = previous in count?
        if (seq[seq.length-1] === seq[i]){
            seq.push(seq.length-1 - i);
            return;
        }   
    }
    // We must have checked all numbers.
    // So, new current number will be zero.
    seq.push(0);
}




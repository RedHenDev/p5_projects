// The idea is that the hailstone will be used with the
// Collatz algorithm, literally representing the 'hailstone'
// rise and fall of the given number. When the hailstone 
// hits the ground, then this will indicate that the number has
// reached one.

// I think it will be most visually appealing to have a number
// of hailstones 'launch' together.

// Also, will it be a good idea to have the hailstones grow?
// Presumably, the height of the stone will indicate its value,
// so size of hailstone might best relate to time 'afloat'.
// Or, with each new step, hailstone can grow? This would look nice
// since after several stones have 'landed', their sizes would 
// present a measure of the steps taken.

// We could brush the stones right and left, but this might
// disrupt our visualisation of the numberline.

// Ah -- if 'right-branching' (3n + 1) then the stone will receive
// an 'upthrust' force. Else (left branching) the stone will be left
// to fall until hitting new target value for a 'left-branch' (n/2).
// At this point, the hailstone has to re-evaluate according to the
// Collatz algorithm.

// Maybe at this point, the stone ought to grow?

// Now to add a turtle! My first turtle! Very exciting :D
// OK, design: turtles start at left of screen, centre-Y, and make their
// way right, steering left and right as per the conjecture.
// The collatzObj's iterate() function should cater for this easily enough,
// since it simply returns true or false, that is, returning whether n
// branches left or right respectively.


var hStone = [];
var cObj = [];

var numStones;

var displayN = true;    // Display mode. False allows overlays.
var displayRange;

// Could we store all we need to know about the turtle in a 3D array?
// I.e. x = x position; y = y position; z = rotation?
// Let's try it!
var nurtle;
var nurtleN;
var nurtleC;

function setup() {
  
    createCanvas(windowWidth,windowHeight);
    background(0,122,222);
    
    numStones = 50;
    displayRange = width;
    
    for (let i = 0; i < numStones; i++){
        hStone.push(new HailStone(22));
        // Now create a Collatze Object to correspond to each stone.
        cObj.push(new CollatzObj(i+1));
        
        // Line up x positions of stones, at regular intervals.
        hStone[i].pos.x = i * (displayRange/numStones) + ((width-displayRange)/2);
        //Start on ground.
        hStone[i].pos.y = height - 100;
        //if (hStone[i].pos.y < 0) hStone[i].pos.y += 320;
        hStone[i].rv = (Math.random() * 44) - 22;   // Initial spin.
    }
    
    strokeWeight(1);
    fill(255,102);
    stroke(0,102);
    textSize(12);
    
    mouseX = width/2;
    
    
    // Setting up our turtle...
    nurtle = createVector(0, height*0.75, 0);
    // NB. 0 rotation is meant to be facing right.
    // Now, we need a collatzObj used by the turtle.
    nurtleN = 1;
    nurtleC = new CollatzObj(nurtleN);
    
}

function renderTurtle(){
    push();
    
    rectMode(CENTER);               // Draw relative to centre of rectangle.
    
    let nalpha = 255;
    if (!displayN) nalpha = 32; 
    
    strokeWeight(4);
    stroke(255,nalpha);
    fill(255,0,255,nalpha);                // Nurtles are pink. Just so you know.
    
    translate (nurtle.x, nurtle.y);
    rotate(radians(nurtle.z));            
    
    
    
    if (displayN){
    
    rect(0,0,64,42);
    
    textSize(14);
    strokeWeight(1);
    stroke(0);
    fill(0);               
    text("n = " + nurtleC.root, -18, 0);
    fill(255);               
    text(nurtleC.totalSteps.length-1, -4, 16);
    }else
        {
            strokeWeight(1);
            stroke(255,0,255,nalpha);
            fill(255,nalpha);
            rect(0,0,66,2);  
        }
    
    pop();
}

function iterateTurtle(){
    // x value is proportional to step number.
    // Rotation, similarly, changes with branching direction.
    if (nurtleN > 1){
    let whichWay = nurtleC.iterate();
    if (whichWay == true) nurtle.z -= 10;
    else if (whichWay == false) nurtle.z += 10;
    }
    
    // 8 is the length travelled (acting like a radius).
    nurtle.x += 64 * Math.cos(radians(nurtle.z)); 
    nurtle.y += 64 * Math.sin(radians(nurtle.z));
    
    
    // Instead of screen-wrapping, now the turtle will simply reset.
//    if (nurtle.x > width) nurtle.x = 0;         // Screen wrap x.
//    if (nurtle.x < 0) nurtle.x = width;
//    if (nurtle.y < 0) nurtle.y = height-122;    // Screen wrap y.
//    if (nurtle.y > height-122) nurtle.y = 0; 
    if (nurtle.x > width) nurtleC.value = 1;         // Screen wrap x.
    if (nurtle.x < 0) nurtleC.value = 1;
    if (nurtle.y < 0) nurtleC.value = 1;    // Screen wrap y.
    if (nurtle.y > height-122) nurtleC.value = 1; 
    
    // Start again, now with n+1.
    if (nurtleC.value <= 1) {
      renderTurtle(); // Render one last time so as to display correct finish point.  
      nurtleN = nurtleN + 1;
        nurtleC = new CollatzObj(nurtleN);
        // Also reset position and rotation of turtle.
        // Interesting, though, not to do this, in order to get an infinite trail.
        nurtle.x = 0;
        nurtle.y = height*0.75;
        nurtle.z = 0;
    }

    
}

function mousePressed(){

    displayN = !displayN;
}




function draw() {
    
    if (displayN)
    background(0,122,222);
    
    //hStone[9].pos.y = height/2;
    for (let i = 0; i < hStone.length; i++){
        
        // Only need to Collatz stone if it has descended through target height
        // after left-branching, or if beginning to fall?
        if (cObj[i] !== null &&
            cObj[i].value > 1 &&
           (cObj[i].value > hStone[i].collatzHeight || 
            cObj[i].value < hStone[i].collatzHeight && hStone[i].vel.y > 1))
        {
            // Will number left branch when Collatzed?
            let leftBranch = cObj[i].iterate();
            if (leftBranch === false){ 
                //hStone[i].vel.y = 0;
                hStone[i].acc.y -= 1;
                hStone[i].rv = (Math.random() * 22) - 11;   // Add spin.
            }
            
            
        }
        
        // If stone hits display ceiling...
            if (hStone[i].pos.y <= 0){
                hStone[i].rad *= 1.4;                     // Grow size.
              //  hStone[i].rv = (Math.random() * 44) - 22;   // Add spin.
                hStone[i].pos.y = 1;                        // Move from top.
                hStone[i].vel.y = 0;                        // Kill upthrust.
            }
            
        
      
        
        // Display root n value above each stone.
        if (displayN){
            
            hStone[i].gravity();
            hStone[i].update();
            hStone[i].render();
            
            fill(0);
            noStroke();
            textSize(12);
            text(cObj[i].root, hStone[i].pos.x, hStone[i].pos.y-hStone[i].rad);
            fill(255);
            text(cObj[i].value, hStone[i].pos.x, hStone[i].pos.y-hStone[i].rad+13); 
        }
        
        
        // Display specified stone values.
        // First, draw blue box over text if in overlay display mode,
        // to prevent text painting over itself.
        if (!displayN)
        {
            fill(0,122,222);
            noStroke();
            rectMode(CENTER);
            rect(width/2,height-30,width,80);
        }
       let whichN = Math.round(numStones/displayRange * mouseX);
    if (whichN < 1) whichN = 0;
       if (whichN > cObj.length-1) whichN = numStones-1; 
      fill(255);
    strokeWeight(2);
        stroke(0);
        textSize(32);
    text((cObj[whichN].totalSteps.length-1) + " steps, for n = " + 
        cObj[whichN].root, width/2-width/5, height-42);
     
        fill(255,0,255);
        text("Turtle's n = " + 
        nurtleC.root, 4, height-42);
        
    }
    
    // Instructions display...
    fill(255,0,255);
    noStroke();
    textSize(22);
    text("Click/Tap to toggle display mode", 12, 64);
    fill(0);
    stroke(255);
    text("Collatz conjecture: turtle & hailstones", 12, 104);
    
    
    // Iterate turtle every nth frame (every 1 second if 60, since 60fps).
    // Or, quam celerime if in overlay display mode.
    if (frameCount % 30 === 0 || !displayN){
    iterateTurtle();
        if (displayN===false) renderTurtle();
    }
    if (displayN===true) renderTurtle();
    
}
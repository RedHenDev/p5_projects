
p5.disableFriendlyErrors = true;    // To help performance.
/*

Use one of the following in HTML in order to improve performance.

<meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width">
    VS  
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
*/

var redHen; // Loading image.
var redH;   // Image element itself.

var particles = []; // Particles.
var num_particles = 222;

var max_particles = 444;

var ball;

var clouds = [];
var num_clouds = 3;

var scaleO; // For scaling when on mobile.
var ballHaloSize;
var ballSize;

var sizeOfBricks;

var successTime;    // How long to rescue egg?
var gameStartTime;  // When did we begin current game?
var timeS;          // Used for placing bricks.
var timeStamp = 0;  // Used for deviceShaken().

var replay; // Replay button.

function preload(){
    
    redHen = loadImage("RedHenIcon Alpha 512 512.png");
    //redH = image(redHen, width-90,9,84,84);
}

function setup() {

    //canvas = createCanvas(800,600);
    canvas = createCanvas(windowWidth,windowHeight-32);   // -32 to appear on screen.
    scaleO = windowWidth/1024;
    scaleO = scaleO.toFixed(2);
    ballHaloSize = 84*scaleO;
    ballSize = 84*scaleO;
    sizeOfBricks = 24*scaleO;
    
    //setMoveThreshold(24);    // Touch resolution.
    
    //console.log("scale =" + scaleO);
    
    // Performance hack for mobile.
    // Grab HTML element with the 'elt' property.
   //const canvasElt = createCanvas(640,480).elt;
    // Second, stretch over whole window/screen [I don't know which yet.]
    //canvasElt.style.width   = '100%';
    //canvasElt.style.height  = '100%';
    
    
    // Colour of ball, and given to pooled particles.
    var colourHim = color(0, 255, 0, 200);
    
    // Initialize particles for object pooling.
    // All off-screen (-height).
    // NB if we tried to position off-screen
    // along x-axis, they would be repositioned by
    // physics engine.
    for (var i = 0; i < num_particles; i++){
        particles.push(new particle(0, -height*1000, 24*sizeOfBricks, 24*sizeOfBricks, colourHim));
        particles[i].frozen = true; // No physics operations.
        particles[i].solid = false;
        // ***** TESTING.
        //particles[i].flickable = false; 
    }
    
    // Create our ball :)
    ball = new particle (random(80, width-80), height/1.5, ballSize, ballSize, colourHim);
    ball.frozen = false;
    //ball.flickable = false; // Perhaps turn on after first ground bounce.
    
    // Create our egg :D
    egg = new particle(random(84,width-84),84, 42*scaleO, 54*scaleO, color(255));
    egg.frozen = true;
    egg.solid = false;
    
    // Initialize clouds.
    for(var j = 0; j < num_clouds; j++){
        clouds[j] = new goobaCloud();
    }
 
    replay = createButton('REPLAY :)');
    replay.position((width/2)-100, windowHeight-52);
    //replay.align(CENTER, BOTTOM);
    replay.size(200,50);
    //replay.backgroundColor(0,222,0,222);
    replay.mouseClicked(resetGame);
    replay.style('background-color', colourHim);
    //replay.text.size(2);
    
    gameStartTime = millis();   // Take current start time!
    //background(0,111,222);
    
}

function resetGame(){

    
    
    resetParticles();
    
    // Oh, that egg :)
    egg.pos = createVector(random(84,width-84),84);
    egg.frozen = true;
    egg.solid = false;
    
    // Reposition those clouds...
    for(var j = 0; j < num_clouds; j++){
        clouds[j].pos.x = random(84,width-84);
    }
    
    gameStartTime = millis();   // Take current start time!
 
};


function windowResized() {
    resizeCanvas(windowWidth, windowHeight-32);
    scaleO = windowWidth/1024;
    scaleO = scaleO.toFixed(2);
    ballHaloSize = 84*scaleO;
    ballSize = 84*scaleO;
    sizeOfBricks = 24*scaleO;
    replay.position((width/2)-100, windowHeight-52);
}


function deviceShaken(){
    // If 0.5 seconds passed...
    if (millis() - timeStamp > 500){
        timeStamp = millis();
    for (var i = particles.length-1; i >= 0; i--)
        {
            if (particles[i].solid === true)
                {
                    particles[i].frozen = false;
                    particles[i].solid = false;
                }
        }
    }
}

function mouseClicked(){
    // Make sure we place a brick with a touch.
    touchMoved();
    // Make sure no invisible brick is placed...
    mouseX = -1;
    mouseY = -1;
    return false;
}


function touchMoved(){
    
    if (millis() - timeS < 1 ) return false;
    timeS = millis();
    // Set colour and size beforehand, since we don't
    // want to do this in the loop (performance).
    //var c = color(random(222,255), 0, 0);   // Default alpha = 111.
    //var sizeO = random(24,28);
    var c = color(0,255,0,123);
    
    //for (var i = 0; i < particles.length; i++)
    for (var i = particles.length-1; i >= 0; i--)
        {
            if(particles[i].solid === false)
            {
                
                particles[i].pos.x = mouseX;
                particles[i].pos.y = mouseY;
                particles[i].mySize.x = sizeOfBricks;
                particles[i].mySize.y = sizeOfBricks;
                particles[i].colour = c;
                particles[i].frozen = true;
                particles[i].solid = true;
                
                
                // Expermental below here :)
                // Can we have each ledge piece only last 10secs?
                particles[i].visible = true;
                particles[i].mortal = true;
                particles[i].birthTime = millis();
                particles[i].longevity = 5000;
                particles[i].afterLife = "sd"; // Turn into a snowdrop :)
                //console.log("Grabbed an old one!");
                //particles.reverse();
                return false;
            }
            
        }
    
    console.log("Particles????");        
    // No particles available? Make a new one!
            if (particles.length < max_particles){
            var c = color(255,0,0,123);
            particles.push(new particle(mouseX,mouseY,sizeOfBricks,sizeOfBricks, c));
            particles[particles.length-1].frozen = true;
            particles[particles.length-1].solid = true;
                
                // Expermental below here :)
                // Can we have each ledge piece only last 10secs?
                particles[particles.length-1].visible = true;
                particles[particles.length-1].mortal = true;
                particles[particles.length-1].birthTime = millis();
                particles[particles.length-1].longevity = 5000;
                particles[particles.length-1].afterLife = "sd"; // Turn into a snowdrop :)
                //particles.reverse();
            }
        
    
    return false;   // To disable accidental dragging of window etc.
}

function resetParticles(){
    for (var i = 0; i < particles.length; i++){
        particles[i].solid = false;
        particles[i].frozen = true;
        particles[i].visible = false;
    }
}

function drawClouds(){
    for(var j = 0; j < num_clouds; j++){
        clouds[j].drift();
        clouds[j].render();
    }
}

function drawParticles(){
    for (var i = 0; i < particles.length; i++){
        particles[i].update();
        particles[i].render();
    }
}

function drawEgg(){
    egg.render("egg");
}

function drawBall(){
    // Can only flick ball if below half-height.
    if (mouseY > height/2) ball.flickable = true;   
    else ball.flickable = false;
    ball.update(); 
    
    var gotHitBool = false;
    // A better system might check for 'active' particles.
    for (var i = 0; i < particles.length; i++){
        if (particles[i].solid && particles[i].frozen) 
      gotHitBool = ball.checkCollision(particles[i]);
        // NB we only allow for one collision per frame,
        // to help with mobile performance.
        if (gotHitBool) break;
     }
    //ball.render();
    // New ball...
    redH = image(redHen, ball.pos.x-(ballSize/2), ball.pos.y-(ballSize/2),ballSize,ballSize);
    noFill();
    strokeWeight(8*scaleO);
    stroke(255,255,255,222);
    ellipse(ball.pos.x,ball.pos.y,ballHaloSize,ballHaloSize);
}

function draw() {
   
    background(0,111,222);
    
    egg.update();
    drawEgg();
    drawClouds();
    drawParticles();    
    drawBall();
    
    var fps = frameRate();
    strokeWeight(1);
    stroke(0,0,0);
    textSize(22);
    fill(0);
    text("FSP: " + fps.toFixed(0), 24, height-32); // No decimal places.
    
    strokeWeight(4);
    stroke(255);
    textSize(42*scaleO);
    fill(0);
    if (egg.frozen) text("Rescue your EGG!",64,84);
    else text("WELL DONE! Success in " + successTime + " seconds!",64,84);
    
    // Check egg rescue...
    if (egg.frozen)
        {
    var nearEgg = p5.Vector.sub(ball.pos,egg.pos);
    if (p5.Vector.mag(nearEgg) < 50){  
        resetParticles();
        egg.frozen = false;
    successTime = (millis() - gameStartTime)/1000;
    successTime = successTime.toFixed(1);}
        }
   
 
}
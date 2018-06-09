p5.disableFriendlyErrors = true;
// For deltaTime calculation.
let canvas;
// Loading mode = -1.
// Main game = 1.
// Editor mode = 0.
// Sector mode = 2.
let gameMode = -1;
// Cybernetic vehicle array.
// Used for player ship and
// space traffic.
let cybers = [];

let musicON = true;

//function preload(){
//        if (musicON)
//     setupMusic();    
//}

function setup(){
    
    canvas = createCanvas(windowWidth, windowHeight);
    
    // Initialize layers (to be rendered as images).
    lettherebeStars(0); // First star layer.
    lettherebeStars(2); // Second star layer.
    
    lettherebePlanets(0); // Planet layer.
    renderShipLayer(0);   // Ship layer.
    
    mouseX = width/2;
    mouseY = height/2;
    
    setupPlayer();
    setupTraffic();
    setupNavig();
    setupTwinkles();
    if (musicON)
    setupMusic();
    
    // Draw rectangles from centre.
    rectMode(CENTER);
     
}

function setupPlayer(){
    let c = new Cyber(0,0,0);
        cybers.push(c);
    // 0 = default 'Tetrix' design.
    // 1 = random cube design.
    cybers[0].build(1); 
    
    // An event listener.
    // Switched to true at new
    // sector transition, then
    // false when new sector check.
    sectorTransition = false;
}

// Toggle gameMode for testing!
function keyPressed(){
    // Use space_bar.
    if (keyCode!==32)return;
    
    gameMode++;
    if (gameMode>2)gameMode=0;
    
//    if (gameMode===0)
//        gameMode=1;
//    else gameMode = 0;
}

let deltaTime = 0;
function draw(){
    
    // What's our deltaTime?
    // For consistent speed across devices.
    deltaTime = 1/(window.performance.now() - canvas._pInst._lastFrameTime);
    
    // Don't try to play music
    // if music mode off or
    // still loading assets.
    if (musicON && 
        gameMode !== -1)
    musicSystem();
    
    // Loading mode.
    if (gameMode===-1){
       loadMe();
    }
    
    // Edit mode.
    if (gameMode===0){
       
        drawGrid();
        
    }
    else if (gameMode===2){
        spaceMap();
    }
    else if (gameMode===1){
    
    // Greeeny space.
    //background(0,29,0);
    // Alpha trail.
    //background(0,9,0,64);
    background(0,9,0);
    
    // Player controls 0.
    cybers[0].input();    
        
    // Twinkle effect in background.
    twinkles();
    
    // Always moving.
    //shipForward(1);
    
    // Bottom starry layer.
    lettherebeStars(3);
    
    // Planet layer (WEBGL).
    lettherebePlanets(1);
    
    // Traffic and player ship layer.
    renderShipLayer(1);
    
    spaceTraffic();
   
    // Render to main canvas as image.
    image(sop,0,0);
    
    // Top starry layer.
    lettherebeStars(1);
        
    }   // End of gameMode1 (main game).
}
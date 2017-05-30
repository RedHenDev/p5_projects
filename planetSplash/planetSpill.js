// Let's code my Mum's favourite game :)

var testShip;

var testShip;

var testTowers = [];

var pills = [];

var splashes = [];

// Sound object (p5 oscillator).
var vox;

// Key game management variables.
var currentLevel = 1;
var score = 0;
// Prepare mode (false) or game mode (true)?
// May have to extend/develop this is wanting
// other messages at certain levels, and for
// final completion of game (level 12?)
var gameMode = false;
// Num of modules a pill might destroy.
var multiSplash = 0;
// Num of pills allowed to be dropped at one time.
var maxPills;
// Messages.
var theMessage1 = "Oh no! 12 Blinkies are trapped!";
var theMessage2 = "Tap or press any key to drop a pellet on the towers. Clear the towers to land and save each Blinkie!";

// Blinkie to be rescued.
var blinkie;
var gravityForBlinkie;
// Blinkies saved and 'collected' at top of screen.
var rescued = [];

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    
    background(0,101,255);
    
    testShip = new Ship();
    
    vox = setupOscillator();
    
    setupLevel(currentLevel);
    
    gravityForBlinkie = createVector(0,0.6);
   
}

function setupBlinkie(){
    // Place Blinkie in bottom right corner.
    // Hope they get rescued!
    blinkie = new antBot(false, width-42, height-64);
}

function setupLevel(_whatLevel, _rescueMe){
    
    // Reset ship.
    testShip.successful = false;
    testShip.pos.x = 42;
    testShip.pos.y = 42;
    testShip.sinY = 42;
    testShip.speedX = 4;
    
    if (currentLevel===13){
            theMessage1 = "Score = " + score;
            theMessage2 = "THANK YOU! YOU ARE AMAZING!                                ALL 12 BLINKIES ARE NOW SAFE!";
            gameMode=false;
        }else{
    
    // Copy blinkie into rescued array :)
    // Then, shrink and place rescued blinkie up top.
    if (_whatLevel > 1 && _rescueMe === true){
        rescued.push(blinkie);
        rescued[rescued.length-1].scale = 1.5;
        rescued[rescued.length-1].pos.x = 
            260+((_whatLevel-1)*36);
        rescued[rescued.length-1].pos.y = 64;
        // Off screen? Then pick random x and y.
        if (rescued[rescued.length-1].pos.x > width-36){
            rescued[rescued.length-1].pos.x = Math.random()*(width-37);
            rescued[rescued.length-1].pos.y = Math.random()*height;
        
        }
        
    }
    // Get a 'new' Blinkie.
    setupBlinkie();
    blinkie.scale = 3;
    
    // Tower attributes (affected by level).
    let numberOfTowers = 4 + _whatLevel*2;
    let towerWidth = 44 - _whatLevel*2;
    // Max number of modules that a pill might destroy.
    multiSplash = 5 - _whatLevel;
    if (multiSplash <= 0) multiSplash = 0;
    
    // How many pills can we drop?
    if (_whatLevel < 5) maxPills = 3;
    else if (_whatLevel < 10) maxPills = 2;
    else maxPills = 1;
    
    // Clear game arrays.
    // Leave splashes, since any overlap may look cool,
    // as well as splashes having no game interaction.
    testTowers = [];
    pills = [];
    
    for (var i = 0; i < numberOfTowers; i++){
        // Pass i into tower constructor so that x-pos
        // can be calculated there.
        testTowers.push(new Tower(i, numberOfTowers, towerWidth));
        // Pass in zero here to request random height.
        testTowers[i].generate(0);
    }
        } // End of GAME COMPLETION.
    
}


function draw(){
    // checkInput(); // Legacy.
    
    background(0,101,255, 88);
    
    if (gameMode===true)
    displayScores();
    
    // Ship will only move if in gameMode.
    // Ship will hover and message displayed in 'prepare mode'.
    updateShip();
    
    // Render towers.
    // Also check if ship has collided with a tower.
    updateTowers();
    
    // This also checks pill collisions.
    updatePills();
          
    updateExplosions();
    
    updateBlinkies();
    
    
    
    if (gameMode===false)
    displayMessage(theMessage1, theMessage2);
}

function updateBlinkies(){
    blinkie.render();
    blinkie.update();
    let grounded = blinkie.checkGround(height-42);
    if (!grounded) blinkie.acc.add(gravityForBlinkie);
    else if (Math.random()*100>99) blinkie.acc.add(0,-10*blinkie.scale);
    
    for (let i = 0; i < rescued.length; i++){
    rescued[i].render();
    rescued[i].update();
    let grounded = rescued[i].checkGround(64);
    if (!grounded) rescued[i].acc.add(gravityForBlinkie);
    else if (Math.random()*100>99) rescued[i].acc.add(0,-10*rescued[i].scale);
    }
}

function updateShip(){
    testShip.render();
    // Parameter passed in is distance ship will move down
    // if reaching end of screen.
    if (gameMode === true)
    testShip.move(testTowers[0].modMaxRad*2);
    // Flight sound of ship, matched to height.
    changeFreq(vox, testShip.pos.y);
}

function displayScores(){
    stroke(0);
    strokeWeight(4);
    fill(0,map(testShip.pos.x,0,width,101,255),0);
    textSize(42);
    text("Level  " + (currentLevel), 32,64);
    fill(255);
    text("Score: " + score, 32,104);
}

function displayMessage(_msg1, _msg2){
    
    
//    let theMessage1 = "Oh no! 12 Blinkies are trapped!";
//    
//    let theMessage2 = "Tap or press any key to drop a pellet on the towers. Clear the towers to land and save each Blinkie!";
    
    rectMode(CORNER);
    
    
    // Background panel.
    strokeWeight(10);
    stroke(255);
    fill(0,180);
    rect(64,64,width/2+10,height/1.4);
    
    // Message 1.
    if (_msg1 != null){
    stroke(255);
    strokeWeight(5);
    fill(255,0,0);
    textSize(42);
    // NB fourth parameter should give textbox width.
    text(_msg1, 74,74, width/2, height);
    }
        
    // Message 2.
    if (_msg2 != null){
    strokeWeight(5);
    stroke(255);
    fill(250,0,250);
    textSize(42);
    text(_msg2, 74,140, width/2, height);
    }
    
    rectMode(CENTER);
}

// Checks if any towers still intact.
function haveIwon(){
    
    for (let i = 0; i < testTowers.length; i++){
        if (testTowers[i].modules.length > 0)
            return false;
    }
    
    // Must have won!
    // The higher the ship, the bigger the score!
    //score += Math.floor(10 * (height - testShip.pos.y));
    score += 100 * currentLevel;
    return true;
}

function updateExplosions(){
 
    for (let i = 0; i < splashes.length; i++){
        // Checks whether time to detonate, and
        // handles physics of particles.
        splashes[i].update();
    }
 
}

function updatePills(){
 // Go through pills array in reverse, since we might
    // splice (delete) pills during this loop.
    for (var i = pills.length-1; i >= 0; i--){
        pills[i].render();
        pills[i].move();
        // Check whether highest module of each tower is hit by pill.
        for (var j = 0; j < testTowers.length; j++){
            if (testTowers[j].modules.length > 0 && checkCollision(testTowers[j].modules[testTowers[j].modules.length-1], pills[i]) === true) {
                // Pill no longer intact.
                // Highest module of this tower spliced from array.
                pills[i].intact = false;
                
                // We could dissolve more than one module here.
                // Let's try that:
                // Dissolve random modules...or until no modules left.
                // 'MultiSplash' is max number of random modules to
                // be destroyed.
                let rM = Math.round(Math.random()*multiSplash+1) + 1;
                for (var k = 1; k < rM; k++){
                    // Only continues destroying if modules remain!
                    if (testTowers[j].modules.length > 0)
                    {
                        // Make explosion and destroy module.
                        // k*444 is detonation time.
                        makeExplosion(testTowers[j].modules[testTowers[j].modules.length-1].pos, k*100); testTowers[j].modules.splice(testTowers[j].modules.length-1, 1);
                      }
                    else break;
                }
                
                break; // So that we don't accidentally dissolve more than one module.
                // Also maybe ask for a splash here.
            }
        } 
            // Check to see if we need to remove pill from array.
           if (pills[i].intact===false) pills.splice(i, 1);
    }
}

function updateTowers(){
     for (var i = 0; i < testTowers.length; i++){
        testTowers[i].render();
        // Check whether ship has collided with
        // the top-most module of any tower.
        if (testTowers[i].modules.length-1 > 0 &&  checkCollision(testTowers[i].modules[testTowers[i].modules.length-1], testShip)===true){
            // testShip.sinY = 42; // For now, return ship to top.
            makeExplosion(testShip.pos, 0);
            // Score halved.
            score = Math.floor(score/2);
            // False = do not rescue blinkie :(
            setupLevel(currentLevel, false);
        }    
    }
}

// Did these two objects collide?
function checkCollision(_ob1, _ob2){
    
    // Check for null objects.
    // You know, in case my code is...less than perfect elsewhere.
    //if (_ob1 == null || _ob2 == null) return;
    
    if (p5.Vector.dist(_ob1.pos, _ob2.pos) < 
        (_ob1.radius + _ob2.radius)){
        
        return true;
        }
    else return false;
}

// Want an explosion splash? Just tell me where and when :)
function makeExplosion(_posVector, _detTime){
   splashes.push(new Explosion( _posVector.x,
                                _posVector.y,
                                _detTime));
    score += 10;
}

// Input. 
// Legacy.
function checkInput(){
    // Only one pill drop at a time.
    if (pills.length > 0) return;
    //if (keyIsDown(DOWN_ARROW)) dropPill();
}

// Input -- both for taps/mouse and key presses.
// Also, any input will switch off message and take
// us into game mode. Perhaps we should build in a 
// system of needing two taps/presses, just in case
// of accidental press when player really wanted to 
// read the message.
function keyPressed(){
    if (gameMode===true)
    dropPill();
    else if (currentLevel!=13) gameMode = true;
}
function touchEnded(){
    if (gameMode===true)
    dropPill();
    else if (currentLevel!=13) gameMode = true;
}

function dropPill(){
    // Only drop three pills at a time.
    if (pills.length > maxPills - 1) return;
    pills.push(new Pill(testShip.pos.x, testShip.pos.y));
}

// Objects.

// Explosion object.
// The explosion object uses 'gunpowder particle' objects to
// populate its explosive bloom.
// Integral to this object's deployment is a detonation time.
function Explosion(_x, _y, _detonationTime){
    
    // What time was I created?
    this.birthTime = millis();
    
    // Calling function decides my detonation time.
    this.detonationTime = _detonationTime;
    
    // Where do you want the explosion's origin?
    this.pos = createVector(_x, _y);
    
    // Array of particles that constitute the explosion.
    this.gunpowder = [];
    
}

// Decide whether to explode: this function
// handles detonation timing and particle updates.
Explosion.prototype.update = function(){
    if (this.exploded) { 
        for (var i = this.gunpowder.length-1; i > -1; i--){
        this.gunpowder[i].render();
        this.gunpowder[i].update();
        // Splice gunpowder object if flagged as no longer intact.
        if (this.gunpowder[i].intact===false) this.gunpowder.splice(i,1);
        }
        return;
    }
    
    // Check whether time to explode!
    if (millis()-this.birthTime > this.detonationTime)
        {
            this.makeExplosion();
        }
    
}

Explosion.prototype.makeExplosion = function(){
    this.exploded = true;
    
     for (let i = 0; i < 3; i++){
        this.gunpowder.push(new Gp(this.pos.x, this.pos.y, 20));
    }
    
    for (let i = 0; i < 3; i++){
        this.gunpowder.push(new Gp(this.pos.x, this.pos.y, 8));
    }
}

// Gunpowder particle object.
// The idea is that we could request, say, a hundred of these
// when a module is destroyed, and each particle will move
// according to Euler integration. I think it would look best
// if the particles were only 1 pixel in size each.
function Gp(_x, _y, _r){
    
    // Still alive and onscreen?
    this.intact = true;
    
    this.pos = createVector(_x, _y);
    // Initialize with random velocity.
    this.vel = createVector((Math.random()*14)-7, (Math.random()*14)-7);
    this.acc = createVector();
    
    // Default is gravity pulling down.
    this.grav = createVector(0,0.1);
    
    this.radius = _r;
}

Gp.prototype.render = function(){
 
    let colF = (Math.abs(this.vel.y)+10)*(Math.abs(this.vel.x)+10);
    
    //noStroke();
    strokeWeight(1);
    stroke(255);
    fill(0,colF*12,colF,255);
    ellipse(this.pos.x,this.pos.y, this.radius, this.radius);
    
}

Gp.prototype.update = function(){
    
    // Euler integration, with gravity.
    
    // First, gravity force.
    this.acc.add(this.grav);
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.mult(0);
    
    // If no longer on screen, flag up as no longer intact.
    // Managing loop/parent object can then splice this object
    // from relevant array.
    if (this.pos.x < 0 || this.pos.x > width ||
        this.pos.y < 0 || this.pos.y > height)
        this.intact = false;
}

// Pill object.
// This is the object dropped (default one at a time)
// by the Science Ship.
// I have in mind that the 'pill' dissolves the alien
// structures that are injuring the mysterious planet.
function Pill(_shipX, _shipY){
    
    // Pill inherits x-pos from ship's Xpos.
    // However, Pill takes care of how far to 
    // appear below ship right here! Good object!
    var myY = _shipY + 16;
    
    this.pos = createVector(_shipX, myY);
    
    this.dropSpeed = 10;
    
    // Radius of Pill should be same as a module diameter.
    this.radius = (width-64)/100;
    
    // Begin 'intact'. Once collided or grounded, no longer intact.
    this.intact = true;
    
}

// Pill falls down at its .dropSpeed.
// For now, Pill will screenWrap, but will
// have to be 'destroyed' when hitting ground level.
Pill.prototype.move = function(){
    
    this.pos.y += this.dropSpeed;
    
    // ***
    // Temporary screenWrap.
    //if (this.pos.y > height + this.radius) this.pos.y = 0;
    if (this.pos.y > height + this.radius) this.intact = false;
    
}

Pill.prototype.render = function(){
    // No outline.
    stroke(0);
    strokeWeight(3);
    // Rainbow colouring, like the ZX-spectrum version of 'Blitz'.
    // NB 1982, Elliot, Manhatten.
//    fill((  Math.random()*155)+100,
//        (   Math.random()*155)+100,
//        (   Math.random()*155)+100);
    fill(255);
    // Egg-shaped.
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius * 0.67)
    
}
// END of pill object.

// Module object. Towers are built out of these.
// Yep, pretty cool. I love modular stuff.
function Module(_parent, _y){
    
    // Pass in the Tower object as parent.
    this.parent = _parent;
    
    // Position is partly inherited from parent (X pos).
    // Y pos, meanwhile, passed in from Tower generation function.
    this.pos = createVector(this.parent.x, _y);
    
    // Size of module.
    // There could be an option to randomize?
    //this.radius = Math.random()*this.parent.modMaxRad;
    this.radius = this.parent.modMaxRad;
}

Module.prototype.render = function(){
    
    // Draw module rectangle from centre, not top left.
    rectMode(CENTER);
    
    strokeWeight(3);
    stroke(255);
    fill(255,42);
    rect(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    noFill();
    //strokeWeight(2);
    stroke(0);
    rect(this.pos.x, this.pos.y, this.radius*2.1, this.radius*2.1);
//    fill(0,height-this.pos.y,0);
//    stroke(255);
//    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
}
// END of Module object.


// Tower object.
function Tower(_i, _numberOfTowers, _TowerWidth){
    
    var screenRatio = (width*height)/(1024*512);
    
    // Module maximum radius.
    // See generate() function belonging to this tower object for
    // how this value is used.
    this.modMaxRad = ((_TowerWidth/ screenRatio)/2) * screenRatio;
    
    // Position across screen.
    let interstice = this.modMaxRad * 4;
    this.x = (_i * interstice) + this.modMaxRad;
    // Buffer at left and right of screen.
    this.x += (width - (interstice * _numberOfTowers)+ this.modMaxRad)/2;
    
    // Tower off screen? Choose random place on-screen.
    if (this.x < 0+(this.modMaxRad*3) || 
        this.x > width-(this.modMaxRad*3)) this.x = 
        (Math.random()*width/2) + width/2;
    
    // Is the tower still standing?
    // If a tower has no modules remaining, then it
    // will no longer be 'intact'.
    this.intact = true;
    
    // Array of 'module' blocks, like the storeys of a building.
    // A 'module' will be an object in its own right.
    this.modules = [];
    
}

// Generates the tower, building itself out of 'module' objects.
// Pass in 0 and tower will generate itself from a random number
// of modules (maximum number will be calculated in terms of 
// height of screen and original flying-height of ship).
Tower.prototype.generate = function(_num){
    
    var moduleDiameter = this.modMaxRad * 2;
    
    // What is the maximun number of modules we might have
    // derived from the size of the modules and the height
    // of the window?
    if (_num == null || _num == 0){
        let maxMods = ((height-100)*0.75)/moduleDiameter;
        // *** Temporary testing...
        //maxMods *= 0.5;
        
        // We must have at least 1 module.
        _num = 1 + Math.round((Math.random() * (maxMods)));
    }
    
    // ForLoop, pushing new module objects into this.modules array.
    // Y-pos of module found using loop's increment.
    for (var i = 0; i < _num; i++){
        this.modules.push(new Module(this, height-(moduleDiameter*(i+1))));
    }
}

// Loops through all modules and asks them to render themselves.
Tower.prototype.render = function(){
    for (var i = 0; i < this.modules.length; i++){
        this.modules[i].render();
    }
}
// END of Tower() object.


// Ship object.
function Ship(){
    
    // Successfull splashed all towers?
    this.successful = false;
    
    // Position vector X, Y.
    // NB this.sinY considered to be
    // ship's 'origin Y position'.
    this.pos = createVector(0,0);
    
    // Ship is actually a blinkie...flying!
    this.blinkieShip = new antBot(false, 0, 0);
    this.blinkieShip.scale = 1;
    
    // Bob ship on a sine wave.
    this.theta = 0;
    this.sinY = this.pos.y;
    
    // Speed (X direction only.)
    // Positive 1 will moving to the right.
    this.speedX = 10;
    
    //Size of ship.
    this.radiusX = 22;
    this.radiusY = 6;
    this.radius = 12;   // refered to in checkCollision().
    
}

// Drawing the Ship object.
Ship.prototype.render = function(){
    
    this.blinkieShip.pos = this.pos;
    this.blinkieShip.render();
    
    
// *** Legacy triangle test ship.
    
//    strokeWeight(2);
//    stroke(0);
//    fill(255);
    
    
//    beginShape();
//        // Pointed front of ship.
//        vertex(this.pos.x + this.radiusX, this.pos.y);
//        // Top back corner of ship.    
//        vertex(this.pos.x - this.radiusX, this.pos.y-this.radiusY);
//        // Bottom back corner of ship.
//        vertex(this.pos.x - this.radiusX, this.pos.y+this.radiusY);
//    endShape(CLOSE);
}

// Moving the Ship object.
// This function will also take care
// of 'screen wrapping' the ship: if
// the ship exits the screen (width+ship.radiusX)
// then the ship will be relocated (0-ship.radiusX)
// and one 'step' down.
Ship.prototype.move = function(_stepAmount){
    
    // StepAmount refers to how much ship will
    // move down, should it exit the screen to
    // the right.
    if (_stepAmount == null) _stepAmount = 0;
    
    // If successful, then move qua landing mode!
    // Ship will stop at three radii before width end.
    if (this.successful){
       if (this.pos.x < width - this.radiusX * 3)
       { this.pos.x += this.speedX;}
        this.pos.y = height - this.radiusY * 4;
    } else 
    { 
        // Use sine wave for more interesting flight.
        this.pos.y = this.sinY + 12 * sin(this.theta);
        this.theta+= 0.2;
        this.pos.x += this.speedX;
    }
    
    // Just check we have landed...
    if (this.successful && this.pos.x >= width - this.radiusX * 3){
        currentLevel++;
        // True = rescue the blinkie please!
        setupLevel(currentLevel, true);
    }
    
    // Screen wrapping, and 'step' ship down, so that
    // it gets lower and lower.
    if (this.pos.x - this.radiusX > width){
        this.pos.x = 0 - this.radiusX;
        //this.pos.y += _stepAmount;
        this.sinY += _stepAmount;
        if (haveIwon()) this.successful = true;
    }
}
// END of Ship() object.

// Blinkie object.
// antBot object.
function antBot(_matterBody, _x, _y){
    
    // Do we have a matter.js physics body?
    this.hasBod = _matterBody;
    
    // My dimensions.
    this.mass = 1;
    this.radius = 10;
    this.scale = Math.random()*4;
    
    // My physics.
    // If we have no pos parameters, then
    // position antBot in centre of screen.
    if (_x == null || _y == null){
        _x = width/2;
        _y = height/2;
    }
    this.pos = createVector(_x, _y);
    // If attached to matter.js body, request one here!
    if (_matterBody===true){
        // NB main .js file must contain pA array that
        // stores and manages physics bodies.
        pA.push(new Pa2D(_x,_y,this.radius*2*this.scale,0));
        // Get an id so we know which physics body's position
        // to use to draw our antBot!
        this.bodID = pA.length-1;   
    }else{
    this.vel = createVector();
    this.acc = createVector();
    this.dec = 0.7;             // Friction/air resistance.
    }
    
    // My appearance.
    this.mutate();
}

antBot.prototype.mutate = function(){
    // The idea is that each antBot is unique.
    // An antBot will have an individual colour,
    // size of eyes, size of pupils, position of pupils, and position of aerial.
    // How many 'variable character components' is that? 5.
    // Each of these VCCs will need a maximum deviation, whose
    // units will always be a value between 0 and 1 -- in terms of
    // distance or size from maximum value allowed.
    
    // Colour, first, is either 2 combined hues or 1 alone.
    // Second, a selection of 1 of the 6 combinations.
    let oneOfSix = Math.floor(Math.random()*5) + 1;
    var myC;
    let thisC = 'hello';
    if (oneOfSix == 1) thisC = 'red';
    if (oneOfSix == 2) thisC = 'green';
    if (oneOfSix == 3) thisC = 'blue';
    if (oneOfSix == 4) thisC = 'red and blue';
    if (oneOfSix == 5) thisC = 'red and green';
    if (oneOfSix == 6) thisC = 'green and blue';
    
    let hueV1 = Math.round(Math.random()*155)+100;
    let hueV2 = 0;
    if (oneOfSix > 3) hueV2 = Math.round(Math.random()*155)+100;
    
    if (thisC === 'red') myC = color(hueV1, 0, 0);
    if (thisC === 'green') myC = color(0, hueV1, 0);
    if (thisC === 'blue') myC = color(0, 0, hueV1);
    
    if (thisC === 'red and green') myC = color(hueV1, hueV2, 0);
    if (thisC === 'red and blue') myC = color(hueV1, 0, hueV2);
    if (thisC === 'green and blue') myC = color(0, hueV1, hueV2);
    
    // Main body fill colour!
    this.col = myC;
    // Size of eyes! 1 = biggest, 0 = smallest.
    this.eyeSize = Math.random()+0.1;
    // Size of pupils! 1 = biggest, 0 = smallest.
    this.pupilSize = Math.random()-0.1;
    if (this.pupilSize < 0.2) this.pupilSize = 0.1;
    
    // My blink state.
    this.blinking = false;
    this.blinkTime = 0;
    this.blinkRate = Math.floor(Math.random()*100)+50;
    this.blinkDuration = 0.5; // seconds.
}

antBot.prototype.update = function(){
    
    // Don't add this physics if antBot already
    // attached to matter.js physics body.
    if (this.hasBod) return;
    
    // Euler integration.
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.mult(0);
    this.vel.mult(this.dec);
}

antBot.prototype.screenWrap = function(){
    if (this.pos.x < 0 - (this.radius*this.scale)) 
        this.pos.x = width + (this.radius*this.scale);
    
    if (this.pos.x > width + (this.radius*this.scale)) 
        this.pos.x = 0 - (this.radius*this.scale);
    
    if (this.pos.y < 0 - (this.radius*this.scale)) 
        this.pos.y = height + (this.radius*this.scale);
    
    if (this.pos.y > height + (this.radius*this.scale)) 
        this.pos.y = 0 - (this.radius*this.scale);
}

antBot.prototype.checkGround = function(_y){
    if (this.pos.y > _y - 3 - (this.radius*this.scale)) {
        this.vel = createVector(this.vel.x, -this.vel.y/2);
        this.pos.y = _y - (this.radius*this.scale);
        return true;
    }
    else return false;
}

antBot.prototype.render = function(_x, _y, _t){
    
    push();
    
    // So that you can use an external physics engine
    // to determine pos and rot of our little antBot.
    if (_x != null && _y != null && _t != null){
        translate(_x, _y);
        this.pos.x = 0;
        this.pos.y = 0;
        rotate(_t);
    }
    
    strokeWeight(3);
    stroke(0);
    rectMode(CENTER);
    var goldenRatio = 0.618;
    fill(this.col);
    
    // Main body.
    rect(this.pos.x, this.pos.y, this.radius*2*this.scale, this.radius*2*this.scale*goldenRatio);
    
    // Eye dimensions.
    let eyePos = this.scale * (this.radius/2);
    let eyeSizeX = this.scale * ((this.radius)-2) * this.eyeSize;
    let eyeSizeY = eyeSizeX;
    let pupSizeX = eyeSizeX * this.pupilSize;
    // Are we blinking?
    if (!this.blinking){
        // Not blinking, so decide if time to blink again.
        if (frameCount % this.blinkRate === 0 &&
           Math.random() > 0.8){
            this.blinking = true;
            this.blinkTime = millis();
        }
    }
    else if (this.blinking){
        if (millis() - this.blinkTime > this.blinkDuration*600){
            this.blinking = false;
        }
    }
    
    noStroke();
    // Left eye.
    if (!this.blinking) fill(255); else fill(this.col);
    rect(this.pos.x - eyePos, this.pos.y,
         eyeSizeX, 
         eyeSizeY);
    // Right eye.
    rect(this.pos.x + eyePos, this.pos.y,
         eyeSizeX, 
         eyeSizeY);
    // Left pupil (square).
    if (!this.blinking) fill(0); else fill(this.col);
    rect(this.pos.x - eyePos, this.pos.y,
         pupSizeX, 
         pupSizeX);
    // Right pupil (square).
    rect(this.pos.x + eyePos, this.pos.y,
         pupSizeX, 
         pupSizeX);
    
    // Pods.
    fill(0,0,255,101);
    stroke(255);
    strokeWeight(2);
    var podSize = (this.scale * this.radius * 2)/5;
    var posX = this.pos.x - (this.radius * this.scale) + (podSize/2);
    var posY = this.scale * goldenRatio * (this.radius + 3*this.scale);
    for (let i = 0; i < 4; i++){
        let xP = podSize * i + (2*this.scale);
        rect(   posX + xP, 
                this.pos.y + posY + (this.scale*3) * Math.sin((frameCount/8)+(i*this.blinkRate)),
                podSize, podSize);
    }
    
    pop();
    
    
}

// redHenSound.js

// Started April 2017.
// Idea is to setup everything we might need,
// including mic inputs, mp3, etc. etc.

// voxa.freq(220); voxa.amp(0,0.5);

// Here the default type is 'square'.
// So, we should allow for constructor to
// take parameter for type.
// 'saw', 'sine'.
function setupOscillator(){
    
    let _varToStoreOscillator = new p5.Oscillator();
    _varToStoreOscillator.setType('sine');
    
    _varToStoreOscillator.amp(0.01);
    _varToStoreOscillator.freq(440);
    
    _varToStoreOscillator.start();
    
    return _varToStoreOscillator;
    
}

// To change frequency of given Oscillator.
function changeFreq(_osc, _freq){
  _osc.freq(_freq);
}

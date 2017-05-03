// The traditional Snake game, but with a Matrixy twist.

// The idea is that each segment 'snagment' of the snake will take
// on a new katakana glyph.

// Also, instead of apples/fruit for the snake to collect,
// I wonder if we can use the White Rabbit emoji -- again
// as a small allusion to the film.

// And maybe the fruit should arrive via green code-rain?
// Yeah -- it probably should.

// Oh, and we could have 'Agent Smith' enemies (emoji smiley with sunglasses):
// if you bump into a 'Smith', then he 'copies' himself onto your tail. Now,
// if you bump into too many Smiths, then he will copy himself over your head,
// which spells the end of your identity, as it were. It would be cool at this
// point for ai to take over, and the 'Smith-snake' become indefinitely long,
// spelling out a message to the player? Hmmmmmmmm

// Accrue 101 segments to win -- to escape the Matrix?

var snake = []; // Global variable, an array of snagments.
var segs;       // Number of segments ('snagments').
var gameSpeed;
var won = false;
var fruit;

var startAgainTimer;
var satSecs = 4;

var mousePos;   // Vector to store mouse position from previous frame,
                // with which to detect swipes (cf. mouseMoved()).

var greenRain = [];

var Smiths = [];
var numSmiths;

function setup(){
    
    createCanvas(window.innerWidth, window.innerHeight);
    
    rectMode(CENTER);   // So as to draw rectangles from their centre.
    
    mousePos = createVector();
    
    SetupGame();
    
    // Initialization of greenRain objects.
    // Each grain will determine its starting
    // position for itself.
    // Feed in its iD and length of array only.
    let GrainDensity = 512;
    for (let i = 0; i < GrainDensity; i++){
        greenRain.push(new Grain(i, GrainDensity));
    }
    
}

function SetupGame(){
    
    segs = 3;
    gameSpeed = 10; // The higher, the slower.
    won = false;
    startAgainTimer = 0;
    numSmiths = 9;
    
    snake.splice(0, snake.length);
    
    for (let i = 0; i < segs; i++){
        snake.push(new Snagment(width/2, height/2));
        // Push snagment back.
        snake[i].x -= snake[i].size * i;
    }
     
    if (fruit == null)
    fruit = new WhiteRabbit(random(10, width-10), random(20, height-10), 32);
    
    if (Smiths.length === 0)
        for (let i = 0; i < numSmiths; i++){
            Smiths.push(new Agent());
        }
        
}

function draw(){
    
    if (gameSpeed !== 0)    // If the jig isn't up...
    background(0, 0, 0);
    
    // Green rain.
    for (let i = 0; i < greenRain.length; i++){
        greenRain[i].rain();
        greenRain[i].render();
    }
    
    fruit.render();
    
    for (let i = 0; i < Smiths.length; i++){
        Smiths[i].render();
    }
    
    // Move through snake array in reverse, so as to move inherit snagment positions
    // *before* moving leading snagments.
    if (gameSpeed !== 0)
    for (let i = snake.length-1; i >= 0 ;i--){
        let blish = null;
        if (i > 0) blish = snake[i-1];        // Grab snagment ahead of current snagment.
        
        if (frameCount % gameSpeed === 0)     // Only move every nth frame.
        snake[i].move(blish);
        
        snake[i].render();
    }
    
    
    
    // Now that we have moved and rendered the objects, let's check collisions.
    // Eaten fruit?
    if (gameSpeed !== 0)    // If the jig isn't up...
    if (CheckCollision(snake[0], fruit))
        {
            fruit.x = random(10, width-10);
            fruit.y = random(20, height-10);
            GrowSnake();
        }
    // Crashed into own body like a dork?
    if (gameSpeed !== 0)    // If the jig isn't up...
    for (let j = 1; j < snake.length; j++){
    if (CheckCollision(snake[0], snake[j]))
        AgentSmithed();
    }
    // Crashed into an Agent Smith like a noob?
    if (gameSpeed !== 0)    // If the jig isn't up...
    for (let j = 0; j < Smiths.length; j++){
    if (CheckCollision(snake[0], Smiths[j])){
        // Final snagment of tail copied over by Agent!
        // Oh noooooooooo!
        // And cause Agent to appear somewhere new.
        var copiedSmith = false;
        for (let k = snake.length - 1; k >= 0; k--){
            
        if (snake[k].smithed === false) {snake[k].smithed = true;
        snake[k].glyph = String.fromCodePoint(0x1F60E); copiedSmith = true;
        snake[k].render(); segs--;}    // Render here, so that we see head, too, Smithed.
            if (k !== 0){
        Smiths[j].x = Math.random() * width-10;
        Smiths[j].y = Math.random() * height-10;
            }
              else AgentSmithed();
           if (copiedSmith) break;  // Break here, since we have copied one snagment.
        }
          
            
    }
        }
    
    if (segs === 101)         // 101 !!!
        TheyAreTheOne();
    
    if (gameSpeed === 0 && won === false)    // If the jig IS up...
        AgentSmithed();
    
    
    mousePos.x = mouseX;
    mousePos.y = mouseY;
    
    if (gameSpeed !== 0){
    stroke(255);
        fill(255);
    strokeWeight(1);
        textSize(22);
        text('Grow to a length of 101 to win: ' + segs, 2, 22);
    }
    
}

function TheyAreTheOne(){
    won = true;
    gameSpeed = 0;
    textSize(64);
    strokeWeight(6);
    //fill(0,255,0,101);
    fill(255);
    stroke(0,101,0);
    text("You Win! Are you the ONE?", 42, (height/2)-64);
    
    // Begin re-start timer...
    if (startAgainTimer === 0)
        startAgainTimer = millis();
    
    // Three times the length of GameOver...
    if (millis() - startAgainTimer > satSecs * 1800){
        // Time to start game again!
        SetupGame();
    }
}


function mouseMoved(){
    
    // If bigger X-swipe than Y-swipe...
    if (Math.abs(mouseX-mousePos.x) >
        Math.abs(mouseY-mousePos.y)){
        if (mouseX > mousePos.x)
        {if (snake[0].speedX !== -1) snake[0].changeD(1, 0);}
        else 
        { if (snake[0].speedX !== 1) snake[0].changeD(-1, 0);}
    } else {
        
        if (mouseY > mousePos.y)
        { if (snake[0].speedY !== -1) snake[0].changeD(0,1);}
        else
        { if (snake[0].speedY !== 1) snake[0].changeD(0,-1);}
    }
    
}

function AgentSmithed(){
    
    gameSpeed = 0;
    textSize(64);
    strokeWeight(6);
    //fill(0,255,0,101);
    fill(255);
    stroke(0,101,0);
    text("The Matrix Has You...", 42, (height/2)-64);
    
    // Begin re-start timer...
    if (startAgainTimer === 0)
        startAgainTimer = millis();
    
    if (millis() - startAgainTimer > satSecs * 600){
        // Time to start game again!
        SetupGame();
    }
    
}

function GrowSnake(){

    // Decide location of new segment.
    // I've decided to place it directly *below* last snagment in array.
    // But then I changed my tiny mind: now it appears exactly where
    // its leading segment is. The move() algorithm takes care of the rest...
    let nsX = snake[snake.length-1].x;
    let nsY = snake[snake.length-1].y;
    
    snake.push(new Snagment(nsX, nsY));

    // Keep count of segments.
    segs++;
    
    // Shall we increase speed?
    if (gameSpeed > 3 && segs % 2 === 0)
        gameSpeed--;
    
    // Add more agents...
    if (segs % 3 === 0)
    for (let i = 0; i < 3; i++){
        Smiths.push(new Agent());
    }
    
}

function CheckCollision(_ob1, _ob2){
 
    // NB both ob1 and ob2 will have *x & y co-ordinates*, as well as *sizes*.
    // This function will return *true* if collision.
    
    if (_ob1.x - _ob1.size/2 < _ob2.x + _ob2.size/2 &&
        _ob1.x + _ob1.size/2 > _ob2.x - _ob2.size/2 &&
        _ob1.y - _ob1.size/2 < _ob2.y + _ob2.size/2 &&
        _ob1.y + _ob1.size/2 > _ob2.y - _ob2.size/2)
            return true;
    else    return false;
        
}


function keyPressed(){
    if (keyCode === UP_ARROW)
    {if (snake[0].speedY !== 1) snake[0].changeD(0, -1);}
    else if (keyCode === DOWN_ARROW)
    {if (snake[0].speedY !== -1) snake[0].changeD(0, 1);} 
    else if (keyCode === LEFT_ARROW)
    {if (snake[0].speedX !== 1)snake[0].changeD(-1, 0); }
    else if (keyCode === RIGHT_ARROW)
       { if (snake[0].speedX !== -1) snake[0].changeD(1, 0); }
}

// """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

// White rabbit object.

function WhiteRabbit(_x, _y, _s){
 
    this.x = _x;
    this.y = _y;
    
    this.size = _s;
    
    // The WhiteRabbit glyph.
    this.glyph = String.fromCodePoint(('0x1F' + 407).toString(16));
    
}

WhiteRabbit.prototype.render = function(){
//    fill(0,255,0);
//    strokeWeight(2);
//    
//    textSize(this.size);
//    
//    text('*', this.x-this.size/2, this.y+this.size/2);
    
    
    strokeWeight(1);
    stroke(255);
    fill(0,255,0);
    textSize(this.size);
    text(this.glyph, this.x-this.size/2, this.y+this.size/2);
    
}


// End of White rabbit object.

// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""



// *!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!

// The 'Snagment' object.
function Snagment(_x, _y){
    this.x = _x;
    this.y = _y;
    
    this.size = 20;
    
    // Pick random katakana glyph upon construction.
    this.glyph = String.fromCharCode(0x30A0 + round(random(0,95)));
    
    // If true, then glyph copied over by an Agent face :(
    this.smithed = false;
    
    this.speedX = 1;    // Begin locomotion right. NB when created in future, snagment will inherit its direction from snegment ahead of it in the array.
    this.speedY = 0;
}

Snagment.prototype.move = function(_objAhead){
    
    // Pass in the objAhead (a 'snagment').
    
    // Then, this snagment simply inherits the position of snagment ahead of it.
    if (_objAhead != null){
    this.x = _objAhead.x;
    this.y = _objAhead.y;
    }
        
    if (_objAhead == null)  // In other words, if head of snake, simply move at speed.
    {
    this.x += this.speedX*this.size;
    this.y += this.speedY*this.size; 
    }
    
    // Screen wrap the snagment.
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
    
}

Snagment.prototype.changeD = function(_xD, _yD){
    this.speedX = _xD;
    this.speedY = _yD;
}

Snagment.prototype.render = function(){
    //strokeWeight(1);
    //stroke(255,255,255,255);
    if (this.smithed == false){
    strokeWeight(1);
    noStroke();
    fill(255, 42);
    
    rect(this.x, this.y, this.size, this.size);
    
    let gS = this.x;
    let gB = this.y;
    gS = map(gS, 0, width, 101, 255);
    if (gB % 3 === 0) gS = 255;
    
    strokeWeight(2);
    stroke(0);
    fill(0,gS,0);
    textSize(this.size);
    text(this.glyph, this.x-this.size/2, this.y+this.size/2);
    }
    else    // Agent face! Oh noooo!
        {
            fill(255);
            strokeWeight(1);
            stroke(255);
    
            textSize(this.size);
            text(this.glyph, this.x-this.size/2, this.y+this.size/2);
    
//            noStroke();
//            fill(0,101,0,142);
//            ellipse(this.x, this.y, this.size, this.size);
        }
    
    
}


// *!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!


// ØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØ
// ØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØ
// ØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØ

// Green rain particle object.

// The idea is that each Grain object
// will work out where it is supposed
// to be, and what it is supposed to
// be doing via reference to its
// index and array length only.

// ...one can dream.

function Grain(_index, _Alength){
    // id passed in from for loop.
    this.id = _index;
    this.Al = _Alength;
    
    this.speed = 0.2 + random(0, 0.4);
    
    // Divide xPos evenly across screen.
    this.x = (width/this.Al) *_index;
    // Randomize height (usually above screen.)
    this.y = 0 - random(-42, height);
}

Grain.prototype.rain = function(){
    this.y += this.speed;
    if (this.y > height) this.y = 0;
}

Grain.prototype.render = function(){
    
    //strokeWeight(Math.round(Math.random()*8));
    strokeWeight(2);
    let col = height-this.y;
    stroke(0,col,0, 22);
    line(this.x, this.y, this.x, 0);
    
    
    stroke(0,101,0,height-col/2);
    point(this.x, this.y+1);
    point(this.x, this.y-Math.random()*900);
}

// End of Grain object.
// ØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØ
// ØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØ
// ØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØØ



// AS_AS_AS_AS_AS_AS_AS_AS_AS_AS_AS
// AS_AS_AS_AS_AS_AS_AS_AS_AS_AS_AS
// AS_AS_AS_AS_AS_AS_AS_AS_AS_AS_AS
// Agent Smith object!

function Agent(_x, _y, _s){
    
    if (_x != null)
    this.x = _x;
    else this.x = random(10, width-10);
    
    if (_y != null)
    this.y = _y;
    else this.y = random(10, height-10);
    
    if (_s != null)
    this.size = _s;
    else this.size = 20;
    
    this.glyph = String.fromCodePoint(0x1F60E);
    
}

Agent.prototype.render = function(){
    fill(255);
    strokeWeight(1);
    stroke(255);
    
    textSize(this.size);
    text(this.glyph, this.x-this.size/2, this.y+this.size/2);
    
    noStroke();
    fill(0,101,0,142);
    ellipse(this.x, this.y, this.size, this.size);
}

// End of Agent Smith object.
// 'Magnificent, isn't it?'
// AS_AS_AS_AS_AS_AS_AS_AS_AS_AS_AS
// AS_AS_AS_AS_AS_AS_AS_AS_AS_AS_AS
// AS_AS_AS_AS_AS_AS_AS_AS_AS_AS_AS




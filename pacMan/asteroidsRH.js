// Javascript -- using the P5.js library.

// An asteroidsy game!

// Ship? Triangle...shoot! 

// Asteroids! 


/*

Tutorial vids descriptions: 

Asteroids in JavaScript: tutorial_3

Code for you here: http://codepen.io/RedHenDev/pen/oWGrgw

In this 'making Asteroids' video (number 3), we add collision detection and the asteroid explode-spawn-four-babies behaviour.

Useful links:
Asteroids tutorial 1: https://youtu.be/_fqL3-poOT0
Asteroids tutorial 2: https://youtu.be/tUn_RZcjqTc
Asteroids tutorial 3: https://youtu.be/2bEp8SukF2s

p5.js homepage: https://p5js.org

Coded in JavaScript, using the p5.js library (for graphics, input, and a few other things like vector objects).

Thanks for watching!

*/

var stars = [];

var asteroids = [];

var ship;

var lasers = [];

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    
    makeStars();
    
    makeAsteroids(7);
    
    shipsAGoGo();
}


function draw(){
    
    checkInput();
    
    makeStars();
    
    updateAsteroids();
     
    updateShip();
    
    starWars();
    
}


function starWars(){
    
    for (var i = lasers.length-1; i >=0 ; i--){
        
        lasers[i].render();
        lasers[i].update();
        
        // Destroy laser if off screen! ;)
        if (lasers[i].pos.x < 0 || lasers[i].pos.x > width ||
       lasers[i].pos.y < 0 || lasers[i].pos.y > height)
            { lasers.splice(i,1);}
    }
}

function checkInput(){
    
    if (keyIsDown(RIGHT_ARROW))
        ship.theta += ship.rotS;
    
    if (keyIsDown(LEFT_ARROW))
        ship.theta -= ship.rotS;
    
    if (keyIsDown(UP_ARROW))
        ship.spaceThrust();   
}

function keyTyped(){
    
    if (keyCode == 32){
        lasers.push(new Laser(ship.pos, ship.theta));
    }
    
}

function updateShip(){
    
    ship.render();
    
    ship.physics();
    
    screenWrap(ship);
    
}

function shipsAGoGo(){
    
    ship = new Ship();
    
}


function updateAsteroids(){
    
    var hit = false;
    
    for (var a = asteroids.length-1; a >= 0; a--){
        asteroids[a].spaceGlide();
        screenWrap(asteroids[a]);
        asteroids[a].render();
        
        if (asteroids[a].radius > 4){
        hit = collision(ship, asteroids[a]);
        if (hit===true) asteroidSpawn(asteroids[a], a); 
        }
        
        for (var j = lasers.length-1; j >= 0; j--){
            if (asteroids[a].radius > 4){
            hit = collision(lasers[j], asteroids[a]);
            if (hit===true){ asteroidSpawn(asteroids[a], a); 
            lasers.splice(j,1);               
            }
            }
        }
        
        
    }
  
}

function asteroidSpawn(_ast, _i){
    
    var babyRadi = _ast.radius * 0.25;
    var newPos = _ast.pos;
    
    asteroids.splice(_i, 1);
    
    
    for (var i = 1; i < 5; i++){
             
        asteroids.push(new Ast(babyRadi, newPos));
    }
}

function makeAsteroids(_num){
    
    for (var i = 0; i < _num; i++){
        asteroids.push(new Ast());
    }
    
}

function makeStars(){
    background(0);
    
    if (frameCount < 2){
        for (var i = 0; i < 333; i++){
            stars.push(new Star());
        }
    }
    
    
    var starR = 0;
    for (var i = 0; i < stars.length; i++){
        
         
       starR = Math.random()*2; 
    if (starR > 1.99){
        stars[i].twinkle();
    }
        if (stars[i].twinkling) {
        stroke(255);
        strokeWeight(1);
    }
    else{
        stroke(0,0,255);
        strokeWeight(2 * starR);
    }
        point(stars[i].pos.x, stars[i].pos.y);
        
    }
    
}

function collision(_ob1, _ob2){
    
    var dist = createVector();
    
    dist = p5.Vector.sub(_ob1.pos, _ob2.pos);
    
    var distMag = dist.mag();
    
    if (distMag < _ob1.radius + _ob2.radius)
        return true;
    else return false;
    
}


function screenWrap(_ob){
    
    if (_ob.pos.x < 0 - _ob.radius)
        _ob.pos.x = width + _ob.radius;
    
    if (_ob.pos.x > width + _ob.radius)
        _ob.pos.x = 0 - _ob.radius;
    
    if (_ob.pos.y < 0 - _ob.pos.y - _ob.radius)
        _ob.pos.y = height;
    
    if (_ob.pos.y > height + _ob.radius)
        _ob.pos.y = 0;
    
}

// &&&&&&&&
// Objects below here :)
// &&&&&&&&

function Laser(_p, _t){
    
    var newV = createVector(Math.sin(radians(_t)),
               -Math.cos(radians(_t)));
    
    newV.normalize();
    newV.mult(3);
    
    this.vel = createVector(newV.x, newV.y);
    
    newV.mult(20);
    
    this.pos = createVector(_p.x + newV.x, _p.y + newV.y);
    
    this.radius = 5;
    
}

Laser.prototype.render = function(){
    
    strokeWeight(3);
    stroke(0,255,0);
    
    var newV = this.vel;
    newV.normalize();
    
    newV.mult(12);
    
    line(this.pos.x, this.pos.y, this.pos.x - newV.x, this.pos.y - newV.y);
    
}

Laser.prototype.update = function(){
    
    this.pos.add(this.vel);
    
    
        
    
}

function Ship(){
    
    this.pos = createVector(width/2, height/2);
    
    this.vel = createVector(0,0);
    
    this.acc = createVector(0,0);
    
    this.theta = 0;
    
    this.rotS = 3;
    
    this.radius = 20;
    
    this.dia = this.radius * 2;
    
}

Ship.prototype.physics = function(){
 
    this.pos.add(this.vel);
    
    this.vel.add(this.acc);
    

    this.vel.mult(0.99);
    
    this.acc.mult(0);
    
}

Ship.prototype.spaceThrust = function(){
 
    var direction = createVector();
    
    direction.x = Math.sin(radians(this.theta));
    direction.y = -Math.cos(radians(this.theta));
    
    direction.mult(0.4);
    
    this.acc.add(direction);
    
}

Ship.prototype.render = function(){
    
    strokeWeight(4);
    stroke(255);
    fill(0,0,255, 101);
    
    push();
    
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.theta));
    
    triangle(   0, 0-this.radius,
                0 + this.radius * 0.68, 0 + this.radius, 
                0 - this.radius * 0.68, 0 + this.radius);
    
    pop();
    
}

function Star(){
    this.pos = createVector(Math.random()* width,                               Math.random()*height);
    // ***
    this.twinkling = false;
}


Star.prototype.twinkle = function(){
    
    this.twinkling = !this.twinkling;
    
}


function Ast(_rad, _pos){

    if (_pos == null){
        //***
    this.pos = createVector(Math.random()* width,
                            Math.random()*100);
    }
    else {
        // ***
        this.pos = createVector(_pos.x, _pos.y);}
    
    
    this.vel = createVector(Math.random()*10-5,
                            Math.random()*10-5);

    
    if (_rad == null){
    this.radius = Math.random()*90 + 10;
    }
    else {this.radius = _rad;}
    
    this.dia = this.radius * 2;
    
}

Ast.prototype.render = function(){
    
    fill(51);
    strokeWeight(3);
    stroke(255);
    
    ellipse(this.pos.x, this.pos.y, this.dia, this.dia);
    
}

Ast.prototype.spaceGlide = function(){
    
    this.pos.add(this.vel);
    
}
















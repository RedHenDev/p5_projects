// Javascript -- using the P5.js library.

// An asteroidsy game!

// Ship? Triangle...shoot! 

// Asteroids! 

var stars = [];

var asteroids = [];

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    
    makeStars();
    
    makeAsteroids(7);
}

function draw(){
    makeStars();
    
    updateAsteroids();
    
}

function updateAsteroids(){
    for (let a = 0; a < asteroids.length; a++){
        asteroids[a].spaceGlide();
        screenWrap(asteroids[a]);
        asteroids[a].render();
    }
    
}

function makeAsteroids(_num){
    
    for (let i = 0; i < _num; i++){
        asteroids.push(new Ast());
    }
    
}

function makeStars(){
    background(0);
    
    
    
    if (frameCount < 2){
        for (let i = 0; i < 333; i++){
            stars.push(new Star());
        }
    }
    
    strokeWeight(1);
    
//    if (frameCount % 2 === 0)
//        stroke(0,0,255);
//    else
        stroke(255);
    
    for (let i = 0; i < stars.length; i++){
        
        point(stars[i].pos.x, stars[i].pos.y);
        
    }
    
}

function screenWrap(_ob){
    
    if (_ob.pos.x < 0 - _ob.radius)
        _ob.pos.x = width + _ob.radius;
    
    if (_ob.pos.x > width + _ob.radius)
        _ob.pos.x = 0 - _ob.radius;
    
    if (_ob.pos.y < 0 - _ob.pos.y - _ob.radius)
        _ob.pos.y = height + _ob.radius;
    
    if (_ob.pos.y > height + _ob.radius)
        _ob.pos.y = 0 - _ob.radius;
    
}

// ********

function Star(){
    this.pos = createVector(Math.random()* width,                                       Math.random()*height);
}

function Ast(){
    
    this.pos = createVector(Math.random()* width,
                            Math.random()*height);
    
    this.vel = createVector(Math.random()*10-5,
                            Math.random()*10-5);
    
    this.radius = Math.random()*90 + 10;
    
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
















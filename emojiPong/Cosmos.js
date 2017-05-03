var planets = [];

var stars = [];

var uX;
var uY;
var uSpeed;

function setup(){
    
    createCanvas(windowWidth,windowHeight);
    background(0);
    
    stroke(255);
    
    // planets[0] is the Sun :)
    planets.push(new Planet(0, 100, color(255,255,0), null));
    planets[0].pos.x = width/2;
    planets[0].pos.y = height/2;
    
    
    //planets.push(new Planet(100, 10, color(255,255,255), planets[0]));
    textSize(32);
    var sX;
    var sY;
    
     for (var i = 0; i < 700; i++){
         sX = random(1, width);
         sY = random(1, height);
       //  var poodle = createVector(sX, sY);
         stars.push(createVector(sX, sY));
     }
    
    // For keyboard movement.
    uSpeed = 1;
    uX = 0;
    uY = 0;
    
    mouseX = width/2;
    mouseY = height/2;
    
}


function draw(){
    
    background(0);
    
    
    for (var s = 0; s < stars.length; s++){
        if (Math.random() > 0.9)
        {stroke(255); strokeWeight(1);}
        else { stroke(0,0,255); strokeWeight(1);}
        point(stars[s].x, stars[s].y);
    }
    
    strokeWeight(4);
    stroke(0,0,255,101);
    fill(255);
    text("Tap to grow your Solar System", 42, 42);
    
    planets[0].pos.x = mouseX;
    planets[0].pos.y = mouseY;
    
    // Move co-ordinate system's origin.
    translate(uX, uY);
    
    
    for (var i = 0; i < planets.length; i++){
        
        push(); // Save current co-ordinate matrix.
        
        // Only spin and orbit if not the sun.
        if (planets[i].orig != null){
            planets[i].spin();
        }
        
        if (planets[i].orig != null){
            planets[i].orbit();
        }
        
        planets[i].render();
        
        pop();  // Revert to previous co-ordinate matrix.
    }
    
    // For holding key down.
    if (keyIsPressed) keyTyped();
}


function keyTyped(){
    
    if (key === 'w')
        uY += uSpeed;
    
    if (key === 's')
        uY -= uSpeed;
    
    if (key === 'a')
        uX += uSpeed;
    
    if (key === 'd')
        uX -= uSpeed;
}


// Create new world!
function mouseClicked(){
    
    // Colour of planet.
    var pC = color( random(0,255),
                    random(0,255),
                    random(0,255));
    
    
    var oParent;    // Orbital parent.
    
    if (floor(random(100)) % 5 !== 0) oParent = planets[0];
    else oParent = planets[floor(random(0, planets.length -1))];
    
    var pS = 69;        // Max planet size.
    var pR = height/2;  // Max orbit distance.
    
    // If not a planet, but a moon...
    // Paint bright white.
    // Also, keep size and radius small.
    if (oParent !== planets[0]){
        pC = color(255, 255, 255);
        pS = 10;
        pR = 100;
    }
    
    planets.push(new Planet(random(planets[0].size, pR), random(5,pS), pC, oParent));
    
}




// ***************************************
// ***************************************
// ***************************************

// Planet object...

function Planet(_r, _s, _c, _solarOrigin){
    
    // _r is orbit radius length.
    // _s is size of planet.
    // _solarOrigin is another planetary/solar object.
    
    
    // X,Y position on canvas.
    this.pos = createVector();
    // Orbital parent.
    this.orig = _solarOrigin;
    // Own spin angle.
    this.mySpin = 0;
    // Own spin speed.
    this.spinSpeed = random(0.01, 0.1);
    // Orbital rotation. Random here, so that planets do not align at start (though this would look cool!).
    this.orbitRot = random(0, 360);
    
    
    // How big is this planet's orbit?
    this.orbitRad = _r;
    // Size of planet (radius of ellipse).
    this.size = _s;
    // Colour of planet.
    this.colour = _c;
}


Planet.prototype.render = function(){

    // Centre origin on planet's position.
    translate(this.pos.x, this.pos.y);
    // Add spin to planet.
    rotate(this.mySpin);
    
    // Main planet/sun.
    fill(this.colour);
    ellipse(0, 0, this.size, this.size);
    
    // Spot, so that we can see spin.
    if (this.orig != null){
    fill(0,101);
    ellipse(0 + this.size/2.5, 0, this.size/10, this.size/10);
    }
}

Planet.prototype.spin = function(){
    
    // Increase angle of spin.
    this.mySpin += this.spinSpeed;
    
}

Planet.prototype.orbit = function(){
    
    // Increase orbital angle.
    if (this.size < 11 && this.orig.pos.x !== mouseX)
    this.orbitRot -= 0.001 * this.orbitRad;
    else this.orbitRot += 0.1/this.orbitRad*this.size;

    
    // Only need to calculate this if we have an orbital parent.
    if (this.orig != null){
    // Now, calculate position via polar-co-ordinates.
    this.pos.x = this.orig.pos.x + this.orbitRad * cos(this.orbitRot);
    this.pos.y = this.orig.pos.y + this.orbitRad * sin(this.orbitRot);
    }
    
    
}









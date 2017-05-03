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
    this.pupilSize = Math.random()+0.1;
    
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
// Example object designed to work in
// conjunction with the RedHen_2DPhysics
// matter.js wrapper class.

// Presently, I'm tempted to keep the
// option to be able to instantiate an
// antBot that has no matter.js body,
// but has a simple Euler physics system.

// Question is, then, whether to extend
// one of these from the other?
// Or: just have the Euler-antBot as an
// additional feature; it might be a 
// handy 'ghost mode' or something.
// One design issue, here, though, is that
// if we instantiate without a matter-bod,
// then we can't (at time of writing)
// simply turn it on; also, turning off
// the matter-bod and calculating pos
// according to Euler not possible without
// carefully co-ordinating static/sleeping
// mode of matter-bod.

// Blinkie object.
// antBot object.
// Do you want to give it a matter.js body?


class antBot {
    constructor (_hasMatterBod, _x, _y, _scale){
    
    // Do we have a matter.js physics body?
    this.hasBod = _hasMatterBod;
    
    // My dimensions.
    this.mass = 1;
    this.radius = 10;
    // Diameter.
    this.dm = this.radius*2;
    this.scale = _scale;
    
    // My locomotive attributes.
    this.hopForce = createVector(0,-1*(this.scale/42));
    
    // My physics.
    // If we have no pos parameters, then
    // position antBot in centre of screen.
    if (_x == null || _y == null){
        _x = width/2;
        _y = height/2;
    }
    this.pos = createVector(_x, _y);
    // If attached to matter.js body, request one here!
    if (this.hasBod===true){
        // NB This instantiation of
        // a matter-bod works with
        // the RedHen_2DPhysics class.
        RedHen_2DPhysics.newObj ("GhostRectangle", _x, _y, this.dm*this.scale,this.dm*this.scale*0.618);
        // Get an id so we know which physics body's position
        // to use to draw our antBot!
        this.bodID = bods.length-1;   
        // *** OR just grab this matter.js body now?!
        this.myBod = bods[this.bodID];
        console.log("MyBod .=  " + bods[this.bodID]);
        // Apply mass according to scale (don't let matter.js).
        this.myBod.bod.mass = this.scale;
    }else{
    // Euler antBot.
    this.vel = createVector();
    this.acc = createVector();
    this.dec = 0.7; // Friction/air resistance.
    }
    
    // Generates a random appearance for
    // antBot. Also calls applyScale()
    // in order to correct for scale.
    this.mutate();
    }
    
    
    // Methods. ***
    
    mutate(){
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
    this.blinkDuration *= 600; // Instead of calculating everytime we render.
    
    // Now apply scale factor (instead of doing this each time we have to render Blinkie...)
    this.applyScale();
    }
    
    // Do the calculations now for e.g. (this.radius * scale) etc.
    // Instead of in the render() function.
    applyScale(){
    // For use with main body and pods.
    let goldenRatio = 0.618;
    
    this.hopForce = createVector(0,-1*(this.scale/42));
    
    // Main body.
    this.width = this.dm*this.scale;
    this.height = this.dm*this.scale*goldenRatio;
    
    // Eye dimensions.
    this.eyePos = this.scale * (this.radius/2);
    this.eyeSizeX = this.scale * ((this.radius)-2) * this.eyeSize;
    this.eyeSizeY = this.eyeSizeX;
    this.pupSizeX = this.eyeSizeX * this.pupilSize;
    
    // Pod dimensions.
    this.podSize = (this.scale * this.dm)/5;
    }

    // Call if using Euler physics.
    EulerUpdate(){
        // Don't add this physics if antBot already
        // attached to matter.js physics body.
        //if (this.hasBod) return;
    
        // Euler integration.
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    
        this.acc.mult(0);
        this.vel.mult(this.dec);
    }
    // For Euler antBot.
    // Sets hard ground at _y by reversing
    // y-velocity; also returns Bool of 
    // whether ground was hit.
    checkGround(_y){
        if (this.pos.y > _y - 3 - (this.radius*this.scale)) {
        this.vel = createVector(this.vel.x, -this.vel.y/2);
        this.pos.y = _y - (this.radius*this.scale);
        return true;
    }
    else return false;
    }
    
    // Screenwrap.
    screenWrap(){
        // First we have to set pos
        // to matter-bod's position,
        // if not using Euler physics.
        if (this.hasBod){
            this.pos.x = this.myBod.bod.position.x;
            this.pos.x = this.myBod.bod.position.y;
            return;
        }
        
        else if (this.pos.x < 0 - (this.radius*this.scale)) 
        this.pos.x = width + (this.radius*this.scale);

        if (this.pos.x > width + (this.radius*this.scale)) 
        this.pos.x = 0 - (this.radius*this.scale);
    
        if (this.pos.y < 0 - (this.radius*this.scale)) 
        this.pos.y = height + (this.radius*this.scale);
    
        if (this.pos.y > height + (this.radius*this.scale)) 
        this.pos.y = 0 - (this.radius*this.scale);
    }
    
    // Tests whether antBot off-screen and
    // returns to random pos, doubled in
    // scale and with corrected angle.
    // NB if only using Euler, then
    // simply places bot at new random pos.
    screenTrap(){
        if (this.hasBod){
        if (this.myBod.bod.position.x < -100 ||
            this.myBod.bod.position.x > width+100 ||
            this.myBod.bod.position.y < -100 ||
            this.myBod.bod.position.y > height+100){
        this.myBod.makePosition(
            Math.random()*width,
            Math.random()*height);
            this.myBod.makeAngle(0);
            this.scale *= 2;
            this.applyScale();
            this.myBod.makeScale(2);
            this.myBod.bod.mass = this.scale;
            }
        }
        
        else if (this.hasBod===false){
            if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0     || this.pos.y > height)
            this.pos = createVector(Math.random ()*width,Math.random()*height);
            }  
    }
    
    // Rel. to antBot's local up direction.
    moveForward(){
        //        let vM = createVector(this.myBod.bod.velocity.x,this.myBod.bod.velocity.y);
    
        let hV = createVector(0,0);
        hV.x = Math.sin(this.myBod.bod.angle);
        hV.y = -Math.cos(this.myBod.bod.angle);
        hV = hV.mult(0.02*(this.scale/10));
        this.myBod.addForce(hV);
    }
    
    render(){
        push();
    
    
        if (this.hasBod){
          console.log("bod= " + bods[this.bodID].bod.position.x);  translate(bods[this.bodID].bod.position.x, bods[this.bodID].bod.position.y);
            this.pos.x = 0;
            this.pos.y = 0;
            rotate(bods[this.bodID].bod.angle);
        }
    
        strokeWeight(3);
        stroke(0);
        rectMode(CENTER);
        fill(this.col);
    
        // Main body.
        rect(this.pos.x, this.pos.y, this.width, this.height);
    
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
            if (millis() - this.blinkTime > this.blinkDuration){
                this.blinking = false;
            }
        }
    
        noStroke();
        // Left eye.
        if (!this.blinking) fill(255); else fill(this.col);
        rect(this.pos.x - this.eyePos, this.pos.y,
        this.eyeSizeX, 
        this.eyeSizeY);
        // Right eye.
        rect(this.pos.x + this.eyePos, this.pos.y,
        this.eyeSizeX, 
        this.eyeSizeY);
        // Left pupil (square).
        if (!this.blinking) fill(0); else fill(this.col);
        rect(this.pos.x - this.eyePos, this.pos.y,
        this.pupSizeX, 
        this.pupSizeX);
        // Right pupil (square).
        rect(this.pos.x + this.eyePos, this.pos.y,
        this.pupSizeX, 
        this.pupSizeX);
    
        // Pods.
        fill(0,0,255,101);
        stroke(255);
        strokeWeight(2);
        let goldenRatio= 0.618;
        this.posX = this.pos.x - (this.radius * this.scale) +    (this.podSize/2);
        this.posY = (this.height/2)+(goldenRatio * (this.radius + 3*this.scale));
        for (let i = 0; i < 4; i++){
        let xP = this.podSize * i + (2*this.scale);
        rect(   this.posX + xP, 
                this.pos.y + this.posY + (this.scale*3) * Math.sin((frameCount/8)+(i*this.blinkRate)),
                this.podSize, this.podSize);
        
        }
    
        pop();
    }
    
    
}// End of antBot class.
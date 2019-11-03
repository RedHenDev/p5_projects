// Array of particles.
let dots = [];

// Track mouse positions
// across updates.
let mx = 0;
let my = 0;

// Wind vector.
let windV;

function setup(){
    
    createCanvas(400,400);
    background(0,200,222);
    
    // Draw from centre of rectangles,
    // and use degrees instead of
    // radians for rotations.
    rectMode(CENTER);
    angleMode(DEGREES);
    
    // Centre mouse position.
    mx = mouseX = 0;
    my = mouseY = 0;
    
    // Wind vector.
    windV = createVector(0,0);
    
}

function draw(){
    background(0,200,222,99);
    
    // Iterate backwards over array, since we
    // may remove objects.
    for (let i = dots.length-1; i >= 0; i--){
            
        // Basic Euler and rendering.
        
        // Let's see if we can't simulate the wind.
        // The wind needs to be a vector.
        // And that vector will affect the
        // object's angular acceleration
        // according to the object's rotation.
        // If exactly perpendicular, no change.
        // If exactly parallel, no change.
        // Anything else, there will be a resultant
        // angular acceleration force.
        dots[i].anga += (Math.cos(radians(dots[i].t)) *
            windV.x * (1+dots[i].h*0.5)) +
            (Math.sin(radians(dots[i].t)) *
            windV.y * (1+dots[i].w*0.5));
        // Some random wind force.
        dots[i].anga += random(-0.1, 0.1);
            
        dots[i].av.add(windV);
        
        dots[i].update();
        dots[i].screenWrap();
        dots[i].render(renderHawk);
        
        // If square, grow the particle.
        // (For shits and giggles).
        if (dots[i].h === dots[i].w) {
            dots[i].w += 0.1;
            dots[i].h += 0.1;
            // Make sure we update radius.
            dots[i].r = dots[i].h;
        }
        
        // Remove object if too large.
        // .splice here removes indexed object 'i', 
        // and this '1' object only.
        if (dots[i].r > width/10) dots.splice(i,1);
    }
    
    // For manually affecting rotation (via force; mouseY),
    // as well as speed of wind (mouseX).
    controls();
    windV.x = map(mouseX, 0,width, -0.1,0.1);
    
}

function controls(){
    // How much has mouse moved?
    let dx = mouseX-mx;
    let dy = mouseY-my;
    
    // Only change rotation if y movement
    // of mouse greater than x movement.
    if (Math.abs(dy) > Math.abs(dx)){
    for (let i = dots.length-1; i >= 0; i--){
        dots[i].anga += dy*0.1;
        //dots[i].t = map(mouseY, 0,height, 0,360);
    }
    }

    // Update record of mouse position.
    mx = mouseX;
    my = mouseY;
}

// Pass in Particle object.
function renderHawk(_p){
    
    // Save co-ordinate matrix.
    push();
    
    translate(_p.pv.x,_p.pv.y);
    rotate(_p.t);
    
    if (_p.w === _p.h){
        stroke(0);
        fill(255,99);
        
        // Circle.
        circle(0,0,_p.r);
        // Draw line, so
        // we can see rotations.
        line(0,0,0,-_p.r*0.5);
        
    }else {
    stroke(0);
    strokeWeight(2);
    fill(255);
        
    // Using width and height.
    rect(0,0,_p.w,_p.h);
    }
    
    // Golden ratio snub.
    //rect(0,0,_r*1.618,_r);
    
    // A little longer -- felt right for the crow.
    //rect(0,0,_r*2.618,_r);
    
    // Restore co-ordinate matrix.
    pop();
    
}

function mousePressed(){
    dots.push(new Particle( mouseX,mouseY,
                            width/12));
    dots[dots.length-1].h = width/24;
    // Only height need be assigned, since
    // width will have used radius, which
    // has already been given as width/12.
}

function mouseDragged(){
    dots.push(new Particle( mouseX,mouseY,
                            width/64));
}

function mouseMoved(){
    //dots.push(new Particle(mouseX,mouseY, random(0.4,7)));
}


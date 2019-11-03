// Performance boost.
p5.disablefriendlyerrors = true;

// Array of particles.
let dots = [];

// Alpha for particles.
let alpha = 255;

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
    mx = mouseX = width/2;
    my = mouseY = height/2;
    
    // Wind vector.
    //windV = createVector(-0.0001,-0.0042);
    windV = createVector(-0.001,-0.0042);
    
    dots.push(new Particle(width/2,height/2,width/12));
    dots[0].h = width/24;
}

function draw(){
    background(0,200,222,49);
    
    stroke(0);
    noFill();
    
    if (dots[0].pv.x - dots[0].w*0.5 < width/2+width/8 &
       dots[0].pv.x + dots[0].w*0.5 > width/2-width/8 &
       dots[0].pv.y - dots[0].h*0.5 < height/3+height/8 &
       dots[0].pv.y + dots[0].h*0.5 > height/3-height/8){
        stroke(0);
        fill(255,200,0,42);
    }
    rect(width/2, height/3,width/4,height/4);
    
    // Iterate backwards over array, since we
    // may remove objects.
    for (let i = dots.length-1; i >= 0; i--){
            
        // Basic Euler and rendering.
        
        // Gravity.
        dots[i].av.y += 0.098;
        
        // Let's see if we can't simulate the wind.
        // Wind's effect on rotation.
        dots[i].anga += (Math.sin(radians(dots[i].t)) *
            windV.x * dots[i].h) +
            (Math.cos(radians(dots[i].t)) *
            windV.y * dots[i].w);
        // Some random wind force (angular acceleration).
        dots[i].anga += random(-0.2, 0.2);
        
        // Wind's effect on position.
        // Need to take into consideration
        // rotation of the particle.
        // So, do this by trigonometric
        // functions across the components
        // of the wind's vector multiplied by
        // the corresponding dimensions of the
        // particle.
        dots[i].av.y += windV.y * 
            Math.abs(Math.cos(radians(dots[i].t))) *
            dots[i].w;
         dots[i].av.x += windV.x * 
            Math.abs(Math.sin(radians(dots[i].t))) *
            dots[i].h;
        
        // Dubious...but perhaps working.
       // dots[i].av.y += windV.x * 
         //   Math.abs(Math.cos(radians(dots[i].t))) *
           // dots[i].w;
       //  dots[i].av.x += windV.y * 
         //   Math.abs(Math.sin(radians(dots[i].t))) *
           // dots[i].h;
        
        dots[i].update();
        //dots[i].screenWrap();
        dots[i].screenBounce('y');
        dots[i].screenWrap('x');
        dots[i].render(renderHawk);
        
        // If square, grow the particle.
        // (For shits and giggles).
        if (dots[i].h === dots[i].w) {
            //dots[i].w += 0.1;
            //dots[i].h += 0.1;
            // Make sure we update radius.
            dots[i].r = dots[i].h;
        }
        
        // Remove object if too large.
        // .splice here removes indexed object 'i', 
        // and this '1' object only.
        if (dots[i].r > width/10) dots.splice(i,1);
    }
    
    //text("theta="+dots[0].t,dots[0].pv.x, dots[0].pv.y-42);
    
    // For manually affecting rotation (via force; mouseY),
    // as well as speed of wind (mouseX).
    controls();
    //windV.x = map(mouseX, 0,width, -0.1,0.1);
    
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
        //dots[i].t = map(mouseY, 0,height, 0,180);
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
        stroke(0,alpha);
        strokeWeight(1);
        fill(255,0,255,alpha);
        
        // Circle.
        circle(0,0,_p.r);
        // Draw line, so
        // we can see rotations.
        strokeWeight(2);
        line(0,0,0,-_p.r*0.5);
        
    }else {
    stroke(0,alpha);
    strokeWeight(2);
    fill(map(Math.abs(_p.vv.x),0,3,0,255),alpha);
    // Using width and height.
    rect(0,0,_p.w,_p.h);
    }
    
    // Restore co-ordinate matrix.
    pop();
    
}

function mousePressed(){
   // dots.push(new Particle( mouseX,mouseY,
     //                       width/12));
    //dots[dots.length-1].h = width/24;
    // Only height need be assigned, since
    // width will have used radius, which
    // has already been given as width/12.
    
    // Propulsion right.
    dots[0].av.x += 1;
}

function mouseDragged(){
    dots.push(new Particle( mouseX,mouseY,
                            width/44));
}

function mouseMoved(){
    //dots.push(new Particle(mouseX,mouseY, random(0.4,7)));
}


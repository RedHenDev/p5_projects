// Feb 2021.

// Each mass and length of rods.
let m1 = 7;
let m2 = 4.2;
let rod1 = 100;
let rod2 = 64;

// Gravity.
let g = 0.314;

// Theta positions, velocities, 
// and accelerations.
let tpos1 = 0;
let tpos2 = 0;
let tvel1 = 0;
let tvel2 = 0;
let tacc1 = 0;
let tacc2 = 0;

// Bobs and pivots.
// Positions as vectors.
let bob1;
let bob2;
let piv1;
let piv2;

// Previous second bob position.
// For drawing trail.
let prev;

function setup() {
  createCanvas(400, 400);
  
  underCanvas = createGraphics(width,height);
  
  textSize(22);
  
  strokeWeight(4);
  
  // Starting thetas.
  tpos1 = PI/2;
  tpos2 = PI/4;
  
  bob1 = createVector();
  bob2 = createVector();
  piv1 = createVector(width*0.5,
                      height*0.5);
  piv2 = createVector();
  
  prev = createVector();
}

function mousePressed(){
  if (Math.abs(tvel1) < 0.04){
    tvel1 += -0.02;
    tvel2 += 0.02;
  }
}

function updatePendulums(){
  
  // piv1 = createVector(mouseX,
  //                     mouseY);
  
  // PHYSICS :O
  /* 
  https://en.wikipedia.org/
  wiki/Double_pendulum
  */
  
 tacc1 = (-g*(2* m1 + m2)*
         Math.sin(tpos1) -
         m2 * g * Math.sin(tpos1 - 2 * tpos2) -
         2 * Math.sin(tpos1-tpos2) *
          m2 * 
   (tvel2*tvel2*rod2 + tvel1*tvel1*rod1*
    Math.cos(tpos1-tpos2))) /
   (rod1 * 
   (2* m1 + m2 - m2 * Math.cos(2*tpos1 - 2*tpos2)));
  
  tacc2 = (2 * Math.sin(tpos1-tpos2) * (
    tvel1*tvel1*rod1*(m1+m2)+g*
    (m1+m2)*Math.cos(tpos1)+tvel2*
    tvel2*rod2*m2*Math.cos(tpos1-tpos2))) /
    (rod2 * 
    (2* m1 + m2 - m2 * Math.cos(2*tpos1 - 2*tpos2)));
  
 tvel1 += tacc1;
 tpos1 += tvel1;
  tvel2 += tacc2;
 tpos2 += tvel2;

    // Simple friction.
    tvel1 *= 0.999;
    tvel2 *= 0.999;
 
}

function renderPendulum(){
  
  // First work out bob position of 1.
  bob1.x = piv1.x + rod1 * Math.sin(tpos1);
  bob1.y = piv1.y + rod1 * Math.cos(tpos1);
  // Now set pivot of 2 -- fix to bob1 pos.
  piv2.x = bob1.x; piv2.y = bob1.y;
  // Next work out bob position of 2.
  bob2.x = piv2.x + rod2 * Math.sin(tpos2);
  bob2.y = piv2.y + rod2 * Math.cos(tpos2);
  
  if (frameCount == 1){
    prev.x = bob2.x;
    prev.y = bob2.y;
  }
  
  fill(255,142);
  stroke(0,255,0);
  circle(piv1.x, piv1.y, 7);
  circle(piv2.x, piv2.y, 7);
  line(piv1.x,piv1.y,bob1.x,bob1.y);
  line(piv2.x,piv2.y,bob2.x,bob2.y);
  circle(bob1.x,bob1.y,m1*3);
  circle(bob2.x,bob2.y,m2*3);
  
  // Second bob trail.
  underCanvas.stroke(200);
  underCanvas.strokeWeight(4);
  underCanvas.background(0,3);
    underCanvas.line(bob2.x,bob2.y,prev.x,prev.y);
    image(underCanvas,0,0);
  
  
  if (frameCount > 1){
    prev.x = bob2.x;
    prev.y = bob2.y;
  }
}

function draw() {
  
  
  
  // Pink.
  //background('#770077');
  // Baby blue.
  background('#004477');
  
  
  
  updatePendulums();
  renderPendulum();
  
  
  noStroke();
  // Message.
  fill(0,200,0);
  text("tap to add speed",12,height-4);
  // Title.
  fill(255);
  text("chaosENGINE",width-144,24);
}
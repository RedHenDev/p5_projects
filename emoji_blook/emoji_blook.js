let peas = [];   // Array of particles.
let mV;          // Mouse position vector.
let roi = 0;     // Rate of infection.
let covidStamp = 0;
let infDiff = roi;

// For turning on sticky attraction and
// infection dynamic.
let makeSticky = true;
let makeInfectious = true;
// See initObj() where this is used to set
// all new particles to emojis/not emojis.
let makeEmoji = false;

// Enum for mode a particle is in,
// to control different behaviours.
let pMode = {
  DEFAULT : 0,
  INFECTED: 1
}

function setup() {
  // createCanvas(windowWidth,
  //              windowHeight);
  
  createCanvas(displayWidth*0.97,
               displayHeight*0.8);
  
  initObjs();
  mV = createVector(mouseX,mouseY);
  textAlign(CENTER,CENTER);
  strokeWeight(1);
}

function initObjs(){
  for (let i = 0; i < 99; i++){
    let temp = new Blook(true,i);
		temp.emoji = makeEmoji;
    peas.push(temp);
  }
  peas[0].mode = pMode.INFECTED;
}

function mousePressed(){
  //makeSticky = !makeSticky;
  makeInfectious = !makeInfectious;
  
  // Reset infection rate values.
  roi = 0;     // Rate of infection.
  infDiff = roi;
  
  if (makeInfectious) peas[0].mode =
    pMode.INFECTED;
}

function draw() {
  //background(0,190,210,75);
	if (frameCount % 3 === 0)
  background(0,190,210);
  // Find position vector of mouse here, so only
  // once per update.
  mV.x = mouseX;
  mV.y = mouseY;
  
  for (let i = 0; i < peas.length; i++){
    peas[i].update();
    peas[i].render();
  }
  
  if (makeInfectious)
  displayProperties();
}

function displayProperties(){
  /* First, display infection rate.
  // Every second could be one day.
  So, rate of infection (ROI) is
  number of particles infected divided
  by how many days passed?
  */
 
  // Count up how many infections.
	let inf = 0;
	for (let p = 0; p < peas.length; p++){
    if (peas[p].mode === pMode.INFECTED) 
      inf++;
	}
	// Has another week passed?
  if (millis() - covidStamp > 7000){
  covidStamp = millis();
  // Differnce between last number of infected
  // and present number.
  // ROI set to total present number.
  infDiff = inf - roi;
  roi = inf;
  }
	// Display infection info. 
  fill(255,0,255);
  stroke(0);
	strokeWeight(3);
  textSize(42);
  text("Rate = " + 
			 Math.round(infDiff), 142, 42);
	text("Total = " + Math.round((inf/peas.length) *
			 100) + "%", 142, 82);
    
}

class Blook{
 constructor(brownian, id){
   this.id = id;
   this.mode = pMode.DEFAULT;
   this.sticky = false;
   this.covid = false;
	 this.emoji = false;
   this.pos = createVector();
   this.pos.x = random(width);
   this.pos.y = random(height);
   this.vel = createVector(0,0);
   this.vel.x = random(-1.5,1.5);
   this.vel.y = random(-1.5,1.5);
   this.acc = createVector();
	 this.sMax = 12;
   this.size = random(6,this.sMax);
   // How many seconds before random
   // acceleration change?
   this.brownian = brownian;
   this.tDC = random(1,4) * 1000;
   this.tDCstamp = 0;
 }
  
  render(){
		strokeWeight(2);
		// First, we need to calculate size,
		// as determined by display type.
		// If we are an emoji, then we want
		// to be 10* larger. NB *5 since this
		// value used more for connecting lines etc.
		let eSize;
		if (this.emoji) 
			eSize = this.size * 2.5 * displayDensity();
		else eSize = this.size;
		
    // Connecting lines.
		if (frameCount % 3 === 0){
    for (let p = this.id; p < peas.length; p++){
      if (peas[p] === this) continue;
      // stroke(map(this.pos.y,0,height,100,255),
      //        map(this.pos.x,0,width,100,255),
      //        map(this.pos.y,0,height,100,255),
      //        map(p5.Vector.sub(peas[p].pos,
      //   this.pos).mag(),0,width*0.25,255,0));
      let pDist = p5.Vector.sub(peas[p].pos,
        this.pos);
      stroke(255,map(pDist.mag(),50,200,255,0));
      
      line(this.pos.x,this.pos.y,
           peas[p].pos.x,peas[p].pos.y);
			
			// Add mutual attraction force.
			// Mapping function used here so
			// that we can use very different
			// sizes of particle, but still get
			// the same attraction dynamics.
      if (this.sticky){
        if (pDist.mag() < 
						map(this.size,6,this.sMax,20,32)){
          this.acc.add(pDist.mult(0.0033*3));
          peas[p].acc.sub(pDist);
        }
      }
			
      // Check infection.
      if (frameCount % 6 === 0 && this.covid){
				let pEsize;
				if (peas[p].emoji) 
					pEsize = peas[p].size * 2.5 * displayDensity();
				else pEsize = peas[p].size;
				
				if (this.mode === pMode.INFECTED &&
						peas[p].mode === pMode.INFECTED)
					continue;
				if (pDist.mag() < ((pEsize) +
												(eSize)) &&
         		peas[p].mode === pMode.INFECTED){
						this.mode = pMode.INFECTED;
					continue;
				}
      	if (pDist.mag() < (pEsize +
												(eSize)) &&
         		this.mode === pMode.INFECTED)
						peas[p].mode = pMode.INFECTED;
      }
    }
		} // End of connecting lines.
    //return;
    // Dot itself.
		strokeWeight(1);
		if (!this.emoji){
		if (this.mode===pMode.DEFAULT){
			stroke(255,255);
    	fill(255,255);
		}
		else if (this.mode===pMode.INFECTED){
			fill(255,0,255,255);
			stroke(0,0,255,255);
		}
    //circle(this.pos.x,this.pos.y,this.size);
			push();
			translate(this.pos.x, this.pos.y);
			stroke(0);
			strokeWeight(3);
			beginShape();
				for (let i = 0; i < 7; i++){
					vertex(this.size* 
								 Math.cos(radians(i*60)),
								 this.size* 
								 Math.sin(radians(i*60)));
				}
			endShape();
			pop();
		}
		else {
		// Emoji version.
    textSize((this.size*5)*displayDensity());
    let pManifest = "🥶";
    let pInfect = "🥵";
    //"🤢";
    if (this.mode === pMode.DEFAULT)
      pManifest = "🥶";
      else if (this.mode === pMode.INFECTED)
        pManifest = pInfect;
    text(pManifest,this.pos.x,this.pos.y);
		}
  }
  
  addRandomAcc(){
    this.acc.x += -2 + Math.random() * 4;
    this.acc.y += -2 + Math.random() * 4;
  }
  
  update(){
    
    // Avoid mouse.
    //if (frameCount % 1 === 0 &&
        if(p5.Vector.dist(mV,this.pos) < 65){
     this.pos.sub(p5.Vector.
                  sub(mV,this.pos).
                  normalize().mult(8));
    }
    
    // Euler integration.
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.x = 0;
    this.acc.y = 0;
    // Friction. Only if brownian motion on.
    if (this.brownian)
    this.vel.mult(0.99);
    
    // Screen-wrap.
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y > height) this.pos.y = 0;
    
    // Should I be sticky? Infectious?
    if (makeSticky) this.sticky = true;
    else this.sticky = false;
    if (makeInfectious) {
      this.covid = true;
    }
    else { this.covid = false;
          if (this.mode != pMode.DEFAULT)
             this.mode = pMode.DEFAULT;
         }

    // Timing events.
    if (!this.brownian)return;
    if (millis() - this.tDCstamp > this.tDC){
    this.tDCstamp = millis();
    this.addRandomAcc();
  } 
  }
}
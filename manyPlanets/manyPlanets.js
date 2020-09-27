
// Background object.
let bg;

let font;

// Planets.
let planets = [];


// Subject Euler physics vectors etc.
let pos;	// Position.
let vel;	// Velocity.
let acc;	// Acceleration.
let r =-90;	// Rotation.	
let maxSpeed = 3;
let impulseF = 1;	// Booster amount.

// Music.
let music1;

function preload(){
    moonT = loadImage("2k_moon2.jpg");
    marsT = loadImage("2k_mars.jpg");
  	starsT = loadImage("2k_stars_milky.jpg");  
  	sunT = loadImage("2k_sun.jpg");
  	earthT = loadImage("2k_earth.jpg");
		soilT = loadImage("soil.jpg");
		marioT = loadImage("33HU.gif");
	
    font = loadFont("OpenSans-Regular.ttf");
	
		music1 = loadSound("airtone_-_reCreation.mp3");
}

function setup(){
    
  createCanvas(windowWidth,windowHeight, WEBGL);
	
	perspective(PI/3.0, width/height, 0.9, 900000);
	
    bg = new Background;
    //bg.refresh();
	
    noStroke();
    
    generatePlanets();
    
    //ambientMaterial(250);
	shininess(42);
	specularColor(0,200,200);
  specularMaterial(0,200,200);
	
    textSize(22);
    textAlign(CENTER, CENTER);
    textFont(font);
  
  	// Subject's position etc. vectors.
  	pos = createVector(0,0,0);
		vel = createVector(0,0,0);
		acc = createVector(0,0,0);
}

function generatePlanets(){
   
    for (let i=0;i<222;i++){
        planets.push(new Planet);
    }

}

function inputs(){
	// Reverse steer if pressing reverse.
	let va = 1;		
 	if (keyIsDown(40)) va = -1;
  
		// Left arrow or A.
    if (keyIsDown(37) || keyIsDown(65)){
         r-=1 * va;
    } // Right arrow or D.
    if (keyIsDown(39) || keyIsDown(68)){
         r+=1 * va;
    }	// Up arrow.
    if (keyIsDown(38)){
        acc.x+= sin(-radians(r)) * impulseF;
        acc.z+= cos(-radians(r)) * impulseF;
    } // Down arrow.
    if (keyIsDown(40)){
        acc.x-= sin(-radians(r)) * impulseF;
        acc.z-= cos(-radians(r)) * impulseF;
    }	// W.
  	if (keyIsDown(87)){
	  acc.y += 1 * impulseF;
	}	// S.
  if (keyIsDown(83)){
	  acc.y -= 1 * impulseF;
	}
  
}

function draw(){
    bg.refresh();
    //background(70,0,70);

	// Steer and propulsion.
	inputs();
	subjectPhysics();
	
  // Text in front of subject.
//    push();
//  		translate(-20,0,500);
//    	text(new Date().getDay(), 0,0);
//  	pop();
  push();
  	// Centre of scene camera for rotation.
    translate(0,0,700);
    rotateY(radians(r));
    
    // Translate to Subject's position.    
    translate(pos.x,pos.y,pos.z);
  
    //let dirY = (mouseY / height - 0.5) *2;
    //let dirX = (mouseX / width - 0.5) *2;
    //directionalLight(250, 250, 0, -dirX, -dirY, -1);
    
	directionalLight(250, 250, 250, 1, -1, -1);
    
    planets.forEach(update);
  
		pop();
	text(	"X>"		+	Math.floor(pos.x)	+
				"\nY>"	+	Math.floor(pos.y)	+
				"\nZ>"	+	Math.floor(pos.z)
				, 0,0,0);
	
    // Static sky sphere.
  	//skySphere();  	
}


function skySphere(){
  // Static sky sphere.
  	translate(-pos.x,-pos.y,-pos.z);
  	ambientLight(25,
	map(Math.sin(frameCount*0.02),-1,1,100,242),
				 25);
  	texture(starsT);
  	sphere(2512,42);
}

function mouseDragged(){
    planets.forEach(pullP);
}

function keyPressed(){
    //planets.forEach(reverseP);
}

function mousePressed(){
	// Permit sounds.
		userStartAudio();
	// Begin music.
	if (!music1.isPlaying()){
		music1.play();
	}
	
    planets.forEach(pushP);
	//alert("Playing God, is it?");
}

function reverseP(item, index){
    planets[index].vel.mult(-1);
    planets[index].acc.mult(-1);
}

// All planets forced away from origin.
function pushP(item, index){
	
		// I think this pos is in front of subject.
    let originV = createVector
		(pos.x, pos.y, pos.z);
  
    let dirV = 
				p5.Vector.sub(
					planets[index].pos, 
					originV);
 
		// Greater the distance,
		// greater the force.
    //dirV.mult((dirV.magSq())); 
  
  	// Force restrictor.
  	while (dirV.mag()>1){
			dirV.mult(0.5);
		}
			  
	// Add force.
	let force = 10;
	planets[index].acc.add
		(dirV.mult(force));
}

// Pull all planets towards centre of
// galaxy, as it were.
function pullP(item, index){
	
		// I think this pos is in front of subject.
    let originV = createVector(
			0,
			-2000000,
			0);
  
    let dirV = 
				p5.Vector.sub(
					planets[index].pos, 
					originV);
 
		// Greater the distance,
		// greater the force.
   // dirV.mult((dirV.magSq())); 
  
  	// Force restrictor.
  	while (dirV.mag()>1){
			dirV.mult(0.5);
		}
			  
		// Add force.
	let force = 10;
	planets[index].acc.add
		(dirV.mult(-force));
}

// Euler integration for Subject.
function subjectPhysics(){
	vel.add(acc);
	pos.add(vel);
	
	// Speed delimiter.
	if (vel.mag() > maxSpeed)
		vel.mult(0.99);
	
	acc.mult(0);
}

function update(item, index){
  
    planets[index].render();
    planets[index].physics();
  let collisionsON = false;
	if (!collisionsON) return;
	
  	// Has there been a collision?
  	let col = false;
  
  	for (let i = 0; i < planets.length; i++){
	  
			
	  if (collisionsON && i != index && 
		  checkSphereCollision(
				planets[index].pos,
		 		planets[i].pos,
		 		planets[index].rad,
		 		planets[i].rad)){
		
		// Just reverse each velocity.
		// And acceleration...
		planets[i].vel.mult(-1);
		planets[index].vel.mult(-1);
		planets[i].acc.mult(-1);
		planets[index].acc.mult(-1);
			
		col = true;
		
	  }
	  if (col) break;
	}
}

// Have these two spheres collided?
function checkSphereCollision(posA, posB, radA, radB){
  
  // Measure distance between the two
  // spheres' position vectors.
  let distanceV = p5.Vector.sub(posA, posB);
  
  // Is the distance between the two
  // position vectors less than the
  // sum of the two spheres' radii?
  if (distanceV.mag() < (radA + radB)){
	  return true;
	  }
	  else return false;
}

class Planet{
    constructor(){
		// Bounds of creation space.
		let gaia = 80000;
        this.pos = new p5.Vector.
				random3D().mult((Math.random()*gaia)+10000);
         
        //this.vel = new p5.Vector.
		//random3D().mult(random(-3,3));
			this.vel = createVector(0,0,0);
        
        this.acc = createVector(0,0,0);
        
        this.rad = random(1,3000);
        
        this.theta = random(0,360);
        
//        this.tex = Math.floor(random(0,2));
//        if (this.tex==1) this.tex = moonT;
//        else this.tex = marsT;
		if (this.rad > 1400){
			this.tex = moonT;
		}
		else if (this.rad > 700){
			this.tex = sunT;
		}
		else if (this.rad > 342){
			this.tex = earthT;
		}
		else if (this.rad > 170){
			this.tex = marsT;
		}
		else if (this.rad > 0){
			this.tex = soilT;
		}
    }
    
    render(){
        push();
        
        translate(  this.pos.x,
                    this.pos.y,
                    this.pos.z);
        
        this.theta+=0.1;
        
        rotate((10/this.rad)*this.theta, [0,1,0]);
        
		if (this.rad > 700 &
		   this.rad < 800){
			emissiveMaterial(0,200,0);
		} else {specularMaterial(0,200,200);
				texture(this.tex);
			   }
		
		
        sphere(this.rad, 24);
        
        pop();
    }
    
    physics(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        
        this.acc.mult(0);
        
        // Space friction.
        this.vel.mult(0.99);
	  
        /*
        if (this.vel.magnitude > 12){
            this.vel.mult(0.5);
        } else this.vel.mult(0.996);
        */
    }
}

class Background{
    constructor(){
	  
	  	// 140 r, 66 b is a nice pink.
        this.r = random(0,255);
        this.g = 0;
        this.b = random(0,255);
        
        this.t = 1;
    }
    
    refresh(){
        background( this.r,
                    this.g,
                    this.b,);
    }
}
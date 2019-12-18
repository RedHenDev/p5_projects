
// Background object.
let bg;

// Planets.
let planets = [];

let font;

let r = -90;

// location.
let wx = 0;
let wz = 0;
let wy = 0;

let ww;

function preload(){
    moonT = loadImage("2k_moon2.jpg");
    marsT = loadImage("2k_mars.jpg");
  	starsT = loadImage("2k_stars_milky.jpg");  
  	sunT = loadImage("2k_sun.jpg");
  
    font = loadFont("OpenSans-Regular.ttf");
}

function setup(){
    
    createCanvas(windowWidth,windowHeight, WEBGL);
    
    bg = new Background;
    bg.refresh();
    
    noStroke();
    
    generatePlanets();
    
    ambientMaterial(250);
    
    textSize(22);
    textAlign(CENTER, CENTER);
    textFont(font);
  
  	// Subject's position vector.
  	ww = createVector(wx,wy,wz);
}

function generatePlanets(){
   
    for (let i=0;i<44;i++){
        planets.push(new Planet);
    }

}

function draw(){
    bg.refresh();
    
    let z = map(mouseX, 0, width, -100,0);
    
  	let va = 1;
 	if (keyIsDown(40)) va = -1;
  
    if (keyIsDown(37) || keyIsDown(65)){
         r-=1 * va;
    }
    if (keyIsDown(39) || keyIsDown(68)){
         r+=1 * va;
    }
    if (keyIsDown(38)){
        wx+= sin(-radians(r));
        wz+= cos(-radians(r));
    }
    if (keyIsDown(40)){
        wx-= sin(-radians(r));
        wz-= cos(-radians(r));
    }
  	if (keyIsDown(87)){
	  wy += 1;
	}
  if (keyIsDown(83)){
	  wy -= 1;
	}
  
  // Text in front of subject.
//    push();
//  		translate(0,0,500);
//    	text('Z = ' + Math.floor(wz), 0,0);
//  	pop();
  
  	// Centre of scene camera for rotation.
    translate(0,0,700);
    rotateY(radians(r));
    
    // Translate to Subject's position.    
    translate(wx,wy,wz);
  
    //let dirY = (mouseY / height - 0.5) *2;
    //let dirX = (mouseX / width - 0.5) *2;
    //directionalLight(250, 250, 0, -dirX, -dirY, -1);
    directionalLight(250, 250, 250, 1, -1, -1);
    
    planets.forEach(update);
  
    // Static sky sphere.
  	//skySphere();  	
}

function checkRay(index){
  // Refresh subject's position vector.
  ww.x = wx;
  ww.y = wy;
  ww.z = wz;
}

function skySphere(){
  // Static sky sphere.
  	translate(-wx,0,-wz);
  	ambientLight(25,
				 map(Math.sin(frameCount*0.02),-1,1,25,222),
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
    planets.forEach(pushP);
}

function reverseP(item, index){
    planets[index].vel.mult(-1);
    planets[index].acc.mult(-1);
}

function pushP(item, index){
    let originV = new p5.Vector(0, 0, -50);
    
    let dirV = originV.sub(planets[index].pos);
 
    dirV.mult(-1*(1000/dirV.magSq()) *
             (10/planets[index].rad));
    
    planets[index].acc.add(dirV);
}

function pullP(item, index){
    //if (index>0) {
    let originV = new p5.Vector(0, 0, -50);
    //let originV = createVector(
      //  planets[0].pos.x,
        //planets[0].pos.y,
        //planets[0].pos.z);
  
    let dirV = originV.sub(planets[index].pos);
 
    dirV.mult((dirV.magSq()*0.00000001)); 
              //*(10/planets[index].rad));
  
  // Force restrictor.
  		if (dirV.mag()>1)
		dirV.mult(0.001);
			  
    
    planets[index].acc.add(dirV);
    //}
}

function update(item, index){
  
  let d = planets[index].pos.dist(ww);
  	if (d < 20) {
	  console.log('planet ' + index + ' at ' + d + ' metres.' );
	  //planets[index].tex = sunT;
	} 
  
    planets[index].render();
    planets[index].physics();
  
  	// Has there been a collision?
  	let col = false;
  
  	for (let i = 0; i < planets.length; i++){
	  
	  if (i != index && 
		  checkSphereCollision(	planets[index].pos,
		 						planets[i].pos,
		 						planets[index].rad,
		 						planets[i].rad)){
		
		// Just reverse each velocity.
		planets[i].vel.mult(-1);
		planets[index].vel.mult(-1);
		
		// Swap velocity vectors, and move on.
//		let tempV = planets[index].vel.copy();
//		tempV.mult(0.996);
//		planets[index].vel = planets[i].vel.copy();
//		planets[i].vel = tempV.copy();
		
		//planets[i].vel = p5.Vector.random3D();
		
//		stroke(255,0,255);
//		strokeWeight(2);
//		line(planets[i].pos.x,
//			 planets[i].pos.y,
//			 planets[i].pos.z,
//			 planets[index].pos.x,
//			 planets[index].pos.y,
//			 planets[index].pos.z);
//		noStroke();
		
//		planets[i].acc.add(planets[index].vel);
//		planets[index].acc.add(planets[i].vel);
		//planets[i].vel.mult(0);
		//planets[index].vel.mult(0);
	  }
	  if (col) break;
	  else col = false;
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
        this.pos = new p5.Vector(random(-width/2,width/2),
                             random(-height/2,height/2),
                            random(0,-100));
         
        this.vel = new p5.Vector(random(-3,3),
                                random(-3,3),
                                random(-3,3));
        
        this.acc = new p5.Vector(0,0,0);
        
        this.rad = random(0.1,22);
        
        this.theta = 0;
        
        this.tex = Math.floor(random(0,2));
        if (this.tex==1) this.tex = moonT;
        else this.tex = marsT;
    }
    
    render(){
        push();
        
        translate(  this.pos.x,
                    this.pos.y,
                    this.pos.z);
        
        this.theta+=0.001;
        
        rotate((10/this.rad)*this.theta, [0,1,0]);
        texture(this.tex);
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
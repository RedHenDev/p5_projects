
let boxes = [];

// Player rotation.
let theta = 0;

let px = 0;
let py = 0;
let pz = 0;

function setup(){
	
	createCanvas(windowWidth,
				 windowHeight,WEBGL);
	background(random(255),0,random(255));
	
	for (let i = 0; i < 100; i++){
		boxes.push(new 
				   Box(random(-width, width),
					  random(-width, width),
					  random(-width, width)));
		
		
	}

}

function draw(){
	background(200,0,200);
	
	checkInput();
	
	// Position at centre of 
	// world, then rotate by
	// player's rotation.
	translate(0,0,700);
	rotateY(radians(theta));
	
	
	// Now move to player's position.
	translate(px, py, pz);
	
	for (let i = 0; i < boxes.length; i++){	
		boxes[i].render();
	}

}


function checkInput(){
	// Left arrow or A.
	if (keyIsDown(37) || keyIsDown(65)){
         theta = theta - 1;
    }
	// Right arrow or D.
    if (keyIsDown(39) || keyIsDown(68)){
        theta = theta + 1;
    }
	
	// Move forwards please! :)
	if (keyIsDown(38)){
        px += sin(-radians(theta));
        pz += cos(-radians(theta));
    }
	
}

class Box{
	constructor(_x, _y, _z){
		this.pos = createVector(_x,
							   _y,
							   _z);
		this.rad = 200;
	}
	
	render(){
		
		push();
		translate(this.pos.x,
				 this.pos.y,
				 this.pos.z);
		box(this.rad);
		pop();
	}

	
}
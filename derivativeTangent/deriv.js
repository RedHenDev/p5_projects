

function setup(){
  createCanvas(	windowWidth,
								windowHeight);
	
	mouseX = width/2;
	mouseY = height/2;
    
}


/*
Now, it would be cool to track x value from the mouseX.
So then we'd have to graph the function from -whatever
to the current mouseX position.
I guess increments of 0.25 should be more than enough?
*/
function draw(){
	background(200,0,200);
	
	drawAxes();
	
	//graphFunction(mouseX);
	graphFunction(width);
}

function graphFunction(_x){
	// Loop over all values for x from 0 to 
	// current x position, which is the parameter.
	
	stroke(0);
	let reach = 400;
	let startPoint = -reach;
	let scalar = map(mouseY,0,height,0.1,200);
	strokeWeight(map(scalar,0.1,200,0.4,8));
	// Map x to axes: shift back half of width.
	_x = map(_x,0,width,-reach,reach);
	let mX = map(mouseX,0,width,-reach,reach)/scalar;
	let x, x2, y, y2;
	let cX, cY;
	for (let i = startPoint; i < _x; 
			 i+=(map(scalar,0.1,200,0.25,0.025))){
		y  = (-f(i)*scalar)+(height*0.5);
		y2 = (-f(i+0.25)*scalar)+(height*0.5);
		x  = ((i)*scalar)+width*0.5;
		x2 = ((i+0.25)*scalar)+(width*0.5);
		line(x,
				 y,
				 x2,
				 y2);
		
		// Grab circle location.
		cX = ((mX)*scalar)+width*0.5;
		cY = (-f(mX)*scalar)+(height*0.5);
	}
	
	noFill();
	stroke(255);
	strokeWeight(2);
	//text("X"+Math.floor(_x),42,42);
	let newX = 
			map(mouseX, 0,width,-reach,reach)/scalar;
	//circle(mouseX,(-f(newX))*scalar+
		//		 (height*0.5),42,42);
	circle(cX, cY, 32,32);
	stroke(255);
	strokeWeight(1);
	fill(255);
	text("X"+Math.floor(newX),42,42);
	text("Y"+Math.floor(f(newX)),42,62);
	stroke(0);
	fill(0);
	text("zoom " + Math.floor(scalar), 42, 92);
}

function f(_x){
	if (_x === 0) return 0;
	//return 1/_x;
	//return Math.sqrt(_x);
	return Math.pow(_x, 2);
	//return Math.sin(_x);
}

// First, we're going to draw some axes.
function drawAxes(){
	strokeWeight(3);
	stroke(255,22);
	// X-axis.
	let xp = width*0.5;
	line(xp,0,xp,height);
	// X-axis.
	let yp = height*0.5;
	line(0,yp,width,yp);
}


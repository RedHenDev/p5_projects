

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
	
	// For drawing circle over graph.
	let mX = map(mouseX,0,width,-reach,reach)/scalar;
	let x, x2, y, y2;
	let cX, cY;
	// Grab circle location.
		cX = ((mX)*scalar)+width*0.5;
		cY = (-f(mX)*scalar)+(height*0.5);
	
	// Iterate over points to draw graph.
	// NB adjusts for scale.
	for (let i = startPoint; i <= _x/scalar; 
			 i+=(map(scalar,0.1,200,0.25,0.025))){
		y  = (-f(i-0.25)*scalar)+(height*0.5);
		y2 = (-f(i)*scalar)+(height*0.5);
		x  = ((i-0.25)*scalar)+width*0.5;
		x2 = ((i)*scalar)+(width*0.5);
		line(x,
				 y,
				 x2,
				 y2);
	}
	
	// Draw tangent.
	// Origin will be (cX, cY).
	// Fixed radius.
	// Derivative (of x**2) = f(2*mX**1).
	// End point, derived from gradient at
	// (cX, cY), will be Ox+r*Cos(radians(deriv)),
	// Oy+r*Sin(radians(deriv)).
	// So, at first we will draw line from origin.
	stroke(255);
	let r = height*0.25;
	line(	cX-r,
			 	cY+r*(2*mX),
				cX+r,
			 	cY-r*(2*mX)
			);
	
	// Draw circle.
	noFill();
	stroke(255);
	strokeWeight(2);
	circle(cX, cY, 32,32);
	
	// Print x & y co-ords derived from mouseX.
	stroke(255);
	strokeWeight(1);
	fill(255);
	text("X"+Math.floor(mX*scalar),42,42);
	text("Y"+Math.floor(f(mX)*scalar),42,62);
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
	//return Math.pow(_x,2) - 2 * _x - 9;
	
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


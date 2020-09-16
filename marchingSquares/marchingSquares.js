
let nodes = [];
let squares = [];

let step;

let rows = 32;
let columns = 32;

function setup(){
    createCanvas(window.innerWidth,
								 window.innerHeight);
    
    background(0,random(0,255),0);
	
	march();
}

function march(){
	nodes = [];
	squares = [];
	
	scatterNodes();
	renderNodes();
	gatherSquares(rows,columns);
	renderSquares();
}

function mousePressed(){
	march();
}

function renderSquares(){
	for (let i = 0; i < squares.length; i++){
		//squares[i].crudeRender();
		squares[i].render();
	}
}

// Create array of squares, each with
// four nodes taken as vertices.
function gatherSquares(_rY, _cX){
	
	let tn = _cX * _rY;	// Total nodes.
	
	// Loop through relevant nodes.
	// Approx 1 square per node.
	// I.e. not any in last column-x.
	// Not any in last row-y.
	for (let i = 0; i < tn - _cX; i++){
		// Multiple of cX-1?
		if (i % _cX-(_cX-1) !== 0){
			let baby = new Square();
			let aFourNodes = [4];
			aFourNodes[0] = nodes[i];
			aFourNodes[1] = nodes[i + 1];
			aFourNodes[2] = nodes[i + 1 + _cX];
			aFourNodes[3] = nodes[i + _cX];
			baby.assignNodes(aFourNodes);
			squares.push(baby);
		}
	}
}

function renderNodes(){
	for (let i = 0; i < nodes.length; i++){
		nodes[i].render();
	}
}

function scatterNodes(){
	// Draw nodes, randomly on or off.
	
	let cX = columns;	// Columns.
	let rY = rows;	// Rows.
	
	// How far apart to draw nodes?
	// Minus 1 from rows in order to fit squares
	// exactly across canvas.
	step = height/(rY);
	// Would be cool to write a LCF function here.
	// I.e. to calc a step that fits maximum 
	// number of nodes in consideration of both
	// height and width.
	
	for (let i = 0; i < rY; i++){
		for (let j = 0; j < cX; j++){
			let baby = new Node(j*step,i*step,
							 Math.round(Math.random()));
			nodes.push(baby);
		}
	}

}

class Square{
	constructor(){
		this.nodes = [4];	
		this.bin = 0;
	}
	assignNodes(aFourNodes){
		// Empty our array of nodes.
		//this.nodes = [];
		// Populate with passed in array.
		this.nodes = aFourNodes;
		
		// Build binary identity based on
		// the four node vertices.
		// Starting with top left, going
		// clockwise.
		this.bin = 	this.nodes[0].on +
								this.nodes[1].on * 2 +
								this.nodes[2].on * 4 +
								this.nodes[3].on * 8;
	}
	
	render(){
		// Half-way points between vertices.
		let l = createVector(this.nodes[0].pos.x,
													 this.nodes[0].pos.y+
													 step*0.5);
		let r = createVector(this.nodes[1].pos.x,
													 this.nodes[0].pos.y+
													 step*0.5);
		let t = createVector(this.nodes[0].pos.x+step*0.5,
													 this.nodes[0].pos.y);
		let b = createVector(this.nodes[0].pos.x+step*0.5,
													 this.nodes[2].pos.y);
		
		switch (this.bin){
			case (1): 
				line(l.x,l.y,t.x,t.y);
				break;
			case (2): 
				line(t.x,t.y,r.x,r.y);
				break;
			case (3): 
				line(l.x,l.y,r.x,r.y);
				break;
			case (4): 
				line(b.x,b.y,r.x,r.y);
				break;
			case (5): 
				line(b.x,b.y,r.x,r.y);
				line(l.x,l.y,t.x,t.y);
				break;
			case (6): 
				line(t.x,t.y,b.x,b.y);
				break;
			case (7): 
				line(l.x,l.y,b.x,b.y);
				break;
			case (8): 
				line(l.x,l.y,b.x,b.y);
				break;
			case (9): 
				line(b.x,b.y,t.x,t.y);
				break;
			case (10): 
				line(t.x,t.y,r.x,r.y);
				line(l.x,l.y,b.x,b.y);
				break;
			case (11): 
				line(b.x,b.y,r.x,r.y);
				break;
			case (12): 
				line(l.x,l.y,r.x,r.y);
				break;
			case (13): 
				line(r.x,r.y,t.x,t.y);
				break;
			case (14): 
				line(t.x,t.y,l.x,l.y);
		}
	}
	
	crudeRender(){
		// Just render squares a random 
		// transparent shade of green.
		fill(0,Math.random()*255,0,101);
		rect(	this.nodes[0].pos.x,
					this.nodes[0].pos.y,
					step,
					step);
	}
	
}

class Node{
	constructor(_x,_y,_on){
		this.pos = createVector(_x,_y);
		this.on = _on;
		this.rad = 4;
	}
	
	render(){
		
		if (this.on) { fill(0);
									stroke(255);
								 }
		else {fill(255);
					stroke(0);
				 }
		circle(this.pos.x,this.pos.y,this.rad);
	}
}

/* 
So, this function will calc which
nodes to grab as the four corners of
the current square.

Of course, the number of squares will
be a function of the number of nodes,
which are themselves a function of how
many columns (x) and rows (y).

Another way of looking at this problem
is to consider each node as the top left
of a new square. That is, all except for
our edge cases: if in final column or final
row. Final row is easy (node > tc * (rc-1)),
and final column...similar? (node % cn == 0),
i.e. is node number a multiple of total columns?
-> So, we could convert the function below
from n = square number to n = node number :D

*/
// n = square number.
// tc = total number of columns.
// tr = total numbers of rows.
function getNodes(_n, _tc, _tr){
	
}
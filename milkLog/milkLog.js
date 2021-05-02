

let haveReset;
let milkMeasure;
let whatDay;

function setup(){
    
		let den = 3.0;
		pixelDensity(den);
	
		createCanvas(window.innerWidth,
								 window.innerHeight);
    
    background(random(100,255),0,random(100,255));
	
	whatDay = day() + month();
	
	checkNewDay();
	
	displayMilk();
}

// If new day, and we haven't refreshed, then
// reset milk level to zero.
function checkNewDay(){
	
	// First time running log on this browser?
	if (getItem('whatDay') == null){
		storeItem('whatDay', whatDay);
		// Also create 'haveReset' and
		// 'milkMeasure' items for storage.
		resetLog();
		return;
	}
	
	// Is it a new day? Else, we can return --
	// since procedures below will have been
	// carried out and whatDay stored value
	// already set to match whatDay variable.
	if (getItem('whatDay')==whatDay) return;
			else {
			// Not same day, so we should reset
			// milk measure values and record
			// that we have reset and what current
			// day it is.
			resetLog();
			}
	
	if (getItem('haveReset') != null){
		if (getItem('haveReset')) return;
		else { resetLog(); }
	}
	else {
		resetLog();
	}
}

function resetLog(){
	haveReset = true;
	storeItem('haveReset', haveReset);
	milkMeasure = 0;
	storeItem('milkMeasure', milkMeasure);
	storeItem('whatDay', whatDay);
}

function displayMilk(){
	// Big emoji on left.
	// Text instructions.
	// Current milk Measure.
	background(random(100,255),0,random(100,255));
	
	textSize(200);
	text("🍼", 42, height/2);
	
	fill(255);
	textSize(64);
	milkMeasure = getItem('milkMeasure');
	text(milkMeasure + "ml", 64, height - 128); 
	
	fill(180);
	textSize(42);
	text("tap at top +10ml, bottom -10ml", 64, height - 64);
}

function mousePressed(){
	if (mouseY > height/2) milkMeasure -= 10;
	else milkMeasure += 10;
	storeItem('milkMeasure', milkMeasure);
	displayMilk();
}


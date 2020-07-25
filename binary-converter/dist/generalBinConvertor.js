// Number of bits.
const howManyBits = 64;

// Input and button doms.
let inputDec;
let inputBin;
let convertBut;
const fontSize = 42;

function setup(){
  createCanvas(640,412);
  background(200,0,200);
  
	textSize(fontSize);
  setupButtons();
}

let converting = false;

function draw(){
		// Timer for how long conversion took.
}

function setupButtons(){
  inputDec = createInput("Decimal number");
	inputBin = createInput("Binary number");
  convertBut = createButton("Convert");
  convertBut.mousePressed(doConversion);
  
  inputDec.position(12, height/2);
	inputBin.position(12, height/3);
  convertBut.position(14, height - height/4 - 14);
		
	inputDec.size(width-24, fontSize);
	inputBin.size(width-24, fontSize);
  convertBut.size(width/4,height/4);
}

// Convert and display both
// decimal to bin and bin to decimal.
function doConversion(){
		
		// What would be nice is to only
	  // display the significant digits.
		let sa = inputDec.value() + " = " +
		sigDigits(decToBin(inputDec.value()));
		
		inputDec.value(sa);
	
	// NB we have to build an array
	// from the raw input of 1s and 0s.
	inputBin.value(inputBin.value() + 
								 " = " + binToDec(
			rawBinToArray(inputBin.value())));
	
		// For timer display.
		converting = false;
}

// Build array of significant digits only.
function sigDigits(_a){
		// Takes in a binary array.
		// Returns this array without
		// its redundant zeroes.
		let ta = _a;
		
		// Find first 1 in array.
		let wi = ta.findIndex(checkDigit);
		// Spice off all indicies up to this 
		// index.
		ta.splice(0,wi);
		
		return ta;
}

// Returns 1 (true) or 0 (false).
function checkDigit(_digit){
		return _digit;
}

// Convert a raw string of 1s and 0s to
// a binary array.
function rawBinToArray(_r){
		// Take each character in turn
		// and push it to our return array
		// as a number.
		let ar = _r;
		ar = String(ar);
		let na = [];
		for (let i = 0; i < ar.length; i++){
				na.push(int(ar[i]));
		}

		return na;
}

// Convert from decimal to binary number.
function decToBin(_n){
  
  // Return an array of n indices.
  
  //let phase = [128,64,32,16,8,4,2,1];
	
	let cE = 	[];		 // Array to return.
	let cp =    [];      // Counter.
  	let sm =    [];      // Switch mode. 
	let phase = [];
	
	// We need to build this phase for
	// n indices.
	for (let i = 0; i < howManyBits; i++){
		// Populate phase with binary powers.
		phase.push(Math.pow(2,i));
		// Populate arrays with zeroes.
		cE.push(0);
		cp.push(0);
		sm.push(0);
	}
	// Reverse for binary ordering.
	phase.reverse();     
  
    // Count up to desired decimal number.
    for (let ni = 0; ni <= _n; ni++){
    
      // Iterate over our n binary digit places.
      for (let Wi = phase.length-1; Wi > -1; Wi--){
					
        // Digit matches switch mode digit.
        cE[Wi] = sm[Wi];
        // Increment individual counter for this digit.
        cp[Wi] += 1;
        // If we hit phase number, switch mode and
        // restart digit's individual counter.
        if (cp[Wi] === phase[Wi]){
          cp[Wi] = 0;
          if (sm[Wi] === 0) sm[Wi] = 1;
          else sm[Wi] = 0;
        }
        
      }
 
    }
  
  return cE;
  
}

// Read an array of binary digits, 
// translate to decimal number.
function binToDec(_a){
		
  let runningTotal = 0;
  for (let i = 0; i < _a.length; i++){
    if (_a[i] === 1){
      // Increment count by 2 to the power of position
      // from back end of binary array.
      runningTotal += pow(2, _a.length-1-i);
    }
  }
  return runningTotal;
}
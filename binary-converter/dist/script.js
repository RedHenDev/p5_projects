let testDec = 110;
let testBin = [1,1,1,1,1,1,1,1];  // NB 8 digits only.

function test(){
  
  textSize(22);
  fill(255);
  stroke(0);
  
  text("Test decimal = " + testDec, 42, 42);
  fill(0);
  stroke(255);
  text("Converted: " + decToBin(testDec), 42, 62);
  fill(255);
  stroke(0);
  text("Test binary = " + testBin, 42, 92);
  fill(0);
  stroke(255);
  text("Converted: " + binToDec(testBin), 42, 112);
}

// Input and button doms.
let inputDec;
let convertBut;

function setup(){
  createCanvas(400,400);
  background(200,0,200);
  
  test();
  setupButtons();
}

function setupButtons(){
  inputDec = createInput("Decimal number (<256)");
  convertBut = createButton("Convert");
  convertBut.mousePressed(doConversion);
  
  inputDec.position(42, height/2);
  convertBut.position(42, height/2 + 42);
  
}

function doConversion(){

  inputDec.value(decToBin(inputDec.value()));
}

// Convert from decimal to binary number.
function decToBin(_n){
  
  // Return an array of 8 indices.
  
  let cE = [0,0,0,0,0,0,0,0];
   
  let phase = [128,64,32,16,8,4,2,1]; // When to switch.
  let cp =    [0,0,0,0,0,0,0,0];      // Counter.
  let sm =    [0,0,0,0,0,0,0,0];      // Switch mode.      
  
    // Count up to desired decimal number.
    for (let ni = 0; ni <= _n; ni++){
    
      // Iterate over our 8 binary digit places.
      for (let Wi = 7; Wi > -1; Wi--){
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

// Read an array of binary digits, translate to decimal number.
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
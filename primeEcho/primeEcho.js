function setup(){
    
    createCanvas(window.innerWidth, window.innerHeight);
    background(0,172, 172);
    
    let nLim = 21000;
    
    setupPrimes(nLim);
    
    screenWrite(nLim, 14);
    //primeNodeWrite(nLim, 5);
}

function screenWrite(_max, _textSize){
    // Writes consecutive numbers to screen, up to _max.
    
    var n = 1;
    
    //noStroke();
    fill(255);
    stroke(0);
    strokeWeight(2);
    
    var tS = _textSize;             // Text size.
    textSize(tS);
    
    var stringChar = n.toString();            // Find out how many digits _max needs.
    
    var xInt = (tS-tS/2.4) * (stringChar.length);    // x interval.
    var yInt = tS;                          // y interval.
    
    //alert(tS + " * " + (stringChar.length) + " = " + xInt);
    
    var nX = 1 //+ xInt;      // Position x (plus first interval).
    var nY = tS;               // Position y.
    
    for (let i = 0; i < _max; i++){
        stringChar = (n).toString();      // Determine x interval for current number string.
        xInt = (tS-tS/2.4)* stringChar.length;                            
        if (nX >= width) { nY += yInt; nX = 1; } // Adjust yPos if end of canvas reached.
        if (checkIfPrime(n)) fill(0);
        else fill(255);
        text(n, nX, nY);                         // Print to screen.
        n++;                                     // Increment n.
        nX += xInt;                              // Move xPos along.
    }
    
    
}

function primeNodeWrite(_max, _nodeSize){
    // Writes consecutive numbers to screen, up to _max.
    
    var n = 1;
    
    //noStroke();
    fill(255);
    stroke(0,255,0);
    
    var alP = 101;                  // Amount of alpha!
    
    var tS = _nodeSize;             // Text size.
    
  
    var xInt = tS;    // x interval.
    var yInt = tS;                          // y interval.
    
    //alert(tS + " * " + (stringChar.length) + " = " + xInt);
    
    var nX = 1 //+ xInt;      // Position x (plus first interval).
    var nY = 1;               // Position y.
    
    for (let i = 0; i < _max; i++){
                                  
        if (nX >= width) { nY += yInt; nX = 1; } // Adjust yPos if end of canvas reached.
        if (checkIfPrime(n)) {stroke(0,alP); fill (255,255);}
        else { stroke(255,alP); fill (0,alP);}
        rect(nX, nY, tS, tS);                         // Print to screen.
        n++;                                     // Increment n.
        nX += xInt;                              // Move xPos along.
    }
    
    
}


// Simple prime number checker.

var primes = [];

function setupPrimes(_max){
    
    primes.push(1); // 0th prime = 1.
    primes.push(2); // 1st prime = 2.
    
    
    var n = 3;      // Start checking at 1.
    
    for (let i = 1; i <= _max; i++){
        for (let j = 1; j < primes.length; j++){
            if ((n) % primes[j] === 0)          // Not prime.    
            {   
                n++;                        // So, try next integer.
                j = 0;                      // Re-start existing-prime check loop.
            }
        }
        primes.push(n);
        if (n >= _max) break;
    }
    
    //alert("Finished populating array of primes!");
    
}

function checkIfPrime(_n){
    
    if (_n == 1) return false;
    
    // First, generate array of primes.
    // Is array already populated?
    if (primes.length < _n){
       // let lor = setupPrimes(_n);
    }
    
    // NB we start i at 1, since i at 0 = 1 (which is not prime!).
    for (let i = 1; i < primes.length; i++){
        if (_n == primes[i]) return true;      // It's on the list! It's a prime!
        
        if (_n % primes[i] === 0 && _n != primes[i]) return false; // Not prime!
        
        if (primes[i] > Math.sqrt(_n)) return true; // It's prime (Matt Parker).
    }
    
//    alert("Oh no! Something went wrong. You've either discovered a new prime...or this code has a loop-hole. Either way: nicely found, you!");
//    return null;    // Checked against all (my) known primes.
    
}

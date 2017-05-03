var inB;            // Input box.
var fpB;            // Find prime button.
var cpB;            // Check if prime button.

var primes = [];    // Empty array. Ready to store prime numbers.


function preload(){
    
    primes.push(1);     // Controversial ;)
    primes.push(2);     // First prime -- for free.
}

function setup(){

    createCanvas(window.innerWidth, window.innerHeight);
    
    background(0,102,202); // I call (0,51,0) 'Shiffman Green'.
    
    Setupf8();
    
    inB = createInput('Enter n...');
    inB.size(100,32);
    inB.position((width/2)-50, 32);
    //inB.changed(function(){
//        let pN = findPrimeAt(inB.value());
//        if (pN !== 0)
//        alert('Prime found! :) Prime is *' + pN + '* at index ' + inB.value() + '.');
//    });
    
    fpB = createButton('Find nth prime!');
    fpB.size(100,32);
    fpB.position((width/2)-47, 101);
    fpB.mouseClicked(function(){
        let pN = findPrimeAt(inB.value());
        if (pN !== 0)
        alert('Prime found! :) Prime is *' + pN + '* at index ' + inB.value() + '.');
    });
    
    cpB = createButton('Check if n is prime!');
    cpB.size(100,32);
    cpB.position((width/2)-47, 142);
    cpB.mouseClicked(function(){
        let toF = checkIfPrime(inB.value());
        if (toF == true)
        alert("Yep. " + inB.value() + "'s prime, buddy.");
        else if (toF === false) alert("Nope. Not a prime. Not even close x")
    });
    
    screenWrite(1468, 12);
}

function findPrimeAt(_index){
    
    // Determines prime number at _index along consecutive line of primes.
    // NB ***begins checking from 3***.
    
    if (_index < primes.length) return primes[_index]; 
    
    if (_index > 99999) { alert("You're getting too big for your boots."); return 0; }
    
    var n = 3;          // Start checking at 3.
    
    for (let i = 1; i <= _index; i++){
        for (let j = 1; j < primes.length; j++){
        if ((n) % primes[j] === 0)          // Not prime. 
            {   
                n++;                        // So, try next integer.
                j = 0;                      // Re-start existing-prime check loop.
            }
        }
        primes.push(n);
    }
    
    
    return primes[_index];                  // Return last prime found, @ index requested.
    
}


function checkIfPrime(_n){
    
  if (_n == 1) return false;
  
    if (_n > 99999) { alert("That's much too large for this simple code to check, sorry."); return null; }
    
    // First, generate array of primes.
    // Is array already populated?
   if (primes.length < 99999){
        let lor = findPrimeAt(_n);
    }
    
    // NB we start i at 1, since i at 0 = 1 (which is not prime!).
    for (let i = 1; i < primes.length; i++){
        if (_n == primes[i]) return true;      // It's on the list! It's a prime!
        if (_n % primes[i] === 0 && _n != primes[i]) return false; // Not prime!
      
      if (primes[i] > Math.sqrt(_n)) return true; // Must be a prime if we've crossed this threshold (credit: Matt Parker of Numberphile).
      
    }
    
    //alert("Oh no! Something went wrong. You've either discovered a new prime...or this code has a loop-hole. Either way: nicely found, you!");
    return null;    // Checked against all (my) known primes. Therefore, prime!
    
}



function draw(){
    
    stroke(255,22);

    if (frameCount < 3) noStroke();

 // origin.x = mouseX+ 2* Math.cos(radians(theta));
  //origin.y = mouseY;
  
    translate(origin.x, origin.y);
    rotate(weta);

    line(f8.x, f8.y, prevX, prevY);
 
    prevX = f8.x;
    prevY = f8.y;
    
    
    f8.x = rad * Math.cos(radians(theta));
    f8.y = rad * Math.sin(radians(theta));
    
    f8.x += Math.cos(theta);
    f8.y += Math.sin(theta);
    
    rad += Math.sin(weta);
    
    theta += 64;
    weta += 0.01;
 
    
}



function screenWrite(_max, _textSize){
    // Writes consecutive numbers to screen, up to _max.
    
    var n = 1;
    
    //noStroke();
    fill(255);
    stroke(0,255,0);
    
    var tS = _textSize;             // Text size.
    textSize(tS);
    
    var stringChar = n.toString();            // Find out how many digits _max needs.
    
    var xInt = (tS-tS/2.4) * (stringChar.length);    // x interval.
    var yInt = tS;                          // y interval.
    
    //alert(tS + " * " + (stringChar.length) + " = " + xInt);
    
    var nX = 1 //+ xInt;      // Position x (plus first interval).
    var nY = height/2+tS;               // Position y.
    
    for (let i = 0; i < _max; i++){
        stringChar = (n).toString();      // Determine x interval for current number string.
        xInt = (tS-tS/2.4)* stringChar.length;                            
        if (nX >= width) { nY += yInt; nX = 1; } // Adjust yPos if end of canvas reached.
        if (checkIfPrime(n)) fill(0,255,0);
        else fill(255);
        text(n, nX, nY);                         // Print to screen.
        n++;                                     // Increment n.
        nX += xInt;                              // Move xPos along.
    }
    
    
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


var f8;             
var theta; 

var weta;


var prevX;
var prevY;

var origin;

var rad;

function Setupf8(){
    
    f8 = createVector(0, 0);
 
    origin = createVector();
    
    prevX = origin.x = f8.x = width/2;
    prevY = origin.y = f8.y = height/2.7;
    
    
    theta = -90;  
    
    
    weta = -90;
 
    rad = 32;         // Radius.
    
    
    strokeWeight(1);
  

}










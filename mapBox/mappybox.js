p5.disableFriendlyErrors = true;    // To help performance.
/*

Use one of the following in HTML in order to improve performance.
The former seems to work best...

<meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width">
    
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
*/


// mapbox://styles/redhendev/cizbt2h0f00082so1k8ukr522

// https://api.mapbox.com/styles/v1/mapbox/streets-v8/static/-122.4241,37.78,14.25,0,60/600x600?access_token=

// pk.eyJ1IjoicmVkaGVuZGV2IiwiYSI6ImNpemJzMzQyczAwM2QycW95aWE3MW9wd3EifQ.cES0OnSEDQBjKSriBe7T-w

var ziddy = 1; // zoom.
var hiddy = 1024; // height of map.
var widdy = 1024;   // width of map.

var centre_LON = 0;
var centre_LAT = 0;

//45.4408° N, 12.3155° E Venice

// 3.1390° N, 101.6869° E

var lon = 12.3155;
var lat = 45.4408;

var csvEQ;
var csvFish;

var particles = [];
var attractors = [];

var pColour;

var quantum = true;

function preload(){
    
    //dark-v9 light-v9
    // What's the style for more satellific? satellite-v9 apparently!
    
    // Nice source!
    //http://data.okfn.org/data
    
    // Flights!
    //https://uk.flightaware.com/commercial/data/adsb/#sample-csv
    
    mapImage = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0," + ziddy + ",0,0/" + widdy + "x" + hiddy + "?access_token=pk.eyJ1IjoicmVkaGVuZGV2IiwiYSI6ImNpemJzMzQyczAwM2QycW95aWE3MW9wd3EifQ.cES0OnSEDQBjKSriBe7T-w");
    
    // Earthquakes past hour...
   // csvEQ = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv');
    
    // All earthquakes, past 7 days.
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv
    
    //Co2
  //  https://raw.githubusercontent.com/datasets/co2-ppm/master/data/co2-mm-mlo.csv
    
    // Earthquakes from past month...
   //csvEQ = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
 
    // Local version of all_month.csv downloaded 5th March 2017 @ 16:00.
    //csvEQ = loadStrings('/all_month.csv');
    
    // Significant earthquakes from past month!
    //csvEQ = //loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.csv//');
    
    // Larger than 4.5 magnitue in last month.
    csvEQ = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.csv');
    
    // Air quality.
    //http://www.who.int/entity/phe/health_topics/outdoorair/databases/airquality_dimaq_pm25.csv
    
    // Population.
    //http://data.okfn.org/data/core/population/r/population.csv
    
    //csvEQ = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv');
   
    //csvFlights = loadStrings('https://uk.flightaware.com/commercial/data/adsb/#sample-csv');
   //https://raw.githubusercontent.com/amercader/car-fuel-and-emissions/master/data.csv
   };

   

// Accepts degrees, but must convert into radians.
function mercator_X(lon){
    lon = radians(lon);
    
    var a = (256/PI) * pow(2, ziddy);
    var b = lon + PI;
    
    return a * b;
};

// Accepts degrees, but must convert into radians.
function mercator_Y(lat){
    lat = radians(lat);
    
    var a = (256/PI) * pow(2, ziddy);
    var b = Math.tan((PI/4) + (lat/2));
    var c = PI - log(b);
    
    return a * c;
};

function placeRepulsor(_strength){
    //particles.push(new particle(mouseX, mouseY, 1, 1, pColour));
    //particles[particles.length-1].maxV = 3.2;
    
    var aStrength = _strength;   // Default = -10.
    
    attractors.push(new attractor(mouseX, mouseY, aStrength));
    attractors[attractors.length-1].visible = true;
};


function setup(){
    
    pColour = color(344,333,445);
    
    canvas = createCanvas(widdy,hiddy);
    background(122);
    
    var quantumButton = createButton("Toggle Particle Mode");
    quantumButton.position(width-100,0);
    quantumButton.size(100,100);
    var nBlue = color(0,0,222,122);
    quantumButton.style("background-color", nBlue);
    quantumButton.style("texr-decoration-color", 'white');
    quantumButton.mouseClicked(toggle_quantum);
    
//    var attractorsButton = createButton("Start Attractors");
//    attractorsButton.position(width-200,0);
//    attractorsButton.size(100,100);
//    attractorsButton.style("background-color", 'white');
//    attractorsButton.mouseClicked(start_attractors);
    
   // canvas.mouseClicked(placeRepulsor);
  
    canvas.mouseClicked(toggle_attractors);
    
    translate(width/2,height/2); // Shiffman.
    
    imageMode(CENTER);
    
    image(mapImage,0,0);
    
    // Initialize particles.
    for (var a = 0; a < 64; a++){
    particles.push(new particle(random(0,width),random(0,height),10,10,pColour));
        particles[particles.length-1].velocity = p5.Vector.random2D();
    }
    
    
    var centreX = mercator_X(centre_LON);
    var centreY = mercator_Y(centre_LAT);
    
    loadQuakes();
    
    // ********************************
    // Individual placement LAT LON.
    lon = 101.6869;
    lat = 3.1390;
    var x = mercator_X(lon) - centreX;
    var y = mercator_Y(lat) - centreY;
        
        stroke(255);
        strokeWeight(2);
        fill (0,255,255,222);
        ellipse (x,y,22,22);
    // ********************************
    
    start_attractors();
   // informationDisplay();
    
};

var aON = true;

function toggle_attractors(){
   // if (attractors.length <= 0) return null; 
    
//    aON = !aON;
//    
//    for (var i = 0; i < csvEQ.length; i++){
//        
//       if (aON) attractors[i].strength = magN[i]/700;
//        else attractors[i].strength = 0;
//    }
    
    placeRepulsor(700);
}

function start_attractors(){
    
    //if (attractors.length > 0) return null;
    
    for (var i = 0; i < csvEQ.length; i++){
        
        attractors.push(new attractor(qx[i]+width/2,qy[i]+width/2, magN[i]/700));
    }
    
}

function toggle_quantum(){
    quantum = !quantum;
    
    // Now redraw map etc.
    translate(width/2,height/2); // Shiffman.
    imageMode(CENTER);
    image(mapImage,0,0);
    renderQuakes();
};

var qx = [];
var qy = [];
var magN = [];

function loadQuakes(){
   
    var centreX = mercator_X(centre_LON);
    var centreY = mercator_Y(centre_LAT);
    
    for (var i = 0; i < csvEQ.length; i++){
    //for (var i = 0; i < csvFlights.length; i++){    
    
        var newData = csvEQ[i].split(/,/);
        //var newData = csvFlights[i].split(/,/);
        console.log(newData);
        
        lon = newData[2];
        lat = newData[1];
        
        // Magnitude. 4th index.
        var d = map(newData[3], 0, 10, 0, 300);
        magN.push(d);
        
        var x = mercator_X(lon) - centreX;
        var y = mercator_Y(lat) - centreY;
        
        // Store locations in array (for quicker rendering in draw() loop).
        qx.push(x);
        qy.push(y);
    
        //fill (255,0,0,12);
        //ellipse (x,y,12,12);
        
        // Initialize attractor at earthquake location.
        //attractors.push(new attractor(mercator_X(lon),mercator_Y(lat), magN[i]/10));
    }
    
    renderQuakes();
    
};

function informationDisplay(){
    fill (255);
    stroke (0,0,0);
    strokeWeight(1);
    textSize(22);
    translate(0,0);
    //text("Earthquakes in last 7 days, until " + Date(), 8, 8, width, 100);
    //text("Earthquakes in past hour: " + Date(), 8, 8, width, 100);
    text("Earthquakes > 4.5-mag month before: " + Date(), 8, 8, width, 100);
    //stroke (255);
    fill (255,0,255);
   // text("Click/Tap to place repulsion zone", 8, 42, width, 100);
    text("Tap to add attractor", 8, 42, width, 100);
    
    
};

function renderQuakes(){
 
    
    for (var i = 0; i < csvEQ.length; i++){
    
        stroke (255,127);
        // Stroke colour inherited from particles if not set here :)
        strokeWeight(2);
        fill (255,0,0,100);
        
        ellipse (qx[i],qy[i],magN[i]*0.004,magN[i]*0.004);
    
    }
}

function getLatLong(){
    
}

function draw(){
   
    translate(width/2,height/2); // Shiffman.
    imageMode(CENTER);
    if (quantum) image(mapImage,0,0);
    
    if (quantum) renderQuakes();
    
    // To begin at top left of canvas again,
    // having been Shiffman-ed.
    translate(-width/2,-height/2);
    
    for (var ii = 0; ii < attractors.length; ii++){
        if (attractors[ii].visible)
        attractors[ii].render();
    }
    
    for (var i = 0; i < particles.length; i++){
        
        for (var k = 0; k < attractors.length; k++){
            attractors[k].attract(particles[i]);
        }
        
        particles[i].update();
        if (!quantum)
        particles[i].render("earthquaking", 4);
        else particles[i].render("earthquaking", 127);
        //particles[i].acceleration.mult(0);
       
    }
    informationDisplay();
};
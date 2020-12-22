let weatherTimeStamp = 0;
let weatherChangeSecs = 5;

let snowDrops = [];
let weather = ['snow','rain','sunny'];
let whatWeather = 2;

let stars = [];
let starNum = 555;

function setupPrecipitation(){
  for (let i = 0; i < 200; i++){
    let sy = createVector();
    sy.y = Math.random()*600-1000;
    sy.z = random(cols*bs)-cols*bs*0.5;
    snowDrops.push(sy);
  }
}

function checkWeather(locZ, NoS){
  
  // First, see if time to change weather.
  if ( millis() - weatherTimeStamp >
       weatherChangeSecs*1000){
    // Time to change weather!
    let prevWeather = whatWeather;
    while (prevWeather===whatWeather){
    whatWeather =
      Math.floor(Math.random()*
      weather.length);
    }
    
    weatherChangeSecs = Math.random()*
      300+180;
    weatherTimeStamp = millis();
      }
  
  // Overrides.
  // Decide weather type on location.
    if (NoS==="North " &&
     Math.abs(locZ)>11) whatWeather=0;
    else if (NoS==="North " &&
           Math.abs(locZ)>5) whatWeather=1;
  
  if (weather[whatWeather] === 'snow')
    snow();
  else if (weather[whatWeather] === 'rain')
    rain();
    
}

function rain(){
  push();
  stroke(0,0,200);
  rainLength = 10;
  
  for (let i = 0; i < snowDrops.length; i++){
    snowDrops[i].y+=30;
    if (snowDrops[i].y>200) 
      snowDrops[i].y=Math.random()*600-1000;
    push();
    translate(0,0,snowDrops[i].z);
    let xP = ((cols*bs*i)/
              snowDrops.length)-           
             cols*bs*0.5;
    let yP = snowDrops[i].y;
    line(xP,yP,xP, yP+rainLength);
    
    pop();
  }
  pop();
}

function snow(){
  push();
  //fill((Math.sin(frameCount)+1)*25+200);
  //noStroke();
  
  stroke(0);
  emissiveMaterial(255);
  
  for (let i = 0; i < snowDrops.length; i++){
    snowDrops[i].y+=10;
    if (snowDrops[i].y>200) 
      snowDrops[i].y=-400-Math.random()*10;
    push();
    translate(0,0,snowDrops[i].z);
    circle(((cols*bs*i)/snowDrops.length)-           
           cols*bs*0.5,snowDrops[i].y,6);
    pop();
  }
  pop();
}

function setupStars(){
  for (let i = 0; i < starNum; i++){
    let sl = p5.Vector.random3D();
    sl.mult(Math.random()*200+500);
    stars.push(sl);
  }
}

function drawStars(){
  for (let i = 0; i < stars.length; i++){
    push();
    rotateY(-myRot*0.01);
    translate(stars[i]);
    
    strokeWeight(Math.random()*3.3);
    //stroke(Math.random()*55+200);
    stroke(255);
    point(0,0);
    pop();
  }
}
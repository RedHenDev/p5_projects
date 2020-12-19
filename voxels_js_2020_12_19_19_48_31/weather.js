function setupPrecipitation(){
  for (let i = 0; i < 400; i++){
    let sy = createVector();
    sy.y = Math.random()*600-1000;
    sy.z = random(cols*bs)-cols*bs*0.5;
    snowDrops.push(sy);
  }
}

function checkWeather(locZ, NoS){
  
  // Decide weather type on location.
    if (NoS==="North " &&
     Math.abs(locZ)>9) whatWeather=0;
    else if (NoS==="South " &&
           Math.abs(locZ)>3) whatWeather=1;
  else whatWeather = 2;
  
  // Only show precipitation in main mode.
  if (weather[whatWeather] === 'snow')
    snow();
  else if (weather[whatWeather] === 'rain')
    rain();
    
}

function rain(){
  push();
  stroke(0,0,100);
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
      snowDrops[i].y=Math.random()*600-1000;
    push();
    translate(0,0,snowDrops[i].z);
    circle(((cols*bs*i)/snowDrops.length)-           
           cols*bs*0.5,snowDrops[i].y,6);
    pop();
  }
  pop();
}
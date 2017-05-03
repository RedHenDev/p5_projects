//hello welcome
var mercury;
var venus;
var earth;
var mars;
var moon;
var jupiter;
//var io;
var saturn;
var uranus;
var neptune;
//var star = [];
//var sY;


function setup () {
  
   createCanvas(windowWidth, windowHeight);
  background(0);
  
  //var sX;
  //var sY;
  
  //for (var i = 0; i < 700; i++){
    // sX = random(1, width);
     //sY = random(1, height);
    
  // stars.push(createVector(sX, sY));
//}
   
 
  
  
  mercury = 0;
  venus = 0;
  earth = 0;
  mars = 0;
  moon = 0;
  jupiter = 0;
  //io = 0;
  saturn = 0;
  uranus = 0;
  neptune = 0;
  
}

function draw () {
  background(0);
     
  
     
  
    //for (var s = 0; s < stars.length; s++){
        //if (Math.random() > 0.9)
        //{stroke(255); strokeWeight(1);}
        //else { stroke(0,0,255); strokeWeight(1);}
       // point(stars[s].x, stars[s].y);
  
  
     //}
  
  translate(mouseX, mouseY);
  
  
 
  
  //태양 포인트
  //수성 색깔, 선, 선 색깔
  fill(255,200,0);
 //stroke(255,200,0);
  //strokeWeight(120);
  noStroke();
  ellipse(0,0,130,130);
  
   push();
 
  
  rotate (mercury);
  //수성 거리, 크기 next,
  //태양 색깔, 크기, 선, 선 크기
  
 //rotate (venus);

  fill(128,128,128);
 //stroke(128,128,128);
 //strokeWeight(5); 
  noStroke();
  ellipse(70,70,12.5,12.5);
  
   pop();
  
   push();
  
  rotate(venus);
  
   
  
  fill(96, 64, 32);
  //stroke(96, 64, 32);
  //strokeWeight(10);
  noStroke();
  ellipse(100,100,20,20);
  //ellipse(100,70,12.5,12.5);
   //fill(102, 51, 0);
  //stroke(102, 51, 0);
  //strokeWeight(12.5); 
 
   pop();
  
   push();
  
  rotate(earth);
 
  
  fill(0,0,255);
  noStroke();
  ellipse(140,140,23.5,23.5);
  
  translate(140,140);
   rotate(moon);
  
  fill(74,73,69);
  noStroke();
  ellipse(30,30,10,10);
  
   pop();
  
   push();
  
  rotate(mars);
  
  fill(128, 0, 0);
  noStroke();
  ellipse(190,190,35,35);
  
   pop();
  
   push();
  
   rotate(jupiter);
  
  fill(102, 51, 0);
  noStroke();
  ellipse(230,230,60,60);
  
  //translate(260,260);
   //rotate(io);
  
  //fill(204, 255, 102);
  //noStroke();
  //ellipse(50,50,10,10);
  
  pop();
  
  push();
  
  rotate(saturn);
  fill(204, 204, 0);
  noStroke();
  ellipse(280,280,50,50);
  
  pop();
  
  push();
  
  rotate(uranus);
  fill(0, 255, 255);
  noStroke();
  ellipse(320,320,35,35);
  
  pop();
  
  push();
  
  rotate(neptune);
  fill(0,0,153);
  noStroke();
  ellipse(380,380,40,40);
   
  pop();
  
  //noStroke();  // Don't draw a stroke around shapes
//var c = color(102, 51, 0);
//fill(c);  // Use 'c' as fill color
//ellipse(0, 10, 45, 80);  // Draw rectangle

//c = color(255);
//fill(c);  // Use updated 'c' as fill color
//ellipse(55, 10, 45, 80);  // Draw rectangle
  
  
  //rotate (venus);
 // ellipse(100,70,12.5,12.5);
 //fill(102, 51, 0);
 //stroke(102, 51, 0);
  //strokeWeight(12.5); 
  
  
  
  
mercury = mercury + 0.07;
venus = venus - 0.05;
earth = earth - 0.045;
mars = mars + 0.03;  
moon = moon - 0.08;
jupiter = jupiter + 0.02;
//io = io - 0.03 ;
saturn = saturn - 0.015;
uranus = uranus - 0.01;
neptune = neptune - 0.005;
  
}


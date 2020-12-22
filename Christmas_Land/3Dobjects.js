let stag;
let m_rock;
let m_santa;

function castle(){
  push();
    translate(0,-bh*1.3,0);
    rotateX(180);
    rotateY(11);
    scale(1);
    ambientMaterial(222);
    noStroke();
    model(m_castle);
    scale(0.5);
    ambientMaterial(100);
    translate(0,-bs*4,-32);
    box(180,bs,320);
  pop();
}

function santa(){
  push();
    translate(0,-bh*0.8,0);
    rotateX(180);
    rotateY(frameCount);
    scale(0.5);
    ambientMaterial(222,0,0);
    noStroke();
    model(m_santa);
  pop();
}


function blueCrystal(rot){
  push();
      
    translate(0,-bs*4,0);
    rotateY(rot);
    rotateZ(12);
    rotateX(12);
    strokeWeight(2);
    stroke(0,255,255);
    emissiveMaterial(0,255,200);
    box(bs,bs*3,bs);
  
  pop();
}

function pinkCrystal(rot){
  push();
      
    translate(0,-bs*4,0);
    rotateY(rot);
    rotateZ(12);
    rotateX(12);
    strokeWeight(2);
    stroke(255,0,255);
    emissiveMaterial(255,0,200);
    box(bs,bs*7,bs);
  
  pop();
}

function redCrystal(rot){
  push();
      
    translate(0,-bs*4,0);
    rotateY(rot);
    rotateZ(9);
    rotateX(3);
    strokeWeight(2);
    stroke(255,0,0);
    emissiveMaterial(200,0,0);
    box(bs*2,bs*9,bs*2);
  
  pop();
}

function rock(rot){
  push();
      
    translate(0,-bh*0.4,0);
    rotateY(rot);
    rotateZ(rot);
    rotateX(rot);
    noStroke();
    ambientMaterial(111);
    // map(rot,-360,360,200,222)
    shininess(0);
  
    scale(0.5);
    model(m_rock);
  
  pop();
}

function tree(rot){
    push();
      // Crown.
      translate(0,-bh,0);
      rotateY(rot);
      ambientMaterial(0,88,0,200);
      //shininess(0);
      noStroke();
      sphere(Math.abs
             (Math.sin(rot))*42+22,5);
  
      // Trunk.
      ambientMaterial(100,100,42);
      translate(0,bh*0.6,0);
      stroke(50,50,21);
      box(10,bh,10);
    pop();
}

function stormTrooper(){
  push()
 //let bob = 0;//Math.sin(frameCount*0.2)*19;
 // directionalLight(255, 255,255,
 //                  80,2000,-2000);
  translate(0,-bs*2,0);
  rotateX(180);
  //rotateY(frameCount*-10);
  
  // Base rotation on player's 
  // direction vector.
  let rot = 0;
  rot = -90 * vDir.x;
  if (rot==0) {
    if (vDir.z == 1)
      rot = 0;
      else if (vDir.z==-1)
      rot = 180;
  }
  rotateY(rot);
  
  noStroke();
  ambientMaterial(255,255,255);
  //shininess(10);
  scale(0.15);
  model(imp);
  pop();
}

function bud(){
  push()
   let bob = Math.sin(frameCount*0.2)*5;
 // directionalLight(255, 255,255,
 //                  80,2000,-2000);
  translate(0,-bs*1+bob,0);
  rotateX(180);
  //rotateY(frameCount*-10);
  
  // Base rotation on player's 
  // direction vector.
  rotateY(myRot);
  
  noStroke();
  //stroke(100);
  //specularLight(100);
  specularMaterial(255,255,255);
  shininess(100);
  scale(0.2);
  model(buddy);
  pop();
}

let stagRot = 0;
function putStag(){
  push()
   let bob = Math.sin(frameCount*0.2)*5;
 // directionalLight(255, 255,255,
 //                  80,2000,-2000);
  translate(0,-bs*2+bob,0);
  rotateX(180);
  //rotateY(frameCount*-10);
  noStroke();
  // Base rotation on player's 
  // direction vector.
  rotateY(stagRot);
  if (gameMode==='map'){
    emissiveMaterial(0,255,100);
    translate(0,bh-bob,0);
    rotateY(frameCount*4);
  scale(1);
  }
  else if (gameMode==='main'){
  //stroke(100);
  //specularLight(100);
  specularMaterial(255,255,255);
  shininess(100);
  scale(0.3);
  }
  model(stag);
  
  // Now for the cherry on top.
  emissiveMaterial(222,0,0);
  translate(0,bs,bs*5);
  sphere(bs*0.42);
  
  pop();
}
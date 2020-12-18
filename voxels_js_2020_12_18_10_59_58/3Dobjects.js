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

function PutStag(){
  push()
   let bob = Math.sin(frameCount*0.2)*5;
 // directionalLight(255, 255,255,
 //                  80,2000,-2000);
  translate(0,-bs*1.7+bob,0);
  rotateX(180);
  //rotateY(frameCount*-10);
  
  // Base rotation on player's 
  // direction vector.
  rotateY(myRot);
  if (!mc)
         emissiveMaterial(0,0,255,140);
  else{
  noStroke();
  //stroke(100);
  //specularLight(100);
  specularMaterial(255,255,255);
  shininess(100);
  }
  scale(0.3);
  model(stag);
  pop();
}
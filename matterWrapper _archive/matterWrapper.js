//*********&&&&&&&&&&&&****************&&&&&&&&&&&&****************

// New particle class for use with matter.js 
// B New 2017.

function Pa2D(x,y,r,op){
    
    // Options for matter.js physics body.
    if (op)
    var options = {
        isStatic: true,
        restitution: 1,
        friction: 0.3
    }
    else
        var options = {
        isStatic: false,
        restitution: 0.2,
        friction: 0.3
    }
    
    // Create a 2D Physics Body, a circle.
    this.bod = Matter.Bodies.circle(x,y,r,options);
    // Add the body to the Physics World.
    Matter.World.add(myWorld, this.bod);

}

Pa2D.prototype.render = function(){
    
    var theColour;
    theColour = this.bod.speed * 50;
    if (this.bod.speed < 0.1) theColour = 255;
   
    constrain(theColour, 0, 255);
    
    stroke(0);
    strokeWeight(1);
    fill(42, theColour,42, 101);
    ellipse(this.bod.position.x,
            this.bod.position.y,
            this.bod.circleRadius*2,
            this.bod.circleRadius*2);
  
  var iX = this.bod.position.x;
  var iY = this.bod.position.y;
  var iS = this.bod.circleRadius*2;
  
//   textSize(iS);
//   text(String.fromCodePoint('0x1F' + 422).toString(16),iX-iS/2,iY+iS/2);
  
//   // text(String.fromCodePoint(
//   // '0x1F' + round(random(1536, 1616)).toString(16)),iX-iS/2,
//   //           iY+iS/2);
  
            
}

function Ledge(x,y,w,h){
    
    // Create a 2D Physics Body, a rectangle.
    this.bod = Matter.Bodies.rectangle(x,y,w,h,{isStatic: true, restitution: 1});
    // Add the body to the Physics World.
    Matter.World.add(myWorld, this.bod);
    
    this.width = w;
    this.height = h;
    
} 

Ledge.prototype.render = function(){
    
    stroke(0);
    strokeWeight(4);
    fill(255);
    rect(this.bod.position.x-this.width/2, 
         this.bod.position.y-this.height/2, 
         this.width, this.height);
    
}





//*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&
//*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&

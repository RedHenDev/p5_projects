
// Background object.
let bg;

// Planets.
let planets = [];

function preload(){
    moonT = loadImage("2k_moon.jpg");
    marsT = loadImage("2k_mars.jpg");
}

function setup(){
    
    createCanvas(800,800, WEBGL);
    
    bg = new Background;
    bg.refresh();
    
    noStroke();
    
    generatePlanets();
    
    ambientMaterial(250);
}

function generatePlanets(){
   
    for (let i=0;i<444;i++){
        planets.push(new Planet);
    }

}

function draw(){
    bg.refresh();
    
    let z = map(mouseX, 0, width, -100,0);
    
    //translate(0,0,z);
    
    
    let dirY = (mouseY / height - 0.5) *2;
    let dirX = (mouseX / width - 0.5) *2;
    //directionalLight(250, 250, 0, -dirX, -dirY, -1);
    directionalLight(250, 250, 0, 42, -4, -1);
    
    planets.forEach(update);
}

function mouseMoved(){
    planets.forEach(pullP);
}

function keyPressed(){
    planets.forEach(reverseP);
}

function mousePressed(){
    planets.forEach(pushP);
}

function reverseP(item, index){
    planets[index].vel.mult(-1);
    planets[index].acc.mult(-1);
}

function pushP(item, index){
    let originV = new p5.Vector(0, 0, -50);
    
    let dirV = originV.sub(planets[index].pos);
 
    dirV.mult(-1*(1000/dirV.magSq()) *
             (10/planets[index].rad));
    
    planets[index].acc.add(dirV);
}

function pullP(item, index){
    let originV = new p5.Vector(0, 0, -50);
    
    let dirV = originV.sub(planets[index].pos);
 
    dirV.mult(0.0001 * (10/planets[index].rad));
    
    planets[index].acc.add(dirV);
}

function update(item, index){
    planets[index].render();
    planets[index].physics();
}

class Planet{
    constructor(){
        this.pos = new p5.Vector(random(-width/2,width/2),
                             random(-height/2,height/2),
                            random(0,-100));
        
        
        this.vel = new p5.Vector(random(-3,3),
                                random(-3,3),
                                random(-3,3));
        
        this.acc = new p5.Vector(0,0,0);
        
        this.rad = random(0.1,92);
        
        this.theta = 0;
        
        this.tex = Math.floor(random(0,2));
        if (this.tex==1) this.tex = moonT;
        else this.tex = marsT;
    }
    
    render(){
        push();
        
        translate(  this.pos.x,
                    this.pos.y,
                    this.pos.z);
        
        this.theta+=0.001;
        
        rotate(this.rad*this.theta, [0,1,0]);
        texture(this.tex);
        sphere(this.rad, 24);
        
        pop();
    }
    
    physics(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        
        this.acc.mult(0);
        
        // Space friction.
        this.vel.mult(0.99);
        
        /*
        if (this.vel.magnitude > 12){
            this.vel.mult(0.5);
        } else this.vel.mult(0.996);
        */
    }
}

class Background{
    constructor(){
        this.r = random(0,255);
        this.g = 0;
        this.b = random(0,255);
        
        this.t = 1;
    }
    
    refresh(){
        background( this.r,
                    this.g,
                    this.b);
    }
}
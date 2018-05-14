

let epX = 0;
let epY = 0;
let epZ = 0;

let rhTex;

let eggPlanet;

function setup(){
    
    createCanvas(windowWidth,
                windowHeight, WEBGL);
    
    background(201,32,12);
    
    //rhTex = loadImage("RedHenIconAlpha512512.png");
   
    eggPlanet   = 
        new CosmicBody(0,0,0,200);
    eggPlanet.mat = 'ambient';
        
}

function mousePressed(){
    eggPlanet.genMoon(1);
}

function draw(){
    
    //background(201,32,12);
    background(120);
    
    pointLight( 255,255,255,
                mouseX - width/2,
                mouseY - height/2,
                600);
    push();
    epZ = map(mouseY, 0, height, 0, -1000);
    translate(0,0,epZ);
    
    eggPlanet.render();
    
    pop();
}

class CosmicBody{
    constructor(_x, _y, _z, _r){
        
        // Position.
        this.pos = 
            createVector(_x, _y, _z);
        
        // Radius (size, not orbit).
        this.rad = _r;
        
        // Appearance.
        this.fill = color(0,255,0);
        this.mat = 'specular';
        // 'ambient'.
        // 'texture'.
        
        // Orbit variables.
        // Centre of orbit.
        this.oPos =
            createVector(0,0,0);
        // What body is my centre of
        // orbit? If null, will not
        // be updated.
        // NB must be set when moon etc.
        // generated.
        this.oBody = null;
        this.orbitSpeed = 0.01;
        // Orbital radius.
        this.oRad       = 100;
        this.theta  = 
        Math.acos(this.pos.z / this.oRad);
        this.phi    = 
        Math.atan2(this.pos.y, this.pos.x);
        // Title applied to Z-axis for
        // theta, and to X-axis for phi.
        this.tilt = 0;
        this.axis = 'Y';
        
        // Any child objects?
        this.moons = [];
    }
    
    render(){

        push();
        
        translate(  this.pos.x,
                    this.pos.y,
                    this.pos.z);
        
        if (this.mat === 'specular')
        specularMaterial(this.fill);
        else if (this.mat === 'ambient') 
        ambientMaterial(this.fill);
        else if (this.mat === 'basic') 
        fill(this.fill);
        else if (this.mat === 'normal')
        normalMaterial(this.fill);
            
        sphere(this.rad, 180, 90);
        
        pop();
        
        if (this.moons.length > 0){
            for (let i = 0; i < this.moons.length; i++){
                 this.moons[i].orbit();
                 this.moons[i].render();
                 }
        }
    }
    
    genMoon(_level){
        // Spawns a moon.
        // Pick random vector.
        //let v = p5.Vector.random3D();
        
        if (_level === 1){
        
        let v = createVector(1,0,0);
        v.mult(this.rad * 2);
        let newMoon =
        new CosmicBody( this.pos.x +
                       v.x,
                        this.pos.y +
                       v.y,
                        this.pos.z +
                       v.z,
                        this.rad/2);
        newMoon.fill =
            color(0,0,255,150);
        newMoon.mat = 'specular';
        newMoon.oRad = this.rad *
            (Math.random() * 12 + 2);
        newMoon.tilt = Math.random()*
            radians(50);
        newMoon.oBody = this;
        this.moons.push(newMoon);
        
        if (Math.random() > 0.5){
            for (let i = 0; i <
               this.moons.length;
                i++){
            this.moons
            [i].
            genMoon(2);
            }
        }
        
        }   // End of level 1.
        
        if (_level === 2){
        
        let v = createVector(1,0,0);
        v.mult(this.rad * 4);
        let newMoon =
        new CosmicBody( this.pos.x +
                       v.x,
                        this.pos.y +
                       v.y,
                        this.pos.z +
                       v.z,
                        this.rad/3);
        newMoon.orbitSpeed *= 
            Math.random()*8-4;
        newMoon.oRad = this.rad * 2;
        newMoon.fill =
            color(0,255,0);
        newMoon.mat = 'basic';
            newMoon.axis = 'Z';
        newMoon.oBody = this;
        this.moons.push(newMoon);
        
        }   // End of level 2.
        
    }
    
    orbit(){
        
        // Increment angle(s).
        // theta = rotation around Y-axis.
        // phi   = rotation around Z-axis.
        if (this.axis === 'Y' ||
            this.axis === 'X')
        this.theta  += this.orbitSpeed;
        else if (this.axis === 'Z')
        this.phi    += this.orbitSpeed;
        
        
        // Where is my centre of orbit?
        if (this.oBody !== null){
            this.oPos.x =
                this.oBody.pos.x;
            this.oPos.y =
                this.oBody.pos.y;
            this.oPos.z =
                this.oBody.pos.z;
            //this.oPos = this.oBody.pos;
        }
        
        // Use 3D polar-coordinates
        // to update x,y,z position.
        this.pos.x = this.oPos.x + 
            this.oRad *
        Math.sin(this.theta) * Math.cos(this.phi);
        
        // NB. tilt applied here!
        this.pos.y = this.oPos.y +
            this.oRad * 
        Math.sin(this.theta+this.tilt) * Math.sin(this.phi+this.tilt);
        
        this.pos.z = this.oPos.z +
            this.oRad *
        Math.cos(this.theta);
        
        // Now calculate our moons'
        // orbits.
        if (this.moons.length > 0){
            for (let i = 0; 
                 i < this.moons.length;
                i++){
                this.moons[i].orbit();
            }
        }
        
    }
    
}

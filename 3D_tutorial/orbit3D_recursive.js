

let epX = 0;
let epY = 0;
let epZ = 0;

let rhTex;

let eggPlanet;
let eggMoon;
let eggSubMoon;

function setup(){
    
    createCanvas(windowWidth,
                windowHeight, WEBGL);
    
    background(201,32,12);
    
    //rhTex = loadImage("RedHenIconAlpha512512.png");
   
    eggPlanet   = 
        new CosmicBody(0,0,0,200);
    eggPlanet.mat = 'ambient';
        
    eggMoon     = 
        new CosmicBody(300,0,0,62);
    eggMoon.oRad = 400;
    eggMoon.fill = color(240,240,250);
    eggMoon.axis = 'Y';
    eggMoon.tilt = PI/9;
    
    eggMoon2     = 
        new CosmicBody(400,0,0,22);
    eggMoon2.oPos.x = eggMoon.pos.x;
    eggMoon2.oPos.y = eggMoon.pos.y;
    eggMoon2.oPos.z = eggMoon.pos.z;
    eggMoon2.oRad = 100;
    eggMoon2.fill = color(250,0,0);
    eggMoon2.axis = 'Y';
    //eggMoon2.tilt = PI/2;
    eggMoon2.orbitSpeed = -0.04;
    
    eggSubMoon     = 
        new CosmicBody(440,0,0,12);
    eggSubMoon.oPos.x = eggMoon2.pos.x;
    eggSubMoon.oPos.y = eggMoon2.pos.y;
    eggSubMoon.oPos.z = eggMoon2.pos.z;
    eggSubMoon.oRad = 40;
    eggSubMoon.fill = color(0,0,255);
    eggSubMoon.mat = 'ambient';
    eggSubMoon.axis = 'Z';
    //eggMoon2.tilt = PI/2;
    eggSubMoon.orbitSpeed = 0.12;
}



function draw(){
    
    background(201,32,12);
    
    pointLight( 255,255,255,
                mouseX - width/2,
                mouseY - height/2,
                300);
    push();
    epZ = map(mouseY, 0, height, 0, -1000);
    translate(0,0,epZ);
    
    eggPlanet.render();
    
    eggMoon.orbit();
    eggMoon.render();
    
    eggMoon2.oPos.x = eggMoon.pos.x;
    eggMoon2.oPos.y = eggMoon.pos.y;
    eggMoon2.oPos.z = eggMoon.pos.z;
    eggMoon2.orbit();
    eggMoon2.render();
    
    eggSubMoon.oPos.x = eggMoon2.pos.x;
    eggSubMoon.oPos.y = eggMoon2.pos.y;
    eggSubMoon.oPos.z = eggMoon2.pos.z;
    eggSubMoon.orbit();
    eggSubMoon.render();
    
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
            
        sphere(this.rad, 180, 90);
        
        pop();
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
        
    }
    
}



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
    eggPlanet.genMoon();
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
            
        sphere(this.rad, 180, 90);
        
        pop();
        
        if (this.moons.length>1){
            for (let i = 0; i < this.moons.length; i++){
                 this.moons[i].orbit();
                 this.moons[i].render();
                 }
        }
    }
    
    genMoon(){
        // Spawns a moon.
        // Pick random vector.
        let v = p5.Vector.random3D();
        //let v = createVector(1,0,0);
        v.mult(this.rad * 2);
        let newMoon =
        new CosmicBody( this.pos.x +
                       v.x,
                        this.pos.y +
                       v.y,
                        this.pos.z +
                       v.z,
                        this.rad/4);
            
        this.moons.push(newMoon);
        this.moons[this.moons.length-1].oRad = this.rad * 2;
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

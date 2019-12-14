let adam;
let blox = [];

let me;

let prevX = 0;
let prevY = 0;

let rad = Math.PI/180;

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
    
    setupSun();
    setupBlox();
    
    me = new Subject();
    
    let aPos = createVector(0,1,0);
    adam = new Blox(aPos, 10);
    
    mouseX = 0;
    mouseY = 0;

    translate(0,0,700);
    
}

function setupSun(){
    let v = createVector(32,-100,1);
    v.normalize();
    directionalLight(255,255,0,v.x,v.y,v.z);
}

function setupBlox(){
    
    let rows = 10;
    let cols = 10;
    
    for (let i = 0; i < rows * cols; i++){
        
        for (let j = 0; j < cols; j++){
            let aPos = createVector(i * 10*6, 70,-200 + j * 10*6);
            blox.push(new Blox(aPos, 10));
        }
    }
}

function draw(){
    background(64);
    
    // Updates global translation and rotation.
    me.update();
    
    adam.render();
    adam.rot.y += 0.02;
    adam.rot.x += 0.01;
    
    for (let i = 0; i < blox.length; i++){
        blox[i].render();
        //blox[i].rot.y += 0.02;
//        blox[i].rot.x += 0.01;
    }
}


function mouseMoved(){
    if (mouseX < prevX)
        me.rot.y -= (prevX - mouseX);
    else if (mouseX > prevX)
        me.rot.y += (mouseX - prevX);
    
    prevX = mouseX;
    prevY = mouseY;
}

class Subject{
    constructor(){
        this.pos = createVector(0,0,0);
        this.vel = createVector(0,0,0);
        this.acc = createVector(0,0,0);
        
        this.rot = createVector(0,0,0);
    }
    
    checkInput(){
        if (keyIsDown(87)){
            this.pos.z += Math.cos(radians(this.rot.y));
            this.pos.x += Math.sin(radians(this.rot.y));
        }
    }
    
    // Updates position of subject/user/player.
    update(){
        
        translate(0, 0, 700);
        rotateY(-radians(this.rot.y));
        //rotateX(this.rot.x);
        
        this.checkInput();
    }
}

class Blox{
    constructor(_pos, _scale){
        this.pos = createVector(_pos.x,
                                _pos.y,
                                _pos.z);
        this.rot = createVector(0,0,0);
        this.acc = createVector(0,0,0);
        this.vel = createVector(0,0,0);
        
        this.scale = _scale;
        this.fill = color(10,255,0);
    }
    
    render(){
        push();
            translate(me.pos.x + this.pos.x,this.pos.y, me.pos.z + this.pos.z);
            rotateX(this.rot.x);
            rotateY(radians(this.rot.y));
            rotateZ(this.rot.z);
            //fill(this.fill);
            ambientMaterial(this.fill);
            box(0,0,0, this.scale);
        pop();
    }
}
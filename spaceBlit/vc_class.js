// Voxel cybernetics.


class Cyber{
    constructor(x,y,z){
        this.pos = createVector(x,y,z);
        
        // Scale of voxels.
        this.sca = 14;
        
        // Rotation.
        // -90 because begin pointing up.
        this.rot = -90;
        
        // Array of voxels.
        this.voxs = [];
        
        // Ship factors.
        this.thrusting = true;
        this.shipSpeed = 1;
        this.shipAcc = 1.2;
        this.maxSpeed = 420;
        
        // Default begins with 
        //the 'base block' only.
        this.build(0);
    }
    
    input(){
        
        // For touch/mouse swipes...
        // Get distances.
        let vM = createVector(mouseX, mouseY);
        let vP = createVector(prevX, prevY);
        let dist = p5.Vector.dist(vM,vP);
        let distX = Math.abs(vM.x - vP.x);
        let distY = Math.abs(vM.y - vP.y);
        prevX = mouseX;
        prevY = mouseY;
        // Rotation based on left and right swipe.
        if (distY < distX){
            if (vM.x > vP.x) this.steer(1, distX);
            else this.steer(-1, distX);
        }

    
   
        
        // Rotation based on key-input.
    if (keyIsDown(68) ||
       keyIsDown(RIGHT_ARROW)){
        this.steer(1,5);
    }
    if (keyIsDown(65) ||
       keyIsDown(LEFT_ARROW)){
        this.steer(-1,5);
    }
    if (keyIsDown(87) ||
       keyIsDown(UP_ARROW) ||
       touchThrust){
        this.thrusting = true;
    }else this.thrusting = false;
    }
    
    steer(_p, _amount){
    
    // The latter half of this equation just
    // decreases steering amount with speed.
    this.rot+= (_p * _amount * 2)/
        (1+(this.shipSpeed)/100);
    
    }
    
    forward(_p){
        if (this.thrusting){
        this.shipSpeed += this.shipAcc;
        }
    
    // Speed regulation.
    if (this.shipSpeed > this.maxSpeed) 
        this.shipSpeed = this.maxSpeed;
    
    //_p *= shipSpeed * 1/frameRate();
    _p *= this.shipSpeed * deltaTime;
    
    this.pos.x += _p * Math.cos(radians(this.rot));
    this.pos.y += _p * Math.sin(radians(this.rot));
     
    // Space friction :|
    this.shipSpeed *= 0.99;
    
//    let zScalar = lerp(sSize,
//            map(shipSpeed,0,maxSpeed/1000,100,-100),
//                    0.1);
        
        // Screen-wrap as default, but
        // do not change sector.
    //this.wrap(false);
        
    }
    
    wrap(sectorSensitive){
        // Boundaries.
        let lB = 0 - width/2;
        let rB = width/2;
        let tB = 0 - height/2;
        let bB = height/2;
        
    // Wrap ship.
    let newSector = false;
    if (this.pos.x < lB) {this.pos.x = rB;
                    newSector = true;
                   }
    if (this.pos.x > rB) {this.pos.x = lB;
                    newSector = true;
                   }
    if (this.pos.y < tB) {this.pos.y = bB;
                    newSector = true;
                   }
    if (this.pos.y > bB) {this.pos.y = tB;
                    newSector = true;
                   }
        
    // Create new starry layers with new sector?
    //newSector = false;
    if (sectorSensitive && 
        newSector===true){
        // Initialize layers (to be rendered as images).
        lettherebeStars(0); // First star layer.
        lettherebeStars(2); // Second star layer.   
        }
    }
    
    // Set positions of constituent voxels.
    build(_mode){
        // Clear array first.
        this.voxs = [];

        if (_mode===0){
        // Default test (entire simple ship).
        // Base voxel. Back of ship.
        this.voxs[0] = 
            new Voxel(  0,
                        0,
                        0);
        // One forward.
        this.voxs[1] = 
            new Voxel(  0,
                        0-this.sca,
                        0);
        // Nose tip.
        this.voxs[2] = 
            new Voxel(  0,
                        0-(this.sca*2),
                        0);
        // Left wing.
        this.voxs[3] = 
            new Voxel(  0-this.sca,
                        0,
                        0);
        // Right wing.
        this.voxs[4] = 
            new Voxel(  0+this.sca,
                        0,
                        0);
        }
        
        // Randomized positions for cubes.
        else if (_mode===1){
            for (let i = 0; i < 
                 12;
                i++){
                let v = new Voxel(Math.floor(Math.random()*2*this.sca -
                                  1*this.sca),
                                 Math.floor(Math.random()*2*this.sca -
                                  1*this.sca),
                                 Math.floor(Math.random()*2*this.sca -
                                  1*this.sca));
                this.voxs.push(v);
            }
        }
        
        // Stain 'base block' blue-green.
        this.voxs[0].fill = color(0,250,250);
        
        // Apply Cyber's scale to voxels.
        this.applyScale();
    }
    
    applyScale(){
        // Applies scale of cyber to array of voxels.
       for (let i = 0; i < this.voxs.length; i++){
            this.voxs[i].sca = this.sca;
            this.voxs[i].applyScale();
        } 
    }
    
    render(_layer){
        
        _layer.push();
        
        // Position and rotation.
        _layer.translate(   this.pos.x,
                            this.pos.y,
                            this.pos.z);
        _layer.rotateZ(radians(this.rot+90));
        
        // Render array of voxels.
        // NB. rendering to same layer.
        for (let i = 0; i < this.voxs.length; i++){
            this.voxs[i].render(_layer);
        }
        
        _layer.pop();
    }
}


class Voxel{
    constructor(x,y,z){
        
        // Position, radius, and scale.
        this.pos = createVector(x,y,z);
        this.rad = createVector(1,1,1);
        this.sca = 1;
        
        // Fill style.
        this.fill = color(255);
        
        this.applyScale();
        
        // Rotation.
        // -90 because begin pointing up.
        this.rot = -90;
    }
    
    // Multiplies radius by current scale.
    applyScale(){
        this.rad.magnitude = 1;
        this.rad.mult(this.sca);
    }
    
    render(_layer){
        _layer.push();
            _layer.translate(   this.pos.x,
                                this.pos.y,
                                this.pos.z);
            _layer.rotateZ(radians(this.rot));
        
            _layer.ambientMaterial(this.fill);
        
            _layer.box( this.rad.x,
                        this.rad.y,
                        this.rad.z);
        _layer.pop();
        
    }
}
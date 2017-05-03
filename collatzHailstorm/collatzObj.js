

function CollatzObj(_n){

    this.root = _n;
    
    this.value = this.root;
    
    // Arrays to keep track of value at each step.
    // Step 0 === root.
    // NB. right and left first steps will begin at 1.
    // NB. totalSteps = totalSteps.length - 1?
    this.totalSteps = [];
    this.rightSteps = [];
    this.leftSteps = [];
    
    this.totalSteps.push(_n);
    this.rightSteps.push(0);
    this.leftSteps.push(0);
    
}

CollatzObj.prototype.iterate = function(){
    
    if (this.value % 2 === 0){
        this.value *= 0.5;
        
        // Accounting record.
        this.leftSteps.push(this.value);
        this.totalSteps.push(this.value);
        
        return true;
    }
    else {
        this.value *= 3;
        this.value += 1;
        
        // Accounting record.
        this.rightSteps.push(this.value);
        this.totalSteps.push(this.value);
        
        return false;
    }
    return null;
}
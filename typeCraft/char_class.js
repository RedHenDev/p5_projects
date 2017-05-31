// Character class.

// What do we need?

// We need a position, essentially,
// What else? We need like the type
// of character we are.

// And then, perhaps, augmenting this,
// what animations etc. etc.

// ************************
// ************************

var rh_textFields = [];

class RedHen_tChar {
    
    // Sets things up and creates
    // a new 'text field'.
    // We might have
    // an array of text fields,
    // which will therefore
    // probably be objects in
    // their own right.
    static newTextField(startPos_x, startPos_y,_width, _height, _fontSize){
        
        // There is here the question
        // of how to structure the
        // polymorphism.
        // Obvious answer points us
        // towards the lowest object
        // dangling on the chain.
        rh_textFields.push(
        new TextField(startPos_x, startPos_y, _width, _height, _fontSize));
        
    }
    
}

class TextField {
    constructor(startPos_x, startPos_y,_width, _height, _fontSize){
        
        // OK, we'll at least leave
        // polymorphism till later!
        
        this.startPos = createVector(startPos_x, startPos_y);
        this.width = _width;
        this.height = _height;
        
        // Where are we currently
        // typing?
        // At initialisation, this
        // is set to start position.
        // So, this means the top-
        // left of the text field.
        this.cursorPos = createVector(this.startPos.x, this.startPos.y);
        
        this.fontSize = _fontSize;
        this.fontFill = color(255);
        
        // An array to manage
        // the tChar objects.
        this.tChars = [];
        
        // Grab random emoji now
        // to place in cursor ellipse.
        this.myEmoji = this.getEmoji();
        
        // Range 0-1.
        this.blink_scale = 1;
        this.blink_rate = 0.02;
        // 0 = scale decreasing.
        this.blink_state = 0;
        
    }
    
    newLine(){
        
        // First, we need to check
        // whether 
        
        this.cursorPos.y += this.fontSize; 
        this.cursorPos.x = this.startPos.x;
    }
    
    deleteSomething(){
      
        // Is there something here
        // to delete?
        if (this.tChars.length < 1)
            return;
        
        // Adjust cursor position:
        // back current tChar's width.
       // this.adjustCursorPos(-textWidth(this.tChars[this.tChars.length-1].string));
       
        this.cursorPos.x = this.tChars[this.tChars.length-1].pos.x; //+ textWidth(this.tChars[this.tChars.length-1].string);
        this.cursorPos.y = this.tChars[this.tChars.length-1].pos.y;
        
        // Remove last tChar typed.
      this.tChars.splice (this.tChars.length-1, 1);
        
         
    }
    
    getEmoji(){
    // return String.fromCodePoint(
    // '0x1F' + round(random(1536, 1616)).toString(16));
  
        return String.fromCodePoint(0x1F600 + round(random(0,42)));
    }
    
    typeSomething(_char){
        
        this.tChars.push(new tChar(_char, this));
           
        // Render tChar so that
        // p5.width will work
        // correctly: it needs
        // to know the textSize.
        this.tChars[this.tChars.length-1].print();
        
        // Are we at end of line?
        if (this.cursorPos.x >=
           this.startPos.x + this.width){
            this.newLine();
        } else{
        // Forward this tChar's
        // width.
      let aa =  textWidth(this.tChars[this.tChars.length-1].string);
        this.adjustCursorPos(aa);
        }
    }
    
    blinkCursor(){
        
        noFill();
        strokeWeight(2);
        stroke(0,255,255);
        
        ellipse(this.cursorPos.x+16,
               this.cursorPos.y-16,
               32);
      fill(255);
        
        // Control blinking pulsing.
        if (this.blink_state === 0)
            this.blink_scale -=
                this.blink_rate;
        else if (this.blink_state === 1)
            this.blink_scale +=
                this.blink_rate;
        
        if (this.blink_scale >= 1){
            this.blink_state = 0;
            this.blink_scale = 1;
        }
        if (this.blink_scale <= 0.5){
            this.blink_scale = 0.5;
            this.blink_state = 1;
        }
        
        
      textSize(32*(this.blink_scale+0.1));
        text(   this.myEmoji,
                this.cursorPos.x-1*(this.blink_scale+0.5),
                this.cursorPos.y-1*(this.blink_scale+0.5));
    }
    
    changeEmoji(){
        let nE = this.getEmoji();
        while (nE == this.myEmoji){
            nE = this.getEmoji();
        }
        this.myEmoji = nE;   
    }
    
    adjustCursorPos(_amount){
        // This is when we need to
        // work out when to move
        // down a line, and when we
        // hit the side of the text
        // field, minus margin, and
        // all of this relative to
        // current font-size etc.
        
        // If left null, then
        // perhaps this method
        // ought to calculate the
        // cursor pos by iterating
        // over all the tChars etc.?
        
        this.cursorPos.x += _amount;

    }
    
    printChars(){
        for (let i = 0; i < this.tChars.length; i++){
            this.tChars[i].print();
        }
    }
}


class tChar {
    constructor(_char, _parent){
        // How will the char
        // know how to work
        // out where its
        // position is?
        
        this.string = _char;
        
        // We should use a
        // static method to
        // grab this position.
        // No -- will be
        // managed by a higher
        // order object, the
        // 'text field'.
        this.pos = createVector
        (_parent.cursorPos.x, _parent.cursorPos.y);
        
        this.rotation = 0;
        
        // Derive font properties
        // from parent textField.
        this.fontSize = _parent.fontSize;
        this.stroke = _parent.fontFill;
        this.strokeWeight = 2;
        this.fill = _parent.fontFill;
        
        
    }
    
    print(){
        
        fill(this.fill);
        stroke(this.stroke);
        strokeWeight (this.strokeWeight);
        textSize(this.fontSize);
        
        push();
        
        translate(this.pos.x, this.pos.y);
        rotate(radians(this.rotation));
        
        text(this.string, 0, 0);
        
        pop();
    }
    
}
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
    static newTextField(_marginSize, _width, _height, startPos_x, startPos_y){
        
        // There is here the question
        // of how to structure the
        // polymorphism.
        // Obvious answer points us
        // towards the lowest object
        // dangling on the chain.
        rh_textFields.push(
        new TextField(_marginSize, _width, _height, startPos_x, startPos_y));
        
    }
    
}

class TextField {
    constructor(startPos_x, startPos_y,_width, _height){
        
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
        
        // An array to manage
        // the tChar objects.
        this.tChars = [];
        
        // Grab random emoji now
        // to place in cursor ellipse.
        this.myEmoji = this.newEmoji();
        
    }
    
    newLine(){
        this.cursorPos.y += 64; this.cursorPos.x = this.startPos.x;
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
    
    newEmoji(){
    // return String.fromCodePoint(
    // '0x1F' + round(random(1536, 1616)).toString(16));
  
        return String.fromCodePoint(0x1F600 + round(random(0,42)));
    }
    
    typeSomething(_char){
        
        this.tChars.push(new tChar(_char, this.cursorPos.x, this.cursorPos.y));
           
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
        strokeWeight(4);
        stroke(0,42);
        
        
        
        
        ellipse(this.cursorPos.x+16,
               this.cursorPos.y-16,
               32);
      fill(255);
      textSize(32);
        text(   this.myEmoji,
                this.cursorPos.x,
                this.cursorPos.y);
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
    constructor(_char, _x, _y){
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
        (_x, _y);
        
        this.rotation = 0;
        
        this.fontSize = 64;
        this.stroke = color(255);
        this.strokeWeight = 4;
        this.fill = color(200,0,200);
        
        
    }
    
    print(){
        
        fill(this.fill);
        stroke(this.stroke);
        strokeWeight(this.strokeWeight);
        textSize(this.fontSize);
        
        push();
        
        translate(this.pos.x, this.pos.y);
        rotate(radians(this.rotation));
        
        text(this.string, 0, 0);
        
        pop();
    }
    
}
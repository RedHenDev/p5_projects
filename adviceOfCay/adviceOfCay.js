
var iCay;
var iDurian;
var cayHead;
var cayScale;
var theta;

var inBox;

var cAnswer = '';
var answers = [];

function preload(){
    
    iCay = loadImage('cayHead1.png');
    iDurian = loadImage('durianSmile.gif');
}

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    background(51);
    
    // Hide cursor.
    document.body.style.cursor = 'none';
    
    setupCay();
    
    setupIO();
    
}

function draw(){
    
    background(72,60);
    
    drawCay();
    drawDurian();
    
    // Text containing current answer string
    // is painted to canvas.
    // After a number of seconds, answer
    // string will be cleared...
    displayAnswer();
  
}

function displayAnswer(){
    
    textSize(42);
    strokeWeight(3);
    stroke(0);
    fill(255);
    text(cAnswer, 63, cayPos.y + 1.17*cayScale/2, width-100, height-52);
    
}

function setupIO(){
    
    inBox = createInput('Type YES/NO question...');
    inBox.position(64,64);
    inBox.size(200,22);
    //inBox.input(generateAnswer);
    
    submitB = createButton('submit');
    submitB.position(inBox.x+inBox.width/4,
                     inBox.y + inBox.height);
    submitB.size(inBox.width/2, 32);
    submitB.mousePressed(generateAnswer);
    
    populateAnswers();
    
    function generateAnswer(){
        
        // Random number. Pick.
        // cAnswer = answers[randomNumber];
        let i = floor(Math.random()*answers.length);
        cAnswer = answers[i];
    }
}

function populateAnswers(){
    
    answers.push("No. Absolutely NO.");
    answers.push("Yeah -- probably.");
    answers.push("Even the Great Auntie Cay doesn't no that.");
    answers.push("Ha! YESSSSSS");
    answers.push("I...don't...care.");
    answers.push("No.");
    answers.push("Yep.");
    answers.push("No, I don't think so.");
    answers.push("That's easy: YES.");
    answers.push("Write a proper question.");
    answers.push("Your Auntie knows all. Except that. Go away.");
    answers.push("Ha ha! NOPE!");
    answers.push("Stop with the questions. Just bring me durian.");
    answers.push("Yes? No? Who cares. Monkeys.");
    answers.push("The answer is YES. But why am I trapped on the internet..?");
    answers.push("HELLLLLOOOOOO!  Oh -- Yes.");
    answers.push("The answer is DURIAN.");
    answers.push("No. Your answer, darling, is NO.");
    answers.push("I wasn't listening. But the answer is definitely NO.");
    answers.push("I know the answer. YOU DON'T!!!");
    // 0-19 above.
    answers.push("No. What kind of question is that?");
    answers.push("Drink water! Answers later!");
    answers.push("I'm wearing three pairs of trousers right now. Does THAT answer your question?");
}

function setupCay(){
    
    // So that we can draw and handle
    // image from its centre.
    imageMode(CENTER);
    
    cayScale = width/2.8;
    
    cayPos = createVector(width/2, height/2);
    
//    cayPos.x -= cayScale/2;
//    cayPos.y -= cayScale*1.17/2;
    
    theta = 0;
    
}

function drawDurian(){
    
    push();
    
    translate(mouseX, mouseY);
    
    image(iDurian, 0,0,0.4*cayScale,0.417*cayScale)
    
    pop();
    
}

function drawCay(){
    push();
    
    translate(cayPos.x , 
              cayPos.y + Math.sin(theta)*10);
    
    rotate(Math.sin(theta)/4*mouseY/height);
    
    cayHead = image(iCay, 0, 0, 1*cayScale,1.17*cayScale);
    
    theta+=0.03;
    
    
    pop();
}

// NB. the p5.speech library is linked via JS settings.

// This is our speech object.
let robot;

// Default text to be spoken.
let myText = "Sniffles, snibbles, snibbly.";

// The input box, where new text to be spoken can be added by the user.
let inputty;
// Speak button.
let speakButton;

// Recognition test...
let fox;

function setup(){
  
  createCanvas(400,400);
  // Pink is a reassuring colour.
  // Oh yes it is.
  background(201,0,201);
  
  // Speech object.
  robot = new p5.Speech();
  
	// Appearances.
	textSize(14);
	fill(255);
	
	setupRecog();
	
  setupButtons();
  
  // This does not seem to work, yet, with my browser etc. But feel free to try with yours.
  //setupVoices();
}

function setupButtons(){
  inputty = createInput(myText);
  inputty.position(32, 32);
  speakButton = createButton("Speak");
  speakButton.position(32, 64);
  speakButton.mousePressed(doSpeak);
  function doSpeak(){
    setupVoices();
    robot.speak(inputty.value());
  }
 
}

// Pick a random voice!
function setupVoices(){
  let voices = robot.voices;
  let voice = random(voices.name);
  robot.setVoice(voice.name);
}

// Recognition test...stuff.

function setupRecog(){
	
		// Recog object.
	fox = new p5.SpeechRec();
	
		fox.onResult = showResult; // bind callback function to trigger when speech is recognized
	
	function showResult()
{
	background(201,0,201);
	
  text(fox.resultString, 
			 2, height*0.75);
	
	myText = fox.resultString;
	
	robot.speak(myText);
	
	fox.pause();
	
}
	
	
	
}

function mousePressed(){
	
	if (!userStartAudio()){
		userStartAudio();
		
	}
	
	if (mouseY < height*0.5)return;
	
	fox.start(); // start listening
	
}



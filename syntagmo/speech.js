// NB. the p5.speech library is linked via JS settings.



// Default text to be spoken.
let myText = "Sniffles, snibbles, snibbly.";

function doSpeak(_message){

	// This is our speech object.
let robot = new p5.Speech();
	console.log(robot.listVoices());
    robot.speak(_message);
	 
  }
 




let nouns = [
	
	'Dot',
	'Chihuahua',
	'plant',
	'face',
	'brother',
	'chocolate',
	'rain',
	'tortoise',
	'king of the zebras',
	'plant again'
	
	
]

let determiners = [
	'the',
	'your',
	'my',
	'his',
	'her',
	'one'
	
]


let adjectives = [
	
	'green',
	'pink',
	'crystaline',
	'ugly',
	'friendly',
	'spicy',
	'unwelcome',
	'lovely',
	'delicious',
	'elephantine',
	'slimy'
	
	
	
]


let verbs = [
	'likes',
	'hates',
	'follows',
	"can't find",
	"licks",
	"tickles",
	"eats",
	"flies",
	"replies to",
	"snuffles"
	
]



// p5.js library!

function setup(){
	createCanvas(windowWidth,
				windowHeight);
	
	background(200,0,200);
	
	textSize(44);
	fill(255);
	stroke(0);
	strokeWeight(6);

}

function touchStarted(){
	if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
	}
}

function mousePressed(){
	
	background(200,0,200);
	generateSentencePlease();
	
}


function generateSentencePlease(){
	
	let rS =
		random(determiners) +
		' ' +
		random(adjectives) +
		' ' +
		random(nouns) +
		' ' +
		random(verbs) +
		' ' +
		random(determiners) +
		' ' +
		random(adjectives) +
		' ' +
		random(nouns) +
		'.';
	
	rS = 
	rS.replace(rS.charAt(0),
			  rS.charAt(0).
			  toUpperCase());
 
	doSpeak(rS);
	
	text(rS, 12, height/2);
	
}















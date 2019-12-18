
// Transitive.
let verbs = [
    'finds', 
    'eats',
    'loves',
    'likes',
    'needs',
    'is aware of',
	'stalks',
	'looks at',
	'is',
	'used to be',
	'smuggles',
	'wants to steal',
	'accepts',
	'evaluates',
	'describes',
	'chases',
	'returns',
	'serves',
	'cautions',
	'explains',
	'seeks',
	'admonishes',
	'calls out to',
	'reminds',
	'watches',
	'licks'
    ];

let nouns_s = [
          'party',
          'health',
          'Elizabethan period',
          'postmodern design',
          'pantomime',
          'panda',
          'bagel',
          'penguin',
          'year 1984',
          'wisdom',
          'you',
          'sentence',
          'whisper',
          'man',
          'Martin',
          'group of friends',
          'mum',
          'Stephanie',
          'wife',
          'bird',
          'budgie'
              
            ];

let determiners_s = [
  
  'a',
  'the',
  'one',
  'my',
  'your',
  'her',
  'his',
  'their',
  'this',
  'that',
  'any'
  
];

let adjectives = [
  'woolly',
  'silly',
  'fat',
  'scary',
  'little',
  'yellow',
  'nice',
  'forgotten',
  'weak',
  'danity',
  'wonderful',
  'fluffy',
  'pink',
  'elephantine',
  'crazy',
  'delicious'
];

function preload(){
  
}

function setup(){
  createCanvas(windowWidth,400);
  background(200,0,200);
  
  
}

function newSyntagm(){
  let ns =
      random(determiners_s) + ' ' +
      random(adjectives) + ' ' +
      random(nouns_s) + ' ' +
      random(verbs) + ' ' +
      random(determiners_s) + ' ' +
      random(adjectives) + ' ' +
      random(nouns_s) + '.';
  
  // First letter to uppercase.
  ns = FirstLetterToUpperCase(ns);
  
  return ns;
}

function 
FirstLetterToUpperCase(_string)
{
  let firstLetter = _string.charAt(0);
  return(
  _string.replace(firstLetter,
  firstLetter.toUpperCase())); 
}

function mousePressed(){
  background(200,0,200);
  
  fill(255);
  textSize(random(22,42));
  
  text(newSyntagm(),8,width/4);
 
}





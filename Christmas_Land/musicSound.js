// Sounds.
let s_popUp; 
let s_menu;
let s_sugar;
let s_forest;
// Music timing.
let musicStamp = 0;
let musicRestarts = 7; // Mins.

// Note -> audioContext etablished in
// mousePressed();

// This function, which is the main
// manager for music and ambience,
// is called in draw().
function checkSound(){
  if (gameMode!=='main') return;
  // First, our forest ambience.
  if (!s_forest.isPlaying())
    s_forest.play();
  
  // Next, see if time to play
  // Sugar Plum.
  // E.g. every 5mins start playing
  // it again.
  if (!s_sugar.isPlaying() &&
      millis() - musicStamp >
      musicRestarts*60*1000){
    s_sugar.play();
    musicStamp = millis();
  }
}
// The music system.

let music = [];
let currentMusic = 0;

function setupMusic(){
    music[0] = loadSound("https://redhendev.github.io/InfinitePacman/sound/song17.mp3");
    music[1] = loadSound("media/rMt.ogg");
    music[2] = loadSound("media/icyRealm.mp3");
    music[3] = loadSound("media/sirensInDarkness.mp3");
    
    currentMusic = 
            music[Math.floor(Math.random()*
                             music.length)];
}
function musicSystem(){
    // Music loop.
    if (!currentMusic.isPlaying()){
        currentMusic = 
            music[Math.floor(Math.random()*
                             music.length)];
        currentMusic.play();
        //currentMusic.rate(2);
        currentMusic.setVolume(1);
        if (currentMusic !== music[1])
            currentMusic.setVolume(0.05);
    }
}

// The music system.

let music = [];
let currentMusic = 0;

let howMuchMusicLoaded = 0;
let assetsLoadTotal = 5;

function setupMusic(){
    music[0] = loadSound("https://redhendev.github.io/InfinitePacman/sound/song17.mp3",someMusicLoaded);
    music[1] = loadSound("media/rMt.ogg",someMusicLoaded);
    music[2] = loadSound("media/icyRealm.mp3",someMusicLoaded);
    music[3] = loadSound("media/sirensInDarkness.mp3",someMusicLoaded);
    
}

// Our callback function.
function someMusicLoaded(){
        howMuchMusicLoaded++;
        if (howMuchMusicLoaded>=assetsLoadTotal){
            
            // Select random track.
            currentMusic = 
     music[Math.floor(
         Math.random()*
            music.length)];
            
            // No longer loading.    
            gameMode = 0;
        }
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

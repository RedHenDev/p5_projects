// Started April 2017.
// Idea is to setup everything we might need,
// including mic inputs, mp3, etc. etc.

// voxa.freq(220); voxa.amp(0,0.5);

// Here the default type is 'square'.
// So, we should allow for constructor to
// take parameter for type.
// 'saw', 'sine'.
function setupOscillator(){
    
    let _varToStoreOscillator = new p5.Oscillator();
    _varToStoreOscillator.setType('square');
    
    _varToStoreOscillator.amp(0.01);
    _varToStoreOscillator.freq(440);
    
    _varToStoreOscillator.start();
    
    return _varToStoreOscillator;
    
}

// To change frequency of given Oscillator.
function changeFreq(_osc, _freq){
  _osc.freq(_freq);
}
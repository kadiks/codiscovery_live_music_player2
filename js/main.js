const els = {
    audio: null,
    play: null,
    next: null,
    prev: null,
    playTime: null,
    totalTime: null,
    volume: null,
    tracking: null
};

let currentMusicIndex = 0;
let hasPlayed = false;
const playlist = [
    'sounds/001.mp3',
    'sounds/002.mp3',
    'sounds/003.mp3',
    'sounds/004.mp3'
];

const init = () => {
    // Attach DOM elements to variable
    els.audio = document.querySelector('audio');
    els.playBtn = document.querySelector('#play');
    els.nextBtn = document.querySelector('#next');
    els.prevBtn = document.querySelector('#prev');
    els.playTime = document.querySelector('#play-time');
    els.totalTime = document.querySelector('#total-time');
    els.volume = document.querySelector('input[type="range"]');
    els.tracking = document.querySelector('#tracking');
    // Same as
    // els.audio = document.getElementsByTagName('audio')[0];



    // Load first music
    loadMusic(currentMusicIndex);
    // Add event listeners
        // Play music
    els.playBtn.addEventListener('click', () => {
        if (els.audio.paused === true) {
            hasPlayed = true;
            els.audio.play();
            els.playBtn.textContent = 'Pause';
        } else {
            hasPlayed = false;
            els.audio.pause();
            els.playBtn.textContent = 'Play';
        }
    });
    els.audio.addEventListener('durationchange', (evt) => {
        console.log('on durationchange evt', evt);
        els.totalTime.textContent = changeSecToMin(els.audio.duration);
        els.playTime.textContent = changeSecToMin(els.audio.currentTime);
    });
    // Display current and end time
    els.audio.addEventListener('timeupdate', (evt) => {
        els.playTime.textContent = changeSecToMin(els.audio.currentTime);
        const blockWidth = parseInt(getComputedStyle(els.tracking).getPropertyValue('width').replace('px', '')) - 10;
        const left = `${blockWidth / els.audio.duration * els.audio.currentTime}px`;
        // console.log('left', left);
        els.tracking.querySelector('div').style.left = left;

    });
    // Change volume
    els.audio.addEventListener('volumechange', (evt) => {
        // console.log('on volumecchange evt', evt);
        els.volume.value = els.audio.volume * 100;
    });
    els.volume.addEventListener('change', (evt) => {
        els.audio.volume = els.volume.value / 100;
    });

        
        // Display seekTime
    
        
        // Go to next track
    els.nextBtn.addEventListener('click', () => {
        currentMusicIndex++;
        if (currentMusicIndex < playlist.length) {
            loadMusic(currentMusicIndex);
        } else {
            currentMusicIndex = 0;
            loadMusic(currentMusicIndex);
        }
    });
        // Go to previous track
    els.prevBtn.addEventListener('click', () => {
        currentMusicIndex--;
        if (currentMusicIndex >= 0) {
            loadMusic(currentMusicIndex);
        } else {
            currentMusicIndex = playlist.length - 1;
            loadMusic(currentMusicIndex);
        }
    });
    // Display thumbnail
    
}

const changeSecToMin = (seconds) => {
    // seconds = 197.04....
    const secondsInt = parseInt(seconds);  // 197
    const rest = secondsInt % 60; // 17
    const newSeconds = secondsInt - rest; // 180
    const min = newSeconds / 60; // 3

    const strMin = min < 10 ? `0${min}` : min;
    const strSec = rest < 10 ? `0${rest}` : rest;

    return `${strMin}:${strSec}`;
};

const loadMusic = (index) => {
    const trackPath = playlist[index];

    els.audio.setAttribute('src', trackPath);

    if (hasPlayed === true) {
        els.audio.play();
    }
};
// Same as
// function loadMusic() {
// }

window.addEventListener('load', init);
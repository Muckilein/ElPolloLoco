let canvas;
let world;
let keyboard = new Keyboard();
let first = true;
let screen;
let buttonContainer;
let startScreen;
let gameOver;
let winScreen;
let explanation;
let buttonStart;
let numV = 0.1;
let outV = 'volume';
let showV = 'mute';


function init() {
    storeObjectsInVariables();
    if (first) {
        callInitFirstTime();
    } else {
        world.level = newLevel1();
    }
    blendInOutObjects();
    world.startGame();
    addTouchListeners();
    document.getElementById('buttonFull').classList.remove('d-none');
    document.getElementById('buttonSmall').classList.add('d-none');
    if (!first) {
        // enableSound(numV, outV, showV);
        setTimeout(function () { enableSound(numV, outV, showV); }, 125);
    }
    first = false;
}

/**
 * Blends in and out some objects (startbutton, smallButtons) for the start of the game
 */
function blendInOutObjects() {
    buttonStart.classList.add('d-none');
    buttonContainer.classList.remove('d-none');
    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');
}

/**
 * Stores several html Objects in variables
 */
function storeObjectsInVariables() {
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('startScreen');
    gameOver = document.getElementById('gameOverScreen');
    winScreen = document.getElementById('youWonScreen');
    explanation = document.getElementById('explanation');
    buttonContainer = document.getElementById('btnContainer');
    buttonStart = document.getElementById('startBtn');
    screen = document.getElementById('screen');
}
/**
 * Sets the sound on or of
 * 
 * @param {Number} num   volume  0 sound of  0.1 sound on
 * @param {String} out   sound button that shell blend out
 * @param {String} show  sound button that shell belnd in
 */
function enableSound(num, out, show) {
    world.character.walking_sound.volume = num;
    world.level.enemies.forEach(e => { e.chicken_sound.volume = num * 2; });
    world.level.endboss.boss_sound.volume = num;
    world.sound.volume = num;
    document.getElementById(out).classList.add('d-none');
    document.getElementById(show).classList.remove('d-none');
    numV = num;
    outV = out;
    showV = show;
}

/**
 * Creates World and a Listener for the positions.
 */
function callInitFirstTime() {
    world = new World(buttonStart, winScreen, explanation, buttonContainer, gameOver, startScreen, canvas, keyboard);
    canvas.addEventListener("click", function (e) {
        let cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
        let canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
        let canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
        console.log('position x:' + canvasX + ' y: ' + canvasY);

    });
}

/**
 * Goes to fullscreen.
 */
function goFullscreen() {
    document.getElementById('buttonFull').classList.add('d-none');
    document.getElementById('buttonSmall').classList.remove('d-none');
    canvas.classList.add('fullHeight');
    document.getElementById('btnContainer').classList.add('fullWidth');
    goFull(screen);
    world.fullScreen = true;
}

/**
 * Goes to smallscreen
 */
function closeFullscreen() {
    document.getElementById('buttonFull').classList.remove('d-none');
    document.getElementById('buttonSmall').classList.add('d-none');
    canvas.classList.remove('fullHeight');
    document.getElementById('btnContainer').classList.remove('fullWidth');
    closeFull();
    world.fullScreen = false;
}

/**
 * closed the fullscreen. I called by closeFullScreen()
 */
function closeFull() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

/**
 * Opens the fullscreen. I called by goFullScreen()
 */
function goFull(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/**
 * Adds all the required listeners for the tablet/handymode
 */
function addTouchListeners() {
    document.getElementById('btnL').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnL').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btnR').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;

    });
    document.getElementById('btnR').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btnUP').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;

    });
    document.getElementById('btnUP').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btnT').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('btnT').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}


/**
 * Sets "keyboard" to the right keys, when a key is pressed.
 */
window.addEventListener('keydown', (event) => {

    let key = event['keyCode'];

    if (key == 39) {
        keyboard.RIGHT = true;
    }
    if (key == 37) {
        keyboard.LEFT = true;
    }
    if (key == 38) {
        keyboard.UP = true;
    }
    if (key == 40) {
        keyboard.DOWN = true;
    }
    if (key == 32) {
        keyboard.SPACE = true;
    }
    if (key == 68) {
        keyboard.D = true;
    }



});

/**
 * Sets "keyboard" to the right keys, when the key is released.
 */
window.addEventListener('keyup', (event) => {

    let key = event['keyCode'];

    if (key == 39) {
        keyboard.RIGHT = false;
    }
    if (key == 37) {
        keyboard.LEFT = false;
    }
    if (key == 38) {
        keyboard.UP = false;
    }
    if (key == 40) {
        keyboard.DOWN = false;
    }
    if (key == 32) {
        keyboard.SPACE = false;
    }
    if (key == 68) {
        keyboard.D = false;
    }

});
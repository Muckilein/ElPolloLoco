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

function init() {

    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('startScreen');
    gameOver = document.getElementById('gameOverScreen');
    winScreen = document.getElementById('youWonScreen');
    explanation= document.getElementById('explanation');
    buttonContainer = document.getElementById('btnContainer');
    buttonContainer.classList.remove('d-none');
    if (first) {
        callInitFirstTime();

    } else {
        world.level = newLevel1();
       
    }
    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');    
    world.startGame();
    first = false;
    addTouchListeners();
    screen = document.getElementById('screen');

}

function enableSound(num,out,show) {
    world.character.walking_sound.volume = num;
    world.level.enemies.forEach(e => { e.chicken_sound.volume=num*2;});
    world.level.endboss.boss_sound.volume=num ;
    document.getElementById(out).classList.add('d-none'); 
    document.getElementById(show).classList.remove('d-none');        
}

function callInitFirstTime() {
    world = new World(winScreen,explanation,buttonContainer,gameOver, startScreen, canvas, keyboard);
    canvas.addEventListener("click", function (e) {
        let cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
        let canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
        let canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
        console.log('position x:' + canvasX + ' y: ' + canvasY);

    });
}

function goFullscreen() {
    document.getElementById('buttonFull').classList.add('d-none');
    document.getElementById('buttonSmall').classList.remove('d-none');
    canvas.classList.add('fullHeight');
    document.getElementById('btnContainer').classList.add('fullWidth');
    goFull(screen);
}

function closeFullscreen() {
    document.getElementById('buttonFull').classList.remove('d-none');
    document.getElementById('buttonSmall').classList.add('d-none');
    canvas.classList.remove('fullHeight');
    document.getElementById('btnContainer').classList.remove('fullWidth');
    closeFull();
}

function closeFull() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

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
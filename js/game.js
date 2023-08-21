let canvas;
let world;
let keyboard = new Keyboard();
let first = false;

function init() {
    console.log('call init');
    document.getElementById('buttonFull').classList.remove('d-none');
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('startScreen');
    gameOver = document.getElementById('gameOverScreen');
    if (!first) {
        world = new World(gameOver, startScreen, canvas, keyboard);
        canvas.addEventListener("click", function (e) {
            let cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
            let canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
            let canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
            console.log('position x:' + canvasX + ' y: ' + canvasY);

        });
       
    }else{
        world.level = newLevel1();
    }
    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');
    console.log('new Char');    
    world.startGame();
    first = true;
    addTouchListeners();

}

function goFullscreen(){
  canvas.requestFullscreen();
}

function addTouchListeners(){
document.getElementById('btnL').addEventListener("touchstart", (e)=>{
    e.preventDefault();
    keyboard.LEFT=true;
});
document.getElementById('btnL').addEventListener("touchend", (e)=>{
    e.preventDefault();
    keyboard.LEFT=false;
});

document.getElementById('btnR').addEventListener("touchstart", (e)=>{
    e.preventDefault();
    keyboard.RIGHT=true;
});
document.getElementById('btnR').addEventListener("touchend", (e)=>{
    e.preventDefault();
    keyboard.RIGHT=false;
});

document.getElementById('btnUP').addEventListener("touchstart", (e)=>{
    e.preventDefault();
    keyboard.SPACE=true;
    console.log('up');
});
document.getElementById('btnUP').addEventListener("touchend", (e)=>{
    e.preventDefault();
    keyboard.SPACE=false;
});

document.getElementById('btnT').addEventListener("touchstart", (e)=>{
    e.preventDefault();
    keyboard.D=true;
});
document.getElementById('btnT').addEventListener("touchend", (e)=>{
    e.preventDefault();
    keyboard.D=false;
});}



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
    // console.log(key);


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
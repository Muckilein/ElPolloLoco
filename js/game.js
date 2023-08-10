let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    console.log('call init');
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('startScreen')
    startScreen.classList.add('d-none');
    world = new World(startScreen,canvas, keyboard);
    canvas.classList.remove('d-none');

    world.startGame();
    console.log(world.character);
    canvas.addEventListener("click", function (e) {
        let cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
        let canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
        let canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
        console.log('position x:' + canvasX + ' y: ' + canvasY);
        // ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
        // ctx.fillText("X: "+canvasX+", Y: "+canvasY, 10, 20);
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
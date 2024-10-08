class World {

    level = newLevel1();
    statusbar = this.level.statusbar;
    bottlebar = this.level.bottlebar;
    bossbar = this.level.bossbar;
    coinbar = this.level.coinbar;
    bottles = [];
    bottlesInWorld = this.level.bottles;
    ctx;
    canvas;
    keyboard;
    camera_x = -100;
    gameWin = false;
    startScreen;
    gameOver;
    winScreen;
    buttonContainer;
    explanation;
    buttonStart;
    character = new Charakter();
    firstGame = true;
    gamestarted = false;
    fullScreen = false;
    timeLast = Date.now();
    sound= new Audio('../El%20Pollo%20Loco/audio/sound.mp3');


    constructor(buttonStart, winScreen, explanation, buttonContainer, gameOver, startScreen, canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.startScreen = startScreen;
        this.gameOver = gameOver;
        this.winScreen = winScreen;
        this.keyboard = keyboard;
        this.buttonContainer = buttonContainer;
        this.explanation = explanation;
        this.buttonStart = buttonStart;
        this.draw();
        this.setWorld();
        this.run();
        this.sound.play();
        this.sound.volume=0.1;
    }

    /**
     * 
     * @param {Array} intervall Array with the numbers of the intervals, that shell be closen.
     * intervall[0]=0 is not an intervalnumber
     * @returns returns an array [0] because working with empty arrays did not work.
     */
    clearAllIntervalls(intervall) {

        for (let i = 1; i < intervall.length; i++) {
            clearInterval(intervall[i]);
        }
        let interv = [0];
        return interv;

    }

    // Sets all the bars to the correct start percentage(0 or 100)
    initBars() {
        this.statusbar.setPercentage(100);
        this.bossbar.setPercentage(0);
        this.bottlebar.setPercentage(0);
        this.coinbar.setPercentage(0);
    }
    /**
     * Starts all the animations.
     */
    startsAllAnimation() {
        this.character.startAnimations();
        this.level.enemies.forEach(e => { e.animate() });
        this.level.endboss.animate();
        this.level.clouds.forEach(c => { c.animate() });
    }
    /**
     * initializes some variables
     */
    initRelevantVariables() {
        this.gamestarted = true;
        this.camera_x = -100;
        this.gameWin = false;
        this.bottles = [];
        this.bottlesInWorld = this.level.bottles;
        this.level.endboss.setChar(this.character);
    }

    /**
     * Starts the game. Sets all the bars to the correct start percentage(0 or 100). Sets the value of some important variables.
     * Starts the Animations.
     */
    startGame() {
        this.initBars();
        this.character = new Charakter();
        this.setWorld();
        this.initRelevantVariables();
        this.startsAllAnimation();

    }
    /**
     * Ends the game with closing all intervals
     */
    endGame() {

        this.character.intervalls = this.clearAllIntervalls(this.character.intervalls);
        this.character.walking_sound.pause();
        this.level.enemies.forEach(e => { e.intervalls = this.clearAllIntervalls(e.intervalls); e.closeSound(); });
        this.level.endboss.intervalls = this.clearAllIntervalls(this.level.endboss.intervalls);
        this.level.endboss.boss_sound.pause();
        this.level.clouds.forEach(c => { c.intervalls = this.clearAllIntervalls(c.intervalls) });
        this.bottles.forEach(b => { b.intervalls = this.clearAllIntervalls(b.intervalls) });
    }

    setWorld() {
        this.character.world = this;
    }

    /**
     * Draw all item
     */
    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addArrayToMap(this.level.background);
        this.addArrayToMap(this.level.enemies);
        this.addArrayToMap(this.level.clouds);
        this.addImageToMap(this.level.endboss);
        this.addArrayToMap(this.bottles);
        this.addArrayToMap(this.bottlesInWorld);
        this.addArrayToMap(this.level.coins);
        this.addImageToMap(this.character);
        this.addImageToMap(this.statusbar);
        if (this.level.endboss.startFight) { this.addImageToMap(this.bossbar); }
        this.addImageToMap(this.bottlebar);
        this.addImageToMap(this.coinbar);
        this.ctx.translate(-1 * this.camera_x, 0);

        let self = this; // unerklärbar warum das nötig ist, aber die Funktion kennt  this nicht mehr
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * All of the given MoveableObjects in the arras shell be displayed.
     * @param {Array} mo  Array with moveable objects 
     */
    addArrayToMap(mo) {
        mo.forEach(elem => {
            this.addImageToMap(elem);
        });
    }

    /** 
     * Draw the given image ot the map.
     * @param {Object} mo  MoveableObject
     */
    addImageToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /** Flips the image vertically
     * 
     * @param {Object} mo   MoveableObject
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        mo.x = mo.x * -1;
        this.ctx.scale(-1, 1);
    }

    /** Flips the image back
     * 
     * @param {Object} mo   MoveableObject
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }


    /**
     * All bottle, that are colliding or out of screen are removes vom this.bottles. The intervalls of the removed bottles are closed.
     */
    bottleCollisionAndRemove() {
        let bo = [];
        let col;
        this.bottles.forEach(bottle => {
            col = this.checkCollisionBottle(bottle);
            // if the bottle leaves the screen she is removed.
            if (bottle.y < 500 && !col && bottle.splashCounter == 6) {
                bo.push(bottle);
            }
            else {
                if (col || (bottle.splashCounter < 6 && bottle.splashCounter > 0)) {
                    bottle.splashCounter--;
                    bo.push(bottle);
                }
            }
            if (bottle.splashCounter == 0) {
                //after finished splash animation                
                this.clearAllIntervalls(bottle.intervalls);
            }
        });
        this.bottles = bo;
    }

    delFullscreen() {
        if (this.fullScreen) {
            canvas.classList.remove('fullHeight');
            buttonContainer.classList.remove('fullWidth');
            this.fullScreen = false;
        }
    }

    /**
     * When wie loose the game
     */
    gameLose() {
        this.delFullscreen();
        this.endGame();
        this.gamestarted = false;
        this.gameOver.classList.remove('d-none');        
        this.buttonContainer.classList.add('d-none');
        if (window.innerWidth <= 720) { this.explanation.classList.add('d-none'); }
        setTimeout(this.backToScreenFfromGameOver.bind(this), 3000);
    }

    /**
     * When you won the game.
     */
    gameWins() {
        this.delFullscreen();
        this.gameWin = true;
        this.endGame();
        this.gamestarted = false;
        this.winScreen.classList.remove('d-none');
        this.buttonContainer.classList.add('d-none');
        setTimeout(this.backToScreen.bind(this), 3000);
    }

    /**
     * The anemies playing a sound when the charakter is within a specific distance.
     */
    stopSounds() {
        this.level.enemies.forEach(e => {
            let d = this.character.x - e.x;
            let dv = 500;

            if ((d > dv / 2) || (d < -1 * dv)) {
                e.playSound = false;
            }
            if (d > (-1 * dv) && (d <= dv / 2)) {
                e.playSound = true;
            }
        });
    }



    checkJumpOn() {

        this.level.enemies.forEach(e => {
            let d = (this.character.y + this.character.height - this.character.offset['bottom']) - e.y
            if (this.character.isCollidingFromTop(e, d) && !e.jumpedOn && this.character.speedY <= 0) {
                e.jumpedOn = true;
                this.character.speedY = 30;
            }
        });
    }

    handleRun() {
        this.checkJumpOn();
        this.checkCollisions();
        this.throwObjects();
        this.collectingBottles();
        this.collectCoins();
        this.bottleCollisionAndRemove();
        this.stopSounds();
        this.level.coins.forEach(c => {
            c.playAnimation(2, 0);
        });
    }

    /**
     * When the game runs this method is executed:     
     */
    run() {
        setInterval(() => {
            if (this.gamestarted) {
                if (!this.gameWin) {
                    this.handleRun();
                    //if the distance between endboss and char is less than 350 the boss attacs
                    if (this.level.endboss.x - this.character.x < 350) {
                        this.level.endboss.startFight = true;
                    }
                    //if the deadAnimation of the boss is over the game ends
                    if (this.level.endboss.deadAnimationCounter == 0) {
                        this.gameWins();
                    }
                    //if the Chakater dead animation is over the game ands
                    if (this.character.playDeath == 0) {
                        this.gameLose();
                    }
                }
            }
        }, 125);
    }

    /**
     * Handles when we go from the gameover screen to the Startscreen again
     */
    backToScreenFfromGameOver() {
        this.startScreen.classList.remove('d-none');
        this.explanation.classList.remove('d-none');
        this.buttonStart.classList.remove('d-none');
        this.canvas.classList.add('d-none');
        this.gameWin = false;
        this.gameOver.classList.add('d-none');

    }

    /**
    * Handles when we go from finished game to the Startscreen again
    */
    backToScreen() {
        this.startScreen.classList.remove('d-none');
        this.buttonStart.classList.remove('d-none');
        this.explanation.classList.remove('d-none');
        this.canvas.classList.add('d-none');
        this.buttonContainer.classList.add('d-none');
        this.gameWin = false;
        this.winScreen.classList.add('d-none');
    }


    /**
     * Handles, when we collidign with a coin.
     */
    collectCoins() {
        let co = [];
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.amountCoins++;
                this.coinbar.setPercentage(this.character.amountCoins * 20);
            }
            else {
                co.push(coin);
            }
        });
        this.level.coins = co;
    }

    /**
     * Handles, when we colliding with a bottle.
     */
    collectingBottles() {
        let bo = []
        this.bottlesInWorld.forEach(bottle => {
            if (this.character.isColliding(bottle) && this.character.amountBottles < 5) {
                this.character.amountBottles++;
                this.bottlebar.setPercentage(this.character.amountBottles * 20);
            }
            else {
                bo.push(bottle);
            }
        });
        this.bottlesInWorld = bo;
    }



    /**Handles, when we press button D. This creates a new ThrowableObject and throws it. */
    throwObjects() {
        let time= Date.now();
        if (this.keyboard.D && this.character.amountBottles > 0 && (time - this.timeLast)>1000) {
            this.timeLast = Date.now();
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100);
            this.character.amountBottles--;
            this.bottlebar.setPercentage(this.character.amountBottles * 20);
            this.bottles.push(bottle);
            if (this.character.otherDirection) {
                bottle.throw(-1);
            }
            else {
                bottle.throw(1);
            }
        }
    }

    /**
     * Handles what happens, when a bottle is colliding with an enemy
     * 
     * @param {Object} bottle 
     * @returns        Colision is true or false
     */
    checkCollisionBottle(bottle) {
        let en = []
        let col = false;
        this.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy) && !enemy.jumpedOn) {
                col = true;
                enemy.closeSound();

            } else {
                en.push(enemy);
            }
        });
        if (bottle.isColliding(this.level.endboss) && this.level.endboss.energy > 0 && bottle.splashCounter == 6) {

            this.handleBossCollision();
            col = true;
        }
        this.level.enemies = en;
        return col;
    }

    /**
     * Boss is colliding with a bottle
     */
    handleBossCollision() {
        this.level.endboss.energy -= 35;
        this.level.endboss.energy = Math.max(this.level.endboss.energy, 0);
        this.level.endboss.getHurt = true;
        setTimeout(this.notHurt.bind(this), 1000);

        if (this.level.endboss.energy > 0) {
            this.bossbar.nextIndex();
        }
    }

    /**
     * set getHurt of the boss to false.
     */
    notHurt() {
        this.level.endboss.getHurt = false;
    }
    /**
     * Handles the collision of the character with the enemys (chickens and boss)
     */
    checkCollisions() {
        let pain = false;
        this.level.enemies.forEach((enemy) => {
            if ((this.character.isColliding(enemy) && !enemy.jumpedOn) || (this.character.isColliding(this.level.endboss) && this.level.endboss.energy > 0)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
                pain = true
            }
        });
        this.character.getHurt = pain;

    }

}


class World {

    character = new Charakter();
    level = level1;
    statusbar = new StatusBar(15, 0, this.level.statusBarImages, 100);
    bottlebar = new StatusBar(15, 60, this.level.bottleBarImages, 0);
    bossbar = new StatusBar(400, 0, this.level.bossBarImages, 0);
    coinbar = new StatusBar(400, 60, this.level.coinBarImages, 0);
    coins = [new Coin(450, 480), new Coin(550, 480), new Coin(950, 480), new Coin(1300, 480)];
    bottles = [];
    bottlesInWorld = [new ThrowableObject(900, 450), new ThrowableObject(1000, 450), new ThrowableObject(1200, 450), new ThrowableObject(1400, 450)
        , new ThrowableObject(1600, 450), new ThrowableObject(1800, 450), new ThrowableObject(2000, 450)];
    ctx;
    canvas;
    keyboard;
    camera_x = -100;
    gameWin = false;
    startScreen;



    constructor(startScreen,canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.startScreen=startScreen;
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
        this.run();
    }
    startGame() {
        this.level.endboss.setChar(this.character);
        this.character.startG();
        this.level.enemies.forEach(e => { e.startG() });
        this.level.endboss.startG();
        this.level.clouds.forEach(c => { c.startG() });
    }
    endGame() {
        this.character.endG();
        this.level.enemies.forEach(e => { e.endG() });
        this.level.endboss.endG();
        this.level.clouds.forEach(c => { c.endG() });
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addArrayToMap(this.level.background);
        this.addArrayToMap(this.level.enemies);
        this.addArrayToMap(this.level.clouds);
        this.addImageToMap(this.level.endboss);
        this.addArrayToMap(this.bottles);
        this.addArrayToMap(this.bottlesInWorld);
        this.addArrayToMap(this.coins);
        this.addImageToMap(this.character);
        this.addImageToMap(this.statusbar);
        this.addImageToMap(this.bossbar);
        this.addImageToMap(this.bottlebar);
        this.addImageToMap(this.coinbar);
        this.ctx.translate(-1 * this.camera_x, 0);




        let self = this; // unerklärbar warum das nötig ist, aber die Funktion kennt  this nicht mehr
        requestAnimationFrame(function () {
            self.draw();
        });
    }
    addArrayToMap(mo) {
        mo.forEach(elem => {
            this.addImageToMap(elem);
        });
    }

    addImageToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        mo.x = mo.x * -1;
        this.ctx.scale(-1, 1);
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    bottleCollisionAndRemove() {
        let bo = [];
        let col;
        this.bottles.forEach(bottle => {
            col = this.checkCollisionBottle(bottle);
            // if the bottle leaves the screen she is removed.
            if (bottle.y < 500 && !col) {
                bo.push(bottle);
            }
        });
        this.bottles = bo;
    }

    run() {
        setInterval(() => {
            if (!this.gameWin) {
                this.checkCollisions();
                this.throwObjects();
                this.collectingBottles();
                this.collectCoins();
                this.bottleCollisionAndRemove();
                this.coins.forEach(c => {
                    c.playAnimation(2, 0);
                });
                if (this.level.endboss.x - this.character.x < 350) {
                    console.log('start fight');
                    this.level.endboss.startFight = true;
                }
                if (this.level.endboss.deadAnimationCounter == 0) {
                    this.gameWin = true;
                    this.endGame();
                }
            }else{
                this.startScreen.classList.remove('d-none');
                this.canvas.classList.add('d-none');
            }
        }, 125);
    }

    collectCoins() {
        let co = [];
        this.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.amountCoins++;
                this.coinbar.setPercentage(this.character.amountCoins * 20);
            }
            else {
                co.push(coin);
            }
        });
        this.coins = co;
    }

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
    throwObjects() {
        if (this.keyboard.D && this.character.amountBottles > 0) {
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

    checkCollisionBottle(bottle) {
        let en = []
        let col = false;
        this.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy)) {
                console.log('collision with Bottle'); col = true;

            } else { en.push(enemy); }
        });
        if (bottle.isColliding(this.level.endboss) && this.level.endboss.energy > 0) {
            console.log('collision with Boss');
            this.level.endboss.energy -= 35;
            this.level.endboss.energy = Math.max(this.level.endboss.energy, 0);
            this.level.endboss.getHurt = true;
            setTimeout(this.notHurt.bind(this), 1000);
            console.log('energy', this.level.endboss.energy);
            if (this.level.endboss.energy > 0) { this.bossbar.nextIndex(); } //up to change
            col = true;
        }
        this.level.enemies = en;
        return col;
    }

    notHurt() {
        this.level.endboss.getHurt = false;
    }

    checkCollisions() {
        let pain = false;
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) || (this.character.isColliding(this.level.endboss) && this.level.endboss.energy > 0)) {
                console.log('collision with Character', this.character.energy);
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
                pain = true
            }
        });
        this.character.getHurt = pain;

        // if(this.character.isColliding())
    }



}


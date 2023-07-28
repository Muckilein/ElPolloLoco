class World {

    character = new Charakter();
    ctx;
    canvas;
    keyboard;
    camera_x = -100;
    level = level1;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addArrayToMap(this.level.background);
        this.addImageToMap(this.character);
        this.addArrayToMap(this.level.enemies);
        this.addArrayToMap(this.level.clouds);
        this.addImageToMap(this.level.endboss);
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

    addImageToMap(elem) {
        if (elem.otherDirection) {
            this.ctx.save();
            this.ctx.translate(elem.width, 0);
            elem.x = elem.x * -1;
            this.ctx.scale(-1, 1);
        }
        this.ctx.drawImage(elem.img, elem.x, elem.y, elem.width, elem.height);
        if (elem.otherDirection) {
            this.ctx.restore();
            elem.x = elem.x * -1;
        }
    }
}
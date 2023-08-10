class MoveableObject extends DrawableObject {

    speed = 0.15;
    speedY = 40;
    accleration = 3;
    addOld = 0;
    maxSpeed = 30;
    offsetY = 0;
    energy = 100;
    otherDirection = false;
    getHurt = false;
    startGame = false;


    isColliding(mo) {

        return (this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height);

    }

    isAboveGround() {
        // return this.y < 160;
        if (this instanceof ThrowableObject) { return true; }
        else return (this.y + this.height) < 460;
    }


    applyGravity() {
        setInterval(() => {

            if (this.isAboveGround() && (this.speedY <= 0)) {

                this.y -= this.speedY;
                if (!(this instanceof ThrowableObject)) {
                    this.y = Math.min(460 - this.height, this.y);
                }
                this.speedY -= this.accleration;

            }

        }, 1000 / 25);
    }

    moveRight() {

    }
    moveLeft() {

        setInterval(() => {
            if (this.startGame) { this.x = this.x - this.speed; }

        }, 1000 / 60);
    }

    startG() {
        this.startGame = true;
    }
    endG() {
        this.startGame = false;
    }





    playAnimation(len, add) {

        if (this.addOld != add) {
            this.currentImage = 0;
        }
        this.addOld = add;
        this.img = this.imageCache[this.currentImage + add];
        this.currentImage++;
        this.currentImage = this.currentImage % (len);

    }
}
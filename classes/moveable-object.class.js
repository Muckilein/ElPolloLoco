class MoveableObject {
    x = 120;
    y = 200;
    width = 120;
    height = 200;
    img;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 40;
    accleration = 3;
    addOld = 0;
    maxSpeed = 30;



    isAboveGround() {
        return this.y < 160;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache.push(img);
        });
    }

    moveRight() {

    }
    moveLeft() {

        setInterval(() => {
            this.x = this.x - this.speed;

        }, 1000 / 60);
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Charakter || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        } 
    }
    applyGravity() {

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
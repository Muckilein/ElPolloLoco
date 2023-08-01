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
    speedY = 20;
    accleration = 1;
    addOld = 0;



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



    applyGravity() {

    }

    playAnimation(len, add) {
        //if ((this.currentImage + add) >= this.imageCache.length) { this.currentImage = 0; }
        if (this.addOld != add) {
            this.currentImage = 0;
            console.log('change');
        }
        this.addOld = add;
        this.img = this.imageCache[this.currentImage + add];
        this.currentImage++;
        this.currentImage = this.currentImage % (len);

    }
}
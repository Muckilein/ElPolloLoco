class Endboss extends MoveableObject {
    images = ['../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
   
    standardPos;


    constructor(x) {
        super().loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.images);
        this.x = x;
        this.standardPos = x;
        this.width = 200;
        this.height = Math.round(this.width * 1.16);
        this.y = 450 - this.height;
        this.animate();
        this.speed = 0.75;
        this.otherDirection = true;
    }

    animate() {
        setInterval(() => {
            this.moveRight();
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.img = this.imageCache[this.currentImage];
            this.currentImage++;
            this.currentImage = this.currentImage % this.images.length;
        }, 500);
    }

    moveRight() {
        if (!this.otherDirection && this.x > this.standardPos - 100) {
            this.x -= this.speed;
        }
        else {
            this.otherDirection = true ;
        }
    }

    moveLeft() {
        if (this.otherDirection && this.x < this.standardPos + 100) {
            this.x += this.speed;
        }
        else {
            this.otherDirection = false;
        }
    }

}
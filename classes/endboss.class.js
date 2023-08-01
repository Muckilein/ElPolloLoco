class Endboss extends MoveableObject {
    images = ['../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
   
    standardPos;


    constructor(x) {
        super().loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.images);
        this.x = x;
        this.standardPos = x;
        this.width = 300;
        this.height = Math.round(this.width * 1.16);
        this.y = 450 - this.height;
        this.animate();
        this.speed = 0.75;
        this.otherDirection = false;
    }

    animate() {
        setInterval(() => {
            // this.moveRight();
            // this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.images.length,0);
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
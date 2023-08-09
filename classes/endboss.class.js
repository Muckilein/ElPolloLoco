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
    image_dead = ['../img/4_enemie_boss_chicken/5_dead/G24.png', '../img/4_enemie_boss_chicken/5_dead/G25.png', '../img/4_enemie_boss_chicken/5_dead/G26.png',
        '../img/2_character_pepe/5_dead/D-57.png'];
    images_getHurt = ['../img/4_enemie_boss_chicken/4_hurt/G21.png','../img/4_enemie_boss_chicken/4_hurt/G22.png','../img/4_enemie_boss_chicken/4_hurt/G23.png'];

    standardPos;
    deadAnimationCounter = 4;


    constructor(x) {
        super().loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.images);
        this.loadImages(this.images_getHurt);
        this.loadImages(this.image_dead);
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
        // setInterval(() => {
        //     // this.moveRight();
        //     // this.moveLeft();
        // }, 1000 / 60);

        setInterval(() => {
            if (this.energy > 0) {
                if (this.getHurt) {
                    this.playAnimation(this.images_getHurt.length, 8);
                }
                else {
                    this.playAnimation(this.images.length, 0);
                }

            }
            else {
                if (this.deadAnimationCounter > 0) {
                    this.playAnimation(this.image_dead.length, 11);
                    console.log(this.deadAnimationCounter);
                    this.deadAnimationCounter--;

                }
            }
        }, 500);
    }

    moveRight() {
        if (!this.otherDirection && this.x > this.standardPos - 100) {
            this.x -= this.speed;
        }
        else {
            this.otherDirection = true;
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
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
    ALERT = 0;
    DEAD = 8;
    HURT = 12;
    ATTACK = 15;
    image_dead = ['../img/4_enemie_boss_chicken/5_dead/G24.png', '../img/4_enemie_boss_chicken/5_dead/G25.png', '../img/4_enemie_boss_chicken/5_dead/G26.png',
        '../img/2_character_pepe/5_dead/D-57.png'];
    images_getHurt = ['../img/4_enemie_boss_chicken/4_hurt/G21.png', '../img/4_enemie_boss_chicken/4_hurt/G22.png', '../img/4_enemie_boss_chicken/4_hurt/G23.png'];
    image_attack = ['../img/4_enemie_boss_chicken/3_attack/G13.png', '../img/4_enemie_boss_chicken/3_attack/G14.png'
        , '../img/4_enemie_boss_chicken/3_attack/G15.png', '../img/4_enemie_boss_chicken/3_attack/G16.png', '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png', '../img/4_enemie_boss_chicken/3_attack/G19.png', '../img/4_enemie_boss_chicken/3_attack/G20.png'];
    standardPos;
    deadAnimationCounter;
    startFight;
    character;


    constructor(x) {
        console.log('call consructor Boss');
        super().loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.images);
        this.loadImages(this.image_dead);
        this.loadImages(this.images_getHurt);
        this.loadImages(this.image_attack);
        this.deadAnimationCounter = 4;
        this.startFight = false;
        this.x = x;
        this.standardPos = x;
        this.width = 300;
        this.height = Math.round(this.width * 1.16);
        this.y = 450 - this.height;       
        this.speed = 5;
        this.otherDirection = false;
        this.initMoveableObjects();
    }



    animate() {

        let interv = setInterval(() => {
          
                if (this.energy > 0) {

                    if (this.getHurt) {
                        this.viewToChar();
                        this.playAnimation(this.images_getHurt.length, this.HURT);

                    }
                    else {
                        if (this.startFight) {
                            this.viewToChar();
                            this.playAnimation(this.image_attack.length, this.ATTACK);
                        }
                        else {
                            this.playAnimation(this.images.length, this.ALERT);
                            this.moveRight();
                            this.moveLeft();
                        }
                    }

                }
                else {
                    if (this.deadAnimationCounter > 0) {
                        this.playAnimation(this.image_dead.length, this.DEAD);
                        this.deadAnimationCounter--;
                    }
                }
            
        }, 125);
        this.intervalls.push(interv);
    }

    moveRight() {
        if (!this.otherDirection && this.x > this.standardPos - 100) {
            this.x -= this.speed;

        }
        else {
            this.otherDirection = true;

        }
    }

    setChar(char) {
        this.character = char;
    }

    getDistance() {
        return Math.abs(this.character.x - this.x);
    }


    viewToChar() {
        if (this.character.x < this.x && this.getDistance() >50) {
            this.otherDirection = false;
            this.x -= 20;
        }  
        if (this.character.x > this.x && this.getDistance() >50) {
            this.otherDirection = true;
            this.x += 20;
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
class Charakter extends MoveableObject {
    images_walking = ['../img/2_character_pepe/2_walk/W-21.png', '../img/2_character_pepe/2_walk/W-22.png', '../img/2_character_pepe/2_walk/W-23.png', '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png', '../img/2_character_pepe/2_walk/W-26.png'];
    images_jumping = ['../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png']
    currentImage = 0;
    world;
    walking_sound = new Audio('../audio/walkOnGrass.mp3');
    isJumping = false;
    jumpNumber = 0;
    fallNumber = 6;

    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.width = 150;
        this.height = this.width * 2;
        // this.y = 460 - this.height;
        this.y = 160;
        this.x = 70;
        this.walking_sound.volume = 0.1;

        this.animate();
        this.applyGravity();
        this.jump();



    }

    jump() {
        setInterval(() => {

            if (this.speedY > 0 && (this.world.keyboard.SPACE || this.isAboveGround())) {

                this.y -= this.speedY;
                this.speedY -= this.accleration;
                this.speedY = Math.max(this.speedY, 0);

                console.log('jump');
                if (this.jumpNumber < 2) {
                    this.playAnimation(1, 8);//abheben
                    this.jumpNumber++;
                    console.log('jumpnumber' + this.jumpNumber);
                }
                else {
                    console.log('play 9');
                    this.playAnimation(1, 9);
                }
            }
            if (this.speedY == 0) {
                this.jumpNumber = 0;
            }

        }, 125);
    }

    applyGravity() {
        setInterval(() => {

            if (this.isAboveGround() && (this.speedY > -30)&&(this.speedY <=0)) {
               
                this.y -= this.speedY;
                this.speedY -= this.accleration;
                if (this.speedY < -10) {
                    this.playAnimation(1, 11);
                }
                else {
                    this.playAnimation(1, 12);
                }
                this.fallNumber = 0;
            }
            if (!this.isAboveGround() && this.fallNumber < 6 && !(this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {


                if (this.fallNumber <= 3) {

                    this.playAnimation(1, 13);
                    this.fallNumber++;
                } else {

                    this.playAnimation(1, 14);
                    this.fallNumber++;
                }

            }
            if (!this.isAboveGround()) {
                this.speedY = 20;
            }


        }, 1000 / 25);
    }

    animate() {
        setInterval(() => {

            this.moveRight();
            this.moveLeft();
            if (!keyboard.RIGHT && !keyboard.LEFT) {
                // this.walking_sound.pause();
            }
            this.world.camera_x = -1 * this.x + 100;

        }, 1000 / 60);

        setInterval(() => {
            if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
                this.playAnimation(this.images_walking.length, 0);
            } else {
                if (!this.isAboveGround() && this.fallNumber >= 6) {
                    this.playAnimation(1, 14);
                }
            }
        }, 50);
    }

    moveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end) {
            this.x += 5;
            this.otherDirection = false;
            //this.walking_sound.play();
        }
    }

    moveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= 5;
            this.otherDirection = true;
            //this.walking_sound.play();
        }
    }




}
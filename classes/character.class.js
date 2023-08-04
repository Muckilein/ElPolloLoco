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
        '../img/2_character_pepe/3_jump/J-39.png'];
    images_hurt = ['../img/2_character_pepe/4_hurt/H-41.png', '../img/2_character_pepe/4_hurt/H-42.png', '../img/2_character_pepe/4_hurt/H-43.png']
    images_death = ['../img/2_character_pepe/5_dead/D-51.png', '../img/2_character_pepe/5_dead/D-52.png', '../img/2_character_pepe/5_dead/D-53.png', '../img/2_character_pepe/5_dead/D-54.png', '../img/2_character_pepe/5_dead/D-55.png', '../img/2_character_pepe/5_dead/D-56.png', '../img/2_character_pepe/5_dead/D-57.png'];
    currentImage = 0;
    world;
    walking_sound = new Audio('../audio/walkOnGrass.mp3');
    jumpNumber = 0;
    fallNumber = 6;
    startJump = 1;
    getHurt = false;
    playDeath = 7;


    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_death);
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

    jumpCalculations() {
        // startjump = 1 if we are startting the jump
        if (0 == this.startJump) {
            this.y -= this.speedY;
            this.speedY -= this.accleration;
            this.speedY = Math.max(this.speedY, 0);
        } else {
            this.y--;
        }
        // now he is jumping
        this.startJump = 0;
    }
    jumptAnimation() {
        if (this.jumpNumber < 2) {
            //is playing the kickoff the ground animation 
            this.playAnimation(1, 8);
            this.jumpNumber++;
        }
        else {
            // is playing the flying animation
            this.playAnimation(1, 9);
        }
    }

    jump() {
        setInterval(() => {

            if (this.speedY > 0 && (this.world.keyboard.SPACE || this.isAboveGround())) {
                this.jumpCalculations();
                this.jumptAnimation();
            }
            if (this.speedY == 0) {
                this.jumpNumber = 0;
            }

        }, 125);
    }

    gravityCalculation() {
        this.y -= this.speedY;
        this.y = Math.min(160, this.y);
        this.speedY -= this.accleration;
    }

    gravityFallAnimation() {
        if (this.speedY < -15) {
            this.playAnimation(1, 11);
        }
        else {
            this.playAnimation(1, 12);
        }
    }

    gravityLandingAnimation() {
        if (this.fallNumber <= 3) {

            this.playAnimation(1, 13);
            this.fallNumber++;
        } else {

            this.playAnimation(1, 14);
            this.fallNumber++;
        }
    }

    applyGravity() {
        setInterval(() => {

            if (this.isAboveGround() && (this.speedY > -1 * this.maxSpeed - 10) && (this.speedY <= 0)) {
                this.gravityCalculation();
                this.gravityFallAnimation();
                this.fallNumber = 0;
            }
            if (!this.isAboveGround() && this.fallNumber < 6 && !(this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                this.gravityLandingAnimation();
            }
            if (!this.isAboveGround()) {
                this.speedY = this.maxSpeed;                
                this.startJump = 1;
            }


        }, 1000 / 25);
    }

    hit() {
        this.energy -= 2;
        if (this.energy <= 0) {
            this.energy = 0;
        }
        if(!this.isDeath())
        {this.playAnimation(1, 15);}
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

        //graphics walk
        setInterval(() => {
            //is death
            if (this.isDeath()) {
                if (this.playDeath >0) {
                    this.playAnimation(7, 18);
                    this.playDeath--;
                }
            } else {
                console.log('other');
                if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround() && !this.getHurt) {
                    //simple walking
                    this.playAnimation(this.images_walking.length, 0);
                } else {
                    if (this.getHurt) {
                        //painfull face
                        this.playAnimation(3, 15);
                    } else {
                        if (!this.isAboveGround() && this.fallNumber >= 6) {
                            //idls standing
                            this.playAnimation(1, 14);
                        }
                    }
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

    isDeath() {
        return this.energy <= 0;
    }


}
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
    images_idle = ['../img/2_character_pepe/1_idle/idle/I-1.png', '../img/2_character_pepe/1_idle/idle/I-2.png', '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png', '../img/2_character_pepe/1_idle/idle/I-5.png', '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png', '../img/2_character_pepe/1_idle/idle/I-8.png', '../img/2_character_pepe/1_idle/idle/I-9.png', '../img/2_character_pepe/1_idle/idle/I-10.png'];
    world;
    walking_sound = new Audio('../audio/walkOnGrass.mp3');
    currentImage;
    jumpNumber;
    fallNumber;
    startJump;
    playDeath;
    idleSlowAnimation;      //supportiv variable for slowing down the idle animation
    amountBottles;
    amountCoins;
    intervalls=[0]


    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_death);
        this.loadImages(this.images_idle);
        this.width = 150;
        this.height = this.width * 2;
        // this.y = 460 - this.height;
        this.y = 160;
        // this.x = 70;
        this.x = 70;
        this.walking_sound.volume = 0.1;
        this.initializeValues();
        this.initMoveableObjects();


    }

    startAnimations() {
        this.animate();
        this.applyGravity();
        this.jump();
    }

    initializeValues() {
        this.currentImage = 0;
        this.jumpNumber = 0;
        this.fallNumber = 6;
        this.startJump = 1;
        this.playDeath = 7;
        this.idleSlowAnimation = 0;      //supportiv variable for slowing down the idle animation
        this.amountBottles = 0;
        this.amountCoins = 0;
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
        let interv= setInterval(() => {
            
                if (this.speedY > 0 && (this.world.keyboard.SPACE || this.isAboveGround())) {
                    this.jumpCalculations();
                    this.jumptAnimation();
                }
                if (this.speedY == 0) {
                    this.jumpNumber = 0;
                }
        
        }, 125);
        this.intervalls.push(interv);
    }

    gravityCalculation() {
        this.y -= this.speedY;
        this.y = Math.min(460 - this.height, this.y);
        this.speedY -= this.accleration;
    }

    /**
     * Plays two different falling animations
     */
    gravityFallAnimation() {
        if (this.speedY < -15) {
            this.playAnimation(1, 11);
        }
        else {
            this.playAnimation(1, 12);
        }
    }

    /**
    * Plays two different laning animations
    */
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
       let interv= setInterval(() => {
          
                //when he is in the air
                if (this.isAboveGround() && (this.speedY <= 0)) {
                    this.gravityCalculation();
                    this.gravityFallAnimation();
                    this.fallNumber = 0;
                }
                //when he reached the ground
                if (!this.isAboveGround() && this.fallNumber < 6 && !(this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                    this.gravityLandingAnimation();
                }
                // after the complete landing process is completed
                if (!this.isAboveGround()) {
                    this.speedY = this.maxSpeed;
                    this.startJump = 1;
                }

            
        }, 1000 / 25);
        this.intervalls.push(interv);
    }

    hit() {
        this.energy -= 2;
        if (this.energy <= 0) {
            this.energy = 0;
        }
        if (!this.isDeath()) { this.playAnimation(1, 15); }
    }

    animate() {
        console.log('call animate()');
        let interv = setInterval(() => {          
                this.moveRight();
                this.moveLeft();
                if (!keyboard.RIGHT && !keyboard.LEFT) {
                    // this.walking_sound.pause();
                }
                this.world.camera_x = -1 * this.x + 100;
                //statuspar moves with the camera
                this.world.statusbar.x = this.x - 50;
                this.world.bottlebar.x = this.x - 50;
                this.world.bossbar.x = this.x + 350;
                this.world.coinbar.x = this.x + 350;
        
        }, 1000 / 60);       
        this.intervalls.push(interv);
        //graphics walk
        interv = setInterval(() => {
          
                //is death
                if (this.isDeath()) {
                    if (this.playDeath > 0) {
                        this.playAnimation(7, 18);
                        this.playDeath--;
                    }
                } else {


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
                                this.slowedDownIdleAnimation();

                            }
                        }
                    }
                }
            
        }, 100);
        this.intervalls.push(interv);
    }

    slowedDownIdleAnimation() {
        if (this.idleSlowAnimation == 0) {
            this.playAnimation(10, 25);
        }
        this.idleSlowAnimation++;
        this.idleSlowAnimation = this.idleSlowAnimation % 3;
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
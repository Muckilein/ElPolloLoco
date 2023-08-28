class Endboss extends MoveableObject {
    add ='/El%20Pollo%20Loco';
    // add ='';
    images = ['..'+this.add+'/img/4_enemie_boss_chicken/2_alert/G5.png',
        '..'+this.add+'/img/4_enemie_boss_chicken/2_alert/G6.png',
        '..'+this.add+'/img/4_enemie_boss_chicken/2_alert/G7.png',
        '..'+this.add+'/img/4_enemie_boss_chicken/2_alert/G8.png',
        '..'+this.add+'/img/4_enemie_boss_chicken/2_alert/G9.png',
        '..'+this.add+'/img/4_enemie_boss_chicken/2_alert/G10.png',
        '..'+this.add+'/img/4_enemie_boss_chicken/2_alert/G11.png',
        '..'+this.add+'/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    image_dead = ['..'+this.add+'/img/4_enemie_boss_chicken/5_dead/G24.png', '..'+this.add+'/img/4_enemie_boss_chicken/5_dead/G25.png', '..'+this.add+'/img/4_enemie_boss_chicken/5_dead/G26.png',
        '..'+this.add+'/img/2_character_pepe/5_dead/D-57.png'];
    images_getHurt = ['..'+this.add+'/img/4_enemie_boss_chicken/4_hurt/G21.png', '..'+this.add+'/img/4_enemie_boss_chicken/4_hurt/G22.png', '..'+this.add+'/img/4_enemie_boss_chicken/4_hurt/G23.png'];
    image_attack = ['..'+this.add+'/img/4_enemie_boss_chicken/3_attack/G13.png', '..'+this.add+'/img/4_enemie_boss_chicken/3_attack/G14.png'
        , '..'+this.add+'/img/4_enemie_boss_chicken/3_attack/G15.png', '..'+this.add+'/img/4_enemie_boss_chicken/3_attack/G16.png', '..'+this.add+'/img/4_enemie_boss_chicken/3_attack/G17.png',
        '..'+this.add+'/img/4_enemie_boss_chicken/3_attack/G18.png', '..'+this.add+'/img/4_enemie_boss_chicken/3_attack/G19.png', '..'+this.add+'/img/4_enemie_boss_chicken/3_attack/G20.png'];
    boss_sound = new Audio('..'+this.add+'/audio/chicken.mp3');
    standardPos;
    deadAnimationCounter;
    startFight;
    character;
    ALERT = 0;
    DEAD = this.images.length;
    HURT = this.DEAD + this.image_dead.length;
    ATTACK = this.HURT + this.images_getHurt.length;



    constructor(x) {
       
        super().loadImage('..'+this.add+'/img/4_enemie_boss_chicken/1_walk/G1.png');
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

    bossStartFight(){
        this.viewToChar();
        this.playAnimation(this.image_attack.length, this.ATTACK);
        this.boss_sound.play();
    }

    bossWalking(){
        this.playAnimation(this.images.length, this.ALERT);
        this.moveRight();
        this.moveLeft();
    }

    bossGetHurt(){
        this.viewToChar();
        this.playAnimation(this.images_getHurt.length, this.HURT);

    }

/**
 * Handles the animation of the boss while  he is living
 */
    animateBossLiving(){
        if (this.getHurt) {
           this.bossGetHurt();
        }
        else {
            if (this.startFight) {
                this.bossStartFight();
            }
            else {
               this.bossWalking();
            }
        }
    }

    /** 
     * Animations of the endboss depending on the state of the endboss.
    */
    animate() {

        let interv = setInterval(() => {
            //still alive
            if (this.energy > 0) {
                this.animateBossLiving();         
            }
            //dead animation
            else {
                if (this.deadAnimationCounter > 0) {
                    this.playAnimation(this.image_dead.length, this.DEAD);
                    this.deadAnimationCounter--;
                }
            }

        }, 125);
        this.intervalls.push(interv);
    }

    /**
     * Moves right
     */
    moveRight() {
        if (!this.otherDirection && this.x > this.standardPos - 100) {
            this.x -= this.speed;

        }
        else {
            this.otherDirection = true;

        }
    }
    /**
     * Moves left
     */
    moveLeft() {
        if (this.otherDirection && this.x < this.standardPos + 100) {
            this.x += this.speed;
        }
        else {
            this.otherDirection = false;
        }
    }

    /**
     * 
     * @param {Character} char sets char as the Charakter
     */
    setChar(char) {
        this.character = char;
    }

    /**     * 
     * @returns Distance of the endboss and the charakter
     */
    getDistance() {
        return Math.abs(this.character.x - this.x);
    }


    /**
     * If the distance between the endboss and the charakter is smaler than 50 the endbos turns to the charakter and 
     * attaks.
     */
    viewToChar() {
        if (this.character.x < this.x && this.getDistance() > 50) {
            this.otherDirection = false;
            this.x -= 15;
        }
        if (this.character.x > this.x && this.getDistance() > 50) {
            this.otherDirection = true;
            this.x += 15;
        }
    }



}
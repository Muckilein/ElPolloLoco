class Chicken extends MoveableObject {
    // add ='/El%20Pollo%20Loco';
    add = '';
    images = ['..' + this.add + '/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png', '..' + this.add + '/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png', '..' + this.add + '/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'];
    image_dead = ['..' + this.add + '/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    chicken_sound = new Audio('..' + this.add + '/audio/chicken.mp3');
    jumpedOn = false;


    constructor() {
        super().loadImage('..' + this.add + '/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images);
        this.loadImages(this.image_dead);
        this.x = 200 + Math.random() * 3000;
        this.width = 100;
        this.speed = 1 + Math.random() * 1;
        this.height = Math.round(this.width);
        this.y = 450 - this.height;
        this.chicken_sound.volume = 0.2;
        this.initMoveableObjects();
        this.playSound = false;


    }

    /**
     * Animation of the Chickens. Moves only left.
     */
    animate() {

        // this.moveLeft();

        let interv = setInterval(() => {
            if (!this.jumpedOn) {
                this.playAnimation(this.images.length, 0);
                this.x = this.x - this.speed;
            }
            else {
                this.playAnimation(1, this.images.length);
                if (this.playSound) { this.closeSound(); }
            }
            if (this.playSound) { this.chicken_sound.play(); }
            else {
                if (!this.jumpedOn) {
                    this.chicken_sound.pause();
                }
            }

        }, 100);
        this.intervalls.push(interv);
    }

    closeSound() {
        this.chicken_sound.pause();
        this.playSound = false;
        console.log('close sound');
    }

}
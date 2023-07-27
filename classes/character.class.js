class Charakter extends MoveableObject {
    images = ['../img/2_character_pepe/2_walk/W-21.png', '../img/2_character_pepe/2_walk/W-22.png', '../img/2_character_pepe/2_walk/W-23.png', '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png', '../img/2_character_pepe/2_walk/W-26.png'];
    currentImage = 0;
    world;
    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.images);
        this.width = 150;
        this.height = this.width * 2;
        this.y = 460 - this.height;
        this.x = 70;       
        this.animate();

    }

    jump() {

    }
    animate() {
        setInterval(() => {
            this.moveRight();
            this.moveLeft();
            this.world.camera_x = -1 * this.x+100;           
        }, 1000 / 60);      

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.img = this.imageCache[this.currentImage];
                this.currentImage++;
                this.currentImage = this.currentImage % this.images.length;
            }
        }, 50);
    }

    moveRight() {
        if (this.world.keyboard.RIGHT&&this.x<this.world.level.level_end) {
            this.x += 5;
            this.otherDirection = false;
        }
    }

    moveLeft() {
        if (this.world.keyboard.LEFT&&this.x>0) {
            this.x -= 5;
            this.otherDirection = true;
        }
    }


}
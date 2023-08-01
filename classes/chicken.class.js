class Chicken extends MoveableObject {
    images = ['../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png', '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png', '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'];
    chicken_sound = new Audio('../audio/chicken.mp3');
    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images);
        this.x = 200 + Math.random() * 400;
        this.width = 100;
        this.speed = 0.15 + Math.random() * 0.25;
        this.height = Math.round(this.width);
        this.y = 450 - this.height;
        //this.animate();
        this.chicken_sound.volume = 0.1;

    }
    animate() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.images.length,0);
            //this.chicken_sound.play();

        }, 100);

    }

}
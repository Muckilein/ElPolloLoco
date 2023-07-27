class Chicken extends MoveableObject {
    images = ['../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png', '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png', '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'];
    
    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images);
        this.x = 200 + Math.random() * 400;
        this.width = 100;
        this.speed= 0.15+ Math.random()*0.25;
        this.height = this.width;
        this.y = 450 - this.height;
        this.animate();

    }
    animate() {
        this.moveLeft();
        setInterval(() => {
            this.img = this.imageCache[this.currentImage];
            this.currentImage++;
            this.currentImage = this.currentImage % this.images.length;
           
        }, 100);

    }

}
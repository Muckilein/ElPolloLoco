class ThrowableObject extends MoveableObject {
    image = 'img/6_salsa_bottle/salsa_bottle.png';

    constructor(x, y) {
        super().loadImage(this.image);;
        this.x = x + this.width - 20;
        this.width = 100;
        this.height = this.width;
        this.y = y - this.height;
        this.speedY = 0;
        // this.throw();

    }


    throw(mult) {
        this.speedY = 30;
        this.applyGravity();
        if (mult == -1) {
            this.x -= this.width;
        }
        setInterval(() => {
            this.x += 5 * mult;
            if (this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accleration;
            }
        }, 50);

    }
}
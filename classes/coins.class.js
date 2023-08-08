class Coin extends MoveableObject {
    images = ['../img/8_coin/coin_1.png', '../img/8_coin/coin_2.png'];

    constructor(x, y) {
        super().loadImages(this.images);
        this.loadImage(this.images[0]);
        this.x = x;
        this.width = 100;
        this.height = this.width;
        this.y = y - this.height;

    }
}
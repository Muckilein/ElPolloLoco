class DrawableObject{
    x = 120;
    y = 200;
    width = 120;
    height = 200;
    img;
    imageCache = [];
    currentImage = 0;
    otherDirection = false;
    
  loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache.push(img);
        });
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Charakter || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}
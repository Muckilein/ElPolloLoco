class DrawableObject {
    x = 120;
    y = 200;
    width = 120;
    height = 200;
    img;                //current image
    imageCache = [];    //Cache of all images used for the animations
    currentImage = 0;   //index of the image in the imageCache, that shoud be shound during the animation.
    otherDirection = false; //determinses the direction of the object.
    // offset determined the distances between the real borders of the images and the wanted borderd (for collision)
    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }

    /**
     * Loads a image with the given path to the current image of the object.
     * 
     * @param {String} path Path of the images
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
   

    /**
     * Takes an array with image paths and for each element there i an image object created with that path and is stored in imageCache.
     * @param {array} arr  Array that contains the paths of all images that shell be used for the animations
     */
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
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }

     /**
     * Initialized the nessesara values when a new DrawableObject is created.
     */
     initDrawableObjects() {
        this.currentImage = 0;
        this.otherDirection = false;
    }
}
class MoveableObject extends DrawableObject {

    speed = 0.15;
    maxSpeed = 45;
    speedY = this.maxSpeed;
    accleration = 6;
    addOld = 0;
    
    offsetY = 0;
    energy = 100;
    //otherDirection = false;
    getHurt = false;
    intervalls = [0];
    playSound;


    /**
     * Initialized the nessesara values when a new MoveableObject is created.
     */
    initMoveableObjects() {
        this.initDrawableObjects();
        this.getHurt = false;
        this.energy = 100;
    }

/**
 * Checks, if the given moveableObject is colliding with the character
 * 
 * @param {Object} mo The MoveableObject with which we want to check  a collision from top
 * @param {number} d  Difference between character.y and mo.y
 * @returns           If there is a collision from top       
 */ 
    isCollidingFromTop(mo,d){
        return ((this.x+this.offset.left< mo.x+mo.offset.left && this.x+this.width-this.offset.right >mo.x+mo.offset.left)
        ||(this.x+this.width-this.offset.right>mo.x+mo.width-mo.offset.right && this.x+this.offset.left<mo.width-mo.offset.right)
        ||(this.x+this.offset.left> mo.x+mo.offset.left && this.x+this.width-this.offset.right < mo.x+mo.width-mo.offset.right))&&(d<mo.height && d>-20 )&&
        !this.getHurt;
    }

    /**
     * returns whether the character is colliding with the given MoveableObject.
     *  
     * @param {MoveableObject} mo  MoaveableObject 
     * @returns                     ist the character colliding with mo
     */
    isColliding(mo) {
        return (this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom);
    }
    /**
     * 
     * @returns return whether a object is on the gound or not. A Throwable object is always considers as on the ground.
     */
    isAboveGround() {
        // return this.y < 160;
        if (this instanceof ThrowableObject) { return true; }
        else return (this.y + this.height) < 460;
    }

    /**
     * Handles the falling down of an object till the ground
     */
 fallingDown(){
    this.y -= this.speedY;
    this.speedY -= this.accleration;
    if (!(this instanceof ThrowableObject)) {
        this.y = Math.min(460 - this.height, this.y);
    }else{
        //splashed bottle is no falling any more
        if(this.splashCounter<6){
            this.speedY+=this.accleration;
            this.y+=this.speedY;
        }
    }      
 }

    /**
     * Applys gravity to a Moveable Object, as long a it is not overwritten in a more specific class.
     */
    applyGravity() {
        let interv = setInterval(() => {

            if (this.isAboveGround() && (this.speedY <= 0)) {
                this.fallingDown();       
            }

        }, 1000 / 25);
        this.intervalls.push(interv);
    }

    moveRight() {

    }
    /**
     * Objects moves left
     */
    moveLeft() {

        let interv = setInterval(() => {
            this.x = this.x - this.speed;

        }, 1000 / 60);
        this.intervalls.push(interv);
    }
    /**
     * 
     * @param {number} len amout of images that are unsed for the animtion
     * @param {number} add index where the images, that shell be used for this animation are stored in imageCache.
     */
    playAnimation(len, add) {

        if (this.addOld != add) {
            this.currentImage = 0;
        }
        this.addOld = add;
        this.img = this.imageCache[this.currentImage + add];
        this.currentImage++;
        this.currentImage = this.currentImage % (len);

    }
}
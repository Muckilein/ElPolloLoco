class ThrowableObject extends MoveableObject {
    // add ='/El%20Pollo%20Loco';
    add ='';
    image = ''+this.add+'/img/6_salsa_bottle/salsa_bottle.png';
   
    constructor(x, y) {
        super().loadImage(this.image);;
        this.x = x + this.width - 20;
        this.width = 100;
        this.height = this.width;
        this.y = y - this.height;
        this.speedY = 0;     

    }

/**
 * 
 * @param {number} direct determined in which direction the object shell be thrown.
 */
    throw(direct) {
        this.speedY = 30;
        this.applyGravity();
        if (direct == -1) {
            this.x -= this.width;
        }
        let interv = setInterval(() => {
            this.x += 5 * direct;
            if (this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accleration;
            }
        }, 50);
        this.intervalls.push(interv);

    }
}
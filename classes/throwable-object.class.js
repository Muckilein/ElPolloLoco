class ThrowableObject extends MoveableObject {
    // add ='/El%20Pollo%20Loco';
    add = '';
    image = ['' + this.add + '/img/6_salsa_bottle/salsa_bottle.png'];
    image_rotate = ['..' + this.add + '/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', '..' + this.add + '/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    '..' + this.add + '/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png', '..' + this.add + '/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png']
    image_splash = ['..' + this.add + '/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png', '..' + this.add + '/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    '..' + this.add + '/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png', '..' + this.add + '/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    '..' + this.add + '/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png', '..' + this.add + '/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'];
    SPLASH = this.image_rotate.length;
    splashCounter = this.image_splash.length;
    constructor(x, y) {
        super().loadImage(this.image[0]);
        this.loadImages(this.image_rotate);
        this.loadImages(this.image_splash);
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
                console.log('throw');
            }
            if(this.splashCounter==this.image_splash.length){
                this.playAnimation(this.image_rotate.length, 0);
            }
           else{
            if(this.splashCounter>0);{
                this.x -= 5 * direct;
                this.playAnimation(this.image_splash.length, this.SPLASH);
            }
          }
           
        }, 50);
        this.intervalls.push(interv);

    }
}
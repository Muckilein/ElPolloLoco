class Cloud extends MoveableObject {

    constructor(imgPath,x) {
        super().loadImage(imgPath);
        this.width = 600;
        this.x = x;
        this.height = this.width * 0.56;
        this.y = 40;
        this.animate();
    }

    animate(){
        
     this.moveLeft();
       
    }

 
}
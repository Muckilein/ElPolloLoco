class Background extends MoveableObject {
    width=720;
    height=480;
    constructor(imgPath,x){
        super().loadImage(imgPath);
        this.x=x;       
        this.y=0;
       
    }
}
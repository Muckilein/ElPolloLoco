class MoveableObject {
    x = 120;
    y = 200;
    width = 120;
    height = 200;
    img;
    imageCache = [];
    currentImage = 0;
    speed=0.15;
    otherDirection=false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path=> {
            let img = new Image();
            img.src = path;
            this.imageCache.push(img);
        });      
    }

    moveRight() {

    }
    moveLeft() {
        console.log('call  move left');
        setInterval(()=>{          
            this.x = this.x - this.speed;
           
        },1000/60);
        
       
    }
}
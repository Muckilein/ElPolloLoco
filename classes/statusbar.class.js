class StatusBar extends DrawableObject {
    images = [];

    // images = ['../img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    //     '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png', '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    //     '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    //     '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'];

    percentage = 100;
    index = 0;
    constructor(x, y, images, pers) {
        super().loadImages(images);
        this.setPercentage(pers);
        this.width = 250;
        this.height = this.width * 0.266;
        this.x = x;
        this.y = y;
        this.images = images;


    }

    /**
     * Sets the images from the imageCache that is the closes to the given percentage.
     * There are images for: 0,20,40,60,80,100
     * 
     * @param {number} percentage of many percent of the sttatus bar are filled
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let index = Math.floor(this.percentage / 20);       
        this.img = this.imageCache[index];

    }

    /**
     * Use for the endboss.
     * displays the next image from imageCache.
     */
    nextIndex() {
        this.index++;
        this.index = this.index % 3;
        this.img = this.imageCache[this.index];
    }



}
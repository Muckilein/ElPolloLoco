class Level {
    enemies;
    clouds;
    background;
    endboss;
    level_end = 3690;
    statusBarImages = ['../img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png', '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'];
    bottleBarImages = ['../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png', '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png', '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png', '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'];
    bossBarImages = ['../img/7_statusbars/2_statusbar_endboss/blue.png', 'img/7_statusbars/2_statusbar_endboss/green.png',
        'img/7_statusbars/2_statusbar_endboss/orange.png'];
   
    constructor(enemies, clouds, background, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.endboss = endboss
    }
}
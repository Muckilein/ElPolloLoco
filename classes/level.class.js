class Level {
    enemies;
    clouds;
    background;
    endboss;
    coins;
    bottles;
    charakter;
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
    coinBarImages = ['../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png', '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png', '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png'
        , '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png', '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png', '../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'];
    statusbar = new StatusBar(15, 0, this.statusBarImages, 100);
    bottlebar = new StatusBar(15, 60, this.bottleBarImages, 0);
    bossbar = new StatusBar(400, 0, this.bossBarImages, 0);
    coinbar = new StatusBar(400, 60, this.coinBarImages, 0);

    constructor(enemies, clouds, background, endboss, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.endboss = endboss;
        this.coins = coins;
        this.bottles = bottles;        
    }
}
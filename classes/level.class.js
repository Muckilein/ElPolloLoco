class Level {
    enemies;
    clouds;
    background;
    endboss;
    level_end = 3690;

    constructor(enemies, clouds, background, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.endboss = endboss
    }
}
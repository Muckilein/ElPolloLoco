let level1 = new Level([new Chicken(), new Chicken(), new Chicken()], [new Cloud('../img/5_background/layers/4_clouds/1.png', 50)], [
    new Background('../img/5_background/layers/air.png', -719),
    new Background('../img/5_background/layers/3_third_layer/2.png', -719),
    new Background('../img/5_background/layers/2_second_layer/2.png', -719),
    new Background('../img/5_background/layers/1_first_layer/2.png', -719)]);

 bgLevel1(); 

function bgLevel1() {
    for (let i = 0; i < 5; i = i + 2) {
        level1.background.push(new Background('../img/5_background/layers/air.png', 0 + i * 719));
        level1.background.push(new Background('../img/5_background/layers/3_third_layer/1.png', 0 + i * 719));
        level1.background.push(new Background('../img/5_background/layers/2_second_layer/1.png', 0 + i * 719));
        level1.background.push(new Background('../img/5_background/layers/1_first_layer/1.png', 0 + i * 719));
        level1.background.push(new Background('../img/5_background/layers/air.png', (i + 1) * 719));
        level1.background.push(new Background('../img/5_background/layers/3_third_layer/2.png', (i + 1) * 719));
        level1.background.push(new Background('../img/5_background/layers/2_second_layer/2.png', (i + 1) * 719));
        level1.background.push(new Background('../img/5_background/layers/1_first_layer/2.png', (i + 1) * 719));
    }
}


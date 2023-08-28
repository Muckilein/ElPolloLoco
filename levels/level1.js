// let level1 = new Level([new Chicken(), new Chicken(), new Chicken()], [new Cloud('../img/5_background/layers/4_clouds/1.png', 50)], [
//     new Background('../img/5_background/layers/air.png', -719),
//     new Background('../img/5_background/layers/3_third_layer/2.png', -719),
//     new Background('../img/5_background/layers/2_second_layer/2.png', -719),
//     new Background('../img/5_background/layers/1_first_layer/2.png', -719)], new Endboss(3000), 
//     [new Coin(450, 480), new Coin(550, 480), new Coin(950, 480), new Coin(1300, 480)],
//     [new ThrowableObject(900, 450), new ThrowableObject(1000, 450), new ThrowableObject(1200, 450), new ThrowableObject(1400, 450)
//         , new ThrowableObject(1600, 450), new ThrowableObject(1800, 450), new ThrowableObject(2000, 450)]);

// bgLevel1(level1);
let add= '/El%20Pollo%20Loco';
// let add='';
function newLevel1() {
   
   let level= new Level([new Chicken(), new Chicken(), new Chicken()], [new Cloud('..'+add+'/img/5_background/layers/4_clouds/1.png', 50)], [
    new Background('..'+add+'/img/5_background/layers/air.png', -719),
    new Background('..'+add+'/img/5_background/layers/3_third_layer/2.png', -719),
    new Background('..'+add+'/img/5_background/layers/2_second_layer/2.png', -719),
    new Background('..'+add+'/img/5_background/layers/1_first_layer/2.png', -719)], new Endboss(3000), 
    [new Coin(450, 480), new Coin(550, 480), new Coin(950, 480), new Coin(1300, 480)],
    [new ThrowableObject(900, 450), new ThrowableObject(1000, 450), new ThrowableObject(1200, 450), new ThrowableObject(1400, 450)
        , new ThrowableObject(1600, 450), new ThrowableObject(1800, 450), new ThrowableObject(2000, 450)]);
  bgLevel1(level);
  return level;
        
}

function bgLevel1(level1) {
    console.log('bgLevel1');  
    for (let i = 0; i < 5; i = i + 2) {
        level1.background.push(new Background('..'+add+'/img/5_background/layers/air.png', 0 + i * 719));
        level1.background.push(new Background('..'+add+'/img/5_background/layers/3_third_layer/1.png', 0 + i * 719));
        level1.background.push(new Background('..'+add+'/img/5_background/layers/2_second_layer/1.png', 0 + i * 719));
        level1.background.push(new Background('..'+add+'/img/5_background/layers/1_first_layer/1.png', 0 + i * 719));
        level1.background.push(new Background('..'+add+'/img/5_background/layers/air.png', (i + 1) * 719));
        level1.background.push(new Background('..'+add+'/img/5_background/layers/3_third_layer/2.png', (i + 1) * 719));
        level1.background.push(new Background('..'+add+'/img/5_background/layers/2_second_layer/2.png', (i + 1) * 719));
        level1.background.push(new Background('..'+add+'/img/5_background/layers/1_first_layer/2.png', (i + 1) * 719));
    }
}


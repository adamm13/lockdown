import sceneEvents from "../SceneEvents";
import { Zombie } from "../Zombie";


const zombieFactory = (scene, zombieArray, spritesheetKey, target, obstacles) => {
  const zombieSpeed = 120;
  let sprite = spritesheetKey;

  zombieArray.forEach((zombie, i) => {
    if (zombie.name === "ZombieBoss") {
      sprite = "zombieKing"
    }
    scene.zombies[i] = new Zombie(scene, zombie.x, zombie.y, sprite, target, zombieSpeed);
    scene.physics.add.collider(scene.zombies[i], obstacles);
  });
};

const zombieDamage = (zombie, shot, scene, bossRoom) => {
  if (zombie.zombieData.health === 0) {
    zombie.setVisible(false);
    zombie.body.enable = false;
    //sceneEvents.emit('zombie-killed', player.gameData.kills);
    if (bossRoom) {
      const { map, tileset, player } = bossRoom;
      const finalScene = scene.scene.get('FinalBoss');
      killZombie(zombie, finalScene, map, tileset, player);
    }
  } else {
    zombie.tint = Math.random() * 0xffffff;
    zombie.zombieData.health -= 1;
    const directionX = zombie.x - shot.x;
    const directionY = zombie.y - shot.y;
    const direction = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(200);
    zombie.bounceBack(direction);
  }
};

const zombieHit = (player, zombie) => {
  //gets information to pass to the player bouncing back
  const directionX = player.x - zombie.x;
  const directionY = player.y - zombie.y;
  const direction = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(300);
  
  // mess up the player more if boss
  if (zombie.textureKey === "zombieKing") {
    player.gameData.health -= 1; 
    player.bounceBack(direction);
  } else {
    player.gameData.health -= 0.5; 
  }
  
  player.tint = Math.random() * 0xffffff;

  sceneEvents.emit('zombieHit', player.gameData.health);
  //scene.sound.play("blood") // throttle this sound to play once/second
};

const killZombie = (zombie, scene, map, tileset, player) => {
  // Remove zombie from scene zombies array
  const zombieIndex = scene.zombies.indexOf(zombie); 
  scene.zombies.splice(zombieIndex, 1); 

  const finalScene = scene.scene.get('FinalBoss');
  if (finalScene.zombies.length === 0) {
    console.log("YOU WIN!");
    renderChest(finalScene, map, tileset, player);
  }
}

const renderChest = (scene, map, tileset, player) => {
  const chest = map.createLayer("Chest", tileset, 0, 0);
  chest.setCollisionBetween(0, 500);
  scene.physics.add.collider(chest, player, (player, tile) => { 
    getAntidote(scene);
  });
}

const getAntidote = (scene) => {
  console.log("YOU GOT THE ANTIDOTE");
  // Transition to Game Over "You Won" Scene
  scene.scene.start("Winning");
  scene.scene.stop("FinalBoss");
};


module.exports = { zombieFactory, zombieDamage, zombieHit };
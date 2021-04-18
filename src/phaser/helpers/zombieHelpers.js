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

const zombieDamage = (zombie, shot, scene, map, tileset, player) => {
  console.log("Map: ", map);
  if(zombie.zombieData.health === 0){
    zombie.setVisible(false);
    zombie.body.enable = false;
    // increment player kill count?
    killZombie(zombie, scene, map, tileset, player);
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

  // could refactor for more/less damage depening on zombie 
  player.gameData.health -= 0.5; 
  player.tint = Math.random() * 0xffffff;

  //gets information to pass to the player bouncing back
  const directionX = player.x - zombie.x;
  const directionY = player.y - zombie.y;
  const direction = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(300);
  player.bounceBack(direction);

  sceneEvents.emit('zombieHit', player.gameData.health);
  //this.sound.play("blood") // throttle this sound to play once/second
};

const killZombie = (zombie, scene, map, tileset, player) => {
  // Remove zombie from scene zombies array
  const zombieIndex = scene.zombies.indexOf(zombie); 
  scene.zombies.splice(zombieIndex, 1); 
  console.log(scene.zombies);
  const finalScene = scene.scene.get('FinalBoss');
  if (finalScene.zombies.length === 0) {
    console.log("YOU WIN!");
    renderChest(scene, map, tileset, player);
  }
}

const renderChest = (scene, map, tileset, player) => {
  const chest = map.createLayer("Chest", tileset, 0, 0);
  chest.setCollisionBetween(0, 500);
  scene.physics.add.collider(chest, player, (player, tile) => { 
    getAntidote();
  });
}

const getAntidote = () => {
  console.log("YOU GOT THE ANTIDOTE");
};

module.exports = { zombieFactory, zombieDamage, zombieHit };
import sceneEvents from "../SceneEvents";
import { Zombie } from "../Zombie";


const zombieFactory = (scene, zombieArray, spritesheetKey, target, obstacles) => {
  const zombieSpeed = 120;
  zombieArray.forEach((zombie, i) => {
    scene.zombies[i] = new Zombie(scene, zombie.x, zombie.y, spritesheetKey, target, zombieSpeed);
    scene.physics.add.collider(scene.zombies[i], obstacles);
    console.log(zombie);
  });
};

const zombieDamage = (zombie, shot, scene) => {
  if(zombie.zombieData.health === 0){
    zombie.setVisible(false);
    zombie.body.enable = false; 
  } else {
    zombie.tint = Math.random() * 0xffffff;
    zombie.zombieData.health -= 1;

    const directionX = zombie.x - shot.x;
    const directionY = zombie.y - shot.y;
    const direction = new Phaser.Math.Vector2(directionX, directionY).normalize().scale(200);
    zombie.bounceBack(direction);

    console.log(zombie.zombieData.health);
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

  console.log(player.gameData.health);
  sceneEvents.emit('zombieHit', player.gameData.health);
  //this.sound.play("blood") // throttle this sound to play once/second
};

module.exports = { zombieFactory, zombieDamage, zombieHit };
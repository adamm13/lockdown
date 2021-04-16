import sceneEvents from "../SceneEvents";
import { Zombie } from "../Zombie";

const zombieFactory = (scene, zombieArray, spritesheetKey, target, obstacles) => {
  const zombieSpeed = 120;
  zombieArray.forEach((zombie, i) => {
    scene.zombies[i] = new Zombie(scene, zombie.x, zombie.y, spritesheetKey, target, zombieSpeed);
    scene.physics.add.collider(scene.zombies[i], obstacles);
  });
};

const zombieDamage = (zombie, shot, scene) => {
  shot.setVisible(false);
  zombie.setVisible(false);
  zombie.body.enable = false; 
};

const zombieHit = (player, zombie) => {
  // could refactor for more/less damage depening on zombie 
  player.gameData.health -= 0.5; 
  player.tint = Math.random() * 0xffffff;
  console.log(player.gameData.health);
  sceneEvents.emit('zombieHit', player.gameData.health);
  //this.sound.play("blood") // throttle this sound to play once/second
};

module.exports = { zombieFactory, zombieDamage, zombieHit };
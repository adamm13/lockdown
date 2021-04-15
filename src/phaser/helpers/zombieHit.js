import sceneEvents from "../SceneEvents";

export default function zombieHit(player, zombie) {
  // could refactor for more/less damage depening on zombie 
  player.gameData.health -= 0.5; 
  player.tint = Math.random() * 0xffffff;
  console.log(player.gameData.health);

  console.log('player x: ' + player.x)
  console.log('zombie x: ' + zombie.x)
  const playerX = player.x - zombie.y;
  const playerY = player.y - zombie.y;

  const recoil = new Phaser.Math.Vector2(playerX, playerY).normalize().scale(200);
  player.body.setVelocity(recoil.x, recoil.y);
  sceneEvents.emit('zombieHit', player.gameData.health);
  //this.sound.play("blood") // throttle this sound to play once/second
}
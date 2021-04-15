import sceneEvents from "../SceneEvents";

export default function zombieHit(player, zombie) {
  // could refactor for more/less damage depening on zombie 
  player.gameData.health -= 0.5; 
  player.tint = Math.random() * 0xffffff;
  console.log(player.gameData.health);
  sceneEvents.emit('zombieHit', player.gameData.health);
  //this.sound.play("blood") // throttle this sound to play once/second
}
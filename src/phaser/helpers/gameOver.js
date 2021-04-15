export default function gameOver(player, thisScene) {
  thisScene.game.sound.stopAll();
  // cut to GameOver Scene here instead of startMenu?
  thisScene.scene.start("startMenu", {
    comingFrom: "GameOver",  
    health: 500,
    inventory: [],
    sampleLocations: [
      {x: 16, y: 80}, 
      {x: 272, y: 144}, 
      {x: 336, y: 144}, 
      {x: 432, y: 528}, 
      {x: 432, y: 556}, 
      {x: 272, y: 528}, 
      {x: 272, y: 556}, 
      {x: 624, y: 272}, 
    ]
  }); 
  thisScene.scene.stop(thisScene);
  thisScene.scene.stop("GameUI");
  //player.explode();
}
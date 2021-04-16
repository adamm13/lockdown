export default function gameOver(player, thisScene) {
  thisScene.game.sound.stopAll();
  // cut to GameOver Scene here instead of startMenu?
  thisScene.scene.start("startMenu", {
    comingFrom: "GameOver",  
    health: 500,
    inventory: [],
    sampleLocations: {
      "Dungeon": [],
      "Town": [],
      "Forest": []
    }
  }); 
  thisScene.scene.stop(thisScene);
  thisScene.scene.stop("GameUI");
  //player.explode();
}
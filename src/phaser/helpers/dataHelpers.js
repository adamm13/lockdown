const preloadAssets = (scene) => {
  
  // Town preload
  scene.load.image('tiles', 'src/assets/town32-extruded.png');
  scene.load.image('obj-tiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-objects.png");
  scene.load.tilemapTiledJSON('map', 'src/assets/overworldv4.json');
  scene.load.spritesheet('player', 'src/assets/characters/player.png', { frameWidth: 32, frameHeight: 32 });
  // scene.load.spritesheet('npc', "src/assets/characters/player3.png", { frameWidth: 32, frameHeight: 32 });
  scene.load.atlas('boy1', "src/assets/testnpc.png", "src/assets/testnpc.json")
  
  // image for shots
  scene.load.image('shot', 'src/assets/images/smBlueBlast.png');
  scene.load.image('knife', 'src/assets/images/blueBlast.png');

  // zombie spritesheet(s)
  scene.load.spritesheet('zombie7', "src/assets/characters/enemies/zombie7.png", { frameWidth: 32, frameHeight: 32 });
  scene.load.spritesheet('zombie', "src/assets/characters/enemies/zombie1.png", { frameWidth: 32, frameHeight: 32 });
  scene.load.spritesheet('zombieKing', 'src/assets/characters/enemies/zombie2.png', { frameWidth: 32, frameHeight: 32 });
  scene.load.spritesheet('zombieGhost', "src/assets/characters/enemies/zombieGhost.png", { frameWidth: 32, frameHeight: 32 });

  //image for hearts
  scene.load.image('empty-heart', "src/assets/images/ui_heart_empty32.png");
  scene.load.image('full-heart', "src/assets/images/ui_heart_full32.png");
  scene.load.image('half-heart', "src/assets/images/ui_heart_half.png");
  //image for samples
  scene.load.image('samples', "src/assets/symbols-and-items/sample2.png");

  // Forest preload
  scene.load.image('forest', 'src/assets/images/forest-tileset-extruded.png');
  scene.load.image('graveyard', 'src/assets/images/graveyard-tileset-extruded.png');
  scene.load.tilemapTiledJSON('forestMap', 'src/assets/maps/finalForest.json');

  // Dungeon preload
  scene.load.image('dungeonTiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-tileset-extruded.png");
  scene.load.image('samples', "src/assets/symbols-and-items/sample2.png");
  scene.load.tilemapTiledJSON('dungMap', "src/assets/dungeonMaps/dungeon/dungeonMap.json");

};

const gameOver = (player, thisScene) => {
  
  thisScene.game.sound.stopAll();

  // Reset sample locations in all scenes
  
  // Change this to actual game data for highscores!?
  const data = {
    comingFrom: "GameOver",  
    health: 500,
    inventory: [],
    sampleLocations: {
      "Dungeon": [],
      "Town": [],
      "Forest": []
    }
  };
  // cut to GameOver Scene here instead of startMenu?
  thisScene.scene.start("GameOver", data); 
  thisScene.scene.stop(thisScene);
  thisScene.scene.stop("GameUI");
  //player.explode();
};

/* ---- player portal & data transfer between game scenes ---*/

const portalCallback = (player, tile, thisScene, data) => {
  const layer = tile.layer.name; 
  let destination;
  let comingFrom; 

  switch (layer) {
    case "downstairs":  
      destination = "Dungeon";
      comingFrom = "Town";
    break
    case "exitDungeon": 
      destination = "Town";
      comingFrom = "Dungeon";
    break
    case "intoTrees":
      destination = "Forest";
      comingFrom = "Town";
    break
    case "exitForest":
      destination = "Town";
      comingFrom = "Forest";
    break
    default: 
      console.log("Unrecognized portal tile layer, sending you to Town");
      destination = "Town";
  }
  
  tile.collisionCallback = (collidingPlayer, collidingTile) => {
    console.log(`Leaving ${comingFrom}, entering ${destination}`);
    
    const sceneSamples = thisScene.sampleObjs; // []
    player.gameData.sampleLocations[comingFrom] = sceneSamples;
    
    // We pass in the 'data' object to the next scene
    thisScene.scene.start(destination, { 
      comingFrom: comingFrom,  // string
      health: player.gameData.health, // number
      inventory: player.gameData.inventory, // []
      sampleLocations: player.gameData.sampleLocations, // { [], [], [] }
      resetSamples: data.resetSamples ? true : false
      });
    thisScene.scene.stop(comingFrom);
  }

};

module.exports = { preloadAssets, gameOver, portalCallback };


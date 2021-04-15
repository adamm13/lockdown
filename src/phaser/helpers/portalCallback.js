export default function portalCallback(player, tile, thisScene) {
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
      sampleLocations: player.gameData.sampleLocations // { [], [], [] }
      });
    thisScene.scene.stop(comingFrom);
  }

};
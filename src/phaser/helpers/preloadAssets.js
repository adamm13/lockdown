export default function preloadAssets(scene) {
  
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
  scene.load.tilemapTiledJSON('forestMap', 'src/assets/maps/finalForest2.json');

  // Dungeon preload
  scene.load.image('dungeonTiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-tileset-extruded.png");
  scene.load.image('samples', "src/assets/symbols-and-items/sample2.png");
  scene.load.tilemapTiledJSON('dungMap', "src/assets/dungeonMaps/dungeon/dungeonMapWithObjects.json");

};
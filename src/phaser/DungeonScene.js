import Phaser from "phaser";
import { Player } from "./Player";
import { Zombie } from "./Zombie";
import { Shots, Shot } from './Shots';
import GameUI from "./GameUI";
import sceneEvents from "./SceneEvents";
import zombieHit from './helpers/zombieHit';
import portalCallback from './helpers/portalCallback';


const gameTileSize = 32; 
let samples;

/* ------------------------------------ Dungeon Scene Class ------------------------ */

export default class Dungeon extends Phaser.Scene {
  constructor() {
    super('Dungeon');
  }
  
  sampleLocations = [
    {x: 16, y: 80}, 
    {x: 272, y: 144}, 
    {x: 336, y: 144}, 
    {x: 432, y: 528}, 
    {x: 432, y: 556}, 
    {x: 272, y: 528}, 
    {x: 272, y: 556}, 
    {x: 624, y: 272}, 
  ];

  init(data) {
    console.log(data);

    if (!data.sampleLocations) {
      data.sampleLocations = this.sampleLocations;
    } else {
      this.sampleLocations = data.sampleLocations;
    }
  }
  
  preload() {
    // this.load.image('dungeonTiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-tileset.png");
    this.load.image('dungeonTiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-tileset-extruded.png");
    this.load.image('obj-tiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-objects.png");
    this.load.image('samples', "src/assets/symbols-and-items/sample2.png");
    // this.load.image('chest', "src/assets/symbols-and-items/chest.png");
    // this.load.image('exitDungeon', "src/assets/symbols-and-items/up-stairs.png");
    this.load.tilemapTiledJSON('dungMap', "src/assets/dungeonMaps/dungeon/dungeonMapWithObjects.json");
    this.load.spritesheet('player', "src/assets/characters/player.png", { frameWidth: gameTileSize, frameHeight: gameTileSize });
    this.load.spritesheet('zombie', "src/assets/characters/enemies/zombie1.png", { frameWidth: gameTileSize, frameHeight: gameTileSize });
    this.load.spritesheet('zombieKing', 'src/assets/characters/enemies/zombie2.png', { frameWidth: gameTileSize, frameHeight: gameTileSize });
    // image for shots
    this.load.image('shot', 'src/assets/images/smBlueBlast.png');

     //image for hearts
     this.load.image('empty-heart', "src/assets/images/ui_heart_empty32.png");
     this.load.image('full-heart', "src/assets/images/ui_heart_full32.png");
     this.load.image('half-heart', "src/assets/images/ui_heart_half.png");
  }
  
  create(data) {
    // Render environment
    const map = this.make.tilemap({key:'dungMap'});
    //const tileset = map.addTilesetImage('dungeon-tileset', 'dungeonTiles');
    const tileset = map.addTilesetImage('dungeon-tileset-extruded', 'dungeonTiles', 32, 32, 1, 2);
    const dungObjs = map.addTilesetImage('dungeon-objects', 'obj-tiles');
    const ground = map.createLayer("belowPlayer", tileset, 0, 0);
    const obstacles = map.createLayer("walls", tileset, 0, 0);
    const chest = map.createLayer('chest', dungObjs, 0, 0);
    const upStairs = map.createLayer('exitDungeon', dungObjs, 0, 0);
    
    //render hearts and inventory
    this.scene.run('GameUI');

    // camera
    this.cameras.main.setZoom(2);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); // Make camera stop at edge of map
    
    // Get spawn/despawn points --> findObject arguments (layerName, callback), find by object name from Tiled
    const spawnPlayerPos = map.findObject("enterDungeon", obj => obj.name === "enterDungeon");
    const spawnZombie1Pos = map.findObject("zombieSpawn", obj => obj.name === "zombieGirl");
    const spawnZombie2Pos = map.findObject("zombieSpawn", obj => obj.name === "zombieKing");
    
    //create shots
    this.shots = new Shots(this);

    // Create player at start location
    this.player = new Player(this, spawnPlayerPos.x, spawnPlayerPos.y, 'player', data.inventory, data.health, this.sampleLocations);
    this.player.body.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player); 

    //Create zombies (always give a unique zombie key name e.g. zombie1, zombie2. (It's not Phaser's spritesheet key, but it can be the same if there is only 1)
    //Args: startX, startY, spritesheetKey, target, zombieKeyName, obstacles
    // splice zombie out of zombieObjs if a zombie is killed, before passing into Factory
    // Need to create an array of zombie objs, maybe redo the tiled map to put them on one layer
    this.createZombie(spawnZombie1Pos.x, spawnZombie1Pos.y, 'zombie', this.player, 'zombieGirl', obstacles);
    this.createZombie(spawnZombie2Pos.x, spawnZombie2Pos.y, 'zombieKing', this.player, 'zombieKing', obstacles);


    /* -----  Player-Scene physics properties ----- */
    obstacles.setCollisionBetween(0, 520);
    upStairs.setCollisionBetween(1, 400);
    chest.setCollisionBetween(1, 400);
    this.physics.add.collider(this.player, obstacles);
    this.physics.add.collider(this.player, chest); // temporary
    this.physics.add.overlap(this.player, this.zombies['zombieGirl'], zombieHit);
    this.physics.add.overlap(this.player, this.zombies['zombieKing'], zombieHit);


     // Physics properties for shots
    this.physics.add.collider(this.shots, obstacles, () => {
      this.shots.setVisible(false);
    });
    this.physics.add.collider(this.shots, chest, () => {
      this.shots.setVisible(false);
    });


    /* ----- Exit Dungeon & Pass Data to Town ---- */
    this.physics.add.collider(this.player, upStairs, (player, tile) => { 
      portalCallback(player, tile, this);
    });

    // Collect Chest Item 
    // Implement player select key?

    // Sample creation and overlap collecting
    this.numOfSamples = this.sampleLocations.length;
    // Create samples
    samples = this.physics.add.staticGroup({
      key: 'samples',
      frameQuantity: this.numOfSamples,
      immovable: true
    });
    // Distribute samples over map
    samples.getChildren().forEach((sample, i) => {
      let x = this.sampleLocations[i].x;
      let y = this.sampleLocations[i].y;
      sample.setScale(0.8);
      sample.setPosition(x, y);
    });

    samples.refresh();
    
    this.physics.add.overlap(this.player, samples, this.collectSample);
  

    // Adds controls for shooting
    this.input.keyboard.on('keydown-SPACE', () => {
      this.shots.fireShot(this.player.x, this.player.y, this.player.frame.name);
    });

  } // end create() function
  
  update() {
    this.player.update();
    this.zombies['zombieGirl'].update();
    this.zombies['zombieKing'].update();
    if (this.player.body.embedded) {
      this.player.body.touching.none = false;
    }
    if (this.player.body.touching.none && !this.player.body.wasTouching.none) {
      this.player.clearTint();
    }
  }

  zombies = {};

  createZombie(startX, startY, spritesheetKey, target, zombieKeyName, obstacles) {
    this.zombies[zombieKeyName] = new Zombie(this, startX, startY, spritesheetKey, target, 120);
    this.zombies[zombieKeyName].body.setCollideWorldBounds(true);
    this.physics.add.collider(this.zombies[zombieKeyName], obstacles);
  }

  // Sample collecting 
  collectSample(player, sample, data) {
    //  Hide the sample sprite
    const sampleLocations = player.scene.sampleLocations;
    samples.killAndHide(sample);
    //  And disable the body
    sample.body.enable = false;
    // update sample count - to be put into React component!
    const sampleIndex = samples.getChildren().indexOf(sample); 
    const newSampleForPlayer = samples.getChildren().splice(sampleIndex, 1); // grab this object 
    sampleLocations.splice(sampleIndex, 1);
    // Add the collected item obj to the player inv
    player.gameData.inventory.push(newSampleForPlayer);
    console.log(player.gameData.inventory);

    //emit event to update inventory icon
    sceneEvents.emit('sample-collected', player.gameData.inventory);

  }

}

module.exports = { Dungeon };

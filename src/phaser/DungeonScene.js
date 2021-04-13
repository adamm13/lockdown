import Phaser from "phaser";
import { Player } from "./Player";
import { Zombie } from "./Zombie";


const gameTileSize = 32; 
let samples;

/* ------------------------------------ Dungeon Scene Class ------------------------ */

export default class Dungeon extends Phaser.Scene {
  constructor() {
    super('Dungeon');
  }

  samples;
  
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
  }
  
  create() {
    // Render environment
    const map = this.make.tilemap({key:'dungMap'});
    //const tileset = map.addTilesetImage('dungeon-tileset', 'dungeonTiles');
    const tileset = map.addTilesetImage('dungeon-tileset-extruded', 'dungeonTiles', 32, 32, 1, 2);
    const dungObjs = map.addTilesetImage('dungeon-objects', 'obj-tiles');
    const ground = map.createLayer("belowPlayer", tileset, 0, 0);
    const obstacles = map.createLayer("walls", tileset, 0, 0);
    const chest = map.createLayer('chest', dungObjs, 0, 0);
    const upStairs = map.createLayer('exitDungeon', dungObjs, 0, 0);
    
    // camera
    this.cameras.main.setZoom(2);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); // Make camera stop at edge of map
    
    // Get spawn/despawn points --> findObject arguments (layerName, callback), find by object name from Tiled
    const spawnPlayerPos = map.findObject("enterDungeon", obj => obj.name === "enterDungeon");
    const spawnZombie1Pos = map.findObject("zombieSpawn", obj => obj.name === "zombieGirl");
    const spawnZombie2Pos = map.findObject("zombieSpawn", obj => obj.name === "zombieKing");
    
    // Create player at start location
    this.player = new Player(this, spawnPlayerPos.x, spawnPlayerPos.y, 'player');
    this.player.body.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player); 

    //Create zombies (always give a unique zombie key name e.g. zombie1, zombie2. (It's not Phaser's spritesheet key, but it can be the same if there is only 1)
    //Args: startX, startY, spritesheetKey, target, zombieKeyName, obstacles
    this.createZombie(spawnZombie1Pos.x, spawnZombie1Pos.y, 'zombie', this.player, 'zombieGirl', obstacles);
    this.createZombie(spawnZombie2Pos.x, spawnZombie2Pos.y, 'zombieKing', this.player, 'zombieKing', obstacles);


    /* -----  Player-Scene physics properties ----- */
    obstacles.setCollisionBetween(0, 520);
    upStairs.setCollisionBetween(1, 400);
    chest.setCollisionBetween(1, 400);
    this.physics.add.collider(this.player, obstacles);
    this.physics.add.collider(this.player, chest); // temporary
    
    // this.renderObjects(map, samples, 'samples', 0.7);
    // const chests = this.physics.add.group();
    // this.renderObjects(map, chests, 'chest', 0.7);
    // const stairs = this.physics.add.group();
    // this.renderObjects(map, stairs, 'exitDungeon', 1);


    // Set scene transition callback on portalTile
  
    this.physics.add.collider(this.player, upStairs, (player, tile) => {
      if (tile.index === 228) {
        tile.collisionCallback = (collidingPlayer, collidingTile) => {
          console.log("Scene transition exit Dungeon");
          this.scene.start('Town', { 
            comingFrom: "Dungeon"
            // currentHealth: this.player.health
           });
          this.scene.stop('Dungeon');
        }
      }
    });

    // Collect Chest Item 
    // Implement player select key?


    // Sample collecting 
    this.numOfSamples = 8;

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

    samples.refresh(); // does this refresh upon scene exit/enter?

    this.physics.add.overlap(this.player, samples, this.collectSample);
    

    // Probably will need this logic for keeping score of samples
    //score
    // text = this.add.text(570, 70, `Coins: ${coinScore}x`, {
    //   fontSize: '20px',
    //   fill: '#ffffff'
    // });
    // text.setScrollFactor(0);
  }
  
  update() {
    //  Input Events
    this.player.update();
    this.zombies['zombieGirl'].update();
    this.zombies['zombieKing'].update();
  }


  /* ---------- Custom Helpers -------- */
  renderObjects(map, group, objString, scale) {
    // let newLayer = map.getObjectLayer(objString)["objects"];
    // newLayer.forEach(obj => {
    //   let object = group
    //     .create(obj.x + 16, obj.y - 16, objString)
    //     .setScale(scale)
    // });
  }

  zombies = {};

  createZombie(startX, startY, spritesheetKey, target, zombieKeyName, obstacles) {
    this.zombies[zombieKeyName] = new Zombie(this, startX, startY, spritesheetKey, target);
    this.zombies[zombieKeyName].body.setCollideWorldBounds(true);
    this.physics.add.collider(this.zombies[zombieKeyName], obstacles);
  }

  zombieHit() {
    console.log("ZOMBIE EATS FLESH");
    // this.player.health -= 1; 
    // console.log("Health: ", this.player.health);
  }

  collectSample(player, sample) {
    // maybe the player should have an inventory object that is updated and transfered between scenes
    console.log("Increment sample count!"); 
    //  Hide the sprite
    samples.killAndHide(sample);
    //  And disable the body
    sample.body.enable = false;
    // update sample count - to be put into React component!
    const sampleIndex = samples.getChildren().indexOf(sample); // grab this object if you need it
    samples.getChildren().splice(sampleIndex, 1);
    console.log(`The dungeon has ${samples.getChildren().length} remaining!`);

    // Another alternative if needed
    // function collectCoin(player, coin) {
    //   coin.destroy(coin.x, coin.y); // remove the tile/coin
    //   coinScore ++; // increment the score
    //   text.setText(`Coins: ${coinScore}x`); // set the text to show the current score
    //   return false;
    // }
  }


}


module.exports = { Dungeon };

import Phaser from "phaser";
import { Player } from "./Player";
import { Zombie } from "./Zombie";


const gameTileSize = 32; 

/* ------------------------------------ Dungeon Scene Class ------------------------ */

export default class Dungeon extends Phaser.Scene {
  constructor() {
    super('Dungeon');
  }
  
  preload() {
    this.load.image('dungeonTiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-tileset.png");
    this.load.image('obj-tiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-objects.png");
    this.load.image('samples', "src/assets/symbols-and-items/sample.png");
    this.load.image('chest', "src/assets/symbols-and-items/chest.png");
    this.load.tilemapTiledJSON('dungMap', "src/assets/dungeonMaps/dungeon/dungeonMapWithObjects.json");
    this.load.spritesheet('player', "src/assets/characters/player.png", { frameWidth: gameTileSize, frameHeight: gameTileSize });
    this.load.spritesheet('zombie', "src/assets/characters/enemies/zombie1.png", { frameWidth: gameTileSize, frameHeight: gameTileSize });
    this.load.spritesheet('zombieKing', 'src/assets/characters/enemies/zombie2.png', { frameWidth: gameTileSize, frameHeight: gameTileSize });
  }
  
  create() {
    // Render environment
    const map = this.make.tilemap({key:'dungMap'});
    const tileset = map.addTilesetImage('dungeon-tileset', 'dungeonTiles');
    const ground = map.createLayer("belowPlayer", tileset, 0, 0);
    const obstacles = map.createLayer("walls", tileset, 0, 0);
    // camera
    this.cameras.main.setZoom(2);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); // Make camera stop at edge of map
    // Render objects
    const samples = this.physics.add.staticGroup();
    this.renderObjects(map, samples, 'samples', 0.7);
    const chests = this.physics.add.staticGroup();
    this.renderObjects(map, chests, 'chest', 0.7);
    
    // Get spawn points --> findObject arguments (layerName, callback)
    const spawnPlayerPos = map.findObject("enterDungeon", obj => obj.name === "enterDungeon");
    const spawnZombie1Pos = map.findObject("zombieSpawn", obj => obj.name === "zombieGirl");
    const spawnZombie2Pos = map.findObject("zombieSpawn", obj => obj.name === "zombieKing");
    
    // Create player at start location
    this.player = new Player(this, spawnPlayerPos.x, spawnPlayerPos.y, 'player');
    const player = this.player;
    player.body.setCollideWorldBounds(true);
    this.cameras.main.startFollow(player); 

    // Create zombies (always give a unique zombie key name e.g. zombie1, zombie2. (It's not Phaser's spritesheet key, but it can be the same if there is only 1)
    // Args: startX, startY, spritesheetKey, target, zombieKeyName, obstacles
    this.createZombie(spawnZombie1Pos.x, spawnZombie1Pos.y, 'zombie', player, 'zombieGirl', obstacles);
    this.createZombie(spawnZombie2Pos.x, spawnZombie2Pos.y, 'zombieKing', player, 'zombieKing', obstacles);

    //  Player physics properties.
    obstacles.setCollisionBetween(0, 520);
    this.physics.add.collider(player, obstacles);
    
    
    // this.physics.add.collider(player, dungObjs, (player, tile) => {
    //   if (tile.index === 228) {
    //     tile.collisionCallback = (collidingPlayer, collidingTile) => {
    //       console.log("Scene transition exit Dungeon");
    //       this.scene.start('Town', { 
    //         comingFrom: "Dungeon",
    //         currentHealth: this.player.health
    //        });
    //       this.scene.stop('Dungeon');
    //     }
    //   }
    // });


    // Testing React State with zombieHit
    //this.physics.add.overlap(player, zombie, this.zombieHit, null, this);

  
  }
  
  update() {
    //  Input Events
    this.player.update();
    this.zombies['zombieGirl'].update();
    this.zombies['zombieKing'].update();
  }


  /* ---------- Custom Helpers -------- */
  renderObjects(map, staticGroup, objString, scale) {
    let newLayer = map.getObjectLayer(objString)["objects"];
    newLayer.forEach(obj => {
      let object = staticGroup.create(obj.x + 16, obj.y - 16, objString).setScale(scale);
    });
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


}


module.exports = { Dungeon };

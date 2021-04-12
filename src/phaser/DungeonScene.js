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
    //this.load.image("logo", logoImg);
    this.load.image('dungeonTiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-tileset.png");
    this.load.image('obj-tiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-objects.png");
    this.load.image('samples', "src/assets/symbols-and-items/sample.png");
    this.load.image('chest', "src/assets/symbols-and-items/chest.png");
    this.load.tilemapTiledJSON('dungMap', "src/assets/dungeonMaps/dungeon/dungeonMapWithObjects.json");
    this.load.spritesheet('player', "src/assets/characters/player.png", { frameWidth: gameTileSize, frameHeight: gameTileSize });
    this.load.spritesheet('zombie', "src/assets/characters/enemies/zombie1.png", { frameWidth: gameTileSize, frameHeight: gameTileSize });
  }
  
  create() {
    // Render environment
    const map = this.make.tilemap({key:'dungMap'});
    const tileset = map.addTilesetImage('dungeon-tileset', 'dungeonTiles');
    const ground = map.createLayer("belowPlayer", tileset, 0, 0);
    const obstacles = map.createLayer("walls", tileset, 0, 0);
    
    // Render objects
    const samples = this.physics.add.staticGroup();
    this.renderObjects(map, samples, 'samples', 0.7);
    const chests = this.physics.add.staticGroup();
    this.renderObjects(map, chests, 'chest', 0.7);
    
    
    // camera
    this.cameras.main.setZoom(2);
    // Create player at start location and scale him
    this.player = new Player(this, 752, 80, 'player');
    const player = this.player;
    player.body.setCollideWorldBounds(true);

    // Create zombie and pass in player as last argument for a target
    // this.zombie = new Zombie(this, 752, 380, 'zombie', player);
    // const zombie = this.zombie;
    // zombie.body.setCollideWorldBounds(true);

    // Make camera stop at edge of map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    // make camera follow player
    this.cameras.main.startFollow(this.player);

    //  Player physics properties.
    obstacles.setCollisionBetween(0, 300);
    // dungObjs.setCollisionBetween(1, 400);
    this.physics.add.collider(player, obstacles);
    // this.physics.add.collider(zombie, obstacles);
    
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
    // this.zombie.update();
  }

  // Custom Helpers
  renderObjects(map, staticGroup, objString, scale) {
    let newLayer = map.getObjectLayer(objString)["objects"];
    newLayer.forEach(obj => {
      let object = staticGroup.create(obj.x + 16, obj.y - 16, objString).setScale(scale);
    });
  }

  zombieHit() {
    console.log("ZOMBIE EATS FLESH");
    // this.player.health -= 1; 
    // console.log("Health: ", this.player.health);
  }


}


module.exports = { Dungeon };

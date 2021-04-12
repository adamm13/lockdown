import Phaser from "phaser";
import { Player } from "./Player";


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
    this.load.tilemapTiledJSON('dungMap', "src/assets/dungeonMaps/dungeon/dungeon.json");
    this.load.spritesheet('player', "src/assets/characters/player.png", { frameWidth: gameTileSize, frameHeight: gameTileSize });
  }
  
  create() {
    // environment
    const map = this.make.tilemap({key:'dungMap'});
    const tileset = map.addTilesetImage('dungeon-tileset', 'dungeonTiles');
    const objTileset = map.addTilesetImage('dungeon-objects', 'obj-tiles');
    const ground = map.createLayer("belowPlayer", tileset, 0, 0);
    const obstacles = map.createLayer("world", tileset, 0, 0);
    const dungObjs = map.createLayer("objectLayer", objTileset, 0, 0);

    // camera
    this.cameras.main.setZoom(2);
    // Create player at start location and scale him
    this.player = new Player(this, 752, 80, 'player');
    const player = this.player;
    player.body.setCollideWorldBounds(true);

    // Make camera stop at edge of map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    // make camera follow player
    this.cameras.main.startFollow(this.player);

    //  Player physics properties.
    obstacles.setCollisionBetween(0, 300);
    dungObjs.setCollisionBetween(1, 400);
    this.physics.add.collider(player, obstacles);
    
    this.physics.add.collider(player, dungObjs, (player, tile) => {
      // console.log("player: ", player);
      // console.log("tile: ", tile);
      if (tile.index === 228) {
        tile.collisionCallback = (collidingPlayer, collidingTile) => {
          console.log("Scene transition exit Dungeon: ");
          // console.log(this);
          // console.log(this.scene);
          this.scene.start('Town');
          this.scene.stop('Dungeon');
        }
      }
    });

  
  }
  
  update() {
    //  Input Events
    this.player.update();
  }
}


module.exports = { Dungeon };

import Phaser from 'phaser';
import { Player } from "./Player";

const gameTileSize = 32;

/* ------------------ Entity Class -------------------------- */

class Town extends Phaser.Scene {
  constructor() {
    super("Town");
  }

  preload() {
    this.load.image('tiles', 'src/assets/town32.png');
    this.load.tilemapTiledJSON('map', 'src/assets/overworldv3.json');
    this.load.spritesheet('player', 'src/assets/characters/player.png', { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    // environment

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('town32', 'tiles')

    const ground = map.createLayer("ground", tileset, 0, 0,);
    const house = map.createLayer("house", tileset, 0, 0);
    const trees = map.createLayer("trees", tileset, 0, 0);

    // camera
    this.cameras.main.setZoom(2);
    // Create player at start location and scale him
    this.player = new Player(this, 200, 300, 'player');
    // make camera follow player
    const player = this.player;
    this.cameras.main.startFollow(this.player);

    //  Player physics properties.
    trees.setCollisionBetween(1, 2000);
    house.setCollisionBetween(1, 2000);
    this.physics.add.collider(player, trees);
    //this.physics.add.collider(player, trees);

    // Finding portal
    this.physics.add.collider(player, house, (player, tile) => {
      console.log("player: ", player);
      console.log("tile: ", tile);
      if (tile.index === 205) {
        tile.collisionCallback = (collidingPlayer, collidingTile) => {
          // console.log("COLLISION CALLBACK 1st Arg: ", collidingPlayer);
          // console.log("COLLISION CALLBACK 2nd Arg: ", collidingTile);
          console.log("Scene transition: ");
          this.scene.start('Dungeon');
          this.scene.stop('Town');
        }
      }
    });

    player.body.setCollideWorldBounds(false);
  }
  update() {
    //  Input Events
    this.player.update();
  }

}

module.exports = { Town };






// class Town extends Phaser.Scene {
//   constructor() {
//     super("Town");
//   }
// // forest map
// preload() {
//   this.load.image('tiles', 'src/assets/town32.png');
//   this.load.tilemapTiledJSON('map', 'src/assets/overworldv3.json');
  
//   this.load.spritesheet('player', 'src/assets/images/player.png', { frameWidth: 32, frameHeight: 32 });
// }
// create() {
//   // environment
  
//   const map = this.make.tilemap({ key: 'map' });
//   const tileset = map.addTilesetImage('town32', 'tiles')
  
//   const ground = map.createLayer("ground", tileset, 0, 0,);
//   const house = map.createLayer("house", tileset, 0, 0);
//   const trees = map.createLayer("trees", tileset, 0, 0);
  
  
//   // camera
//   this.cameras.main.setZoom(2);
//   // Create player at start location and scale him
//   this.player = new Player(this, 200, 300, 'player');
//   const player = this.player;
//   player.body.setCollideWorldBounds(true);

//      //  Player physics properties.
//      trees.setCollisionBetween(1, 1000);
//      this.physics.add.collider(player, trees);
 
//      house.setCollisionBetween(1, 200);
//      this.physics.add.collider(player, house);
//      player.body.setCollideWorldBounds(false);
//    }
//    update() {
//      //  Input Events
//      this.player.update();
//    }
//  }



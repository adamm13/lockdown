import Phaser from 'phaser';
import { Player } from "./Player";

class Town extends Phaser.Scene {
  constructor() {
    super("Town");
  }

  startingX = 208; 
  startingY = 240;

  init(data) {
    if (data.comingFrom === "Forest") {
      this.startingX = 180;
      this.startingY = 464;
    } else {
      this.startingX = 208; 
      this.startingY = 240;
    }
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
    this.player = new Player(this, this.startingX, this.startingY, 'player');
    // make camera follow player
    const player = this.player;
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    
    //  Player physics properties.
    trees.setCollisionBetween(1, 2000);
    house.setCollisionBetween(1, 2000);
    player.body.setCollideWorldBounds(false);
    
    /* ----- Finding portals ----- */
    // Note the transition callback only gets assigned on the 1st collision with the tile,
    // The scenes transition on the 2nd collision, will fix later if we have time

    this.physics.add.collider(player, trees, (player, tile) => {
      // Enter Forest portal Tile (change to where you put the Forest entrance
      // but it has be on tile in the trees layer right now, which makes sense i guess
      console.log(tile);
      // Walk left into the tree above the tree stump just a few steps down from spawn 
      if (tile.index === 83) {
        tile.collisionCallback = (collidingPlayer, collidingTile) => {
          console.log("Scene transition exit Town");
          this.scene.start('Forest');
          this.scene.stop('Town');
        }
      }
    });

    this.physics.add.collider(player, house, (player, tile) => {
      // Enter Dungeon portal Tile (change to where you put the stairs)
      // The stair tile has to be in the house layer right now...
      if (tile.index === 205) {
        tile.collisionCallback = (collidingPlayer, collidingTile) => {
          console.log("Scene transition exit Town");
          this.scene.start('Dungeon');
          this.scene.stop('Town');
        }
      }
    });

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



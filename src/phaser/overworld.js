import Phaser from 'phaser';
import { Player } from "./Player";
import { Zombie } from "./Zombie";
import { NPC } from "./NPC1"

const gameTileSize = 32;
let initialInventory = []; // only need this for opening game scene --> reassigned to data.inventory in init()

/* ------------------------------------ Overworld Scene Class ------------------------ */

class Town extends Phaser.Scene {
  constructor() {
    super("Town");
  }

  // Set these to where you want the game to drop the player on start
  startingX = 1320; 
  startingY = 237;
  

  init(data) {
    console.log(data);
    if (data.inventory) {
      initialInventory = data.inventory;
    }
    if (data.comingFrom === "Forest") {
      this.startingX = 1276;
      this.startingY = 57;
    } else if (data.comingFrom === "Dungeon") {
      this.startingX = 397; 
      this.startingY = 1003;
    }
  }

  preload() {

    // this.load.image('tiles', 'src/assets/town32.png');
    this.load.image('tiles', 'src/assets/town32-extruded.png');
    this.load.image('obj-tiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-objects.png");
    this.load.tilemapTiledJSON('map', 'src/assets/overworldv4.json');
    this.load.spritesheet('player', 'src/assets/characters/player.png', { frameWidth: gameTileSize, frameHeight: gameTileSize });
    this.load.spritesheet('npc', "src/assets/characters/player3.png", { frameWidth: gameTileSize, frameHeight: gameTileSize });
  }
  

  create(data) {
    console.log("I AM overworld CREATE: ", data);
    // environment

    const map = this.make.tilemap({ key: 'map' });
    // const tileset = map.addTilesetImage('town32', 'tiles')
    const tileset = map.addTilesetImage('town32-extruded', 'tiles', 32, 32, 1, 2);
    const dungObjs = map.addTilesetImage('dungeon-objects', 'obj-tiles');
    const ground = map.createLayer("ground", tileset, 0, 0,);
    //const house = map.createLayer("house", tileset, 0, 0);
    const trees = map.createLayer("trees", tileset, 0, 0);
    const downStairs = map.createLayer("downstairs", dungObjs, 0, 0);
    const intoForest = map.createLayer("intoTrees", dungObjs, 0, 0);

    // camera
    this.cameras.main.setZoom(2);

    // Create player at start location and scale him
    this.player = new Player(this, this.startingX, this.startingY, 'player', initialInventory);
    const player = this.player;
    player.body.setCollideWorldBounds(false);

    // Create NPC and pass in player as last argument for a target
    this.npc = new NPC(this, 250, 300, 'npc');
    const npc = this.npc;
    npc.body.setCollideWorldBounds(false);

   // causes NPC to move and follow a path; can use for a ghost? 
    // this.tweens.add({
    //     targets: npc,
    //     x: { value: 1, duration: 4000, ease: 'Power2', yoyo: 1 },
    //     y: { value: 1, duration: 10000, ease: 'Bounce.easeOut', yoyo: -1 }
    // });

// creates the button you can press to move the npc (looping)

//         var tween = this.tweens.add({
//         targets: npc,
//         x: -1,
//         duration: 3000,
//         ease: 'Power1',
//         yoyo: true,
//         delay: 1000,
//         paused: true,
//         loop: 1000,
//         onStart: onStartHandler,
//         onStartParams: [ player ]
//     });

//     this.input.keyboard.once('keyup-ONE', function () {

//         tween.play();

//     });

//     //  The callback is always sent a reference to the Tween as the first argument and the targets as the second,
// //  then whatever you provided in the onStartParams array follows
// function onStartHandler (tween, targets, gameObject)
// {
//     console.log(arguments);

//     gameObject.setAlpha(1);
// }

     // camera to follow the player 
    this.cameras.main.startFollow(this.player);

    //make camera stop at edge of map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    
    //  Player physics properties.
    //house.setCollisionBetween(1, 2000);
    trees.setCollisionBetween(1, 2000);
    downStairs.setCollisionBetween(1, 2000);
    intoForest.setCollisionBetween(1, 2000);
   
    //this.physics.add.collider(npc, trees);

    // allows you to move the player by pushing him.
    this.physics.add.collider(player, npc);



    /* ----------- Exit Town & Pass Data to DungeonScene ---------- */
    this.physics.add.collider(player, downStairs, (player, tile) => {
      if (tile.layer.name === "downstairs") {
        console.log("X: ", player.x);
        console.log("Y: ", player.y);
        tile.collisionCallback = (player, collidingTile) => {
          console.log("Scene transition exit Town");
          this.scene.start('Dungeon', { 
            comingFrom: "Town",
            inventory: player.inventory,
            sampleLocations: data.sampleLocations
          });
          this.scene.stop('Town');
        }
      }
    });

    /* ----------- Exit Town & Pass Data to Forest ---------- */
    this.physics.add.collider(player, intoForest, (player, tile) => {
      if (tile.layer.name === "intoTrees") {
        console.log("X: ", player.x);
        console.log("Y: ", player.y);
        tile.collisionCallback = (player, collidingTile) => {
          console.log("Scene transition exit Town");
          this.scene.start('Forest', { 
            comingFrom: "Town",
            inventory: player.inventory,
            sampleLocations: data.sampleLocations
          });
          this.scene.stop('Town');
        }
      }
    });

    this.physics.add.collider(player, trees, (player, tile) => {
      console.log("OUCH!");
      console.log("X: ", player.x);
      console.log("Y: ", player.y);
    });

  }
  update() {
    //  Input Events
    this.player.update();
    this.npc.update();
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



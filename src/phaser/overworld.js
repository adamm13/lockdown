import Phaser from 'phaser';
import { Player } from "./Player";
// import { NPC } from "./NPC1";
import { testnpc } from './testnpc'
import { createNpcAnims } from './testnpcanims';
import { NPC } from "./NPC1";
import { Shots, Shot } from './Shots';
import zombieFactory from './helpers/zombieFactory';
import zombieHit from "./helpers/zombieHit";
import portalCallback from './helpers/portalCallback';
import zombieDamage from './helpers/zombieDamage';
import gameOver from './helpers/gameOver';
import preloadAssets from './helpers/preloadAssets';

const gameTileSize = 32;

/* ------------------------------------ Overworld Scene Class ------------------------ */

class Town extends Phaser.Scene {
  constructor() {
    super("Town");
  }

  // Set these to where you want the game to drop the player on start
  
  // close to forest
  // startingX = 1320; 
  // startingY = 237;

  // NW corner
  // startingX = 250; 
  // startingY = 300;

  // close to dungeon
  startingX = 450; 
  startingY = 1000;

  zombies = [];

  init(data) {
    console.log(data);
    if (data.comingFrom === "Forest") {
      this.startingX = 1276;
      this.startingY = 57;
    } else if (data.comingFrom === "Dungeon") {
      this.startingX = 397; 
      this.startingY = 1003;
    }
  }

  preload() {
    preloadAssets(this);
  }
  

  create(data) {
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

    //render hearts
    this.scene.run('GameUI', data);

    // camera
    this.cameras.main.setZoom(2);

    
    // Create player at start location and scale him
    this.player = new Player(this, this.startingX, this.startingY, 'player', data.inventory, data.health, data.sampleLocations);
    const player = this.player;
    player.body.setCollideWorldBounds(false);
    
    //creates shots
    this.shots = new Shots(this);
    
    // // Create NPC and pass in player as last argument for a target < ---- OLD NPC
    // this.npc = new NPC(this, 250, 300, 'npc');
    // const npc = this.npc;
    // npc.body.setCollideWorldBounds(false);

    // Get zombie array for map
    const zombieObjs = map.objects.find(layer => layer.name === 'zombies').objects;
    // Create zombies
    zombieFactory(this, zombieObjs, 'zombie7', this.player, trees);

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
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
    //  Player physics properties.

    //house.setCollisionBetween(1, 2000);
    trees.setCollisionBetween(1, 2000);
    downStairs.setCollisionBetween(1, 2000);
    intoForest.setCollisionBetween(1, 2000);
   
    //this.physics.add.collider(npc, trees);

    // allows you to move the player by pushing him.
    // this.physics.add.collider(player, npc);
    

     // Physics properties for shots
    this.physics.add.collider(this.shots, trees, () => {
      this.shots.setVisible(false);
    });
    
    this.zombies.forEach(zombie => {
      this.physics.add.collider(this.shots, zombie, (shot, zombie) => {
        zombieDamage(shot, zombie, this);
      });
    });
    
    
    /* ----------- Exit Scene Colliders & pass data within player object ---------- */
    this.physics.add.collider(player, intoForest, (player, tile) => { 
      portalCallback(player, tile, this);
    });
    this.physics.add.collider(player, downStairs, (player, tile) => { 
      portalCallback(player, tile, this);
    });

    this.physics.add.collider(player, trees);

    // Adds controls for firing
    this.input.keyboard.on('keydown-SPACE', () => {
      this.shots.fireShot(this.player.x, this.player.y, this.player.frame.name);
    });

    // ----------- Create NPC from Texture Atlas ---------- // 

    // creates the npc sprite
    //  const testnpc = this.physics.add.sprite(200, 300, "testnpc", "01.png")
     createNpcAnims(this.anims)

    const npcs = this.physics.add.group({
      classType: testnpc,
      createCallback: (go) => {
        const npcwalk = go 
        npcwalk.body.onCollide = true
      }
    })

    // ADD a new NPC 
     npcs.get(180, 300, 'boy1')
     npcs.get(1200, 300, 'boy1')

    this.physics.add.collider(npcs, trees)

    //animates the npc sprite
    // this.anims.create({
    //   key: "still",
    //   frames: this.anims.generateFrameNames("boynpc", {start: 1, end: 1, prefix: "0", suffix: ".png"}),
    //   repeat: -1,
    //   framerate: 10
    // })

    // this.anims.create({
    //   key: "walk",
    //   frames: this.anims.generateFrameNames("boynpc", {start: 0, end: 2, prefix: "0", suffix: ".png"}),
    //   repeat: -1,
    //   framerate: 10
    // })

    //tests the npc anims command
    //  testnpc.anims.play('walk')

    // Make zombies do damage
    this.zombies.forEach(zombie => {
      this.physics.add.overlap(player, zombie, zombieHit);
    });
  }

  update() {
    //  Input Events
    if (this.player.isDead) {
      gameOver(this.player, this);
    } else {
      this.player.update();
    }

    this.zombies.forEach(z => z.update());
    if (this.player.body.embedded) {
      this.player.body.touching.none = false;
    }
    if (this.player.body.touching.none && !this.player.body.wasTouching.none) {
      this.player.clearTint();
    }
  }

  zombies = [];


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



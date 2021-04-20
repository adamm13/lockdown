import Phaser from 'phaser';
import { Player } from "./Player";
// import { NPC } from "./NPC1";
import { testnpc } from './testnpc'
import { createNpcAnims } from './testnpcanims';
// import { NPC } from "./NPC1";
import { Shots, Shot } from './Shots';
import { preloadAssets, gameOver, portalCallback } from './helpers/dataHelpers';
import { zombieFactory, zombieDamage, zombieHit } from './helpers/zombieHelpers';
import { createSamples, sampleCollector } from './helpers/sampleHelpers';
import sceneEvents from './SceneEvents';

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
  startingX = 240; 
  startingY = 240;

  // close to dungeon
  // startingX = 450; 
  // startingY = 1000;

  zombies = [];
  samplesTouched = false;

  init(data) {
    // adjust start location
    if (data.comingFrom === "Forest") {
      this.startingX = 1276;
      this.startingY = 57;
    } else if (data.comingFrom === "Dungeon") {
      this.startingX = 270; 
      this.startingY = 1164;
    } else {
      this.startingX = 240; 
      this.startingY = 240;
    }
    // check where to place samples
    if (!data.sampleLocations["Town"]) {
      this.samplesTouched = false;
      data.sampleLocations["Town"] = [];
    } else {
      this.samplesTouched = true;
    }
  }

  preload() {
    preloadAssets(this);
  }
  

  create(data) {
    //fade in scene
    this.cameras.main.fadeIn(2000);
    
    // environment
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('town32-extruded', 'tiles', 32, 32, 1, 2);
    const dungObjs = map.addTilesetImage('dungeon-objects', 'obj-tiles');
    const ground = map.createLayer("ground", tileset, 0, 0,);
    const trees = map.createLayer("trees", tileset, 0, 0);
    const downStairs = map.createLayer("downstairs", dungObjs, 0, 0);
    const intoForest = map.createLayer("intoTrees", dungObjs, 0, 0);

    // camera
    this.cameras.main.setZoom(2);

    // Get sample object layer from Tiled data if the player doesn't already have sample data
    if (this.samplesTouched) {
      this.sampleObjs = [...data.sampleLocations["Town"]];
    } else {
      this.sampleObjs = map.objects.find(layer => layer.name === 'samples').objects;
    }
    
    // Create player at start location and scale him
    this.player = new Player(this, this.startingX, this.startingY, 'player', data.inventory, data.health, data.sampleLocations, data.kills);
    const player = this.player;
    player.body.setCollideWorldBounds(false);
    
    //render hearts
    this.scene.run('GameUI', {data, player});

    // Create samples and set overlap with player
    this.samples = createSamples(this.sampleObjs, this);
    this.samples.refresh();
    this.physics.add.overlap(this.player, this.samples, (player, sample) => {
      sampleCollector(player, sample, this); 
    });
    
    //creates shots
    this.shots = new Shots(this);

    // Get zombie array for map
    const zombieObjs = map.objects.find(layer => layer.name === 'zombies').objects;

    // Create zombies
    zombieFactory(this, zombieObjs, 'zombie7', this.player, trees);

    // camera to follow the player 
    this.cameras.main.startFollow(this.player);

    //make camera stop at edge of map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
    //  Player physics properties.

    trees.setCollisionBetween(1, 2000);
    downStairs.setCollisionBetween(1, 2000);
    intoForest.setCollisionBetween(1, 2000);

     // Physics properties for shots
    this.physics.add.collider(this.shots, trees, () => {
      this.shots.setVisible(false);
    });

    // Zombie-Zombie collisions
    this.physics.add.collider(this.zombies, this.zombies);
    
    this.zombies.forEach(zombie => {
      this.physics.add.collider(this.shots, zombie, (shot, zombie) => {
        let individualShot = this.shots.getFirstAlive();
          if (individualShot){
            individualShot.setVisible(false);
            individualShot.setActive(false);
            zombieDamage(shot, zombie, this, player);
          }
      });
    });
    
    /* ----------- Exit Scene Colliders & pass data within player object ---------- */
    this.physics.add.collider(player, intoForest, (player, tile) => { 
      portalCallback(player, tile, this, data);
    });
    this.physics.add.collider(player, downStairs, (player, tile) => { 
      portalCallback(player, tile, this, data);
    });

    this.physics.add.collider(player, trees);

    // Adds controls for firing
    this.input.keyboard.on('keydown-SPACE', () => {
      this.shots.fireShot(this.player.x, this.player.y, this.player.frame.name);
    });

    // ----------- Create NPC from Texture Atlas ---------- // 

     createNpcAnims(this.anims)

    const npcs = this.physics.add.group({
      classType: testnpc,
      collider: this.player,
      createCallback: (go) => {
        const npcwalk = go 
        npcwalk.body.onCollide = true
      }
    })

    // ADD a new NPC 
    npcs.get(180, 300, 'boy1')
    npcs.get(1200, 300, 'boy1')
    npcs.get(1000, 1000, 'boy1')
    npcs.get(400, 1000, 'boy1')
    this.physics.add.collider(npcs, trees)
    //this.physics.add.collider(npcs, this.player)

    // Make zombies do damage
    this.zombies.forEach(zombie => {
      this.physics.add.overlap(player, zombie, zombieHit);
    });

    // Create layer above player, zombies, npcs
    const above_player = map.createLayer("roofTops", tileset, 0, 0);


    sceneEvents.once('timerOver', ()=>{
      this.player.isDead = true;
    });

  } // end create 

  

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
}

module.exports = { Town };


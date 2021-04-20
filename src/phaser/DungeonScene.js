import Phaser from "phaser";
import { Player } from "./Player";
import { Shots, Shot } from './Shots';
import { preloadAssets, gameOver, portalCallback } from './helpers/dataHelpers';
import { createSamples, sampleCollector } from './helpers/sampleHelpers';
import { zombieFactory, zombieDamage, zombieHit } from './helpers/zombieHelpers';
import sceneEvents from './SceneEvents';

export default class Dungeon extends Phaser.Scene {
  constructor() {
    super('Dungeon');
  }

  zombies = []
  samplesTouched = false;

  init(data) {
    if (!data.sampleLocations["Dungeon"]) {
      this.samplesTouched = false;
      data.sampleLocations["Dungeon"] = [];
    } else {
      this.samplesTouched = true;
    }
  }
  
  preload() { 
    preloadAssets(this) 
  }
  
  create(data) {
    //transition into dungeon scene
    this.cameras.main.fadeIn(2000);
    // Render environment
    const map = this.make.tilemap({key:'dungMap'});
    const tileset = map.addTilesetImage('dungeon-tileset-extruded', 'dungeonTiles', 32, 32, 1, 2);
    const dungObjs = map.addTilesetImage('dungeon-objects', 'obj-tiles');
    const ground = map.createLayer("belowPlayer", tileset, 0, 0); // creates floor tiles
    const obstacles = map.createLayer("walls", tileset, 0, 0);
    const upStairs = map.createLayer('exitDungeon', dungObjs, 0, 0);
  

    // camera setup
    this.cameras.main.setZoom(2);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels); // Make camera stop at edge of map
    
    // Get player spawn point --> findObject arguments (layerName, callback), find by object name from Tiled
    const spawnPlayerPos = map.findObject("enterDungeon", obj => obj.name === "enterDungeon");
    
    // Get sample object layer from Tiled data if the player doesn't already have sample data
    if (this.samplesTouched) {
      this.sampleObjs = [...data.sampleLocations["Dungeon"]];
    } else {
      this.sampleObjs = map.objects.find(layer => layer.name === 'samples').objects;
    }
    
    // Create player at start location
    this.player = new Player(this, spawnPlayerPos.x, spawnPlayerPos.y, 'player', data.inventory, data.health, data.sampleLocations, data.kills);
    this.player.body.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player); 
    const player = this.player;

    // Create samples and set overlap with player
    this.samples = createSamples(this.sampleObjs, this);
    this.samples.refresh();
    this.physics.add.overlap(this.player, this.samples, (player, sample) => {
      sampleCollector(player, sample, this); 
    });

    // Get zombie obj coords & Create zombies 
    const zombieObjs = map.objects.find(layer => layer.name === 'zombies').objects;
    zombieFactory(this, zombieObjs, 'zombie', this.player, obstacles);
    
    //create shots
    this.shots = new Shots(this);

    /* -----  Player-Scene physics properties ----- */
    obstacles.setCollisionBetween(0, 520);
    upStairs.setCollisionBetween(1, 400);
    this.physics.add.collider(this.player, obstacles);
    
    // Zombie-Zombie collisions
    this.physics.add.collider(this.zombies, this.zombies);

    // Physics properties for shots and zombies
    this.physics.add.collider(this.shots, obstacles, () => {
      this.shots.setVisible(false);
    });
    // Zombie-Player collisions
    this.zombies.forEach(zombie => {
      this.physics.add.overlap(this.player, zombie, zombieHit);
    });

    // Zombie-shot collisions
    this.zombies.forEach(zombie => {
      this.physics.add.collider(this.shots, zombie, (shot, zombie) => {
        let individualShot = this.shots.getFirstAlive();
        if (individualShot){
          individualShot.setVisible(false);
          individualShot.setActive(false);
          zombieDamage(shot, zombie, this, this.player);
        }
      });
    });

    /* ----- Exit Dungeon & Pass Data to Town ---- */
    this.physics.add.collider(this.player, upStairs, (player, tile) => { 
      portalCallback(player, tile, this, data);
    });

    // Adds controls for shooting
    this.input.keyboard.on('keydown-SPACE', () => {
      this.shots.fireShot(this.player.x, this.player.y, this.player.frame.name);
    });

    sceneEvents.once('timerOver', ()=>{
      this.player.isDead = true;
    });

  } // end create() function
  
  update() {

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

module.exports = { Dungeon };
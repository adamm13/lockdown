import Phaser from 'phaser';
import { Player, Entity } from './Player';
import { Shots, Shot } from './Shots';
import { preloadAssets, gameOver, portalCallback } from './helpers/dataHelpers';
import { zombieFactory, zombieDamage, zombieHit } from './helpers/zombieHelpers';
import GameUI from './GameUI';
import sceneEvents from './SceneEvents';

class FinalBoss extends Phaser.Scene {
  constructor() {
      super({ key: "FinalBoss" });
    }

    zombies = [];
    zombieBoss = [];

  init(data){
  }

  preload() {
      preloadAssets(this);
  }

  create(data) {
  
  //transition into dungeon scene
  this.cameras.main.fadeIn(2000);
  // environment
  const map = this.make.tilemap({ key: 'finalBoss' });
  const tileset = map.addTilesetImage('dungeon-tileset', 'dungeonTiles', 32, 32, 1, 2);
  const dungObjs = map.addTilesetImage('dungeon-objects', 'obj-tiles');
  const ground = map.createLayer("Ground", tileset, 0, 0);
  const walls = map.createLayer("Walls", tileset, 0, 0);
  
  
  // camera
  this.cameras.main.setZoom(1.7);

  // Create player at start location
  this.player = new Player(this, 385, 580, 'player', data.inventory, data.health, data.sampleLocations, data.kills);
  const player = this.player;
  player.body.setCollideWorldBounds(true);

  // Make camera stop at edge of map
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
  // make camera follow player
  this.cameras.main.startFollow(this.player);

  //create shots
  this.shots = new Shots(this);

  walls.setCollisionBetween(0, 300);
  this.physics.add.collider(player, walls);

  // Get zombie obj array from map
  const zombieObjs = map.objects.find(layer => layer.name === 'Zombies').objects;
  // Create zombies 
  zombieFactory(this, zombieObjs, 'zombieGhost', this.player, walls);

  this.zombies.forEach(zombie => {
      this.physics.add.overlap(player, zombie, zombieHit);
  });

  // Physics properties for shots
  this.physics.add.collider(this.shots, walls, () => {
      let shot = this.shots.getFirstAlive();
      if(shot){
        shot.setVisible(false);
        shot.setActive(false);
      }
    });

    this.bossRoom = {
      key: "FinalBoss",
      scene: this, 
      map: map, 
      tileset: dungObjs, 
      player: player
    };

    // Physics for shots/zombies
    this.zombies.forEach(zombie => {
      this.physics.add.collider(this.shots, zombie, (shot, zombie) => {
        let individualShot = this.shots.getFirstAlive();
        if (individualShot){
          individualShot.setVisible(false);
          individualShot.setActive(false);
          zombieDamage(shot, zombie, this, player, this.bossRoom);
        }
      });
    });

    // Adds controls for firing
    this.input.keyboard.on('keydown-SPACE', () => {
      this.shots.fireShot(this.player.x, this.player.y, this.player.frame.name);
    });

    sceneEvents.once('timerOver', ()=>{
      this.player.isDead = true;
    });

  } // end create()

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

module.exports = { FinalBoss }
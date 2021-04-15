import Phaser from 'phaser';
import { Player, Entity } from './Player';
import { Shots, Shot } from './Shots';
import zombieHit from './helpers/zombieHit';
import zombieDamage from "./helpers/zombieDamage";
import zombieFactory from './helpers/zombieFactory';
import portalCallback from './helpers/portalCallback';
import gameOver from "./helpers/gameOver";
import preloadAssets from './helpers/preloadAssets';


class Forest extends Phaser.Scene {
  constructor() {
    super({ key: "Forest" });
    this.shots;
    this.player;
  }

  zombies = [];

  init(data) {
    console.log(data);
  }

  preload() {
    preloadAssets(this);
  }
  create(data) {
    // environment
    const map = this.make.tilemap({ key: 'forestMap' });
    // const tileset1 = map.addTilesetImage('Forest', 'forest');
    // const tileset2 = map.addTilesetImage('Graveyard', 'graveyard');
    const tileset1 = map.addTilesetImage('Forest-extruded', 'forest', 32, 32, 1, 2);
    const tileset2 = map.addTilesetImage('Graveyard-extruded', 'graveyard', 32, 32, 1, 2);
    
    const ground = map.createLayer("ground", tileset1);
    const below_player_2 = map.createLayer("below-player-2", tileset2);
    const obstacles = map.createLayer("obstacles", tileset1);
    const obstacles_2 = map.createLayer("obstacles-2", tileset2);
    const below_player = map.createLayer("below-player", tileset1);
    const exitShrubs = map.createLayer("exitForest", tileset1);
    

    //render hearts
    this.scene.run('GameUI', data);
    console.log(data.inventory);

    //knives
    // const knives = this.add.group({
    //   quantity: 5
    // })
    
    // camera
    this.cameras.main.setZoom(2);
    // Create player at start location
    this.player = new Player(this, 385, 580, 'player', data.inventory, data.health, data.sampleLocations);
    const player = this.player;
    player.body.setCollideWorldBounds(false);

    //gives player knives

   // this.player.setKnives(knives);

    //create shots
    this.shots = new Shots(this);

  
    //create layer above player
    const above_player = map.createLayer("above-player", tileset1, 0, 0);

    // Make camera stop at edge of map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
  
    // make camera follow player
    this.cameras.main.startFollow(this.player);
  
      //  Player physics properties.
      obstacles.setCollisionBetween(0, 300);
      obstacles_2.setCollisionBetween(1, 400);
      exitShrubs.setCollisionBetween(1, 400);
      this.physics.add.collider(player, obstacles);
      this.physics.add.collider(player, obstacles_2, (player, tile) => {
        console.log("OUCH!");
        console.log("X: ", player.x);
        console.log("Y: ", player.y);
      });

      //knives collisions
      // this.physics.add.collider(knives, obstacles);
      // this.physics.add.collider(knives, obstacles_2);
      // //add event listener after collisions are figured out
      // this.physics.add.collider(knives, zombieObjs);


      // Get zombie obj array from map
      const zombieObjs = map.objects.find(layer => layer.name === 'zombies').objects;
      // Create zombies // Right now the zombieGhost sprite can pass through obstacles_2 just b/c thats the way the Factory is set up lol
      zombieFactory(this, zombieObjs, 'zombieGhost', this.player, obstacles);

      this.zombies.forEach(zombie => {
        this.physics.add.overlap(player, zombie, zombieHit);
      });

      // Exit scene & pass data through player object (player.gameData property)
      this.physics.add.collider(player, exitShrubs, (player, tile) => { 
        portalCallback(player, tile, this);
      });

      // Physics properties for shots
      this.physics.add.collider(this.shots, obstacles, () => {
        console.log(this.shots.children);
        let shot = this.shots.getFirstAlive();
        console.log(shot);
        if(shot){
          shot.setVisible(false);
        }
        //this.shots.setVisible(false);
      });
      this.physics.add.collider(this.shots, obstacles_2, () => {
        let shot = this.shots.getFirstAlive();
        console.log(shot)
        if(shot){
          shot.setVisible(false);
        }
       // this.shots.setVisible(false);
      });
      // Physics for shots/zombies
      this.zombies.forEach(zombie => {
        this.physics.add.collider(this.shots, zombie, (shot, zombie) => {
          let individualShot = this.shots.getFirstAlive();
          if (individualShot){
            individualShot.setVisible(false);
            individualShot.setActive(false);
            zombieDamage(shot, zombie, this);
          }
        });
      });

      // Adds controls for firing
      this.input.keyboard.on('keydown-SPACE', () => {
        this.shots.fireShot(this.player.x, this.player.y, this.player.frame.name);
      });

      
    }

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

module.exports = { Forest }



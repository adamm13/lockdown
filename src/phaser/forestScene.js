import Phaser from 'phaser';
import { Player, Entity } from './Player';
import { Shots, Shot } from './Shots';
import zombieHit from './helpers/zombieHit';
import zombieFactory from './helpers/zombieFactory';
import portalCallback from './helpers/portalCallback';


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
    // this.load.image('forest', 'src/assets/images/forest-tileset.png');
    this.load.image('forest', 'src/assets/images/forest-tileset-extruded.png');
    //this.load.image('graveyard', 'src/assets/images/graveyard-tileset.png');
    this.load.image('graveyard', 'src/assets/images/graveyard-tileset-extruded.png');
    this.load.tilemapTiledJSON('forestMap', 'src/assets/maps/finalForest2.json');
    // spritesheets
    this.load.spritesheet('zombieGhost', "src/assets/characters/enemies/zombieGhost.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('player', "src/assets/characters/player.png", { frameWidth: 32, frameHeight: 32 });
    //image for bullets
    this.load.image('shot', 'src/assets/images/smBlueBlast.png');
    //image for hearts
    this.load.image('empty-heart', "src/assets/images/ui_heart_empty.png");
    this.load.image('full-heart', "src/assets/images/ui_heart_full32.png");
    this.load.image('half-heart', "src/assets/images/ui_heart_half.png");
    //image for samples
    this.load.image('samples', "src/assets/symbols-and-items/sample2.png");
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
    
    // camera
    this.cameras.main.setZoom(2);
    // Create player at start location
    this.player = new Player(this, 385, 580, 'player', data.inventory, data.health, data.sampleLocations);
    const player = this.player;
    player.body.setCollideWorldBounds(false);

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
        this.shots.setVisible(false);
      });
      this.physics.add.collider(this.shots, obstacles_2, () => {
        this.shots.setVisible(false);
      });

      // Adds controls for firing
      this.input.keyboard.on('keydown-SPACE', () => {
        this.shots.fireShot(this.player.x, this.player.y, this.player.frame.name);
      });

      
    }

    update() {
      //  Input Events
      this.player.update();
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



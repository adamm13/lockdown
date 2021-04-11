import Phaser from 'phaser';
import { Player, Entity } from './Player';



class Forest extends Phaser.Scene {
  constructor() {
    super({
      key: "Forest"
    });
  }
  preload() {
    this.load.image('forest', 'src/assets/images/forest-tileset.png');
    this.load.image('graveyard', 'src/assets/images/graveyard-tileset.png');
    this.load.tilemapTiledJSON('map', 'src/assets/maps/finalForest.json');
    this.load.spritesheet('player', "src/assets/characters/player.png", { frameWidth: 32, frameHeight: 32 });
  }
  create() {
    // environment
    const map = this.make.tilemap({ key: 'map' });
    const tileset1 = map.addTilesetImage('Forest', 'forest');
    const tileset2 = map.addTilesetImage('Graveyard', 'graveyard');

    const ground = map.createLayer("ground", tileset1);
    const below_player_2 = map.createLayer("below-player-2", tileset2);
    const obstacles = map.createLayer("obstacles", tileset1);
    const obstacles_2 = map.createLayer("obstacles-2", tileset2);
    const below_player = map.createLayer("below-player", tileset1);
    
    
      // camera
      this.cameras.main.setZoom(2);
      // Create player at start location and scale him
      this.player = new Player(this, 385, 610, 'player');
      const player = this.player;
      player.body.setCollideWorldBounds(true);
  
      //create layer above player
      const above_player = map.createLayer("above-player", tileset1, 0, 0);

      // Make camera stop at edge of map
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
  
      // make camera follow player
      this.cameras.main.startFollow(this.player);
  
      //  Player physics properties.
      obstacles.setCollisionBetween(0, 300);
      obstacles_2.setCollisionBetween(1, 400);
      this.physics.add.collider(player, obstacles);


      this.physics.add.collider(player, obstacles_2, (player, tile) => {
        tile.collisionCallback = (collidingPlayer, collidingTile) => {
          //console.log("COLLISION CALLBACK 1st Arg: ", collidingPlayer);
          //console.log("COLLISION CALLBACK 2nd Arg: ", collidingTile);
        }
      });

      this.physics.add.collider(player, obstacles_2, (player, tile) => {
        console.log("player: ", player);
        console.log("tile: ", tile);
        if (tile.index === 339) {
          tile.collisionCallback = (collidingPlayer, collidingTile) => {
            console.log("Scene transition: ");
            console.log(this);
            console.log(this.scene);
            this.scene.start('Forest2');
          }
        }
      });

    }
      update() {
        //  Input Events
        this.player.update();
      }
}

module.exports = { Forest }



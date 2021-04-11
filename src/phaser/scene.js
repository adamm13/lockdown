import Phaser from 'phaser';

let player;
let cursors;

 export default class Forest extends Phaser.Scene {
  constructor() {
    super();
  }
  preload() {
    this.load.image('forest', 'src/assets/images/forest-tileset.png');
    this.load.image('graveyard', 'src/assets/images/graveyard-tileset.png');
    this.load.tilemapTiledJSON('map', 'src/assets/maps/finalForest.json');
    this.load.spritesheet('player', 'src/assets/images/player.png', { frameWidth: 32, frameHeight: 32 });
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
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    // Create player at start location and scale him
    player = this.physics.add.sprite(385, 610, 'player');
    player.setScale(1.2);
    //create layer above player
    const above_player = map.createLayer("above-player", tileset1, 0, 0);
    // make camera follow player
    this.cameras.main.startFollow(player);
    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
      //  Player physics properties.
      obstacles.setCollisionBetween(1, 400, true);
     // obstacles_2.setCollisionBetween(1, 400, true);
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

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'player', frame: 1 }],
      frameRate: 20
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (cursors.left.isDown) {
      player.setVelocityY(0);
      player.setVelocityX(-200);
      player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
      player.setVelocityY(0);
      player.setVelocityX(200);
      player.anims.play('right', true);
    } else if (cursors.up.isDown) {
      player.setVelocityX(0);
      player.setVelocityY(-200);
      player.anims.play('up', true);
    } else if (cursors.down.isDown) {
      player.setVelocityX(0);
      player.setVelocityY(200);
      player.anims.play('down', true);
    } else {
      player.setVelocityX(0);
      player.setVelocityY(0);
      player.anims.play('turn');
    }
  }
}



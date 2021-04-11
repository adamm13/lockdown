import Phaser from 'phaser';

let player;
let cursors;

export default class Town extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image('tiles', 'src/assets/town32.png');
    this.load.tilemapTiledJSON('map', 'src/assets/overworldv3.json');

    this.load.spritesheet('player', 'src/assets/player.png', { frameWidth: 32, frameHeight: 32 });
  }
  create() {
    // environment

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('town32', 'tiles')

    const ground = map.createLayer("ground", tileset, 0, 0,);
    const house = map.createLayer("house", tileset, 0, 0);
    const trees = map.createLayer("trees", tileset, 0, 0);


    // camera
    this.cameras.main.setZoom(1.2);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    // Create player at start location and scale him
    player = this.physics.add.sprite(200, 300, 'player');
    // make camera follow player
    this.cameras.main.startFollow(player);
    //  Player physics properties.
    trees.setCollisionBetween(1, 1000);
    this.physics.add.collider(player, trees);

    house.setCollisionBetween(1, 200);
    this.physics.add.collider(player, house);
    player.setCollideWorldBounds(false);
    //  Player physics properties.
    // trees.setCollisionBetween(0, 1000);
    // this.physics.add.collider(player, obstacles);
    // this.physics.add.collider(player, trees, (player, tile) => {
    //   console.log("player: ", player);
    //   console.log("tile: ", tile);
    //   tile.collisionCallback = (collidingPlayer, collidingTile) => {
    //     console.log("COLLISION CALLBACK 1st Arg: ", collidingPlayer);
    //     console.log("COLLISION CALLBACK 2nd Arg: ", collidingTile);
    //   }
    // });


    // ground.setCollisionBetween(1,200)
    // this.physics.add.collider(player, ground);



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



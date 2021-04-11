import Phaser from 'phaser';

let player;
let cursors;

const gameTileSize = 32;

/* ------------------ Entity Class -------------------------- */

class Entity extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, textureKey, type) {
    super(scene, x, y, textureKey);
    // any properties we add here will available to the instance object
    this.scene = scene;
    this.textureKey = textureKey;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.type = type;
    this.isDead = false;
  }

  explode() {
    if (!this.isDead) {
      this.isDead = true;
      this.destroy();
      console.log("entity explode!");
    }
  }
}

/* --------------------------------- Player Class ----------------------------------- */

class Player extends Entity {

  constructor(scene, x, y, textureKey) {
    super(scene, x, y, textureKey);

    /////////// Walk animation
    const animFrameRate = 10;
    const anims = scene.anims;

    anims.create({
      key: 'left',
      frames: anims.generateFrameNumbers(this.textureKey, { start: 5, end: 3 }),
      frameRate: animFrameRate,
      repeat: -1,
      yoyo: true,
    });

    anims.create({
      key: 'right',
      frames: anims.generateFrameNumbers(this.textureKey, { start: 8, end: 6 }),
      frameRate: animFrameRate,
      repeat: -1,
      yoyo: true,
    });

    anims.create({
      key: 'up',
      frames: anims.generateFrameNumbers(this.textureKey, { start: 9, end: 11 }),
      frameRate: animFrameRate,
      repeat: -1,
      yoyo: true,
    });

    anims.create({
      key: 'down',
      frames: anims.generateFrameNumbers(this.textureKey, { start: 0, end: 2 }),
      frameRate: animFrameRate,
      repeat: -1,
      yoyo: true,
    });

    this.idleFrame = {
      down: 1,
      left: 4,
      right: 7,
      up: 10
    }

    this.setFrame(this.idleFrame.down);

    /////////// Keyboard Inputs 
    //keys = this.input.keyboard.createCursorKeys();
    const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;

    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      a: A,
      s: S,
      d: D
    });

  } //// end constructor

  update() {

    const { keys } = this;
    const walkingSpeed = 200; // velocity is in px / second
    const prevVelocity = this.body.velocity.clone();

    this.body.setVelocity(0);

    ////// Set velocity // reset Y and X to zero for orthogonal movements to prevent diagonal movement
    if (keys.left.isDown || keys.a.isDown) {
      this.body.setVelocityY(0);
      this.body.setVelocityX(-walkingSpeed);
      this.anims.play('left', true);
    } else if (keys.right.isDown || keys.d.isDown) {
      this.body.setVelocityY(0);
      this.body.setVelocityX(walkingSpeed);
      this.anims.play('right', true);
    } else if (keys.up.isDown || keys.w.isDown) {
      this.body.setVelocityX(0);
      this.body.setVelocityY(-walkingSpeed);
      this.anims.play('up', true);
    } else if (keys.down.isDown || keys.s.isDown) {
      this.body.setVelocityX(0);
      this.body.setVelocityY(walkingSpeed);
      this.anims.play('down', true);
    } else {
      this.anims.stop();
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.body.velocity.normalize().scale(walkingSpeed);

    //// Set Idle animation frame when no keys are pressed
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      // show idle animation frame
      if (prevVelocity.x < 0) {
        this.setFrame(this.idleFrame.left);
      } else if (prevVelocity.x > 0) {
        this.setFrame(this.idleFrame.right);
      } else if (prevVelocity.y < 0) {
        this.setFrame(this.idleFrame.up);
      } else if (prevVelocity.y > 0) {
        this.setFrame(this.idleFrame.down)
      }
    }

  }
} // end Player class

class Town extends Phaser.Scene {
  constructor() {
    super("Town");
  }

  preload() {
    this.load.image('tiles', 'src/assets/town32.png');
    this.load.tilemapTiledJSON('map', 'src/assets/overworldv3.json');

    this.load.spritesheet('player', 'src/assets/images/player.png', { frameWidth: 32, frameHeight: 32 });
  }
  create() {
    // environment

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('town32', 'tiles')

    const ground = map.createLayer("ground", tileset, 0, 0,);
    const house = map.createLayer("house", tileset, 0, 0);
    const trees = map.createLayer("trees", tileset, 0, 0);


    // camera
    this.cameras.main.setZoom(2);
    // Create player at start location and scale him
    this.player = new Player(this, 200, 300, 'player');
    const player = this.player;
    player.body.setCollideWorldBounds(true);

    // Make camera stop at edge of map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    // make camera follow player
    this.cameras.main.startFollow(this.player);

    //  Player physics properties.
    trees.setCollisionBetween(1, 1000);
    this.physics.add.collider(player, trees);

    house.setCollisionBetween(1, 200);
    this.physics.add.collider(player, house);
    //player.setCollideWorldBounds(false);
  }
}

module.exports = { Town };

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


//     // ground.setCollisionBetween(1,200)
//     // this.physics.add.collider(player, ground);



//     //  Our player animations, turning, walking left and walking right.
//     this.anims.create({
//       key: 'left',
//       frames: this.anims.generateFrameNumbers('player', { start: 5, end: 3 }),
//       frameRate: 10,
//       repeat: -1
//     });
//     this.anims.create({
//       key: 'turn',
//       frames: [{ key: 'player', frame: 1 }],
//       frameRate: 20
//     });
//     this.anims.create({
//       key: 'right',
//       frames: this.anims.generateFrameNumbers('player', { start: 8, end: 6 }),
//       frameRate: 10,
//       repeat: -1
//     });
//     this.anims.create({
//       key: 'up',
//       frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
//       frameRate: 10,
//       repeat: -1
//     });
//     this.anims.create({
//       key: 'down',
//       frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
//       frameRate: 10,
//       repeat: -1
//     });
//     //  Input Events

//     cursors = this.input.keyboard.createCursorKeys();
//   }
//   update() {

//     if (cursors.left.isDown) {
//       player.setVelocityY(0);
//       player.setVelocityX(-200);
//       player.anims.play('left', true);
//     }
//     else if (cursors.right.isDown) {
//       player.setVelocityY(0);
//       player.setVelocityX(200);
//       player.anims.play('right', true);
//     } else if (cursors.up.isDown) {
//       player.setVelocityX(0);
//       player.setVelocityY(-200);
//       player.anims.play('up', true);
//     } else if (cursors.down.isDown) {
//       player.setVelocityX(0);
//       player.setVelocityY(200);
//       player.anims.play('down', true);
//     } else {
//       player.setVelocityX(0);
//       player.setVelocityY(0);
//       player.anims.play('turn');
//     }


//   }
// }



import Phaser from "phaser";


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
    if(!this.isDead) {
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
    const {LEFT, RIGHT, UP, DOWN, W, A, S, D} = Phaser.Input.Keyboard.KeyCodes;

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

  getPosition() {
    // returns Phaser.Math.Vector2
    return this.sprite.getBottomCenter();
  }

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

/* ------------------------------------ Dungeon Scene Class ------------------------ */

export default class Dungeon extends Phaser.Scene {
  constructor() {
    super('Dungeon');
  }
  
  preload() {
    //this.load.image("logo", logoImg);
    this.load.image('tiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-tileset.png");
    this.load.image('obj-tiles', "src/assets/dungeonMaps/dungeon/tilesets/dungeon-objects.png");
    this.load.tilemapTiledJSON('map', "src/assets/dungeonMaps/dungeon/dungeon.json");
    this.load.spritesheet('player', "src/assets/characters/player.png", { frameWidth: gameTileSize, frameHeight: gameTileSize });
  }
  
  create() {
    // environment
    const map = this.make.tilemap({key:'map'});
    const tileset = map.addTilesetImage('dungeon-tileset', 'tiles');
    const objTileset = map.addTilesetImage('dungeon-objects', 'obj-tiles');
    const ground = map.createLayer("belowPlayer", tileset, 0, 0);
    const obstacles = map.createLayer("world", tileset, 0, 0);
    const dungObjs = map.createLayer("objectLayer", objTileset, 0, 0);

    // camera
    this.cameras.main.setZoom(2);
    // Create player at start location and scale him
    this.player = new Player(this, 752, 80, 'player');
    const player = this.player;
    player.body.setCollideWorldBounds(true);

    // Make camera stop at edge of map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    // make camera follow player
    this.cameras.main.startFollow(this.player);

    //  Player physics properties.
    obstacles.setCollisionBetween(0, 300);
    dungObjs.setCollisionBetween(1, 400);
    this.physics.add.collider(player, obstacles);
    
    this.physics.add.collider(player, dungObjs, (player, tile) => {
      console.log("player: ", player);
      console.log("tile: ", tile);
      if (tile.index === 228) {
        tile.collisionCallback = (collidingPlayer, collidingTile) => {
          console.log("Scene transition: ");
          // console.log(this);
          // console.log(this.scene);
          this.scene.start('Dungeon2');
          this.scene.stop('Dungeon');
        }
      }
    });
  
  }
  
  update() {
    //  Input Events
    this.player.update();
  }
}


class Town extends Phaser.Scene {
  constructor() {
    super("Town");
  }
// forest map
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

     //  Player physics properties.
     trees.setCollisionBetween(1, 1000);
     this.physics.add.collider(player, trees);
 
     house.setCollisionBetween(1, 200);
     this.physics.add.collider(player, house);
     player.body.setCollideWorldBounds(false);
   }
   update() {
     //  Input Events
     this.player.update();
   }
 }
  
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

// class Dungeon2 extends Phaser.Scene {
//   constructor() {
//     super('Dungeon2');
//   }

//   preload() {
//     console.log("I AM DUNGEON 2 PRELOAD");
//     this.load.image('tiles', "src/assets/maps/dungeon/tilesets/dungeon-tileset.png");
//     this.load.tilemapTiledJSON('map2', "src/assets/maps/dungeon/dungeon2.json");
//     this.load.spritesheet('player', "src/assets/characters/player.png", { frameWidth: gameTileSize, frameHeight: gameTileSize });
//   }
  
//   create() {
//     console.log("I AM DUNGEON 2 CREATE");
//     // environment
//     const map = this.make.tilemap({key:'map2'});
//     const tileset = map.addTilesetImage('dungeon-tileset', 'tiles');
//     const ground = map.createLayer("groundLayer", tileset, 0, 0);

//     // camera
//     this.cameras.main.setZoom(2);
//     // Create player at start location and scale him
//     this.player = new Player(this, 752, 80, 'player');
//     const player = this.player;
//     player.body.setCollideWorldBounds(true);

//     // Make camera stop at edge of map
//     this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

//     // make camera follow player
//     this.cameras.main.startFollow(this.player);

//   }

//   update() {
//     this.player.update();
//   }

// }

module.exports = { Dungeon, Forest, Town };

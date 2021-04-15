import { Physics } from "phaser";
import { Entity } from "./Entity";
  
  /* --------------------------------- Player Class ----------------------------------- */
  
// let shootTime = 0;

class Player extends Entity {
  

  constructor(scene, x, y, textureKey, inventory, health, sampleLocations) {
    super(scene, x, y, textureKey);
    this.gameData = {}
    this.gameData.inventory = inventory ? inventory : []; // initialized as [] 
    this.gameData.health = health ? health : 500; // initialized as 500 
    this.gameData.sampleLocations = sampleLocations // see DungeonScene for initial locations
    this.scene = scene;
    //this.knives = knives
    /////////// Walk animation
    const animFrameRate = 10;
    const anims = scene.anims;
    // const knives = knives;


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
    const {LEFT, RIGHT, UP, DOWN, W, A, S, D, SPACE} = Phaser.Input.Keyboard.KeyCodes;

    this.keys = scene.input.keyboard.addKeys({
      left: LEFT, 
      right: RIGHT, 
      up: UP, 
      down: DOWN,
      w: W, 
      a: A, 
      s: S, 
      d: D,
      fireKey: SPACE
    });
    
    
    
  } //// end constructor

  // setKnives(knives){
  //   this.knives = knives;
  // }

  // throwKnife(){
  //   console.log(this.anims.currentAnim.key);
  //   const direction = this.anims.currentAnim.key;
  //   const throwingDirection = new Phaser.Math.Vector2(0, 0);

  //   const knife = this.knives.get(this.x, this.y, 'knife');

  //   knife.setActive(true);

  //   switch(direction){
  //     case 'up':
  //       throwingDirection.y = -1;
  //       knife.setVelocityY(-300);
  //       break
  //     case 'down':
  //       knife.setVelocityY(300);
  //       break
  //     case 'left':
  //       knife.setVelocityX(-300);
  //       break
  //     case 'right':
  //       knife.setVelocityY(300);
  //       break
  //   }

  //  // knife.setVelocity(throwingDirection.x = 300, throwingDirection.y = 300)
  // }


  update() {

    if (this.gameData.health <= 0) {
      this.isDead = true;
    }

    const { keys } = this; 
    const walkingSpeed = 200; // velocity is in px / second
    const prevVelocity = this.body.velocity.clone();

    this.body.setVelocity(0);

    ////// Set velocity // reset Y and X to zero for orthogonal movements to prevent diagonal movement
    if (keys.left.isDown || keys.a.isDown) {
      this.body.setVelocityY(0);
      this.body.setVelocityX(-walkingSpeed);
      this.anims.play('left', true);
      console.log(this.anims.currentAnim.key);
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

    //control for shooting
    // if(keys.fireKey.isDown){
    //   this.throwKnife();
    // }
  

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
  
} 

module.exports = { Player }
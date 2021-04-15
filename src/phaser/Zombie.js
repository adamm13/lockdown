import { Entity } from "./Entity";

class Zombie extends Entity {

  constructor(scene, x, y, textureKey, target, speed, health) {
    super(scene, x, y, textureKey);

    //zombie health
    this.zombieData = {}
    this.zombieData.health = health ? health: 40;

    // set target to player
    this.target = target;
    this.speed = speed; // px per second

    // Walk animation
    const animFrameRate = 10;
    const anims = scene.anims;
    const spriteKey = this.textureKey; 

    anims.create({
      key: spriteKey + '-left',
      frames: anims.generateFrameNumbers(spriteKey, { start: 5, end: 3 }),
      frameRate: animFrameRate,
      repeat: -1,
      yoyo: true,
    });
    
    anims.create({
      key: spriteKey + '-right',
      frames: anims.generateFrameNumbers(spriteKey, { start: 8, end: 6 }),
      frameRate: animFrameRate,
      repeat: -1,
      yoyo: true,
    });
    
    anims.create({
      key: spriteKey + '-up',
      frames: anims.generateFrameNumbers(spriteKey, { start: 9, end: 11 }),
      frameRate: animFrameRate,
      repeat: -1,
      yoyo: true,
    });
    
    anims.create({
      key: spriteKey + '-down',
      frames: anims.generateFrameNumbers(spriteKey, { start: 0, end: 2 }),
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
    // const {LEFT, RIGHT, UP, DOWN, W, A, S, D} = Phaser.Input.Keyboard.KeyCodes;

    // this.keys = scene.input.keyboard.addKeys({
    //   left: LEFT, 
    //   right: RIGHT, 
    //   up: UP, 
    //   down: DOWN,
    //   w: W, 
    //   a: A, 
    //   s: S, 
    //   d: D
    // });
    
  } //// end constructor

  update() {
    const walkingSpeed = this.speed; //  px / second
    const prevVelocity = this.body.velocity.clone();
    const spriteKey = this.textureKey; 

    this.body.setVelocity(0);
    
    // Zombie Path Finding for Player
    const targetX = this.target.x;
    const targetY = this.target.y;

    const dx = targetX - this.x;
    const dy = targetY - this.y;

    // const rotation = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);
    // this.setRotation(rotation);

    ////// Set velocity // reset Y and X to zero for orthogonal movements to prevent diagonal movement
    
    if (Math.abs(dx) > Math.abs(dy)) {
      if (targetX < this.x) {
        this.body.setVelocityY(0);
        this.body.setVelocityX(-walkingSpeed);
        this.anims.play(spriteKey + '-left', true);
      } else if (targetX > this.x) {
        this.body.setVelocityY(0);
        this.body.setVelocityX(walkingSpeed);
        this.anims.play(spriteKey + '-right', true);
      } 
    }

    if (Math.abs(dx) < Math.abs(dy)) {
      if (targetY < this.y) {
        this.body.setVelocityX(0);
        this.body.setVelocityY(-walkingSpeed);
        this.anims.play(spriteKey + '-up', true);
      } else if (targetY > this.y) {
        this.body.setVelocityX(0);
        this.body.setVelocityY(walkingSpeed);
        this.anims.play(spriteKey + '-down', true);
      } 
    }
    
    if (targetX === this.x && targetY === this.y) {
      this.anims.stop();
    }

    // Normalize and scale the velocity so that zombie can't move faster along a diagonal
    this.body.velocity.normalize().scale(walkingSpeed);

    //// Set Idle animation frame
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

module.exports = { Zombie }
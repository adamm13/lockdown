import { Entity } from "./Entity";

let zombieShot = 0;

class Zombie extends Entity {

  constructor(scene, x, y, textureKey, target, speed, health) {
    super(scene, x, y, textureKey);
    this.scene = scene;
    //zombie health
    this.zombieData = {}

    if (textureKey === "zombieKing") {
      this.zombieData.health = health ? health: 20;
    } else {
      this.zombieData.health = health ? health: 2;
    }

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
    
  } //// end constructor

  bounceBack(direction){
    this.body.setVelocity(direction.x, direction.y);
    zombieShot = 1;
  }

  update() {
    const walkingSpeed = this.speed; //  px / second
    const prevVelocity = this.body.velocity.clone();
    const spriteKey = this.textureKey; 

    if (zombieShot > 0){
      zombieShot++;
      if (zombieShot > 70){
        zombieShot = 0;
      }
    } else {
      this.body.setVelocity(0);
    }
    
    // Zombie Path Finding for Player
    const targetX = this.target.x;
    const targetY = this.target.y;

    const dx = targetX - this.x;
    const dy = targetY - this.y;

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

    // Normalize and scale the velocity so that zombie can't move faster along a diagonal
    this.body.velocity.normalize().scale(walkingSpeed);

  }

}

module.exports = { Zombie }

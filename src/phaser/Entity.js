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

}

module.exports = { Entity };
import Phaser from 'phaser'

export default class testnpc extends Phaser.Physics.Arcade.Sprite
{
  constructor(scene = Phaser.scene, x = number, y = number, texture = string, frame = string || number)
  {
    super(scene, x, y, texture, frame)

    this.anims.play('walk')
    
  }
}

module.exports = { testnpc };
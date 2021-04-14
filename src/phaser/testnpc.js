import Phaser from 'phaser'

const UP = 0
const DOWN = 1
const LEFT = 2
const RIGHT = 3

export default class testnpc extends Phaser.Physics.Arcade.Sprite
{
  private_direction = DOWN
  
  constructor(scene = Phaser.scene, x = number, y = number, texture = string, frame = string || number)
  {
    super(scene, x, y, texture, frame)

    this.anims.play('walk')

    scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.private_handleTileCollision, this)
    
  }

  private_handleTileCollision(go = Phaser.GameObjects.GameObject, tile = Phaser.Tile)
  {
    if (go !== this)
    {
      return
    }
    const newDirection = Phaser.Math.Between(0,3)
    this.private_direction = newDirection
  }

  preUpdate(t = number, dt = number)
  {
    super.preUpdate(t,dt)
    
    const speed = 50

    switch (this.private_direction)
    {
			case UP:
				this.setVelocity(0, -speed)
				break

			case DOWN:
				this.setVelocity(0, speed)
				break

			case LEFT:
				this.setVelocity(-speed, 0)
				break

			case RIGHT:
				this.setVelocity(speed, 0)
				break
    }


  }

}

module.exports = { testnpc };
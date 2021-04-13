class Shot extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'shot');
    }

    fire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-300);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Shots extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 5,
            key: 'shot',
            active: false,
            visible: false,
            classType: Shot
        });
    }

    fireBullet (x, y){
      let shot = this.getFirstDead(false);

      if (shot){
        shot.fire(x, y);
      }
    }
}


module.exports = { Shots, Shot }
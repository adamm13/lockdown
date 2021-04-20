class Shot extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'shot');
    }

    fire (x, y, playerDirection)
    {   
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
        if (playerDirection > 0 && playerDirection <= 3){
            this.setVelocityY(300);
        } else if (playerDirection > 3 && playerDirection <= 5){
            this.setVelocityX(-300);
        } else if (playerDirection > 5 && playerDirection <= 8){
            this.setVelocityX(300);
        } else if (playerDirection > 8 && playerDirection <= 11){
            this.setVelocityY(-300);
        }
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (this.y <= -3000){
            this.setActive(false);
            this.setVisible(false);
        } else if (this.y >= 3000){
            this.setActive(false);
            this.setVisible(false);
        }

        if (this.x <= -3000){
            this.setActive(false);
            this.setVisible(false);
        } else if (this.x >= 3000){
            this.setActive(false);
            this.setVisible(false);
        }

        if (!this.visible){
           this.setActive(false);
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
    
    fireShot (x, y, playerDirection){
      let shot = this.getFirstDead(false);
      if (shot) {
        shot.fire(x, y, playerDirection);
      }
    }
}


module.exports = { Shots, Shot }
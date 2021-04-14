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
            console.log("shot down")
        } else if (playerDirection > 3 && playerDirection <= 5){
            this.setVelocityX(-300);
            console.log("shot left")
        } else if (playerDirection > 5 && playerDirection <= 8){
            this.setVelocityX(300);
            console.log("shot right")
        } else if (playerDirection > 8 && playerDirection <= 11){
            this.setVelocityY(-300);
            console.log("shot up")
        }
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (this.y <= -32){
            this.setActive(false);
            this.setVisible(false);
        } else if (this.y >= 800){
            this.setActive(false);
            this.setVisible(false);
        }

        if (this.x <= -32){
            this.setActive(false);
            this.setVisible(false);
        } else if (this.x >= 800){
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
            frameQuantity: 1,
            key: 'shot',
            active: false,
            visible: false,
            classType: Shot
        });
    }

    fireShot (x, y, playerDirection){
      let shot = this.getFirstDead(false);
        console.log(this);
      if (shot){
        shot.fire(x, y, playerDirection);
      }
    }
}


module.exports = { Shots, Shot }
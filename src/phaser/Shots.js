class Shots extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'shots');
    }

    fire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-300);
    }
}

module.exports = { Shots }
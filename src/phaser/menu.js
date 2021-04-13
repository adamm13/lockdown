
const Menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Menu ()
    {
        Phaser.Scene.call(this, 'menu');
    },

    create()
    {
        this.add.text(10, 10, 'LOCKDOWN PT 1 - Press 1 to Start the Game', { font: '24px Courier', fill: '#DC143C' });

        this.input.keyboard.once('keyup-ONE', function () {

        this.scene.start('Intro')}, this);

    }
    
});


module.exports = { Menu };


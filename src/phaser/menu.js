
const Menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Menu ()
    {
        Phaser.Scene.call(this, 'menu');
    },

    create()
    {
        let text = this.add.text(10, 10, 'LOCKDOWN PT 1 - Press 1 to Start the Game', { font: '24px Courier', fill: '#DC143C' });
        this.input.keyboard.once('keyup-ONE', function () {
            
        // Suppress WebGL warnings before changing scenes
        text.texture = this.renderer.blankTexture; // Should be wrapped in conditional when rendering direct to canvas?
        this.scene.start('Intro')}, this);
        this.scene.stop('Menu');
    }
    
});


module.exports = { Menu };


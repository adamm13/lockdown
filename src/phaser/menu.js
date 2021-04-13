import Phaser from 'phaser';
import { Player, Entity } from './Player';

    function Menu ()
    {
        Phaser.Scene.call(this, 'menu');
    }

class Menu extends Phaser.Scene {
    constructor() {
    super({
      key: "Menu"
    });
  }
  

    create()
    {
        this.add.text(10, 10, 'LOCKDOWN PT 1 - Press 1 to Start the Game', { font: '24px Courier', fill: '#00ff00' });

        this.input.keyboard.once('keyup-ONE', function () {

        this.scene.start('Town')}, this);

    }
});


}

module.exports = { Menu }





import Phaser from "phaser"

/* ------------------------------------ GameOver Scene  ------------------------ */
 
class BossUnlock extends Phaser.Scene {
  constructor() {
    super("BossUnlock");
  }

  create(data) {
    console.log(data);
    // camera transition effect
    this.cameras.main.fadeIn(5000);

    this.add.image(0,0, "forestportal").setOrigin(0)

    this.input.keyboard.once('keyup-SPACE', function () {      
          this.scene.start('Forest', data);
    }, this);
  
  }
};


module.exports = { BossUnlock };
import Phaser from "phaser"

/* ------------------------------------ GameOver Scene  ------------------------ */
 
class BossUnlock extends Phaser.Scene {
  constructor() {
    super("BossUnlock");
  }

  create(data) {
    // camera transition effect
    this.cameras.main.fadeIn(5000);

    // This variable allows us to skip to the boss room without bugs if sample number is changed
    // So that you don't need to visit every map to get an [] instead of null
    const dataUpdate = {
      ...data,
      sampleLocations: {
        "Dungeon": data.sampleLocations["Dungeon"] ? data.sampleLocations["Dungeon"] : [],
        "Forest": data.sampleLocations["Forest"] ? data.sampleLocations["Forest"] : [],
        "Town": data.sampleLocations["Town"] ? data.sampleLocations["Town"] : []
      }
    };

    this.add.image(0,0, "forestportal").setOrigin(0)

    this.input.keyboard.once('keyup-SPACE', function () {      
          this.scene.start('Forest', dataUpdate);
    }, this);
  
  }
};


module.exports = { BossUnlock };
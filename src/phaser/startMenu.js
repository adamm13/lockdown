import Phaser from "phaser"
import sceneEvents from "./SceneEvents";

/* ------------------------------------ Start Menu Scene  ------------------------ */
 
class startMenu extends Phaser.Scene {
  constructor() {
    super("startMenu");
  }

    create(data)
    {
    this.cameras.main.fadeIn(5000);

    this.add.image(this.game.renderer.width /2, this.game.renderer.height * 0.20, "logo").setDepth(1)

    this.add.image(0,0, "title_bg").setOrigin(0).setDepth(0)

    let playButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.5, "play_button").setDepth(1)

    let optionButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.5 + 100, "options_button").setDepth(1)

    let hoverSprite = this.add.sprite(100,100, "player")
    hoverSprite.setScale(2)
    hoverSprite.setVisible(false)

    this.anims.create({
      key: "walk",
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0,1,2]
      }), 
      yoyo: true
    })
    


    // keeps sound playing even if not in the browser
    //this.sound.pauseOnBlur = false

    //plays the sound
    this.game.sound.stopAll();
    this.sound.play("darkshadow", {
      loop: true
    })


    playButton.setInteractive();

    playButton.on("pointerover", () => {
      hoverSprite.setVisible(true)
      hoverSprite.play("walk")
      hoverSprite.x = playButton.x - playButton.width / 1.5;
      hoverSprite.y = playButton.y;
    })

    playButton.on("pointerout", () => {
      hoverSprite.setVisible(false)
    })

    playButton.on("pointerup", () => {
      this.sound.play("blood")
      this.scene.start("Intro", data);
      sceneEvents.emit('reset-score', data);
    })

    }
    
};


module.exports = { startMenu };


import Phaser from "phaser"
import sceneEvents from "./SceneEvents";

/* ------------------------------------ GameOver Scene  ------------------------ */
 
class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

    create(data) {
    
    // camera transition effect
      this.cameras.main.fadeIn(5000);

    this.add.image(this.game.renderer.width /2, this.game.renderer.height * 0.30, "game_over").setDepth(1)

    this.add.image(0,0, "title_bg").setOrigin(0).setDepth(0)

    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.75, "try_again").setDepth(1)

    let yesButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.5 + 30, "yes").setDepth(1)

    let noButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.5 + 100, "no").setDepth(1)
    
    let hoverSprite2 = this.add.image(100,100, "skull")
    hoverSprite2.setScale(1)
    hoverSprite2.setVisible(false)

    //start music again
    this.game.sound.stopAll();
    this.sound.play("darkshadow", {
      loop: true
    })

    // takes you to the Town scene again, with resetSamples = true
    yesButton.setInteractive();
    yesButton.on("pointerover", () => {
      hoverSprite2.setVisible(true)
      hoverSprite2.x = yesButton.x - yesButton.width * 1.5;
      hoverSprite2.y = yesButton.y;
    })
    yesButton.on("pointerout", () => {
      hoverSprite2.setVisible(false)
    })
    yesButton.on("pointerup", () => {
      sceneEvents.emit("player-death", data);
      this.sound.play("blood")
      this.scene.start("Intro", data)
    })

    // takes you back to the start screen
    noButton.setInteractive();
    noButton.on("pointerover", () => {
      hoverSprite2.setVisible(true)
      hoverSprite2.x = noButton.x - noButton.width * 2.1;
      hoverSprite2.y = noButton.y;
    })
      noButton.on("pointerout", () => {
      hoverSprite2.setVisible(false)
    })
      noButton.on("pointerup", () => {
      sceneEvents.emit("player-death", data);
      this.scene.start("startMenu", data)
    })

  
  }
};


module.exports = { GameOver };



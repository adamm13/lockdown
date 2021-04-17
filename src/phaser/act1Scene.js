import Phaser from "phaser"

/* ------------------------------------ GameOver Scene  ------------------------ */
 
class Act1 extends Phaser.Scene {
  constructor() {
    super("Act1");
  }

    create(data)
    {
    
    // camera transition effect
      this.cameras.main.fadeIn(5000);

    this.add.image(this.game.renderer.width /2, this.game.renderer.height * 0.40, "act_1").setDepth(1)

    this.add.image(0,0, "title_bg").setOrigin(0).setDepth(0)

    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.75, "complete").setDepth(1)

    //this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.5 + 30, "yes").setDepth(1)

    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.5 + 100, "spacebar").setDepth(1)
    
    // let hoverSprite2 = this.add.image(100,100, "skull")
    // hoverSprite2.setScale(1)
    // hoverSprite2.setVisible(false)

    // // takes you to the Town scene again, with resetSamples = true
    // yesButton.setInteractive();
    // yesButton.on("pointerover", () => {
    //   hoverSprite2.setVisible(true)
    //   hoverSprite2.x = yesButton.x - yesButton.width * 1.5;
    //   hoverSprite2.y = yesButton.y;
    //   console.log("hovering")
    // })
    // yesButton.on("pointerout", () => {
    //   hoverSprite2.setVisible(false)
    //   console.log("no more hover")
    // })
    // yesButton.on("pointerup", () => {
    //   this.scene.start("Town", data)
    //   console.log("restart game")
    // })

    // // takes you back to the start screen
    // noButton.setInteractive();
    // noButton.on("pointerover", () => {
    //   hoverSprite2.setVisible(true)
    //   hoverSprite2.x = noButton.x - noButton.width * 2.1;
    //   hoverSprite2.y = noButton.y;
    //   console.log("hovering")
    // })
    //   noButton.on("pointerout", () => {
    //   hoverSprite2.setVisible(false)
    //   console.log("no more hover")
    // })
    //   noButton.on("pointerup", () => {
    //   this.scene.start("Act1", data)
    //   console.log("back to menu")
    // })

  
  }
};


module.exports = { Act1 };



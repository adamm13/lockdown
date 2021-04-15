import Phaser from "phaser"

/* ------------------------------------ Start Menu Scene  ------------------------ */
 
class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }


    // preload()
    // {
    //     //Loading the Assets for the GameOver

    //     this.load.image("title_bg", "src/assets/title_bg.jpeg");

    //     this.load.image("gameover", "src/assets/gameover.png");

    //     this.load.image("tryagain", "src/assets/tryagain.png");

    //     this.load.image("yes", "src/assets/yes.png");

    //     this.load.image("no", "src/assets/no.png");  
    // },

    create()
    {

    this.add.image(this.game.renderer.width /2, this.game.renderer.height * 0.30, "game_over").setDepth(1)

    this.add.image(0,0, "title_bg").setOrigin(0).setDepth(0)

    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.75, "try_again").setDepth(1)

    let yesButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.5 + 30, "yes").setDepth(1)

    let noButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height / 1.5 + 80, "no").setDepth(1)
    
    let hoverSprite2 = this.add.sprite(100,100, "skull")
    hoverSprite2.setScale(1)
    hoverSprite2.setVisible(false)

    yesButton.setInteractive();
    noButton.setInteractive();


    yesButton.on("pointerover", () => {
      hoverSprite2.setVisible(true)
      hoverSprite2.x = yesButton.x - yesButton.width * 1.5;
      hoverSprite2.y = yesButton.y;
      console.log("hovering")
    })
    yesButton.on("pointerout", () => {
      hoverSprite2.setVisible(false)
      console.log("no more hover")
    })
    yesButton.on("pointerup", () => {
      console.log("restart game")
    })

      noButton.on("pointerover", () => {
        hoverSprite2.setVisible(true)
        hoverSprite2.x = yesButton.x - yesButton.width * 1.5;
        hoverSprite2.y = yesButton.y;
        console.log("hovering")
      })
      noButton.on("pointerout", () => {
        hoverSprite2.setVisible(false)
        console.log("no more hover")
      })
      noButton.on("pointerup", () => {
        console.log("restart game")
      })

  
  }
};


module.exports = { GameOver };



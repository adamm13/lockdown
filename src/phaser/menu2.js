import Phaser from "phaser"
 
class Menu2 extends Phaser.Scene {
  constructor() {
    super("Menu2");
  }

    // preload()
    // {
    //   this.load.image("title_bg", "src/assets/title_bg.jpeg");

    //   this.load.image("logo", "src/assets/menuname.png");
    // }


    create()
    {

    this.add.image(this.game.renderer.width /2, this.game.renderer.height * 0.20, "logo").setDepth(1)

    this.add.image(0,0, "title_bg").setOrigin(0).setDepth(0)

    let playButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "play_button").setDepth(1)

    this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2 + 100, "options_button").setDepth(1)

    let hoverSprite = this.add.sprite(100,100, "player")
    hoverSprite.setScale(2)
    hoverSprite.setVisible(false)

    this.anims.create({
      key: "walk",
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0,1,2]
      })
    })

    // this.sound.play("darkshadow", {
    //   loop: true
    // })


    playButton.setInteractive();

    playButton.on("pointerover", () => {
      hoverSprite.setVisible(true)
      hoverSprite.play("walk")
      hoverSprite.x = playButton.x - playButton.width;
      hoverSprite.y = playButton.y;
      console.log("hovering")
    })

    playButton.on("pointerout", () => {
      hoverSprite.setVisible(false)
      console.log("no more hover")
    })

    playButton.on("pointerup", () => {
      this.scene.start("Intro")
      console.log("time to meet zombies")
    })

    }
    
};


module.exports = { Menu2 };


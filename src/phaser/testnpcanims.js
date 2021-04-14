import Phaser from "phaser"

const createTestnpc = (anims: Phaser.Animations.AnimationManager) => {     


      anims.create({
          key: "still",
          frames: anims.generateFrameNames("boynpc", {start: 1, end: 1, prefix: "0", suffix: ".png"}),
          repeat: -1,
          frameRate: 10
        })

      anims.create({
          key: "walk",
          frames: anims.generateFrameNames("boynpc", {start: 0, end: 2, prefix: "0", suffix: ".png"}),
          repeat: -1,
          frameRate: 10
        })

}

module.exports = { createTestnpc }
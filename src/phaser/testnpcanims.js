import Phaser from "phaser"
    
const createNpcAnims = (anims = Phaser.Animations.AnimationManager) => {

      anims.create({
          key: "walk",
          frames: anims.generateFrameNames("boynpc", {start: 0, end: 2, prefix: "0", suffix: ".png"}),
          repeat: -1,
          frameRate: 10
      }),

      anims.create({
          key: "left",
          frames: anims.generateFrameNames("boynpc", {start: 3, end: 5, prefix: "0", suffix: ".png"}),
          repeat: -1,
          frameRate: 10
      }),

      anims.create({
          key: "right",
          frames: anims.generateFrameNames("boynpc", {start: 6, end: 8, prefix: "0", suffix: ".png"}),
          repeat: -1,
          frameRate: 10
      }),

      anims.create({
          key: "back",
          frames: anims.generateFrameNames("boynpc", {start: 9, end: 11, prefix: "", suffix: ".png"}),
          repeat: -1,
          frameRate: 10
      })
}

export { 
  createNpcAnims 
}
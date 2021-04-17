import Phaser from 'phaser'


const debug = false;

const win_game = `\n
\n
The Year 2099,  \n
YOU WON THE GAME ACT ONE IS COMPLETE
as humankind struggles to survive. After many attempts, you have
finally found the antidote to the virus that has eliminated
most of the human population. Unfortunately, time is running out.
Zombies have begun to devour your colony and you’ll need to produce 
more of the antidote quickly.

Collect enough samples of the virus to produce enough of your  
antidote to save the survivors.

Beware of the zombies who have infiltrated your colony... 

Press Spacebar to start your Journey....`


const textStyle = {
  fontSize: 20,
  lineSpacing:0,
  fontFamily: "verdana",
  color: "RED",
};

const Winning = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Winning ()
    {
        Phaser.Scene.call(this, 'Winning');
    },


    create() {

      // camera transition effect
      this.cameras.main.fadeIn(5000);

      this.add.image(0, 0, "title_bg").setOrigin(0, 0).setVisible(!debug);

      this.add.text(32, 32, win_game, textStyle).setAlpha(0.25).setVisible(debug);

      const text = this.add.text(32, 32, win_game, textStyle);
      const {
        lineHeight,
        lineSpacing,
        lineWidths
      } = Phaser.GameObjects.GetTextSize(
        text,
        text.getTextMetrics(),
        win_game.split("\n")
      );
      const totalLineHeight = lineHeight + lineSpacing;
      this.add
        .grid(
          text.x,
          text.y,
          text.width,
          text.height,
          lineHeight,
          totalLineHeight,
          0,
          0,
          0x00ffff,
          0.2
        )
        .setOrigin(0, 0)
        .setVisible(debug);
      const maskImage = this.add
        .graphics({
          fillStyle: { color: 0xff0000, alpha: 0.5 }
        })
        .setVisible(debug);
      const mask = maskImage.createGeometryMask();

      text.setMask(mask);

      const path = new Phaser.Curves.Path();

      for (let i = 0, len = lineWidths.length; i < len; i++) {
        const lineWidth = lineWidths[i];
        const y = text.y + i * totalLineHeight;

        path.moveTo(text.x, y).lineTo(text.x + lineWidth, y);
      }

      const pathDisplay = this.add
        .graphics({ lineStyle: { color: 0xffff00, alpha: 0.5, width: 2 } })
        .setVisible(debug);

      path.draw(pathDisplay);

      this.tweens.addCounter({
        from: 0,
        to: 1,
        duration: 40 * win_game.length,
        onUpdate: (counter) => {
          const { x, y } = path.getPoint(counter.getValue());

          maskImage.clear();
          if (y > 0) {
            maskImage.fillRect(text.x, text.y, text.width, y - text.y);
          }
          maskImage.fillRect(text.x, y, x - text.x, totalLineHeight);
    }
  });
        this.input.keyboard.once('keyup-SPACE', function () {

          // Suppress WebGL warnings before changing scenes
          text.texture = this.renderer.blankTexture; // Should be wrapped in conditional when rendering direct to canvas?
          
          // When starting the game fresh, we use this initial state
          const data = {
            comingFrom: "Intro",  
            health: 500,
            inventory: [],
            sampleLocations: {
              "Dungeon": null,
              "Town": null,
              "Forest": null
            }
          }
          

      }, this);
}


    
});

module.exports = { Winning };



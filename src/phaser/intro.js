import Phaser from 'phaser'


const debug = false;

const passage = `The Year 2099,  \n
Franzen kombucha dreamcatcher try-hard direct trade pok pok dsfdf sdfd \n
PBR&B gastropub disrupt vinyl letterpress blue bottle.sdfd \n
Pabst glossier shaman church-key sartorial chillwave sdfsd\n
pork belly chambray. Fingerstache XOXO kogi cardigan sdfs\n
tacos migas man bun sriracha. Etsy narwhal pour-over sdfs\n
paleo banh mi +1 mixtape umami flexitarian direct trade, \n
................\n

pork belly chambray. Fingerstache XOXO kogi cardigan sdfs\n
tacos migas man bun sriracha. Etsy narwhal pour-over sdfs\n
paleo banh mi +1 PLEASE PRESS 2 TO BEGIN`


const textStyle = {
  fontSize: 18,
  lineSpacing: 1,
  fontFamily: "courier",
  color: "RED",
};

const Intro = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Intro ()
    {
        Phaser.Scene.call(this, 'Intro');
    },

    preload() 
    {
      this.load.image("background", "src/assets/introbackground.jpeg");
    },


    create() {
      this.add.image(0, 0, "background").setOrigin(0, 0).setVisible(!debug);

      this.add.text(32, 32, passage, textStyle).setAlpha(0.25).setVisible(debug);

      const text = this.add.text(32, 32, passage, textStyle);
      const {
        lineHeight,
        lineSpacing,
        lineWidths
      } = Phaser.GameObjects.GetTextSize(
        text,
        text.getTextMetrics(),
        passage.split("\n")
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
        duration: 40 * passage.length,
        onUpdate: (counter) => {
          const { x, y } = path.getPoint(counter.getValue());

          maskImage.clear();

          if (y > 0) {
            maskImage.fillRect(text.x, text.y, text.width, y - text.y);
          }

          maskImage.fillRect(text.x, y, x - text.x, totalLineHeight);
    }

    
  });
        this.input.keyboard.once('keyup-TWO', function () {

        this.scene.start('Town')}, this);
}


    
});

module.exports = { Intro };



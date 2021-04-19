import Phaser from 'phaser'


const debug = false;

const win_game = `\n
\n
  The undead body of your foe falls to the dusty floor with a thump, 
never to rise again. At that exact moment, an ancient wooden 
chest appears in the centre of the room. You make your way toward it, 
rotting entrails sticking to the soles of your shoes as you walk. 
With no key in sight, you pry open the mouldy lid with your trusty knife, 
the hinges creaking shrilly in protest. A faint green light spills out 
of the chest, illuminating a single shining vial of viscous liquid. 
You grab the antidote, the feeling of the cool glass resting againt 
your palm flooding you with a sense of immense relief. \n
You did it! Humanity is saved!`


const textStyle = {
  fontSize: 20,
  lineSpacing:0,
  fontFamily: "verdana",
  color: "WHITE",
};

const Winning = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Winning ()
    {
        Phaser.Scene.call(this, 'Winning');
    },

    preload() 
    {
      this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
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

        this.scene.stop("GameUI")
        
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
            },
            kills: 0
          }
           this.scene.start('Act1', data);

      }, this);
}


    
});

module.exports = { Winning };



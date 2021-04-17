import Phaser from "phaser"

/* ------------------------------------ Loading Screen Scene  ------------------------ */

class loadingScene extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload()
    {
        //Loading the Assets for the GameOver
        this.load.image("title_bg", "src/assets/menu-images/title_bg.jpeg");

        this.load.image("game_over", "src/assets/menu-images/gameover.png");

        this.load.image("try_again", "src/assets/menu-images/tryagain.png");

        this.load.image("yes", "src/assets/menu-images/yes.png");

        this.load.image("no", "src/assets/menu-images/no.png");  

        this.load.image("skull", "src/assets/menu-images/skull.png");

        //Loading the assets for the Main Menu
        this.load.image("title_bg", "src/assets/menu-images/title_bg.jpeg");

        this.load.image("options_button", "src/assets/menu-images/menuoptions.png");

        this.load.image("play_button", "src/assets/menu-images/menuplay.png");

        this.load.image("logo", "src/assets/menu-images/menuname.png");

        this.load.spritesheet("player", "src/assets/characters/players/player.png", {
            frameHeight: 32,
            frameWidth: 32
        });

        this.load.audio("darkshadow", "/src/assets/sounds/darkshadows.mp3")

        this.load.audio("blood", "/src/assets/sounds/bloodshed.mp3")

        // create loading bar 

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })
    


        //Loader events:
            //complete - when done loading
            //progress - loader number progress in decimals

        //fake loading bar 
        for (let i = 0; i < 10; i++){
        this.load.spritesheet("player" + i, "src/assets/characters/players/player.png", {
            frameHeight: 32,
            frameWidth: 32
        });
        }

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height /2, this.game.renderer.width * percent, 50);
            //console.log(percent)
        })

        this.load.on("complete", () => {
            //this.scene.start()
        })
    }

    create()
    {

        this.scene.start('startMenu')

        // let text = this.add.text(10, 10, 'LOCKDOWN PT 1 - Press 1 to Start the Game', { font: '24px Courier', fill: '#DC143C' });
        // this.input.keyboard.once('keyup-ONE', function () {
            
        // // Suppress WebGL warnings before changing scenes
        // text.texture = this.renderer.blankTexture; // Should be wrapped in conditional when rendering direct to canvas?
        // this.scene.start('Intro')}, this);
        // this.scene.stop('Menu');
    }
    
};


module.exports = { loadingScene };


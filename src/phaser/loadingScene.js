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
        //Fake Loading Screen assets
            for (let i = 0; i < 4000; i++) {
        this.load.image('Zombie'+ ' ' + i, 'src/assets/menu-images/skull.png');
        }

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

        //Loading assets for the winning scene
        this.load.image("act_1", "src/assets/menu-images/act1.png");

        this.load.image("complete", "src/assets/menu-images/complete.png");

        this.load.image("spacebar", "src/assets/menu-images/spacebar.png");

        //load asses for forest portal
        this.load.image("forestportal", "src/assets/menu-images/forestportal.png")

        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '24px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        let assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '22px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xff0000, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);     	
            percentText.setText(parseInt(value * 100) + '%');
        });
                    
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
    }

    create()
    {

        this.scene.start('startMenu')
            
        // // Suppress WebGL warnings before changing scenes
        // text.texture = this.renderer.blankTexture; // Should be wrapped in conditional when rendering direct to canvas?
        // this.scene.start('Intro')}, this);
        // this.scene.stop('Menu');
    }
    
};


module.exports = { loadingScene };


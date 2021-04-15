import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { Forest } from "./phaser/forestScene";
import { Town } from "./phaser/overworld";
import { Dungeon } from "./phaser/DungeonScene";
import { loadingScene } from "./phaser/loadingScene";
import { startMenu } from "./phaser/startMenu";
import { Intro } from "./phaser/intro";
import GameUI from './phaser/GameUI';



// var Menu = new Phaser.Class({

//     Extends: Phaser.Scene,

//     initialize:

//     function Menu ()
//     {
//         Phaser.Scene.call(this, 'menu');
//     },

//     create()
//     {
//         this.add.text(10, 10, 'LOCKDOWN PT 1 - Press 1 to Start the Game', { font: '24px Courier', fill: '#00ff00' });

//         this.input.keyboard.once('keyup-ONE', function () {

//         this.scene.start('Town')}, this);

//     }
// });





const config = {
  type: Phaser.AUTO,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
      },
<<<<<<< HEAD
    scene: [ loadingScene, startMenu, Intro, Town, Forest, Dungeon ],
    render: {
      pixelArt: true
    }
=======
    scene: [ Menu, Intro, Town, Forest, Dungeon, GameUI ]
>>>>>>> 17b065c2f7e494727b9148496747aed57c9a2831
  };
const game = new Phaser.Game(config);



ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);


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
import { GameOver } from "./phaser/gameOverScene";
import GameUI from './phaser/GameUI';



const config = {
  type: Phaser.AUTO,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
      },

    scene: [ loadingScene, startMenu, Intro, Town, Forest, Dungeon, GameUI, GameOver ],
    render: {
      pixelArt: true
    }
  };
const game = new Phaser.Game(config);



ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);


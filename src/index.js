import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { Forest } from "./phaser/forestScene";
import { Town } from "./phaser/overworld";
import { Dungeon } from "./phaser/DungeonScene";
import { FinalBoss } from "./phaser/finalBoss";
import { loadingScene } from "./phaser/loadingScene";
import { startMenu } from "./phaser/startMenu";
import { Intro } from "./phaser/intro";
import { GameOver } from "./phaser/gameOverScene";
import { BossUnlock } from "./phaser/bossunlockScene";
import { Winning } from "./phaser/winningScene";
import { Act1 }  from "./phaser/act1Scene";
import  Timer  from "./phaser/Timer";

import GameUI from './phaser/GameUI';

const config = {
  type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
      },
    scene: [ 
      loadingScene, 
      startMenu, 
      Intro, 
      Town, 
      Forest, 
      Dungeon, 
      GameOver, 
      FinalBoss, 
      BossUnlock, 
      Winning,
      Act1,
      Timer,
      GameUI
    ],
    render: {
      pixelArt: true
    }
  };

const game = new Phaser.Game(config);


ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);


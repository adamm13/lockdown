import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { Forest } from "./phaser/forestScene";
import { Town } from "./phaser/overworld";
import { Dungeon } from "./phaser/DungeonScene";
import { FinalBoss } from "./phaser/FinalBoss";
import { loadingScene } from "./phaser/loadingScene";
import { startMenu } from "./phaser/startMenu";
import { Intro } from "./phaser/intro";
import { GameOver } from "./phaser/gameOverScene";
<<<<<<< HEAD
import { BossUnlock } from "./phaser/bossunlockScene";
//import { Winning } from "./phaser/winningScene";
=======
import { Winning } from "./phaser/winningScene";
>>>>>>> 999549b024c6c797f25a8bd59f61df03d441fea5
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
<<<<<<< HEAD

    scene: [ loadingScene, startMenu, Intro, Town, Forest, Dungeon, GameUI, GameOver, FinalBoss, BossUnlock ],
=======
    scene: [ 
      loadingScene, 
      startMenu, 
      Intro, 
      Town, 
      Forest, 
      Dungeon, 
      GameUI, 
      GameOver, 
      FinalBoss, 
      Winning 
    ],
>>>>>>> 999549b024c6c797f25a8bd59f61df03d441fea5
    render: {
      pixelArt: true
    }
  };
const game = new Phaser.Game(config);



ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);


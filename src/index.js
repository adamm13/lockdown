import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

import {Dungeon} from "./phaser/DungeonScene";

//console.log(App);

const config = {
  type: Phaser.AUTO,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'phaser-example',
    width: 800,
    height: 640,
    yoyo: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
      },
      scene: [ Dungeon ]
  };
const game = new Phaser.Game(config);



ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);


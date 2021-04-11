import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import Forest from "./phaser/scene";

//console.log(App);

export const config = {
  type: Phaser.AUTO,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'phaser-example',
    width: 800,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
      },
      scene: [ Forest ]
  };

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);

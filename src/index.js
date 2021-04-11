import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import Town from "./phaser/scene";

//console.log(App);


const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 800,
  height: 640,
  yoyo: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },

  scene: [Town]
};
const game = new Phaser.Game(config);



ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);


<br />
<p align="center">
<img src="https://github.com/adamm13/lockdown/blob/master/src/assets/menu-images/menuname.png"/>
</p>

---

*LOCKDOWN is a 2D topdown shooter where zombies have taken over. Players must collect enough samples to eradicate the virus to save the world.*

---

## Motivation

We were motivated to develop a game as we were all passionate about video games. The childhood nostalgia that came along with playing with your friends or finally completing that final boss level inspired us. We wanted to showcase our skills developed at [Lighthouse Labs](https://www.lighthouselabs.ca/) of learning a new framework ([Phaser](https://phaser.io/)) and apply our existing JS skills to develop LOCKDOWN. 

---

## Controls

W or ⬆  &nbsp;  to move up <br />
A or ⬅  &nbsp;  to move left <br />
S or ⬇  &nbsp;  to move down <br />
D or ➡  &nbsp;  to move right <br />
Spacebar to shoot <br />

---

## Credits

This project was created by [Adam Marsala](https://github.com/MagicMark5), [Caitlin Garrood](https://github.com/CaitieCat), and [Adam Mohammed](https://github.com/adamm13). 

---

## Screenshots


## Features

- **Launching Projectiles** - The player is able to fire projectiles in the direction they are facing to defeat enemies. They are limited to 5 'bullets', each of  which reset once a collision between an enemy or obstacle occurs.

- **Dynamic Game State** - The games state is shared between scenes and portal tiles. Zombies and samples also have their data shared between the game and the UI.

- **NPC Artificial Intelligence** - NPC have the ability to move on their own and also have collision avoidance. If they collide with an object in the environment they then choose another direction to go.

---

## Tech/framework used

**Built with** - PhaserJS, Tiled, Javascript, React, NodeJS, CSS.

---

## Installation

1. Fork this repository, then clone your fork of this repository.

2. Install dependencies using the `npm install` command.

3. Start the web server using the `npm start` command. The app will be served at [http://localhost:8080/](http://localhost:8080/.

4. Go to [http://localhost:8080/](http://localhost:8080/) in your browser.

---

## Dependencies

   - babel-core: ^6.26.3
   - babel-preset-es2015: ^6.24.1
   - babel-preset-react: ^6.24.1
   - css-loader: ^5.0.0
   - phaser: ^3.17.0
   - react-redux: ^7.0.2
   - style-loader: ^2.0.0

---

## License

MIT © LOCKDOWN

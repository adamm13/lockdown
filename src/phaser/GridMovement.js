// /* ------------------ Grid Movement Class ------------------ */

// class GridPhysics {

//   //// Class Variables
//   movementDirectionVectors = {
//     "left": Phaser.Math.Vector2.LEFT, 
//     "right": Phaser.Math.Vector2.RIGHT,
//     "up": Phaser.Math.Vector2.UP,
//     "down": Phaser.Math.Vector2.DOWN
//   };

//   movementDirection = "none";

//   speedPixelsPerSecond = gameTileSize * 4; 
//   // tiles are 32 pixels, travelling this speed should move the player 4 tiles/second
//   tileSizePixelsWalked = 0; 

//   lastMovementIntent = "none";

//   constructor(player, tileMap) {}

//   ///// Class Methods
//   movePlayer(direction) {
//     this.lastMovementIntent = direction;
//     if (this.isMoving()) return; 
//     if (this.isBlockingDirection(direction)) {
//       this.player.stopAnimation(direction);
//     } else {
//       this.startMoving(direction);
//     }
//   }

//   update(delta) {
//     if (this.isMoving()) {
//       this.updatePlayerPosition(delta);
//     }
//     this.lastMovementIntent = "none";
//   }

//   isMoving() {
//     return this.movementDirection !== "none";
//   }

//   startMoving(direction) {
//     this.player.startAnimation(direction);
//     this.movementDirection = direction;
//     this.updatePlayerTilePos();
//   }

//   updatePlayerPosition(delta) {
//     const pixelsToWalkThisUpdate = getPixelsToWalkThisUpdate(delta);

//     if (!this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
//       this.movePlayerSprite(pixelsToWalkThisUpdate);
//     } else if (this.shouldContinueMoving()) {
//       this.movePlayerSprite(pixelsToWalkThisUpdate);
//       this.updatePlayerTilePos();
//     } else {
//       this.movePlayerSprite(gameTileSize - this.tileSizePixelsWalked);
//       this.stopMoving();
//     }
//   }

//   updatePlayerTilePos() {
//     this.player.setTilePos(
//         this.player
//         .getTilePos()
//         .add(this.movementDirectionVectors[this.movementDirection])
//     );
//   }

//   movePlayerSprite(pixelsToMove) {
//     const directionVec = this.movementDirectionVectors[this.movementDirection].clone();
//     const movementDistance = directionVec.multiply(new Phaser.Math.Vector2(pixelsToMove));
//     const newPlayerPos = this.player.getPosition().add(movementDistance);
//     this.player.setPosition(newPlayerPos);

//     this.tileSizePixelsWalked += pixelsToMove;
//     this.tileSizePixelsWalked %= gameTileSize;
//     // a %= b, is the same as, a = a % b
//   }

//   getPixelsToWalkThisUpdate(delta) {
//     // delta is time, in ms, since the last game step/update. This is an average value.
//     const deltaInSeconds = delta / 1000; 
//     return this.speedPixelsPerSecond * deltaInSeconds;
//   }

//   stopMoving() {
//     this.player.stopAnimation(this.movementDirection);
//     this.movementDirection = "none";
//   }

//   willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate) {
//     return (this.tileSizePixelsWalked + pixelsToWalkThisUpdate >= gameTileSize);
//   }

//   shouldContinueMoving() {
//     return (this.movementDirection === this.lastMovementIntent &&
//       !this.isBlockingDirection(this.lastMovementIntent)
//     );
//   }

//   isBlockingDirection(direction) {
//     // returns a boolean
//     return this.hasBlockingTile(this.tilePosInDirection(direction));
//   }

//   tilePosInDirection(direction) {
//     // returns a Vector2
//     return this.player.getTilePos()
//                       .add(this.movementDirectionVectors[direction]);
//   }

//   hasBlockingTile(pos) {
//     // returns a boolean
//     if (this.hasNoTile(pos)) return true;
//     return this.tileMap.layers.some((layer) => {
//       const tile = this.tileMap.getTileAt(pos.x, pos.y, false, layer.name);
//       return tile && tile.properties.collides;
//     });
//   }

//   hasNoTile(pos) {
//     // returns a boolean
//     return !this.tileMap.layers.some((layer) => {
//       this.tileMap.hasTileAt(pos.x, pos.y, layer.name);
//     });
//   }

// }

// /* ------------------ GridControls Class ---------------------- */

// class GridControls {
  
//   constructor(input, gridPhysics) {}

//   // From Example
//   // update() {
//   //   const cursors = this.input.keyboard.createCursorKeys();
//   //   if (cursors.left.isDown) {
//   //     this.gridPhysics.movePlayer(Direction.LEFT);
//   //   } else if (cursors.right.isDown) {
//   //     this.gridPhysics.movePlayer(Direction.RIGHT);
//   //   } else if (cursors.up.isDown) {
//   //     this.gridPhysics.movePlayer(Direction.UP);
//   //   } else if (cursors.down.isDown) {
//   //     this.gridPhysics.movePlayer(Direction.DOWN);
//   //   }
//   // }
// }
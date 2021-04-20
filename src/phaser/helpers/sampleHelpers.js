import sceneEvents from "../SceneEvents";

const createSamples = (sampleObjs, scene) => {
  const numOfSamples = sampleObjs.length;
    // Create samples
    const samples = scene.physics.add.staticGroup({
      key: 'samples',
      frameQuantity: numOfSamples,
      immovable: true
    });
    // Distribute samples over map
    samples.getChildren().forEach((sample, i) => {
      let x = sampleObjs[i].x;
      let y = sampleObjs[i].y;
      sample.setScale(0.8);
      sample.setPosition(x, y);
    });

    return samples;
};

const sampleCollector = (player, sample, thisScene) => {
    thisScene.samplesTouched = true
    const sampleLocations = thisScene.sampleObjs; // aka this.sampleObjs

    // hide sprite, disable body
    thisScene.samples.killAndHide(sample);
    sample.body.enable = false;

    // update sample locations - to be put into React component!?
    const sampleIndex = thisScene.samples.getChildren().indexOf(sample); 
    const newSampleForPlayer = thisScene.samples.getChildren().splice(sampleIndex, 1)[0]; // grab this object 
    sampleLocations.splice(sampleIndex, 1);

    // Add the collected item obj to the player inv
    player.gameData.inventory.push(newSampleForPlayer);

    //emit event to update inventory icon
    sceneEvents.emit('sample-collected', player.gameData.inventory);

    // cut to BossUnlock Scene when all samples are gathered
    if (player.gameData.inventory.length === 36) {
      thisScene.scene.start("BossUnlock", player.gameData);
      thisScene.scene.stop(thisScene.scene.key);
    }
};

module.exports = { createSamples, sampleCollector };
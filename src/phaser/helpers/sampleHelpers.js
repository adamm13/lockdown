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

const sampleCollector = (player, sample, scene) => {
    scene.samplesTouched = true
    const sampleLocations = scene.sampleObjs; // aka this.sampleObjs

    // hide sprite, disable body
    scene.samples.killAndHide(sample);
    sample.body.enable = false;

    // update sample locations - to be put into React component!?
    const sampleIndex = scene.samples.getChildren().indexOf(sample); 
    const newSampleForPlayer = scene.samples.getChildren().splice(sampleIndex, 1)[0]; // grab this object 
    sampleLocations.splice(sampleIndex, 1);

    // Add the collected item obj to the player inv
    player.gameData.inventory.push(newSampleForPlayer);
    console.log(player.gameData.inventory);

    //emit event to update inventory icon
    sceneEvents.emit('sample-collected', player.gameData.inventory);
};

module.exports = { createSamples, sampleCollector };
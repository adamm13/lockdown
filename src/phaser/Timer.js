import Phaser from 'phaser';


export default class Timer {
    let timerEvent;
    constructor(scene, timeDisplay){
        this.scene = scene
        this.timeDisplay = timeDisplay
    }
    const totalTime = 600000
    timerDuration(totalTime){
        this.timerEvent = this.scene.time.addEvent({delay: totalTime})
    }

    update(){
        const playTime = this.timerEvent.getElapsed();
        const remainingTime = (this.totalTime - playTime) / 1000;

        this.timeDisplay.text = remainingTime;
    }
}
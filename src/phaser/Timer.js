import Phaser from 'phaser';

let timerEvent;
let totalTime;

export default class Timer {
    constructor(scene, timeDisplay){
        this.scene = scene
        this.timeDisplay = timeDisplay
    }
    totalTime = 600000
    timerDuration(totalTime){
        this.timerEvent = this.scene.time.addEvent({delay: totalTime})
    }

    update(){
        const playTime = this.timerEvent.getElapsed();
        const remainingTime = (this.totalTime - playTime) / 1000;

        this.timeDisplay.text = remainingTime;
    }
}
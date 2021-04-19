import Phaser from 'phaser';
import { gameOver } from './helpers/dataHelpers.js';

let timerEvent;
let totalTime;

export default class Timer {
    constructor(scene, timeDisplay){
        this.scene = scene
        this.timeDisplay = timeDisplay
    }
    totalTime = 20000
    timerDuration(totalTime){
        this.timerEvent = this.scene.time.addEvent({delay: totalTime})
    }

    update(scene, player){
        const playTime = this.timerEvent.getElapsed();
        const remainingTime = Math.floor((this.totalTime - playTime) / 1000);
        let minutes;
        let seconds;
        if (remainingTime / 60 < 10){
            minutes = '0' + Math.floor(remainingTime/60);
        } else {
            minutes = Math.floor(remainingTime/60);
        }

        if(remainingTime % 60 < 10){
            seconds = '0' + (remainingTime % 60);
        } else {
            seconds = remainingTime % 60;
        }
        if (remainingTime === 0){
            gameOver(player, scene);
        }
        this.timeDisplay.text = minutes + ':' + seconds;
    }
}
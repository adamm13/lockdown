import Phaser from 'phaser';
import sceneEvents from './SceneEvents';

let timerEvent;
let totalTime;

export default class Timer extends Phaser.Scene{
    constructor(){
        super({key: 'Timer'})
    }
    init(data) {
    }

    create(){
        this.totalTime = 300000;
        this.timerEvent = this.time.addEvent({delay: this.totalTime});
    }

    update(){
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
            sceneEvents.emit('timerOver');
        }
        const time = minutes + ':' + seconds;
        let danger;
        if (minutes === '00'){
            danger = true;
        }
        sceneEvents.emit('timer', time, danger);
    }
}
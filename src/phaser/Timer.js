import Phaser from 'phaser';
import { gameOver } from './helpers/dataHelpers.js';

let timerEvent;
let totalTime;

export default class Timer extends Phaser.Scene{
    constructor(){
        super({key: 'Timer'})
    }
    init(data) {
        //console.log(data);
    }

    preload() 
    {
      this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }


    create(){
        //load the google font
        WebFont.load({
            google: {
                families: [ 'VT323' ]
            }
        });

        this.timeDisplay = this.add.text(20, 75, 600000, {fontSize: 25, fontFamily: 'VT323'});
        this.totalTime = 600000;
        this.timerEvent = this.time.addEvent({delay: this.totalTime});
    }
    // timerDuration(totalTime){
    //     this.timerEvent = this.scene.time.addEvent({delay: totalTime});
    // }

    update(){
        const playTime = this.timerEvent.getElapsed();
        const remainingTime = Math.floor((this.totalTime - playTime) / 1000);
        //console.log(remainingTime);
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
            gameOver(this);
        }
        this.timeDisplay.text = minutes + ':' + seconds;
    }
}
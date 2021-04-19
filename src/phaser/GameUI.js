import Phaser from 'phaser';
import sceneEvents from "./SceneEvents";
import Timer from './Timer';

let count = 0;
let hearts;
let inventoryDisplay;

export default class GameUI extends Phaser.Scene {

    constructor(){
        super({key: 'GameUI'})
    }

    init(data) {
        //console.log(data);
    }

    preload() 
    {
      this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    
    create({data, player}){
        //load the google font
        WebFont.load({
            google: {
                families: [ 'VT323' ]
            }
        });
        this.player = player;
        console.log(player);
        //create game timer
        
        const timeDisplay = this.add.text(20, 75, 600, {fontSize: 25, fontFamily: 'VT323'});
        this.timer = new Timer(this, timeDisplay);
        this.timer.timerDuration(20000);

        this.hearts = this.add.group()

        this.hearts.createMultiple({
            key: 'full-heart',
            quantity: 5,
            setXY: {
                x: 20,
                y: 20,
                stepX: 30
            }
        })

        this.updateHealth(data.health ? data.health : 500);

        //event listener for zombie attack
        sceneEvents.on('zombieHit', (playerHealth) => {
            this.updateHealth(playerHealth);
        })

        // inventory sample display
        const inventory = this.add.group()

        inventory.createMultiple({
            key: 'samples',
            quantity: 1,
            setXY: {
                x: 17,
                y: 55
            }
        })

        if (data.inventory){
            inventoryDisplay = this.add.text(35, 40, ': ' + data.inventory.length + '/36', {fontSize: 25, fontFamily: 'VT323'});
        } else {
            inventoryDisplay = this.add.text(35, 40, ': ' + 0, {fontSize: 25, fontFamily: 'VT323'});
        }
        //event listener for when sample is collected
        sceneEvents.on('sample-collected', (playerInventory) => {
            this.updateInventory(playerInventory.length);
        })
    }

    updateInventory(playerInventory){
        inventoryDisplay.setText(': ' + playerInventory + '/36');
    }

    updateHealth(playerHealth) {
        const fullHeartsToRender = Math.floor((playerHealth / 500) * 5);
        const abovePointFive = playerHealth / 100; 

        this.hearts.children.each((individualHeart, index)=> {
            const heart = individualHeart;
            if (index < fullHeartsToRender){
                heart.setTexture('full-heart');
            } else if (abovePointFive >= index + 0.5){
                heart.setTexture('half-heart').setScale(2); 
            } 
            else {    
                heart.setTexture('empty-heart').setScale(1);
            }   
        })
    
    }

    update(){
        this.timer.update(this, this.player);
    }
}
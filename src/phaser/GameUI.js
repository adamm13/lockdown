import Phaser from 'phaser';
import sceneEvents from "./SceneEvents";

let count = 0;
let inventoryDisplay;
let hearts;

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
    
    create(data){
        //load the google font
        // WebFont.load({
        //     google: {
        //         families: ['Press Start 2P']
        //     }
        //     //   active: function(){
        //     //       console.log(data.inventory)
        //     //     if (data.inventory){
        //     //         inventoryDisplay = this.add.text(35, 50, ': ' + data.inventory.length + '/36', {fontFamily: 'Press Start 2P', fontSize: 100})
        //     //     } 
        //     //     else {
        //     //         inventoryDisplay = this.add.text(35, 50, ': ' + 0, {fontFamily: 'Press Start 2P', fontSize: 100});
        //     //     }
        //     //   },
        //   })

        let add = this.add;

        WebFont.load({
            google: {
                families: [ 'VT323' ]
            },
            active: function (){
                if (data.inventory){
                    add.text(35, 40, ': ' + data.inventory.length + '/36', {fontSize: 25, fontFamily: 'VT323'})
                } else {
                    add.text(35, 40, ': ' + 0, {fontSize: 25, fontFamily: 'VT323'});
                }
            }
        });
    

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
        // inventory sample display
        const inventory = add.group()

        inventory.createMultiple({
            key: 'samples',
            quantity: 1,
            setXY: {
                x: 17,
                y: 55
            }
        })

        //event listener for when sample is collected
        sceneEvents.on('sample-collected', (playerInventory) => {
            this.updateInventory(playerInventory.length);
        })

        this.updateHealth(data.health ? data.health : 500);

        //event listener for zombie attack
        sceneEvents.on('zombieHit', (playerHealth) => {
            this.updateHealth(playerHealth);
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
}
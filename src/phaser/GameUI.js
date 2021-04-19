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

        WebFont.load({
            google: {
                families: [ 'Press Start 2P' ]
            }
            // active: function ()
            // {
            //     this.add.text(16, 0, 'The face of the\nmoon was in\nshadow.', { fontFamily: 'Freckle Face', fontSize: 80, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
            //     this.add.text(250, 450, 'Waves flung themselves\nat the blue evening.', { fontFamily: 'Finger Paint', fontSize: 40, color: '#5656ee' });

            // }
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

        this.updateHealth(data.health ? data.health : 500);

        const inventory = this.add.group()

        inventory.createMultiple({
            key: 'samples',
            quantity: 1,
            setXY: {
                x: 17,
                y: 55
            }
        })

        //ui for inventory
        if (data.inventory){
            inventoryDisplay = this.add.text(35, 50, ': ' + data.inventory.length + '/36', {fontSize: 30, fontFamily: 'Press Start 2P'})
        } else {
            inventoryDisplay = this.add.text(35, 50, ': ' + 0, {fontSize: 30, fontFamily: 'Press Start 2P'});
        }
        //event listener for when sample is collected
        sceneEvents.on('sample-collected', (playerInventory) => {
            this.updateInventory(playerInventory.length);
        })
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
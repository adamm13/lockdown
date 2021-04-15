import Phaser from 'phaser';
import sceneEvents from "./SceneEvents";

let count = 0;
let inventoryDisplay;

export default class GameUI extends Phaser.Scene {
    
    constructor(){
        super({key: 'GameUI'})
    }

    init(data) {
        console.log(data);
    }


    create(data){
        const hearts = this.add.group()

        hearts.createMultiple({
            key: 'full-heart',
            quantity: 5,
            setXY: {
                x: 20,
                y: 20,
                stepX: 30
            }
        })
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
            inventoryDisplay = this.add.text(35, 50, ': ' + data.inventory.length)
        } else {
            inventoryDisplay = this.add.text(35, 50, ': ' + 0);
        }
        //event listener for when sample is collected
        sceneEvents.on('sample-collected', (playerInventory) => {
            console.log('sample collected!')
            this.updateInventory(playerInventory.length);

        })

        //event listener for zombie attack
        sceneEvents.on('zombieHit', () => {
            console.log('zombie attack!!');
            console.log(hearts);
        })
    }

    updateInventory(playerInventory){
        inventoryDisplay.setText(': ' + playerInventory);
    }

    updateHealth(playerHealth){
        if (playerHealth >= 450){

        } else if (playerHealth >= 400 && playerHealth < 450){

        } else if (playerHealth >= 350 && playerHealth < 400){
            
        } else if (playerHealth >= 300 && playerHealth < 350){
            
        } else if (playerHealth >= 250 && playerHealth < 300){
            
        } else if (playerHealth >= 200 && playerHealth < 250){
            
        } else if (playerHealth >= 150 && playerHealth < 200){
            
        } else if (playerHealth >= 100 && playerHealth < 150){
            
        } else if (playerHealth >= 50 && playerHealth < 100){
            
        } else if (playerHealth >= 0 && playerHealth < 50){
            
        } 
    
    }
}
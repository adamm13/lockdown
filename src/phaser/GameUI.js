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
        console.log(data);
    }

    create(data){
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
        sceneEvents.on('zombieHit', (playerHealth) => {
            console.log(playerHealth);
            console.log('zombie attack!!');
            this.updateHealth(playerHealth);
        })
    }

    updateInventory(playerInventory){
        inventoryDisplay.setText(': ' + playerInventory);
    }

    updateHealth(playerHealth){
        this.hearts.children.each((individualHeart, index)=> {
            const heart = individualHeart;
            if (index < playerHealth){
                heart.setTexture('full-heart');
            } 
            //will look into half hearts when collisions aren't so chaotic
            // else if (playerHealth === index + 0.5){
            //     heart.setTexture('half-heart');
            // } 
            else {    
                heart.setTexture('empty-heart');
            }
        })
    
    }
}
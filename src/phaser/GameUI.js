import Phaser from 'phaser';

export default class GameUI extends Phaser.Scene {
    constructor(){
        super({key: 'GameUI'})
    }

    create(){
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
                x: 20,
                y: 55
            }
        })
    }
}
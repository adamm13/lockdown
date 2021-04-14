import Phaser from 'phaser';

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
        let count;
        if (data.inventory){
            console.log(data.inventory.length)
            let count = this.add.text(35, 50, data.inventory.length)       
        }else {
            count = this.add.text(35, 50, '0');
        }
    }

    update(data){
       
    }
}
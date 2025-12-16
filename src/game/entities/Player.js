import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "player");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(false);
        this.speed = 125;
        this.jumpForce = 200;

        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update(){
        if(this.cursors.left.isDown){
            this.setVelocityX(-this.speed);
        }else if(this.cursors.right.isDown){
            this.setVelocityX(this.speed);
        }else{
            this.setVelocityX(0);
        }

        if(this.cursors.up.isDown && this.body.blocked.down){
            this.setVelocityY(-this.jumpForce);
        }
    }
}
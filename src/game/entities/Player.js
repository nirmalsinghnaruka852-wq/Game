import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "player");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5, 1);
        this.body.setSize(20, 28);
        this.body.setOffset(
            (64 - 20) / 2,
            64 - 40
        );

        this.setCollideWorldBounds(false);
        this.speed = 125;
        this.jumpForce = 200;



        this.cursors = scene.input.keyboard.createCursorKeys();

        this.state = "idle";

    }

    setState(newState) {
        if (this.state === newState) return;
        this.state = newState;
        this.play(newState, true);
    }
    
    
    

    update(){

        
        const onGround = this.body.blocked.down || this.body.touching.down;;

        if(this.cursors.left.isDown){
            this.setVelocityX(-this.speed);
            this.setFlipX(true);
        }else if(this.cursors.right.isDown){
            this.setVelocityX(this.speed);
            this.setFlipX(false);
        }else{
            this.setVelocityX(0);
        }

        if (onGround) {
            this.setVelocityY(0);
        }
        

        if(this.cursors.up.isDown && onGround){
            this.setVelocityY(-this.jumpForce);
        }

        if (!onGround) {
            this.setState("jump");
        } 
        else if (this.body.velocity.x !== 0) {
            this.setState("run");
        } 
        else {
            this.setState("idle");
        }
    }
}
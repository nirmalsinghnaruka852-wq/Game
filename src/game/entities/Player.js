import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "playerIdle");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.ingate = false;
        this.setOrigin(1, 1);
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
    
    hideFromGate(gate, duration) {
        const maskWidth = gate.displayWidth;
        const maskHeight = gate.displayHeight;
    
        const maskRect = this.scene.add.rectangle(
            gate.x,                     
            gate.y - maskHeight/2 + 15,    
            maskWidth,
            maskHeight/4,
            0x000000
        ).setOrigin(0.5, 0);
    
        const mask = maskRect.createGeometryMask();
        this.setMask(mask);
    
        
        this.scene.events.on("update", () => {
            maskRect.x = gate.x;
            maskRect.y = maskRect.y; 
        });
    
        this.scene.tweens.add({
            targets: maskRect,
            y: gate.y + maskHeight / 2,              
            duration,
            ease: "Linear",
            onComplete: () => {
                maskRect.destroy();
                this.clearMask(true);
                this.setVisible(false);
            }
        });
    }
    
    
    

    update(){

        if(this.ingate) return;
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
            this.setScale(0.75,0.75);
        } 
        else if (this.body.velocity.x !== 0) {
            this.setState("run");
            
        } 
        else {
            this.setState("idle");
            this.setScale(0.75,0.75);
        }
    }
    
}
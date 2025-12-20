import Phaser from "phaser";
import Player from "../entities/Player";

export default class BaseLevel extends Phaser.Scene{
   constructor(key, mapKey){
        super(key);
        this.mapKey = mapKey
    }

    create(){
        this.map = this.make.tilemap({key: this.mapKey});
        this.tileset = this.map.addTilesetImage("tileset", "tiles");
        const trapLayer = this.map.getObjectLayer("trapTriggers");
        this.trapObjects = trapLayer ? trapLayer.objects : [];

        
        this.enteredGate = false;
        
        this.objectLayer = this.map.getObjectLayer("objects");
        if (!this.objectLayer) {
            console.error("Missing object layer: objects in", this.mapKey);
            return;
        }
        
        const bgLayerData = this.map.getLayer("background");
        this.backgroundLayer = bgLayerData ? this.map.createLayer("background", this.tileset, 0, 0) : null;

        const groundLayerData = this.map.getLayer("ground");
        this.groundLayer = groundLayerData ? this.map.createLayer("ground", this.tileset, 0, 0) : null;

        if (this.groundLayer) {
            this.groundLayer.setCollisionByProperty({ collides: true });
        } else {
            console.warn("Level", this.mapKey, "has no ground layer!");
        }

        this.playerSpwaner = this.objectLayer.objects?.find(ob => ob.name === "playerSpawner");
        if (!this.playerSpwaner) {
            console.error("playerSpawner not found in object layer for", this.mapKey);
            return;
        }

        this.gate = this.objectLayer.objects?.find(ob => ob.name === "gate");

        
        this.gateIdle = this.physics.add.staticSprite(this.gate.x + this.gate.width / 2, this.gate.y - this.gate.height / 2, "gateIdle");
        this.gateIdle.setScale(0.04);
        this.gateIdle.refreshBody();
        
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        
        this.player = new Player(this, this.playerSpwaner.x, this.playerSpwaner.y);
        this.physics.add.collider(this.player, this.groundLayer);
       
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        
        this.physics.add.overlap(this.player, this.gateIdle, this.onEnterGate, null, this);
    
    }

    onEnterGate(player, gateIdle){
        if(this.enteredGate) return;
        this.enteredGate = true;
        player.ingate = true;
        player.play("idle", true);
        player.setVelocity(0, 0);
        player.body.moves = false;
        player.setPosition(this.gateIdle.x, this.player.y);
        gateIdle.play("gateClose");

        const onFrame = (anim, frame) => {
            if (anim.key !== "gateClose") return;
    
            if (frame.index === 4) {
    
                const animData = this.gateIdle.anims.currentAnim;
    
                const remainingFrames =
                    animData.frames.length - frame.index;
    
                const duration =
                    remainingFrames * animData.msPerFrame;
    
                this.player.hideFromGate(gateIdle, duration * 2);
    
                this.gateIdle.off(
                    Phaser.Animations.Events.ANIMATION_UPDATE,
                    onFrame
                );
            }
        };
    
        this.gateIdle.on(
            Phaser.Animations.Events.ANIMATION_UPDATE,
            onFrame
        );

        gateIdle.once(
            Phaser.Animations.Events.ANIMATION_COMPLETE,
            () => {
                this.scene.start(this.nextLevelKey);
            }
        );
    }

    update(time, delta){
        this.player.update();
    }
}



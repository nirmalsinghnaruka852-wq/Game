import Phaser from "phaser";
import Player from "../entities/Player";
import MovingGapTrap from "../Traps/movingGap";

export default class Level1 extends Phaser.Scene{
    constructor(){
        super("Level1");
    }

    create(){
        const map = this.make.tilemap({key: "Level1"});
        const tileset = map.addTilesetImage("tileset", "tiles");
        const trapObjects = map.getObjectLayer("trapTriggers").objects;
        this.objectLayer = map.getObjectLayer("Object");        
        this.backgroundLayer = map.createLayer("background", tileset, 0, 0);
        this.groundLayer = map.createLayer("ground", tileset, 0, 0);
        this.groundLayerLeft = map.createLayer("groundLeft", tileset, 0, 0);
        this.groundLayerRight = map.createLayer("groundRight", tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({collides : true});
        this.groundLayerLeft.setCollisionByProperty({collides : true});
        this.groundLayerRight.setCollisionByProperty({collides : true});
        
        this.playerSpwaner = this.objectLayer.objects?.find(ob => ob.name === "playerSpawner");




        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.player = new Player(this, this.playerSpwaner.x, this.playerSpwaner.y);
        
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.player, this.groundLayerLeft);
        this.physics.add.collider(this.player, this.groundLayerRight);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        
    
        
        trapObjects.forEach(obj => {
        if (obj.properties?.find(p => p.name === "Type")?.value === "movingGap") {
            this.movingGapTrap = new MovingGapTrap(
            this,
            this.player,
            this.groundLayerLeft,
            this.groundLayerRight,
            obj
            );
        }
        });
    }
    update(time,delta){
        this.player.update();
        if(this.movingGapTrap){
            this.movingGapTrap?.update(delta);
        }
    }
}
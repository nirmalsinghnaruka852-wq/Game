import Phaser from "phaser";
import Player from "../entities/Player";
import MovingGapTrap from "../Traps/movingGap";
import level1 from "./leveldata/level1.json";
import BaseLeve from "./baseLevel";


export default class Level1 extends BaseLeve{
    constructor(){
        super("Level1", "Level1");
        this.nextLevelKey = "Level2";
    }

    preload(){
        this.load.tilemapTiledJSON("Level1",level1);
    }

    create(){
        super.create();
        this.groundLayerLeft = this.map.createLayer("groundLeft", this.tileset, 0, 0);
        this.groundLayerRight = this.map.createLayer("groundRight", this.tileset, 0, 0);
        
        this.groundLayerLeft.setCollisionByProperty({collides : true});
        this.groundLayerRight.setCollisionByProperty({collides : true});
        
        
        this.physics.add.collider(this.player, this.groundLayerLeft);
        this.physics.add.collider(this.player, this.groundLayerRight);
        
        
        this.trapObjects.forEach(obj => {
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
        super.update(time, delta);
        if(this.movingGapTrap){
            this.movingGapTrap?.update(delta);
        }
    }
}
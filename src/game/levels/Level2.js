import level2 from "./leveldata/level2.json";
import BaseLevel from "./baseLevel";
import MovingGroundDown from "../Traps/moveGroundDown";

export default class Level2 extends BaseLevel{
    constructor(){
        super("Level2", "Level2");
        this.nextLevelKey = "Level1";
    }

    preload(){
        this.load.tilemapTiledJSON("Level2", level2);
    }

    create(){
        super.create();
        this.moveGroundDownFirstLayer = this.map.createLayer("groundFirstDown", this.tileset, 0, 0);
        this.moveGroundDownSecondLayer = this.map.createLayer("groundSecondDown", this.tileset, 0, 0);
        this.moveGroundDownFirstLayer.setCollisionByProperty({collides: true})
        this.moveGroundDownSecondLayer.setCollisionByProperty({collides: true})

        this.physics.add.collider(this.player, this.moveGroundDownFirstLayer);
        this.physics.add.collider(this.player, this.moveGroundDownSecondLayer);
        
        this.moveGroundTraps =[];
        this.trapObjects.forEach(ob =>{
            const FS = Phaser.Math.Between(1, 100);
            const type = ob.properties?.find(p => p.name == "Type")?.value;
            if( type === "moveingGroundDownFirst" && (FS <= 40  || FS >= 80)){
                this.moveGroundTraps.push( new MovingGroundDown(
                    this,
                    this.player,
                    this.moveGroundDownFirstLayer,
                    ob
                ));
            }else{
                this.moveGroundTraps.push(null);
            }
            if( type === "moveingGroundDownSecond" && ( FS >= 40  &&  FS <= 80 )){
                this.moveGroundTraps.push( new MovingGroundDown(
                    this,
                    this.player,
                    this.moveGroundDownSecondLayer,
                    ob
                ));
            }else{
                this.moveGroundTraps.push(null);}
            console.log("RandomNumber : ", FS, " First Trap : ", this.moveGroundTraps[0], "Second Trap: ", this.moveGroundTraps[1]);
        });
    }

    update(time, delta){
        super.update(time, delta);
        this.moveGroundTraps.forEach(traps =>{
            if(traps) traps.update(delta);
        }
        )
    }
}

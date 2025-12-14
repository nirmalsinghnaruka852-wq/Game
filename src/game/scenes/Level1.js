import Phaser from "phaser";
import Player from "../entities/Player";

export default class Level1 extends Phaser.Scene{
    constructor(){
        super("Level1");
    }

    create(){
        const map = this.make.tilemap({key: "Level1"});
        const tileset = map.addTilesetImage("tileset", "tiles");
        
        this.backgroundLayer = map.createLayer("background", tileset, 0, 0);
        this.groundLayer = map.createLayer("ground", tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({collides : true});
        
//         this.physics.world.createDebugGraphic();
// this.groundLayer.renderDebug(this.add.graphics(), {
//     tileColor: null,
//     collidingTileColor: new Phaser.Display.Color(255, 0, 0, 150)
// });


        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.player = new Player(this, 250, 300);
        this.physics.add.collider(this.player, this.groundLayer);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        
    }
    update(){
        this.player.update();
    }
}
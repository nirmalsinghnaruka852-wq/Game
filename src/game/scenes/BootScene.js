import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
    constructor(){
        super("BootScene");
    }
    preload(){
        this.load.tilemapTiledJSON("Level1","/assets/level1.json");
        this.load.image("tiles", "/assets/tileset.png");
        this.load.image("player", "/assets/player.png");
    }

    create(){
        this.scene.start("Level1");
    }
}
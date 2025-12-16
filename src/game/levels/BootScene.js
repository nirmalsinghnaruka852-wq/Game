import Phaser from "phaser";
import {playerIdle, playerRun, playerJump, TileSet} from "../../assets";
import Level1 from "./leveldata/level1.json";

export default class BootScene extends Phaser.Scene {
    constructor(){
        super("BootScene");
    }
    preload(){
        this.load.tilemapTiledJSON("Level1",Level1);
        this.load.image("tiles", TileSet);
        this.load.spritesheet("playerIdle", playerIdle, {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("playerRun", playerRun, {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("playerJump", playerJump, {frameWidth: 64, frameHeight: 64});
    }

    create(){

        if (!this.anims.exists("idle")) {

            this.anims.create({
                key: "idle",
                frames: this.anims.generateFrameNumbers("playerIdle", {
                    start: 0,
                    end: 3
                }),
                frameRate: 6,
                repeat: -1
            });
    
            this.anims.create({
                key: "run",
                frames: this.anims.generateFrameNumbers("playerRun", {
                    start: 0,
                    end: 7
                }),
                frameRate: 10,
                repeat: -1
            });
    
            this.anims.create({
                key: "jump",
                frames: this.anims.generateFrameNumbers("playerJump", {
                    start: 0,
                    end: 14
                }),
                frameRate: 6
            });
        }

        this.scene.start("Level1");
    }
}
import Phaser from "phaser";
import {  Player ,TileSet } from "../../assets";
import Level1 from "./leveldata/level1.json";

export default class BootScene extends Phaser.Scene {
    constructor(){
        super("BootScene");
    }
    preload(){
        this.load.tilemapTiledJSON("Level1",Level1);
        this.load.image("tiles", TileSet);
        this.load.image("player", Player);
    }

    create(){
        this.scene.start("Level1");
    }
}
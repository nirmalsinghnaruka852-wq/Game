import Phaser from "phaser";
import BootScene from '../game/levels/BootScene.js'
import Level1 from '../game/levels/Level1.js';
import Level2 from "../game/levels/Level2.js";

const winSize = {
    width: 1024,
    height: 800
}
const config = {
    type: Phaser.AUTO,
    width: winSize.width,
    height: winSize.height,
    parent: "phaser-game",
    scale: {
        mode: Phaser.Scale.FIT,        
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    physics: {
        default : "arcade",
        arcade : {
            gravity:{y: 500},
            debug: false
        }
    },
    scene: [BootScene, Level1, Level2]
};

export default config;
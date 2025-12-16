import Phaser from "phaser";
import BootScene from '../game/levels/BootScene.js'
import Level1 from '../game/levels/Level1.js';
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
        mode: Phaser.Scale.FIT,        // 🔥 RESPONSIVE
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    physics: {
        default : "arcade",
        arcade : {
            gravity:{y: 500},
            debug: false
        }
    },
    scene: [BootScene, Level1]
};

export default config;
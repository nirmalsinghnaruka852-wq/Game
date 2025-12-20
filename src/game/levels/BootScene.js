import Phaser from "phaser";
import {
  playerIdle,
  playerRun,
  playerJump,
  TileSet,
  gateIdle,
  gateClose,
} from "../../assets";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }
  preload() {
    this.load.image("tiles", TileSet);
    this.load.spritesheet("playerIdle", playerIdle, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("playerRun", playerRun, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("playerJump", playerJump, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("gateIdle", gateIdle, {
      frameWidth: 1024,
      frameHeight: 1280,
    });
    this.load.spritesheet("gateClose", gateClose, {
      frameWidth: 1024,
      frameHeight: 1280,
    });
  }

  create() {
    if (!this.anims.exists("gateClose")) {
      this.anims.create({
        key: "gateClose",
        frames: this.anims.generateFrameNumbers("gateClose", {
          start: 0,
          end: 7,
        }),
        frameRate: 6,
      });
    }

    if (!this.anims.exists("idle")) {
      this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("playerIdle", {
          start: 0,
          end: 3,
        }),
        frameRate: 6,
        repeat: -1,
      });

      this.anims.create({
        key: "run",
        frames: this.anims.generateFrameNumbers("playerRun", {
          start: 0,
          end: 7,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNumbers("playerJump", {
          start: 0,
          end: 14,
        }),
        frameRate: 6,
      });
      this.anims.create({
        key: "jumpStart",
        frames: this.anims.generateFrameNumbers("playerJump", {
          start: 0,
          end: 5,
        }),
        frameRate: 10,
      });
    }

    this.scene.start("Level1");
  }
}

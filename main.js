import Phaser from "https://esm.sh/phaser@3.70.0";
import { BootScene } from "./scenes/BootScene.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { GameScene } from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  parent: "game-root",
  backgroundColor: "#0b1020",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  scene: [BootScene, MenuScene, GameScene],
};

new Phaser.Game(config);

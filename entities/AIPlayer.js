import Phaser from "https://esm.sh/phaser@3.70.0";
import { Player } from "./Player.js";

export class AIPlayer extends Player {
  constructor(scene, x, y, color) {
    super(scene, x, y, color, "right");
    this.decisionDelay = 0;
    this.reactionX = 0;
  }

  think(shuttlecock, time) {
    if (time > this.decisionDelay) {
      this.reactionX = Phaser.Math.Between(-12, 12);
      this.decisionDelay = time + Phaser.Math.Between(50, 140);
    }

    const targetX = shuttlecock.x + this.reactionX;
    const dx = targetX - this.x;

    if (Math.abs(dx) > 12) {
      this.move(Math.sign(dx));
    } else {
      this.stop();
    }

    if (
      shuttlecock.y < this.y - 20 &&
      Math.abs(shuttlecock.x - this.x) < 120 &&
      this.body.blocked.down
    ) {
      this.jump();
    }

    const dist = Phaser.Math.Distance.Between(this.x, this.y - 18, shuttlecock.x, shuttlecock.y);
    if (dist < 70) {
      this.hit(shuttlecock, time);
    }
  }
}

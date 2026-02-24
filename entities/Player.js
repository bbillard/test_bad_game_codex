import Phaser from "https://esm.sh/phaser@3.70.0";
export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, color, side = "left") {
    const textureKey = `player-${color.toString(16)}`;
    if (!scene.textures.exists(textureKey)) {
      const g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(color, 1);
      g.fillRoundedRect(0, 0, 34, 68, 9);
      g.generateTexture(textureKey, 34, 68);
      g.destroy();
    }

    super(scene, x, y, textureKey);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.side = side;
    this.racketCooldown = 0;
    this.moveSpeed = 200;
    this.jumpVelocity = -300;
    this.hitImpulseX = 220;
    this.hitImpulseY = -260;

    this.setCollideWorldBounds(true);
    this.setBounce(0);
    this.body.setSize(30, 68);
    this.body.setOffset(2, 0);
  }

  move(direction) {
    this.setVelocityX(direction * this.moveSpeed);
  }

  stop() {
    this.setVelocityX(0);
  }

  jump() {
    if (this.body.blocked.down) {
      this.setVelocityY(this.jumpVelocity);
    }
  }

  canHit(time) {
    return time >= this.racketCooldown;
  }

  hit(shuttlecock, time) {
    if (!this.canHit(time)) {
      return false;
    }

    const dir = this.side === "left" ? 1 : -1;
    shuttlecock.setVelocity(
      this.hitImpulseX * dir + this.body.velocity.x * 0.4,
      this.hitImpulseY,
    );
    shuttlecock.lastHitter = this.side;
    this.racketCooldown = time + 210;
    return true;
  }
}

import Phaser from "https://esm.sh/phaser@3.70.0";
export class Shuttlecock extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, color) {
    const textureKey = "shuttlecock";
    if (!scene.textures.exists(textureKey)) {
      const g = scene.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(color, 1);
      g.fillEllipse(8, 8, 16, 12);
      g.fillStyle(0xffffff, 0.9);
      g.fillTriangle(8, 0, 2, 12, 14, 12);
      g.generateTexture(textureKey, 16, 16);
      g.destroy();
    }

    super(scene, x, y, textureKey);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.lastHitter = "left";

    this.setCircle(6, 2, 2);
    this.setBounce(0.65, 0.2);
    this.setCollideWorldBounds(true);
    this.setMaxVelocity(440, 700);

    // Strong horizontal drag creates the floaty badminton behavior.
    this.body.setDragX(120);
  }

  serve(fromSide = "left") {
    const dir = fromSide === "left" ? 1 : -1;
    this.lastHitter = fromSide;
    this.setPosition(fromSide === "left" ? 260 : 700, 240);
    this.setVelocity(170 * dir, -220);
  }
}

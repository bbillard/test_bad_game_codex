import Phaser from "https://esm.sh/phaser@3.70.0";
export class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  create() {
    const { width, height } = this.scale;
    const theme = this.registry.get("theme");

    this.add
      .text(width / 2, height / 2 - 70, "BADMINTON LITE", {
        fontFamily: "Trebuchet MS",
        fontSize: "58px",
        color: theme.text,
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 10, "← → Move   ↑ Jump   SPACE Hit", {
        fontSize: "24px",
        color: theme.text,
      })
      .setOrigin(0.5);

    const blinkText = this.add
      .text(width / 2, height / 2 + 80, "PRESS SPACE TO START", {
        fontSize: "30px",
        color: theme.accent,
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: blinkText,
      alpha: 0.2,
      yoyo: true,
      duration: 650,
      repeat: -1,
    });

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("game");
    });
  }
}

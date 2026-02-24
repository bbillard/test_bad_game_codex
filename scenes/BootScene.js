import Phaser from "https://esm.sh/phaser@3.70.0";
export class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  create() {
    this.cameras.main.setBackgroundColor("#0b1020");
    this.registry.set("theme", {
      bg: 0x0b1020,
      floor: 0x243653,
      net: 0x8fd3ff,
      left: 0x65d38b,
      right: 0xf58f6a,
      shuttle: 0xf7f3cf,
      text: "#e7f1ff",
      accent: "#f9dd63",
    });

    this.scene.start("menu");
  }
}

import Phaser from "https://esm.sh/phaser@3.70.0";
import { Player } from "../entities/Player.js";
import { AIPlayer } from "../entities/AIPlayer.js";
import { Shuttlecock } from "../entities/Shuttlecock.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
    this.score = { left: 0, right: 0 };
    this.matchPoint = 5;
    this.gameOver = false;
    this.lastServe = "left";

    const { width, height } = this.scale;
    const theme = this.registry.get("theme");
    const floorHeight = 84;
    this.floorY = height - floorHeight;

    this.add.rectangle(width / 2, this.floorY + floorHeight / 2, width, floorHeight, theme.floor);
    this.add.rectangle(width / 2, this.floorY - 34, 8, 68, theme.net);

    this.physics.world.setBounds(0, 0, width, height);

    this.ground = this.add.zone(width / 2, this.floorY + floorHeight / 2, width, floorHeight);
    this.physics.add.existing(this.ground, true);

    this.leftZone = this.add.zone(width / 4, this.floorY + floorHeight / 2, width / 2, floorHeight);
    this.physics.add.existing(this.leftZone, true);

    this.rightZone = this.add.zone((width * 3) / 4, this.floorY + floorHeight / 2, width / 2, floorHeight);
    this.physics.add.existing(this.rightZone, true);

    this.player = new Player(this, 190, this.floorY - 35, theme.left, "left");
    this.ai = new AIPlayer(this, width - 190, this.floorY - 35, theme.right);
    this.shuttlecock = new Shuttlecock(this, width / 2, 180, theme.shuttle);

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.ai, this.ground);
    this.physics.add.collider(this.shuttlecock, this.ground);

    this.physics.add.overlap(this.player, this.shuttlecock, () => {
      this.player.hit(this.shuttlecock, this.time.now);
    });

    this.physics.add.overlap(this.ai, this.shuttlecock, () => {
      this.ai.hit(this.shuttlecock, this.time.now);
    });

    this.physics.add.overlap(this.shuttlecock, this.leftZone, () => {
      if (!this.gameOver && this.shuttlecock.body.touching.down) {
        this.awardPoint("right");
      }
    });

    this.physics.add.overlap(this.shuttlecock, this.rightZone, () => {
      if (!this.gameOver && this.shuttlecock.body.touching.down) {
        this.awardPoint("left");
      }
    });

    this.scoreText = this.add
      .text(width / 2, 36, "0 : 0", {
        fontSize: "40px",
        color: theme.text,
      })
      .setOrigin(0.5);

    this.infoText = this.add
      .text(width / 2, 76, "SPACE to smash", {
        fontSize: "20px",
        color: "#a8c8ff",
      })
      .setOrigin(0.5);

    this.winText = this.add
      .text(width / 2, height / 2, "", {
        fontSize: "48px",
        color: theme.accent,
        align: "center",
      })
      .setOrigin(0.5)
      .setVisible(false);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.hitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.resetForServe("left");
  }

  update() {
    if (this.gameOver) {
      if (Phaser.Input.Keyboard.JustDown(this.hitKey)) {
        this.scene.restart();
      }
      return;
    }

    this.handlePlayerControls();
    this.ai.think(this.shuttlecock, this.time.now);
  }

  handlePlayerControls() {
    if (this.cursors.left.isDown) {
      this.player.move(-1);
    } else if (this.cursors.right.isDown) {
      this.player.move(1);
    } else {
      this.player.stop();
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.player.jump();
    }

    if (Phaser.Input.Keyboard.JustDown(this.hitKey)) {
      this.player.hit(this.shuttlecock, this.time.now);
    }
  }

  awardPoint(side) {
    this.score[side] += 1;
    this.lastServe = side;
    this.scoreText.setText(`${this.score.left} : ${this.score.right}`);

    if (this.score[side] >= this.matchPoint) {
      this.endMatch(side);
      return;
    }

    this.time.delayedCall(550, () => {
      this.resetForServe(side);
    });
  }

  resetForServe(server) {
    const { width } = this.scale;
    this.player.setPosition(190, this.floorY - 35).setVelocity(0, 0);
    this.ai.setPosition(width - 190, this.floorY - 35).setVelocity(0, 0);
    this.shuttlecock.serve(server);
    this.infoText.setText(`${server === "left" ? "Player" : "AI"} serves`);
  }

  endMatch(winner) {
    this.gameOver = true;
    this.player.stop();
    this.ai.stop();
    this.shuttlecock.setVelocity(0, 0);
    this.shuttlecock.body.allowGravity = false;

    const text = winner === "left" ? "YOU WIN!" : "AI WINS";
    this.winText.setText(`${text}\nPress SPACE to restart`).setVisible(true);
    this.infoText.setText("Match finished");
  }
}
